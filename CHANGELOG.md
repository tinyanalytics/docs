# Changelog

All notable changes to the tinyanalytics documentation site are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project adheres to semantic versioning where practical.

## [Unreleased]

### Changed
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
  `guides/feature-flags.mdx` (boolean/multivariate/remote-config, rollout %, targeting rules, sticky
  deterministic assignment, `window.tinyanalytics.flag()`), `guides/experiments.mdx` (flag + goal,
  session-grain post-exposure attribution, exposure vs. assignment measurement, the ≥30-sample /
  ≥95%-confidence z-test), `guides/surveys.mdx` (question types, branching, targeting, NPS),
  `guides/custom-dashboards.mdx` (SQL cards + visualization types + `{{bucket}}`),
  `guides/sql-query-builder.mdx` (`scoped_events`/`scoped_events_bot`, read-only, 10 s / 1,000-row caps),
  `guides/group-analytics.mdx` (`group()`, up to 5 group types, account-grain funnels/retention).
  **Monitor & automate** — `guides/scheduled-reports.mdx` (daily/weekly/monthly completed-period digests),
  `guides/alerts.mdx` (metric thresholds, absolute/relative, 12 h cooldown, email/Slack/Discord/webhook),
  `guides/uptime-monitoring.mdx` (HTTP/TCP monitors, validation rules, incident open/resolve on the 2nd
  consecutive failure/success, P50/P90/P95/P99), `guides/shortlinks.mdx` (`/l/<slug>` trackable redirects,
  clicks excluded from overview traffic). **Share & embed** — `guides/public-dashboards.mdx` (read-only
  `/share` link; public sentinel vs. private link key), `guides/embed-dashboard.mdx` (iframe embed with
  theme/hide-sidebar), `guides/live-visitors-widget.mdx` (card/inline live count). White-label/hide-branding
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
  records (0071, 0072, 0073, 0074, 0075, 0083, 0087) and documenting the *current* converged behavior
  where later decisions superseded earlier ones (multi-org switching, emailed invitations, teams as
  the sole site-access mechanism): `guides/account-settings.mdx`, `guides/organizations.mdx`,
  `guides/teams.mdx`, `guides/roles.mdx` (with a full owner/admin/member permission matrix), and
  `guides/invitations.mdx`. Operator-only auth/email internals are not documented. Billing & plans
  remains deferred pending the open pricing/signup question. Build validates with zero broken links.
- Phase 3 (first wave) "Migration & data" documentation pages, sourced from the wiki (decisions 0153,
  0113; `algorithms/import-mappers.md`; `concepts/data-dictionary.md`; decision 0158): `migrate.mdx`
  (switch-from overview), `guides/data-dictionary.mdx` (event/property/trait catalog with the
  "verified" label), and four import guides — `guides/import-ga4.mdx` (live Google OAuth pull),
  `guides/import-plausible.mdx`, `guides/import-umami.mdx`, and `guides/import-simple-analytics.mdx`
  (file uploads). Each states its source-specific data losses honestly. Operator-only GA4 setup
  (Google app verification, redirect URIs) is deliberately not documented; only the customer flow is.
  Build validates with zero broken links.
- Phase 2 (second wave) documentation pages completing "Explore your data", each sourced from the
  product wiki's decision records with citable specifics: `guides/performance.mdx` (Core Web Vitals
  at p50/p75/p90/p99), `guides/ai-traffic.mdx` (AI-assistant referrals), `guides/bots.mdx` (bots &
  AI crawlers), `guides/search-console.mdx` (Google Search Console), `guides/map.mdx` (dashboard map
  & globe), `guides/segments.mdx` (saved segments), `guides/cohorts.mdx` (behavioral cohorts),
  `guides/compare.mdx` (period comparison), `guides/annotations.mdx` (chart annotations), and
  `guides/export.mdx` (CSV & PDF export). Bot/AI-crawler and Search Console availability confirmed
  with the maintainer before writing. Build validates with zero broken links.
- Phase 2 (first wave) "Explore your data" documentation pages, sourced from the wiki's algorithm
  specs with exact metric definitions: `guides/dashboard-overview.mdx`, `guides/realtime.mdx`,
  `guides/pages.mdx`, `guides/sessions.mdx`, `guides/users.mdx`, `guides/events.mdx`,
  `guides/journeys.mdx`, `guides/retention.mdx`, `guides/funnels.mdx`, `guides/goals.mdx`, and
  `guides/filters.mdx`. Added as an "Explore your data" group under the Guides tab. Feature-guide
  pages carry `{/* TODO: screenshot */}` markers pending captured assets. Build validates with zero
  broken links.
- Phase 1 "golden path" documentation pages, authored from the product wiki and written answer-first
  for SEO/GEO: `index.mdx` (Introduction), `quickstart.mdx`, `how-it-works.mdx`, and five Guides —
  `guides/tracking-script.mdx`, `guides/script-configuration.mdx`, `guides/custom-events.mdx`,
  `guides/identify-users.mdx`, and `guides/verify-your-setup.mdx`. Build validates with zero broken
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
