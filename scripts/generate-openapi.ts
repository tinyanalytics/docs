/**
 * Generates openapi.json from the product's API playground endpoint registry.
 *
 * The registry at apps/web/src/app/websites/[siteId]/api-playground/utils/endpointConfig.ts
 * is the single source of truth for endpoint paths, methods, and parameters. This script
 * reads it directly so the reference cannot drift from the playground.
 *
 * Usage:
 *   bun run scripts/generate-openapi.ts
 *   TINYANALYTICS_SRC=/path/to/tinyanalytics bun run scripts/generate-openapi.ts
 *
 * Response schemas are intentionally absent: EndpointConfig carries no response type.
 * Endpoints document their request fully and declare a bare 200 until responses are
 * backfilled from Fastify route schemas. See PRD.md.
 */

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DOCS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCT_ROOT = resolve(
  process.env.TINYANALYTICS_SRC ?? join(DOCS_ROOT, "..", "tinyanalytics"),
);
const REGISTRY = join(
  PRODUCT_ROOT,
  "apps/web/src/app/websites/[siteId]/api-playground/utils/endpointConfig.ts",
);

if (!existsSync(REGISTRY)) {
  console.error(
    `Cannot find the endpoint registry at:\n  ${REGISTRY}\n\n` +
      `Set TINYANALYTICS_SRC to your TinyAnalytics checkout, e.g.\n` +
      `  TINYANALYTICS_SRC=~/src/tinyanalytics bun run scripts/generate-openapi.ts`,
  );
  process.exit(1);
}

const { endpointCategories, parameterMetadata } = await import(REGISTRY);

/* ------------------------------------------------------------------ *
 * Curation
 *
 * The playground exposes every endpoint the dashboard itself calls, including
 * internal plumbing. The public reference commits to a subset: documenting an
 * endpoint is a promise not to change its shape without notice.
 * ------------------------------------------------------------------ */

/** Categories published in full. */
const PUBLIC_CATEGORIES = new Set([
  "Sites",
  "Overview",
  "Events",
  "Errors",
  "Goals",
  "Funnels",
  "Revenue",
  "Performance",
  "Heatmaps",
  "Sessions",
  "Users",
  "User Traits",
  "Segments",
  "Cohorts",
  "Groups",
  "Catalog",
  "Bots",
  "Alerts",
  "Annotations",
  "Surveys",
  "Feature Flags",
  "Experiments",
  "Dashboards",
  "Custom Query",
  "Reports",
  "Uptime — Monitors",
  "Uptime — Channels & Incidents",
]);

/**
 * Categories published only in part, keyed by the paths to keep.
 *
 * OAuth handshake routes (connect / status / select-property / disconnect) are
 * browser redirect flows, not callable API, so only the data read survives.
 */
const PARTIAL_CATEGORIES: Record<string, string[]> = {
  Misc: ["/sites/:site/retention", "/sites/:site/journeys"],
  Organizations: ["/organizations", "/organizations/:organizationId/sites"],
  "Search Console": ["/sites/:site/gsc/data"],
};

/**
 * Excluded entirely, with the reason recorded so the choice can be revisited:
 *   Billing              — account plumbing, shape follows the payment provider
 *   Imports              — migration tooling; batch semantics not settled
 *   Google Analytics 4   — OAuth handshake plus a proxy to Google's own API
 */
const EXCLUDED_CATEGORIES = new Set([
  "Billing",
  "Imports",
  "Google Analytics 4",
]);

/**
 * Individual paths withheld from an otherwise-published category, with the reason:
 *   /sites/:site/presence — page-presence widget read; its feature docs are held
 *     with the session-replay deploy (PRD.md §10l), so publishing the operation
 *     here would promise a surface the public docs don't cover yet
 */
const EXCLUDED_PATHS = new Set(["/sites/:site/presence"]);

/**
 * Display names for categories whose internal label doesn't read well publicly.
 * "Misc" survives curation as Retention and Journeys only, so it's named for them.
 */
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  Misc: "Retention & Journeys",
};

