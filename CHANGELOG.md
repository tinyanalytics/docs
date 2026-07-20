# Changelog

All notable changes to the tinyanalytics documentation site are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project adheres to semantic versioning where practical.

## [Unreleased]

### Fixed
- **Product-sync pass (2026-07-20):** audited the 15 product commits landed since the docs last
  captured product facts (`4ee8613` onward) and corrected six pages that had become **factually
  wrong**. These were verified against migrations, schema, and component source — not commit
  messages — after an audit surfaced a stale code comment asserting a column default that does not
  exist (`sites-validation.ts` claims `Etc/UTC`; migration 0035 adds a nullable column with no default).
  - `guides/scheduled-reports` — "Scheduling is in UTC" (3 places) → reports run on the site's
    **reporting timezone**, falling back to UTC only when none is set.
  - `guides/dashboard-overview` — date ranges "calculated in your browser's time zone" (2 places) →
    the site's reporting timezone when set, browser zone as fallback. Added the date picker's
    per-view **Time zone** override.
  - `guides/exclude-traffic` — the page asserted all exclusions "drop at collection, nothing is
    recorded". False for the new **Referrer Exclusions**, which keep the visit and reclassify it as
    Direct. Documented as a contrasted section rather than a sixth table row, so it cannot inherit
    the drop semantics of its neighbors.
  - `guides/pages` — "Click the row again to clear the filter" (2 places) → a row click now
    navigates to the main dashboard pre-filtered; there is no toggle-off on the Pages and Landing
    pages tables. Qualified the matching over-broad claim in `guides/filters`.
  - `guides/journeys` — steps "2 to 10, default 3" (3 places) → **2 to 6, default 4**.
  - `guides/bots` — "four cards" and bots detected "in two ways" → **eight cards** and **six
    detection layers**; noted that overlapping layers can sum above the total, and that period
    comparison is unavailable on this report.

### Added
- **New product surfaces documented (2026-07-20), from the same sync pass:**
  - **Per-site reporting timezone** (0182) — canonical section in `guides/site-settings` covering the
    two states (unset ⇒ browser zone for the dashboard and UTC for reports; set ⇒ canonical for the
    whole team), the historical re-bucketing warning, and that **alerts are unaffected** because
    their windows roll from the current moment. Cross-linked from dashboard-overview, scheduled-reports,
    retention, users, and alerts. *No standalone `guides/timezone` page:* one home to keep current
    beats five places to drift.
  - **Multi-host page identity / URL mode** (0181) — the **URLs** tab in `guides/pages`, the
    multi-host banner, `?pagesMode=url` persistence in shared links, host-aware Entries/Exits, and
    the fact that `www.` and apex are not merged. Added `Hostname`, `Entry Page`, and `Entry Hostname`
    to `guides/filters` with their session-scoped "entered on" semantics, and the three composite
    breakdown dimensions to `api-reference/read`.
  - **Referrer exclusions and self-referral handling** (0190–0192) — new sections in
    `guides/exclude-traffic` and `resources/traffic-classification`: root↔subdomain hops are Internal
    in both directions, sibling subdomains remain Referral (fix: add the root domain), excluded
    referrers become **Direct** not Internal, and UTM tags still win.
  - **Events page** (0193) — `guides/events` previously described only the dashboard's Events card.
    Added the trend chart's tabs, Top-N select (default **Top 5**), granularity select, and clickable
    legend, plus the event log: **Realtime now defaults ON** at a 5-second refresh, 100 rows per page,
    the paused-while-browsing-history banner, and that search matches only already-loaded rows.
  - **Users page** (0187) — sortable columns with their default, hover-to-absolute timestamps,
    profile Acquisition and Top pages cards (flagging that **Top pages is all-time, not the selected
    date range**), copyable user ID, and the activity calendar's 95th-percentile scale. Documented the
    `user_id` filter now matching a person across both identity columns.
  - Smaller additions: goal edit/clone/delete actions (`guides/goals`), the AI chart's zoom and
    suppressed annotations (`guides/ai-traffic`), the Journeys path-filter wildcards and journey cap,
    weekly cohorts starting Monday (`guides/retention`), and comparison's unavailability on the Bots
    report (`guides/compare`).
- **Codebase gap analysis (2026-07-19):** diffed the docs against the actual product surface (web
  route tree + `sdks/` + decisions 0140–0181) and closed four missing pages, all source-grounded:
  - **Error tracking** guide (`guides/errors`, "Explore your data") — the opt-in `data-track-errors`
    capture, the manual `trackError()` call, and the message-grouped report with stack-trace drill-down.
  - **Revenue analytics** guide (`guides/revenue`, "Product analytics") — the `revenue`/`currency`
    reserved props, the report metrics (total, AOV, paying sessions, orders), and reporting-currency
    conversion. Also documented Revenue as an alert metric in `guides/alerts` (previously stated as not
    wired — it shipped).
  - **Cross-site rollup** guide (`guides/rollup`, "Explore your data") — combined analytics across every
    site in the active organization, with per-site contribution.
  - **React Native** integration (`integrations/react-native`) in a new **Mobile apps** navigation group —
    the `@tinyanalytics/react-native` SDK, the mobile-app site type, screen/event/identify tracking, the
    React Navigation helper, and the install-id identity model.
  - **Site settings** hub (`guides/site-settings`, "Accounts & access") — the per-site Settings tabs, and
    the canonical home for moving a site between organizations and deleting a site.
- Expanded `guides/pages` with the alternate views (Titles / Entries / Exits / Hostnames) and a **Landing
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
  - Fixed a broken anchor (`guides/filters` → `guides/sessions`) introduced by a heading rename.
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
- `guides/autocapture.mdx` — **Autocapture** page (added to the "Track what matters" group), documenting
  every automatically-captured interaction (outbound link, file download, button click, copy, form
  submission, engagement), what each records, the form-shape-only privacy guarantee, and the
  `data-ta-prop-*` / `data-ta-event` element conventions. Closes the second gap from the Rybbit-docs
  analysis. Sourced from decision 0110 and `tracker/script/auto-capture.ts`. Build validates with zero
  broken links.
- `guides/exclude-traffic.mdx` — **Exclude traffic** page (added to the "Install the tracker" group),
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
