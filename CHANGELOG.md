# Changelog

All notable changes to the tinyanalytics documentation site are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project adheres to semantic versioning where practical.

## [Unreleased]

### Added

- **Agent Skills guide (2026-08-03):** documented
  [`tinyanalytics/agent-skills`](https://github.com/tinyanalytics/agent-skills), the MIT-licensed
  repository of five Agent Skills that was previously referenced nowhere in the docs. The new
  **Resources → AI tools → Agent skills** page covers the `npx -y skills add tinyanalytics/agent-skills -y`
  install and why both non-interactive flags matter, what each of the five skills does
  (`tinyanalytics-setup`, `verify-tinyanalytics-tracking`, `tinyanalytics-events`,
  `tinyanalytics-insights`, `tinyanalytics-dashboards`), the API-key access ladder ending in headless
  registration, the gitignored-`.env` secret rule, verification that reports success only on observed
  data, and the runtime fetch of `dash.tinyanalytics.io/setup.md` that keeps a stale install calling
  current endpoints. Added a fourth row to the AI-surface table on *Use docs with AI* and cross-linked
  the MCP server guide, which now names Agent Skills as complementary.

- **Product coverage sync through `eccefd0` (2026-08-03):** documented the shipped July 31–August 2
  product wave across Ask AI, AI-assisted filters/audiences/surveys/reports/query repair,
  least-privilege API keys and MCP, the unified comparison picker, default Last 7 days baseline,
  and session-ranked Pages/URLs. Regenerated the API reference from 133 of 158 to **148 of 192
  endpoints across 29 groups**. The docs PRD now records both documented changes and reviewed
  no-public-impact changes from the exact previous sync marker.
- **Public-doc release gate (2026-08-03):** contributor instructions now require every shipped,
  customer-visible feature, improvement, behavior change, and API change to update Mintlify before
  release. The workflow advances an exact product SHA only after the affected pages, generated API
  reference, `mint validate`, and `mint broken-links` are complete.

- **MCP server guide (2026-07-30):** documented `POST https://dash.tinyanalytics.io/api/mcp`, the
  Model Context Protocol endpoint that lets Claude Code, Cursor, VS Code, and Codex CLI read and
  manage analytics with an existing API key. Covers the 47 tools grouped by task, tested
  per-client configuration (the Claude Code command was verified against production), keeping the
  key out of a committed repository, the required `start_date`/`end_date` on every date-ranged
  report, the 120-requests-per-minute per-key limit, and the security posture — a key carries its
  owner's access, no read-only keys exist yet, delete and tracking-configuration tools are not
  offered on cloud, and returned analytics text is treated as untrusted input. The troubleshooting
  table records observed failures, including the confusing OAuth/HTML error a client reports when
  the `Authorization` header is missing. Added to **API reference → Authentication & tools** and
  linked from the API introduction, API keys, and rate limits pages.
- **Disambiguated the two MCP servers (2026-07-30):** *Use docs with AI* previously described "the
  hosted docs MCP server" as the only MCP in the product's world. It now opens with three distinct
  ways to use AI (in-product Ask AI, an agent connected to your analytics, or these docs as
  context) and states plainly that the documentation MCP server serves these public pages while the
  tinyanalytics MCP server serves your own data and needs an API key.
- **Stripe revenue attribution setup guide (2026-07-30):** documented the merchant-side work the
  Stripe page previously left implicit — identifying visitors, reading `getUserId()` at checkout,
  and writing `ta_identified_user_id` into Checkout `payment_intent_data` / `subscription_data` or
  a PaymentIntent. Added the resolution order (session link → identified user's last session at or
  before the payment → `(no session)`), customer-grained tagging so subscription renewals inherit
  the link, read-time resolution, a `(no session)` troubleshooting table, and an attribution check.
  Recorded that `ta_session_id` and `ta_user_id` are honored but not obtainable in the browser,
  that the pre-load tracker stub returns `null` from `getUserId()`, and that email fallback matches
  only identified users keyed by email or carrying an `email` trait.
- **Product coverage sync through `f5dd577` (2026-07-30):** added complete guides for first-touch
  **User acquisition**, site and organization **Ask AI**, and **Billing and plans**. The new pages
  document exact metric scopes, audience and permission boundaries, approval-gated AI writes,
  conversation/credit behavior, the 14-day Business trial, pageview metering, and read-time
  retention without deletion. All three are linked from the main navigation and landing page.
- **Copyable AI integration prompt (2026-07-30):** added a self-contained Mintlify `Prompt` that
  tells a coding assistant to use the supplied official docs, preserve framework conventions, keep
  keys out of browser code, and verify the first pageview without relying on an unresolved docs URL.

### Changed

- **Favicon now matches the main site (2026-07-30):** replaced `favicon.svg`, which was still the
  blue `#345FCF` ascending-bars placeholder, with the current tinyanalytics emblem — the green
  `#009b32` bolt over an arc — copied byte-for-byte from the marketing site's
  `public/seo/favicon.svg`. The docs logo already used this mark, so only the favicon was off-brand.
  No `docs.json` change was needed: `"favicon": "/favicon.svg"` already pointed at this path.
- **Scoped search indexing to the product documentation (2026-08-03):** removed the site-wide
  `robots: noindex` metatag from `docs.json`, so the 71 authored product, resource, and account
  pages are indexable. Search exclusion is now declared per page instead: all 9 `/api-reference/`
  guides and all 29 `/integrations/` install guides set `noindex: true` in frontmatter, joining the
  148 generated endpoint operations that already carry `x-mint.metadata.noindex`. `seo.indexing`
  stays `navigable`. The SEO regression audit enforces the split in both directions — excluded
  sections must set `noindex`, every other authored page must not, and `docs.json` must carry no
  site-wide robots directive.
- **Completed the authored-page SEO migration (2026-07-30):** renamed 107 routes so each URL and
  H1 states one clear search intent, added concise sidebar labels and unique descriptions capped at
  155 characters, updated every internal link and navigation entry, and added direct permanent
  redirects for both current and legacy `/guides` URLs. Set the canonical base URL to
  `https://tinyanalytics.io/docs`, preserved `noindex` on all 148 generated operations, and added
  a migration regression audit.
- **Enriched product reference pages (2026-07-30):** expanded the metric glossary with acquisition,
  conversion, events-per-session, and revenue definitions; distinguished in-product Ask AI from
  using the public docs with an external assistant; updated Anthropic BYOK coverage; documented
  partial-success CSV exports; and added the shipped scheduled-report and alert email context.
- **Corrected contributor guardrails (2026-07-30):** replaced the stale rotating-identity wording
  with the persistent server-derived cookieless model, and aligned API-key guidance with the shipped
  key-owner contract for server-side ingestion, analytics reads, and site management.
- **Aligned brand positioning and privacy copy (2026-07-28):** centered the public docs on
  “Understand your traffic and your product without tracking people,” added the shipped AI discovery
  and natural-language analysis story, replaced the generic repository README, and updated the
  comparison page against current first-party GA4, Plausible, and Umami documentation. Privacy pages
  now distinguish core anonymous analytics from the purpose-specific browser storage used by
  identification, feature flags, groups, surveys, and browser opt-out.
- **Replaced Cross-site rollup with Organization overview (2026-07-27):** renamed and rewrote the
  page for the new organization-level Overview — six combined metrics with sparklines, selectable
  per-site trends, access-aware comparison, and the 50-site display cap. Added redirects from
  `/rollup` and `/guides/rollup`.
- **Corrected the tracking-script size claim (2026-07-27):** changed “under 6 KB gzipped” to the
  enforced **under 6.5 KB gzipped** budget across the public pages, PRD, agent instructions, and
  both copies of the project authoring skill.
- **Completed Mintlify SEO configuration (2026-07-27):** added a global, benefit-bearing site
  description; explicitly indexed navigable pages; set Open Graph locale/site-name, Twitter card,
  author, and theme-color metadata; and configured the structured-data publisher organization as
  **tinyanalytics**. The production canonical base was added after the docs URL was confirmed.
- **Updated documentation branding (2026-07-27):** changed the primary accent to `#006420` in
  light mode and `#009B32` in dark mode, and set Inter as the site-wide font.
- **Flattened the main documentation routes (2026-07-27):** removed the separate `guides/`
  directory and **Guides** navigation tab, moved all 55 guide articles to the documentation root,
  and changed their public paths from `/doc/guides/<slug>` to `/doc/<slug>`. Updated navigation and
  every internal link, with permanent redirects from `/guides` and `/guides/:slug*` so existing
  bookmarks and indexed URLs continue to work.
- **Product-sync pass (2026-07-24):** brought the docs current with the 68 product commits landed
  since the last sync point (`d400019`), covering the AI-query, Search Console, autocapture-targeting,
  users-write, localization, and identity/accuracy changes (product decisions 0193–0214). Facts were
  verified against source — `plans.ts`, tracker `config.ts`, `gsc-metrics.tsx`, and the exclusions/user
  components — not commit messages. 14 pages updated.
  - `search-console` — rewrote for the report's new shape: a totals strip with
    **impression-weighted** CTR/position and period-over-period comparison, a dual-axis clicks/impressions
    **trend chart**, the **first-party join** (your sessions/pageviews and entry-page bounce/engaged next
    to Google's metrics on Pages/Countries/Devices; Queries stays Google-only), row **drill-down**, **CSV
    export**, and **Pacific-day** windows (Last 7 / 28 / 90 days, default 28, ending ~2 days ago).
  - `sql-query-builder` — documented **Ask AI** natural-language → SQL generation, the then-current
    per-plan monthly limits, and that generated SQL runs through the same read-only guard. Current
    allowances live in `billing-plans`.
  - `account-settings` — added the **dashboard language** section (7 locales: English, German,
    Spanish, French, Portuguese, Japanese, Turkish; per-browser, instant) and the **Anthropic API key**
    (BYOK) card that bypasses the AI-query limit.
  - `goals`, `funnels`, `autocapture`, `events` — documented **autocapture
    targeting**: goals and funnel steps on outbound links, button clicks, form submissions, and copies
    with value patterns (`input_change` is not targetable; autocapture goals can't aggregate revenue),
    plus the Events page **Autocapture** browser.
  - `users` — added the profile write actions: **Identify User** (anonymous visitors),
    **Edit Traits** (identified users), and **Delete User** as the **GDPR erasure** tool (owner/admin only).
  - `ai-traffic` — noted that **AI Traffic** now appears as a glance metric on the home
    website cards; `resources/metrics-glossary` gained an **AI traffic (AI sessions)** definition.
  - `script-configuration` — documented the `data-debounce` attribute (default 500 ms) and the
    same-URL skip that stop SPA route changes from double-counting pageviews.
  - `exclude-traffic` — documented the **first-party proxy** IP-resolution toggle (framed as an
    accuracy setting, not an exclusion).
  - `resources/cookieless-identity` — added how identity is steadied for **rotating-egress** networks
    (VPNs, WARP, iCloud Private Relay, corporate proxies); `resources/bot-detection` — noted the
    shared-network (CGNAT) false-positive protection.

### Fixed

- **Product-sync pass (2026-07-20):** audited the 15 product commits landed since the docs last
  captured product facts (`4ee8613` onward) and corrected six pages that had become **factually
  wrong**. These were verified against migrations, schema, and component source — not commit
  messages — after an audit surfaced a stale code comment asserting a column default that does not
  exist (`sites-validation.ts` claims `Etc/UTC`; migration 0035 adds a nullable column with no default).
  - `scheduled-reports` — "Scheduling is in UTC" (3 places) → reports run on the site's
    **reporting timezone**, falling back to UTC only when none is set.
  - `dashboard-overview` — date ranges "calculated in your browser's time zone" (2 places) →
    the site's reporting timezone when set, browser zone as fallback. Added the date picker's
    per-view **Time zone** override.
  - `exclude-traffic` — the page asserted all exclusions "drop at collection, nothing is
    recorded". False for the new **Referrer Exclusions**, which keep the visit and reclassify it as
    Direct. Documented as a contrasted section rather than a sixth table row, so it cannot inherit
    the drop semantics of its neighbors.
  - `pages` — "Click the row again to clear the filter" (2 places) → a row click now
    navigates to the main dashboard pre-filtered; there is no toggle-off on the Pages and Landing
    pages tables. Qualified the matching over-broad claim in `filters`.
  - `journeys` — steps "2 to 10, default 3" (3 places) → **2 to 6, default 4**.
  - `bots` — "four cards" and bots detected "in two ways" → **eight cards** and **six
    detection layers**; noted that overlapping layers can sum above the total, and that period
    comparison is unavailable on this report.

### Added

- **Stripe revenue guide (2026-07-27):** added `stripe-revenue` with restricted-key and manual
  webhook setup, source tabs, charge/refund/dispute semantics, attribution, double-count prevention,
  connection verification, and privacy boundaries. Extended the Revenue, site settings, SQL,
  data-handling, and privacy pages for the same shipped source.
- **Product-sync pass through `964f322` (2026-07-27):** audited product decisions 0215–0222 and
  documented organization custom dashboards, seven alert templates, URL and event-property alert
  scopes, distinct event-user alerts, the Pages **Show full URL** control, Goals/Funnels date and
  filter controls, globally unique shortlink slugs, and the API playground's complete
  customer-facing route catalog.
- **Generated API endpoint reference (2026-07-20)** — the reference documented **9 endpoints** while
  the product's API playground exposed **158** (~6% coverage), and `api-reference/read` explicitly
  deferred the rest to the playground, which sits behind dashboard auth. 149 endpoints were
  unreachable for logged-out readers and uncitable by AI answer engines.
  - Added `scripts/generate-openapi.ts`, which builds `openapi.json` from the playground's own
    endpoint registry so the reference cannot drift from the product. Run with
    `bun run scripts/generate-openapi.ts`.
  - Added an **Endpoints** group to `docs.json` publishing **133 of 158 endpoints across 29 groups**,
    each with full path, method, and parameters.
  - Withheld 25 endpoints as internal rather than public API — billing, imports, GA4 and Search
    Console OAuth handshakes, team and org member management, and the internal event counter. The
    exclusions live in the script's config with their reasons, since documenting an endpoint is a
    commitment not to change its shape.
  - **Response bodies are not yet documented** — the source registry carries no response types, so
    operations declare a bare `200` plus shared `401`/`403`/`429`. `api-reference/read` and
    `api-reference/playground` state this plainly and point at the playground for real responses.
  - Rewrote the playground hand-off in `api-reference/read`, `api-reference/introduction`, and
    `api-reference/playground`: the reference now answers "what endpoints exist and what do they
    take", the playground answers "what does the response look like".
- **New product surfaces documented (2026-07-20), from the same sync pass:**
  - **Per-site reporting timezone** (0182) — canonical section in `site-settings` covering the
    two states (unset ⇒ browser zone for the dashboard and UTC for reports; set ⇒ canonical for the
    whole team), the historical re-bucketing warning, and that **alerts are unaffected** because
    their windows roll from the current moment. Cross-linked from dashboard-overview, scheduled-reports,
    retention, users, and alerts. _No standalone `timezone` page:_ one home to keep current
    beats five places to drift.
  - **Multi-host page identity / URL mode** (0181) — the **URLs** tab in `pages`, the
    multi-host banner, `?pagesMode=url` persistence in shared links, host-aware Entries/Exits, and
    the fact that `www.` and apex are not merged. Added `Hostname`, `Entry Page`, and `Entry Hostname`
    to `filters` with their session-scoped "entered on" semantics, and the three composite
    breakdown dimensions to `api-reference/read`.
  - **Referrer exclusions and self-referral handling** (0190–0192) — new sections in
    `exclude-traffic` and `resources/traffic-classification`: root↔subdomain hops are Internal
    in both directions, sibling subdomains remain Referral (fix: add the root domain), excluded
    referrers become **Direct** not Internal, and UTM tags still win.
  - **Events page** (0193) — `events` previously described only the dashboard's Events card.
    Added the trend chart's tabs, Top-N select (default **Top 5**), granularity select, and clickable
    legend, plus the event log: **Realtime now defaults ON** at a 5-second refresh, 100 rows per page,
    the paused-while-browsing-history banner, and that search matches only already-loaded rows.
  - **Users page** (0187) — sortable columns with their default, hover-to-absolute timestamps,
    profile Acquisition and Top pages cards (flagging that **Top pages is all-time, not the selected
    date range**), copyable user ID, and the activity calendar's 95th-percentile scale. Documented the
    `user_id` filter now matching a person across both identity columns.
  - Smaller additions: goal edit/clone/delete actions (`goals`), the AI chart's zoom and
    suppressed annotations (`ai-traffic`), the Journeys path-filter wildcards and journey cap,
    weekly cohorts starting Monday (`retention`), and comparison's unavailability on the Bots
    report (`compare`).
- **Codebase gap analysis (2026-07-19):** diffed the docs against the actual product surface (web
  route tree + `sdks/` + decisions 0140–0181) and closed four missing pages, all source-grounded:
  - **Error tracking** guide (`errors`, "Explore your data") — the opt-in `data-track-errors`
    capture, the manual `trackError()` call, and the message-grouped report with stack-trace drill-down.
  - **Revenue analytics** guide (`revenue`, "Product analytics") — the `revenue`/`currency`
    reserved props, the report metrics (total, AOV, paying sessions, orders), and reporting-currency
    conversion. Also documented Revenue as an alert metric in `alerts` (previously stated as not
    wired — it shipped).
  - **Cross-site rollup** guide (`rollup`, "Explore your data") — combined analytics across every
    site in the active organization, with per-site contribution.
  - **React Native** integration (`integrations/react-native`) in a new **Mobile apps** navigation group —
    the `@tinyanalytics/react-native` SDK, the mobile-app site type, screen/event/identify tracking, the
    React Navigation helper, and the install-id identity model.
  - **Site settings** hub (`site-settings`, "Accounts & access") — the per-site Settings tabs, and
    the canonical home for moving a site between organizations and deleting a site.
- Expanded `pages` with the alternate views (Titles / Entries / Exits / Hostnames) and a **Landing
  pages** section (entry-page report with bounce, average duration, scroll depth, and time on page).
- Claude Code now discovers the repo's two authoring skills: `mintlify` (platform mechanics) and
  `tinyanalytics-docs` (project conventions) are copied from `.agents/skills/` to `.claude/skills/`,
  the only path Claude Code auto-loads. The `.agents/` copies remain the source for other agent tools.
  Note: the two trees are duplicates — edit both when a skill changes.

### Changed

- **Mintlify component & GEO pass (2026-07-19)** across 95 pages, grounded in Mintlify's official
  component contracts and style guide. The prose was already accurate and second-person; this pass
  addressed structure, which was the actual gap — the docs used 5 of Mintlify's ~25 components.
  - **API reference now uses native field components.** Markdown parameter tables became
    `<ParamField>` blocks across all 8 pages, `api-reference/sql` response JSON became `<ResponseField>`
    with `<Expandable>` for nested properties. Conceptual tables (credential matrix, status codes,
    CORS zones, endpoint catalog) were deliberately left as tables — they are comparisons, not field lists.
  - **`<CodeGroup>` on 7 pages** — 5 API endpoints now show the same HTTP request as cURL, JavaScript
    (`fetch`), and Python (`requests`) tabs. Translations are mechanical; no new endpoints, fields, or
    behavior were introduced.
  - **FAQ blocks on 64 pages** (`<AccordionGroup>`, 2–4 questions, placed before `## Related`). Every
    answer re-states a claim already established on its own page, phrased as users actually ask it.
    This is the largest GEO change: AI answer engines cite passages, so each answer is self-contained.
  - **Question-shaped headings: 26 → 58 pages.** Topic labels became the question the section answers.
    Headings that are anchor-link targets were left alone to avoid breaking 37 inbound references.
  - **`<Check>` callouts on 37 pages** confirming what success looks like (previously 0 uses), and
    **`<Tabs>` on 3 pages** for genuine either/or variants (e.g. Next.js App Router vs Pages Router).
  - **Callout types normalized** to a documented severity scale, capped at 2 per page. Notably
    `migrate.mdx`'s "re-running an import adds the data again (no de-duplication)" was promoted from a
    bundled `<Note>` to a standalone `<Warning>` — it is a silent double-counting trap, not an aside.
  - Fixed a leaked `{/* TODO */}` comment in `quickstart.mdx` by verifying the **Add website** button
    label against the product source, and normalized "snippet" → "the tracking script" on entry pages.
  - Fixed a broken anchor (`filters` → `sessions`) introduced by a heading rename.
    Note: `mint broken-links` does **not** validate URL fragments — anchors need a separate check.
- Phase 7 in-repo polish pass across all 95 pages: audited GEO/SEO frontmatter (every page has a title,
  a standalone benefit-bearing description, and an icon), verified heading hierarchy (one H1 per page),
  confirmed descriptive link text (no "click here" anchors), and a clean `mint broken-links` sweep.
  Removed the 44 internal `{/* TODO: screenshot */}` placeholder comments from all pages (they were
  invisible on the rendered site; real screenshots from a live instance remain to be added).
- Added a new **Resources** tab (Reference · How it works · Trust & privacy · AI groups) for Phase 6,
  after the API reference tab.
- Added a new **API reference** tab (Get started · Ingestion · Reading data · Access & tools groups)
  for Phase 6, after the Integrations tab.
- Added three **Guides** navigation groups for Phase 5 — **Product analytics**, **Monitor & automate**,
  and **Share & embed** — between the existing "Filter, save & share" and "Manage data" groups.
- Expanded the **Integrations** tab with the platform long tail and added a **Docs & static sites**
  navigation group (Hugo, Jekyll, Docusaurus, VitePress). Frameworks, CMS & website builders,
  E-commerce, and Server-side & tag managers groups all grew.
- Added a new **Integrations** tab with category groups (Overview, Frameworks, CMS & website builders,
  E-commerce, Server-side & tag managers), seeded with the first wave of platform guides.
- Added an **Accounts & access** group to the Guides tab (account settings, organizations, teams,
  roles, invitations).
- Added a **Manage data** group to the Guides tab (data dictionary + the four import guides) and the
  migration overview (`migrate`) to the Get started tab, per the PRD's information architecture.
- Regrouped the Guides tab navigation so the growing report set stays scannable: the single
  "Explore your data" group split into four — **Explore your data** (added `map` and `performance`),
  **Understand behavior** (journeys, retention, funnels, goals, cohorts), **Acquisition & AI**
  (AI traffic, Search Console, bots), and **Filter, save & share** (filters, segments, compare,
  annotations, export). Navigation-only change; no pages moved on disk.
- `PRD.md` bumped to v1.2 (execution underway): Phase 0 marked mostly done, Phase 1 done, Phase 2
  first wave done (with the second wave enumerated), and the brand-color open question resolved to
  indigo (`#345FCF` family).
- Rebranded `docs.json` from the Mintlify starter: name → `tinyanalytics`, indigo brand palette
  (`#345FCF` / `#537FEB` / `#2249B7`, converted from DESIGN.md's oklch tokens), tab + group
  navigation (Get started, Guides), primary CTA to `dash.tinyanalytics.io`, and `contextual.display`
  set to `header`. Removed the starter logo (the site name renders as the wordmark) and the
  placeholder footer socials.
- Replaced the starter `favicon.svg` with the tinyanalytics ascending-bars mark in brand indigo.
- Rewrote `AGENTS.md` with the product's terminology, hard content boundaries (hosted-only), style
  rules, sources of truth, and pointers to both project skills.
- `PRD.md` revised to v1.1 (**hosted-only**): tinyanalytics is closed-source and cloud-only, so
  the Self-hosting tab was removed (5 tabs now), the self-hoster persona became a privacy &
  compliance evaluator, goal 5 became "trust without source access", trust-level content
  (architecture/security/data handling) moved into Resources, Phase 3 re-scoped to
  Migration & data, and self-hosting/admin-console/operator internals were added to the
  out-of-scope guardrails.

### Added

- Two integration guides closing gaps from the Rybbit-docs analysis: `integrations/wix.mdx` (Wix Custom
  Code → Head, with Premium-plan gating noted) and `integrations/woocommerce.mdx` (WordPress header method
  plus a purchase-tracking section — a custom event with `revenue`/`currency` on the order-received page).
  Added to the CMS & website builders and E-commerce nav groups. Build validates with zero broken links.
- `autocapture.mdx` — **Autocapture** page (added to the "Track what matters" group), documenting
  every automatically-captured interaction (outbound link, file download, button click, copy, form
  submission, engagement), what each records, the form-shape-only privacy guarantee, and the
  `data-ta-prop-*` / `data-ta-event` element conventions. Closes the second gap from the Rybbit-docs
  analysis. Sourced from decision 0110 and `tracker/script/auto-capture.ts`. Build validates with zero
  broken links.
- `exclude-traffic.mdx` — **Exclude traffic** page (added to the "Install the tracker" group),
  covering ingest-time exclusions by IP (single/CIDR/range), country, path glob, hostname glob, and
  user-agent substring, plus the block-bots toggle and hiding your own traffic (localStorage opt-out or
  IP exclusion). Draws the exclusion-vs-filter distinction (dropped at collection vs. hidden in a report)
  and flags the user-agent substring semantics (no wildcards). Closes the highest-value gap from the
  Rybbit-docs gap analysis. Sourced from decisions 0054 and 0160. Build validates with zero broken links.
- Phase 6 (second wave) **Resources** tab (8 pages), the trust-and-mechanism content, each sourced from
  the product wiki: `resources/metrics-glossary.mdx` (exact metric definitions), `resources/cookieless-identity.mdx`
  (one-way `hash(ip+ua)`, the honest undercount/overcount limits, `identify()`), `resources/bot-detection.mdx`
  (the detection layers, named AI crawlers, the datacenter-IP corroboration guard), `resources/traffic-classification.mdx`
  (referrer + UTM → channel, paid-beats-organic, AI-before-search), `resources/data-handling.mdx` (what's
  stored vs. never stored — no cookies, no raw IP), `resources/privacy.mdx` (privacy properties stated as
  mechanism, not legal conclusions, with a not-legal-advice hedge), `resources/comparison.mdx` (honest
  closed-source-vs-open-source framing against GA4/Plausible/Umami), and `resources/use-with-ai.mdx` (the
  contextual AI menu + `/llms.txt`). The **Changelog** page is intentionally deferred — no verified product
  changelog exists to source, and inventing release history would break the no-fabrication rule. Build
  validates with zero broken links.
- Phase 6 (first wave) **API reference** tab (8 pages), authored from the API architecture docs, the
  decision records, and — for the wire contract — the tracker's actual Zod schema read at source:
  `api-reference/introduction.mdx` (base URL `https://dash.tinyanalytics.io`, the session-cookie vs.
  `Authorization: Bearer <key>` auth split, status codes), `api-reference/track.mdx` (`POST /api/track`,
  the `type`-discriminated event body with exact field caps, the key-gated `ipAddress`/`userAgent`
  overrides for server-side ingestion, `204` response), `api-reference/identify.mdx` (`POST /api/identify`,
  traits, `isNewIdentify`), `api-reference/read.mdx` (site-scoped GET reads, the shared `start_date`/
  `end_date`/`time_zone` window, the core endpoint shapes), `api-reference/sql.mdx`
  (`POST /api/sites/{id}/query`, `scoped_events`/`scoped_events_bot`, 10 s / 1,000-row caps),
  `api-reference/api-keys.mdx` (create/revoke, shown-once, owner-scoped), `api-reference/rate-limits.mdx`
  (per-key ingestion limit → `429`, the public-vs-trusted CORS split), and `api-reference/playground.mdx`.
  The ingestion rate-limit is documented without inventing a numeric default (it's instance-configured).
  Build validates with zero broken links.
- Phase 5 **Advanced product analytics & ops** documentation pages (13), each sourced from the product
  wiki's algorithm specs and decision records with citable specifics. **Product analytics** —
  `feature-flags.mdx` (boolean/multivariate/remote-config, rollout %, targeting rules, sticky
  deterministic assignment, `window.tinyanalytics.flag()`), `experiments.mdx` (flag + goal,
  session-grain post-exposure attribution, exposure vs. assignment measurement, the ≥30-sample /
  ≥95%-confidence z-test), `surveys.mdx` (question types, branching, targeting, NPS),
  `custom-dashboards.mdx` (SQL cards + visualization types + `{{bucket}}`),
  `sql-query-builder.mdx` (`scoped_events`/`scoped_events_bot`, read-only, 10 s / 1,000-row caps),
  `group-analytics.mdx` (`group()`, up to 5 group types, account-grain funnels/retention).
  **Monitor & automate** — `scheduled-reports.mdx` (daily/weekly/monthly completed-period digests),
  `alerts.mdx` (metric thresholds, absolute/relative, 12 h cooldown, email/Slack/Discord/webhook),
  `uptime-monitoring.mdx` (HTTP/TCP monitors, validation rules, incident open/resolve on the 2nd
  consecutive failure/success, P50/P90/P95/P99), `shortlinks.mdx` (`/l/<slug>` trackable redirects,
  clicks excluded from overview traffic). **Share & embed** — `public-dashboards.mdx` (read-only
  `/share` link; public sentinel vs. private link key), `embed-dashboard.mdx` (iframe embed with
  theme/hide-sidebar), `live-visitors-widget.mdx` (card/inline live count). White-label/hide-branding
  is deliberately left out pending plan-scope confirmation, and alerts are documented site-wide (the
  per-alert filter picker isn't shipped in the dialog yet). Build validates with zero broken links.
- Phase 4 (second wave) **Integrations** long-tail pages (19), batch-authored from the same template:
  frameworks — `integrations/vue.mdx`, `integrations/nuxt.mdx`, `integrations/astro.mdx`
  (with the `is:inline` requirement), `integrations/sveltekit.mdx`, `integrations/gatsby.mdx`
  (Gatsby's `<Script>` component), `integrations/remix.mdx`, `integrations/angular.mdx`; CMS &
  builders — `integrations/ghost.mdx`, `integrations/squarespace.mdx`, `integrations/framer.mdx`,
  `integrations/carrd.mdx`, `integrations/bubble.mdx` (plan-gating noted for Squarespace and Carrd);
  docs & static sites — `integrations/hugo.mdx`, `integrations/jekyll.mdx`,
  `integrations/docusaurus.mdx`, `integrations/vitepress.mdx`; e-commerce —
  `integrations/bigcommerce.mdx`; server-side — `integrations/laravel.mdx`, `integrations/drupal.mdx`.
  React Native and headless CMSs (Contentful, Sanity, Strapi) are intentionally omitted — tinyanalytics
  is a browser script with no mobile SDK, and headless CMSs render through a framework that already has
  a guide. Build validates with zero broken links.
- Phase 4 (first wave) **Integrations** pages, batch-authored from one consistent template: an
  `integrations/overview.mdx` (universal install method + platform picker) plus guides for the
  highest-traffic platforms — `integrations/nextjs.mdx` (App Router + Pages Router via `next/script`),
  `integrations/react.mdx`, `integrations/wordpress.mdx`, `integrations/webflow.mdx`,
  `integrations/shopify.mdx`, and `integrations/google-tag-manager.mdx`. Each keeps the tinyanalytics
  half (snippet, `data-site-id`, SPA-on-by-default) identical to the tracking-script docs and adds
  platform-specific placement. Build validates with zero broken links.
- Phase 3 (second wave) "Accounts & access" documentation pages, sourced from the wiki decision
  records (0071, 0072, 0073, 0074, 0075, 0083, 0087) and documenting the _current_ converged behavior
  where later decisions superseded earlier ones (multi-org switching, emailed invitations, teams as
  the sole site-access mechanism): `account-settings.mdx`, `organizations.mdx`,
  `teams.mdx`, `roles.mdx` (with a full owner/admin/member permission matrix), and
  `invitations.mdx`. Operator-only auth/email internals are not documented. Billing & plans
  remains deferred pending the open pricing/signup question. Build validates with zero broken links.
- Phase 3 (first wave) "Migration & data" documentation pages, sourced from the wiki (decisions 0153,
  0113; `algorithms/import-mappers.md`; `concepts/data-dictionary.md`; decision 0158): `migrate.mdx`
  (switch-from overview), `data-dictionary.mdx` (event/property/trait catalog with the
  "verified" label), and four import guides — `import-ga4.mdx` (live Google OAuth pull),
  `import-plausible.mdx`, `import-umami.mdx`, and `import-simple-analytics.mdx`
  (file uploads). Each states its source-specific data losses honestly. Operator-only GA4 setup
  (Google app verification, redirect URIs) is deliberately not documented; only the customer flow is.
  Build validates with zero broken links.
- Phase 2 (second wave) documentation pages completing "Explore your data", each sourced from the
  product wiki's decision records with citable specifics: `performance.mdx` (Core Web Vitals
  at p50/p75/p90/p99), `ai-traffic.mdx` (AI-assistant referrals), `bots.mdx` (bots &
  AI crawlers), `search-console.mdx` (Google Search Console), `map.mdx` (dashboard map
  & globe), `segments.mdx` (saved segments), `cohorts.mdx` (behavioral cohorts),
  `compare.mdx` (period comparison), `annotations.mdx` (chart annotations), and
  `export.mdx` (CSV & PDF export). Bot/AI-crawler and Search Console availability confirmed
  with the maintainer before writing. Build validates with zero broken links.
- Phase 2 (first wave) "Explore your data" documentation pages, sourced from the wiki's algorithm
  specs with exact metric definitions: `dashboard-overview.mdx`, `realtime.mdx`,
  `pages.mdx`, `sessions.mdx`, `users.mdx`, `events.mdx`,
  `journeys.mdx`, `retention.mdx`, `funnels.mdx`, `goals.mdx`, and
  `filters.mdx`. Added as an "Explore your data" group under the Guides tab. Feature-guide
  pages carry `{/* TODO: screenshot */}` markers pending captured assets. Build validates with zero
  broken links.
- Phase 1 "golden path" documentation pages, authored from the product wiki and written answer-first
  for SEO/GEO: `index.mdx` (Introduction), `quickstart.mdx`, `how-it-works.mdx`, and five Guides —
  `tracking-script.mdx`, `script-configuration.mdx`, `custom-events.mdx`,
  `identify-users.mdx`, and `verify-your-setup.mdx`. Build validates with zero broken
  links (`mint validate`, `mint broken-links`).
- `.agents/skills/mintlify/SKILL.md` — the official Mintlify authoring skill (MIT), copied in
  so in-repo AI tools get platform mechanics without network access.
- `.agents/skills/tinyanalytics-docs/SKILL.md` — the project skill: sources of truth
  (product wiki), hard content boundaries (hosted-only, no unshipped features), terminology,
  voice, page archetypes, and a pre-submit checklist.
- `PRD.md` — detailed product requirements for the AI-native (Mintlify) documentation:
  audience & positioning, voice/archetype, full information architecture (tabs → groups →
  pages), the shipped feature scope sourced from `../tinyanalytics/wiki`, content standards
  and page templates, the AI-native configuration plan (assistant, agent/automations,
  contextual menu, `llms.txt`/`skill.md`/MCP), phasing, out-of-scope guardrails, a
  source-to-page mapping, and competitor IA benchmarks (Plausible, Umami).