/**
 * One-line definitions for each published category. These render as the intro to each
 * sidebar group, so they are written to stand alone when quoted out of context.
 */
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Sites:
    "Read and update a site, its tracking config, its exclusions, and its private link.",
  Organizations:
    "List the organizations you belong to and the sites inside them, and create new sites.",
  Overview:
    "Headline metrics, time series, and dimension breakdowns for a site.",
  Events: "Custom events, their property breakdowns, and the live event log.",
  Errors: "JavaScript errors captured from your site, grouped by error name.",
  Goals:
    "Define, measure, and manage conversion goals matched on a page path or event name.",
  Funnels:
    "Build and measure multi-step conversion funnels, including step drop-off.",
  Revenue:
    "Revenue totals and breakdowns from the revenue you attach to events.",
  Performance:
    "Core Web Vitals for a site, over time and broken down by dimension.",
  Heatmaps:
    "Pages with heatmap data, binned click and rage-click intensity, and cumulative scroll reach.",
  Sessions:
    "The session list and the full pageview and event timeline of one session.",
  Users:
    "The identified-user list and one user's profile, activity, and sessions.",
  "User Traits": "Read and write the traits attached to an identified user.",
  Segments: "Saved filter sets you can apply across reports.",
  Cohorts: "Behavioral cohorts defined by the actions visitors took.",
  Groups:
    "Group analytics — accounts, companies, or workspaces a user belongs to.",
  Catalog:
    "The inventory of event names, event properties, and traits seen on a site, with their descriptions and verified marks.",
  Bots: "Bot and AI-crawler traffic, including the per-layer detection counts.",
  Alerts: "Threshold alerts that notify you when a metric moves.",
  Annotations:
    "Dated notes drawn on your dashboard charts to mark what changed.",
  Surveys: "In-product surveys and their responses.",
  "Feature Flags":
    "Feature flags, their rollout rules, and flag evaluation for a given user.",
  Experiments: "A/B experiments built on feature flags, and their results.",
  Dashboards: "Custom dashboards and the widgets on them.",
  "Custom Query": "Run read-only SQL against your site's analytics data.",
  Reports:
    "Scheduled email report subscriptions, including sending one on demand.",
  "Search Console":
    "Google Search Console search analytics for a connected site.",
  "Uptime — Monitors": "HTTP and TCP uptime monitors and their check history.",
  "Uptime — Channels & Incidents":
    "Uptime notification channels and the incidents raised against your monitors.",
  "Retention & Journeys":
    "Cohort retention curves and the page-to-page paths visitors take.",
};

/* ------------------------------------------------------------------ *
 * Parameter construction
 * ------------------------------------------------------------------ */

const COMMON_PARAMS = [
  {
    name: "start_date",
    description: "Start of the range, as `YYYY-MM-DD`.",
    schema: { type: "string", format: "date" },
  },
  {
    name: "end_date",
    description: "End of the range, as `YYYY-MM-DD`.",
    schema: { type: "string", format: "date" },
  },
  {
    name: "time_zone",
    description:
      "IANA time zone used to bucket the range, e.g. `America/New_York`.",
    schema: { type: "string", example: "America/New_York" },
  },
  {
    name: "filters",
    description:
      "JSON-encoded array of filter objects, each `{ dimension, op, value }` where `value` is an array. " +
      'Example: `[{"dimension":"country","op":"equals","value":["US"]}]`. ' +
      "A user-trait filter uses the templated dimension `trait:<key>` — " +
      '`[{"dimension":"trait:plan","op":"equals","value":["pro"]}]` — and matches identified users ' +
      "only, by the trait's current value. Trait ops: equals, not_equals, contains, not_contains, " +
      "starts_with, ends_with, is_null (\"is not set\"), is_not_null (\"is set\"); regex is not available. " +
      "Trait filters require a member session or a `users:read` key, max 4 per query, and a filter " +
      "matching more than 10,000 identified users fails with `TRAIT_FILTER_TOO_BROAD`.",
    schema: { type: "string" },
  },
];

/** Path params carry no entry in parameterMetadata under their raw name. */
const PATH_PARAM_OVERRIDES: Record<
  string,
  { description: string; schema: object }
> = {
  site: { description: "Site ID.", schema: { type: "integer" } },
};

/**
 * Per-operation enrichments the registry cannot express. EndpointConfig carries
 * no error model, so the PATCH traits route's RFC 9457 problem-details catalog
 * is documented here, beside the request the playground generates. Keyed by
 * `"<method> <openapi path>"`.
 */
const OPERATION_OVERRIDES: Record<
  string,
  {
    /** Replaces the registry description outright (the playground's is a one-liner). */
    description?: string;
    descriptionAppend?: string;
    /** Per-query-parameter enrichments the registry cannot express (prose, defaults). */
    parameters?: Record<string, { description?: string; default?: string }>;
    responses?: Record<string, { description: string }>;
  }
> = {
  // 0296: the exit-pages semantics were hand-patched into openapi.json once; now they
  // ride the generator so a regeneration can't silently drop them.
  "get /sites/{site}/exit-pages": {
    description:
      "Returns exit pages — one row per page sessions ended on — with the exit rate (sessions exiting there ÷ that page’s total pageviews), the exiting sessions’ average duration, and their single-page share, with pagination. `exit_rate` is null and `exit_rate_suppressed` is true while any active filter is not session-scoped (event-level filters make the rate’s denominator ill-defined). `mode=url` returns (hostname, path) rows with a host-scoped denominator; compare is path mode only.",
    parameters: {
      mode: {
        description:
          "Row identity: `path` (default) aggregates each path across hostnames; `url` returns one row per (hostname, path).",
        default: "path",
      },
    },
  },
  // 0304: the breakdown first_seen flag and the by-dimension split.
  "get /sites/{site}/breakdown": {
    parameters: {
      first_seen: {
        description:
          "`true` adds `firstSeen` to every row — a UTC datetime of the value's all-time first appearance, unrestricted by the date range. Session dimensions only (hostname, referrer, channel, country, region, city, language, browser, operating_system, device_type, ai_assistant, utm_*); a page or event dimension returns 400.",
      },
    },
  },
  "get /sites/{site}/timeseries/by-dimension": {
    parameters: {
      dimension: { description: "The session dimension to split sessions by." },
      limit: {
        description:
          "How many top values (by total sessions) to return as series. Default 100, max 1000.",
      },
    },
  },
  "patch /sites/{site}/users/{userId}/traits": {
    descriptionAppend:
      "\n\nErrors arrive as RFC 9457 problem+json with a machine-readable `code`:\n\n" +
      "| Status | `code` | Cause and fix |\n| --- | --- | --- |\n" +
      "| `400` | `INVALID_USER_ID` | The `userId` path segment is empty or over 255 characters. Percent-encode the segment — `auth0|abc`-style IDs round-trip intact. |\n" +
      "| `400` | `INVALID_TRAITS` | The traits object is malformed or over 2,048 bytes serialized (`cap` names the limit). |\n" +
      "| `403` | — | The key lacks `users:write` — the error names the missing scope. |\n" +
      "| `404` | `USER_NOT_FOUND` | No profile exists and `create=false` was passed. Skip and count, or omit it to create the profile. |",
    responses: {
      "400": {
        description:
          "RFC 9457 problem+json — `INVALID_USER_ID` (empty or >255-character `userId`) or `INVALID_TRAITS` (malformed, or over the 2,048-byte `cap`).",
      },
      "404": {
        description:
          "RFC 9457 problem+json — `USER_NOT_FOUND` when `create=false` and no profile exists for the user.",
      },
    },
  },
};

/** True when a label restates the parameter name and so adds nothing. */
function isRedundantLabel(label: string, name: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalize(label) === normalize(name);
}

/**
 * Playground placeholders are authoring hints ("User ID", "e.g. us-east"), not values,
 * so they become prose rather than schema examples — an `example` that doesn't parse as
 * its own type is worse than no example.
 */
function schemaFor(
  name: string,
  overrides?: Record<string, (typeof parameterMetadata)[string]>,
) {
  // An endpoint's own `parameterMetadata` overrides the shared map — the playground
  // resolves the same way (exit-pages `mode` is path|url, not the funnel modes;
  // by-dimension `dimension` is the session-mode subset).
  const meta = overrides?.[name] ?? parameterMetadata[name];
  if (!meta) return { schema: { type: "string" }, description: undefined };

  const parts: string[] = [];
  if (meta.label && !isRedundantLabel(meta.label, name))
    parts.push(`${meta.label}.`);
  if (meta.placeholder) {
    parts.push(
      /^e\.g\.?\s/i.test(meta.placeholder)
        ? `${meta.placeholder}.`
        : `Example: ${meta.placeholder}.`,
    );
  }
  const description = parts.length ? parts.join(" ") : undefined;

  if (meta.type === "number")
    return { schema: { type: "integer" }, description };
  if (meta.type === "select")
    return {
      schema: { type: "string", enum: meta.options ?? [] },
      description,
    };
  return { schema: { type: "string" }, description };
}

function pathParamsOf(path: string): string[] {
  return [...path.matchAll(/:([A-Za-z0-9_]+)/g)].map((m) => m[1]);
}

function toOpenApiPath(path: string): string {
  return path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
}

/**
 * Merges two inferred schemas so an array of unlike objects (a variant with a payload
 * next to one without) yields the union of their properties rather than the first
 * element's shape, which would reject its own example.
 */
function mergeSchemas(a: any, b: any): any {
  if (!a) return b;
  if (!b) return a;
  if (a.type !== b.type) return {};
  if (a.type === "object") {
    const properties = { ...(a.properties ?? {}) };
    for (const [k, v] of Object.entries(b.properties ?? {})) {
      properties[k] = k in properties ? mergeSchemas(properties[k], v) : v;
    }
    return { type: "object", properties };
  }
  if (a.type === "array")
    return { type: "array", items: mergeSchemas(a.items, b.items) };
  return a;
}

/** Infers a permissive JSON Schema from a request body example. */
function inferSchema(value: unknown): object {
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    return {
      type: "array",
      items: value.map(inferSchema).reduce(mergeSchemas),
    };
  }
  if (value !== null && typeof value === "object") {
    const properties: Record<string, object> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      properties[k] = inferSchema(v);
    }
    return { type: "object", properties };
  }
  if (typeof value === "number")
    return { type: Number.isInteger(value) ? "integer" : "number" };
  if (typeof value === "boolean") return { type: "boolean" };
  return { type: "string" };
}

/**
 * Mintlify uses the raw tag name as a URL path segment, so tags are emitted as
 * slugs with the display name carried in `x-group`.
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function operationIdFor(method: string, path: string): string {
  const slug = path.replace(/[:{}]/g, "").split("/").filter(Boolean).join("-");
  return `${method.toLowerCase()}-${slug}`;
}

/* ------------------------------------------------------------------ *
 * Build
 * ------------------------------------------------------------------ */

const paths: Record<string, Record<string, unknown>> = {};
const tags: { name: string; "x-group": string; description?: string }[] = [];
let published = 0;
const dropped: string[] = [];

for (const category of endpointCategories) {
  const keepAll = PUBLIC_CATEGORIES.has(category.name);
  const keepSome = PARTIAL_CATEGORIES[category.name];

  if (EXCLUDED_CATEGORIES.has(category.name) || (!keepAll && !keepSome)) {
    dropped.push(`${category.name} (${category.endpoints.length})`);
    continue;
  }

  const endpoints = (keepAll
    ? category.endpoints
    : category.endpoints.filter((e: any) => keepSome!.includes(e.path))
  ).filter((e: any) => !EXCLUDED_PATHS.has(e.path));

  if (endpoints.length === 0) continue;
  if (keepSome) {
    dropped.push(
      `${category.name} (${category.endpoints.length - endpoints.length} of ${category.endpoints.length})`,
    );
  }

  const displayName = CATEGORY_DISPLAY_NAMES[category.name] ?? category.name;
  const tag = slugify(displayName);
  tags.push({
    name: tag,
    "x-group": displayName,
    ...(CATEGORY_DESCRIPTIONS[displayName]
      ? { description: CATEGORY_DESCRIPTIONS[displayName] }
      : {}),
  });

  for (const endpoint of endpoints) {
    const openApiPath = toOpenApiPath(endpoint.path);
    const required = new Set<string>(endpoint.requiredParams ?? []);

    const parameters: object[] = [];

    for (const name of pathParamsOf(endpoint.path)) {
      const override = PATH_PARAM_OVERRIDES[name];
      const { schema, description } = override
        ? { schema: override.schema, description: override.description }
        : schemaFor(name);
      parameters.push({
        name,
        in: "path",
        required: true,
        ...(description ? { description } : {}),
        schema,
      });
    }

    if (endpoint.hasCommonParams) {
      for (const p of COMMON_PARAMS) {
        parameters.push({ ...p, in: "query", required: false });
      }
    }

    const opOverride =
      OPERATION_OVERRIDES[
        `${endpoint.method.toLowerCase()} ${openApiPath}`
      ];

    for (const name of endpoint.specificParams ?? []) {
      const generated = schemaFor(name, endpoint.parameterMetadata);
      const paramOverride = opOverride?.parameters?.[name];
      const description = paramOverride?.description ?? generated.description;
      const schema =
        paramOverride?.default !== undefined
          ? { ...generated.schema, default: paramOverride.default }
          : generated.schema;
      parameters.push({
        name,
        in: "query",
        required: required.has(name),
        ...(description ? { description } : {}),
        schema,
      });
    }

    const operation: Record<string, unknown> = {
      operationId: operationIdFor(endpoint.method, endpoint.path),
      summary: endpoint.name,
      ...((opOverride?.description ?? endpoint.description)
        ? {
            description:
              (opOverride?.description ?? endpoint.description) +
              (opOverride?.descriptionAppend ?? ""),
          }
        : opOverride?.descriptionAppend
          ? { description: opOverride.descriptionAppend }
          : {}),
      tags: [tag],
      ...(parameters.length ? { parameters } : {}),
      responses: {
        "200": { description: "Success." },
        ...opOverride?.responses,
        "401": { $ref: "#/components/responses/Unauthorized" },
        "403": { $ref: "#/components/responses/Forbidden" },
        "429": { $ref: "#/components/responses/RateLimited" },
      },
      // The authored guides are the canonical search landing pages. Generated endpoint
      // pages remain directly linkable and available to docs AI, but noindex prevents
      // 100+ thin request-only pages from competing with those guides in web search.
      "x-mint": { metadata: { noindex: true } },
    };

    if (endpoint.hasRequestBody && endpoint.requestBodyExample) {
      operation.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: inferSchema(endpoint.requestBodyExample),
            example: endpoint.requestBodyExample,
          },
        },
      };
    }

    paths[openApiPath] ??= {};
    paths[openApiPath][endpoint.method.toLowerCase()] = operation;
    published += 1;
  }
}

const spec = {
  openapi: "3.1.0",
  info: {
    title: "TinyAnalytics API",
    version: "1.0.0",
    description:
      "The TinyAnalytics HTTP API. Read your analytics, manage sites and goals, and drive " +
      "feature flags, experiments, and surveys. Every call is authenticated with an API key " +
      "sent as `Authorization: Bearer <key>`.",
  },
  servers: [{ url: "https://dash.tinyanalytics.io/api" }],
  security: [{ bearerAuth: [] }],
  tags,
  paths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        description:
          "An API key created in your account settings, sent as `Authorization: Bearer <key>`.",
      },
    },
    responses: {
      Unauthorized: { description: "Missing or invalid API key." },
      Forbidden: {
        description: "The key is valid but its owner cannot access this site.",
      },
      RateLimited: { description: "Too many requests. Retry after a pause." },
    },
  },
};

const outPath = join(DOCS_ROOT, "openapi.json");
await writeFile(outPath, `${JSON.stringify(spec, null, 2)}\n`);

const total = endpointCategories.reduce(
  (n: number, c: any) => n + c.endpoints.length,
  0,
);
console.log(`Wrote ${outPath}`);
console.log(
  `Published ${published} of ${total} endpoints across ${tags.length} tags.`,
);
console.log(`Withheld: ${dropped.join(", ")}`);
