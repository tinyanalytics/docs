# TinyAnalytics documentation SEO migration plan

**Status:** Repository migration complete — production launch pending  
**Prepared:** 2026-07-30  
**Executed:** 2026-07-30  
**Scope:** 112 authored Mintlify pages, navigation, metadata, redirects, crawlability, and launch monitoring
**Excluded:** 149 generated OpenAPI operations, which intentionally remain `noindex`

The repository migration uses the approved decisions: `https://tinyanalytics.io/docs`, one atomic pre-index rename, the approved Title Case H1 pattern with **TinyAnalytics** brand casing, and concise sidebar labels. Mintlify `/docs` activation, the main-site rewrite or proxy, Search Console verification, sitemap submission, and eight-week monitoring remain owner actions.

## 1. Goal

Make every public documentation page understandable from its URL and H1, align each page with one clear search intent, and launch the changes without losing existing links or future ranking signals.

Examples that define the target:

| Current route     | Proposed route              | Proposed H1 / page title             |
| ----------------- | --------------------------- | ------------------------------------ |
| `/stripe-revenue` | `/stripe-revenue-analytics` | Stripe Revenue Analytics Integration |
| `/how-it-works`   | `/how-tinyanalytics-works`  | How TinyAnalytics Works              |
| `/realtime`       | `/realtime-analytics`       | Realtime Analytics                   |

This is an SEO migration, not a blind keyword-appending exercise. A route changes only when the new route names the subject more clearly. Titles stay concise and unique, and keyword repetition is avoided.

## 2. Current-state findings

### P0: the current preview cannot be indexed

The live preview at `https://tinyanalytics.mintlify.site/doc` currently publishes:

- `/doc/robots.txt`: `Disallow: /` and `Content-Signal: ... search=no ...`
- `/doc/sitemap.xml`: an empty `<urlset>`
- `/doc/llms.txt`: `404`
- `/doc/llms-full.txt`: `200`
- Representative authored pages render `<meta name="robots" content="noindex, nofollow">`.
- Their canonical URLs point to `tinyanalytics.mintlify.app`, not the `.site` URL supplied for review.

The repository already sets `seo.indexing` to `navigable`, so the deployed crawl block is likely a preview-host or deployment-state behavior rather than an authored-page setting. Resolve the production host before asking Google to index anything.

**Approved production base URL:** `https://tinyanalytics.io/docs`. This changes canonical URLs, sitemap URLs, redirect testing, and Search Console setup from the preview's `/doc` path.

### On-page inventory

- 108 authored MDX pages are navigable and intended for indexing.
- All 108 have `title` and `description` frontmatter.
- 65 of 108 descriptions exceed 160 characters and should be compressed to roughly 120–155 characters without losing the page's answer-first promise.
- Many report pages use generic one-word titles and routes such as `Realtime`, `Pages`, `Users`, and `Funnels`. These are understandable inside the dashboard but weak outside that context.
- Integration descriptions are strong, but their routes omit the high-intent platform + analytics phrase.
- Mintlify uses frontmatter `title` for both the visible H1 and browser title, then appends the site name. Long SEO titles therefore need a separate short `sidebarTitle` for navigation.
- The generated OpenAPI reference contains 148 operations across 29 tags. Every generated operation has `x-mint.metadata.noindex: true`; preserve that behavior to avoid thin/duplicative API pages competing with the authored API guides.

### Live crawl baseline

A 120-URL live crawl scored **93/A**, but the aggregate score hides the most important deployment and editorial problems:

- 119 crawled URLs expose restrictive `noindex, nofollow` directives.
- Root-level `robots.txt` and `sitemap.xml` discovery failed on all 120 URLs.
- 116 pages combine `noindex` with a canonical URL on the other Mintlify hostname.
- 31 rendered titles are shorter than the audit's 30-character usefulness threshold.
- 80 rendered descriptions exceed 160 characters; the local authored-only inventory accounts for 65 of them.
- 91 descriptions are likely to truncate by rendered pixel width.
- 29 pages trigger similar-content warnings, primarily because integration guides share a template. Keep the shared procedure, but add genuinely platform-specific setup context, verification notes, and troubleshooting where facts support it.
- A repeated broken-link warning appears site-wide alongside the missing `/llms.txt` endpoint. Verify the contextual AI/documentation link after the final host and base path are configured.

The crawl also reports platform-level performance, security-header, schema, image-dimension, and generated-navigation findings. Track those separately after the custom domain is live; do not mix Mintlify-hosted template limitations into the authored slug/H1 migration.

## 3. Editorial rules for execution

1. Assign one primary intent to every page. Avoid two pages targeting the same query unless one is a clear parent and the other a narrower child.
2. Use readable, lowercase, hyphenated routes. Keep them descriptive but no longer than necessary.
3. Use the proposed H1 as frontmatter `title`. Add `sidebarTitle` wherever the SEO title is longer than the current navigation label.
4. Keep **TinyAnalytics** in its branded capital-T/capital-A form, including in title case.
5. Keep the authored H1 generally under 50–55 characters so Mintlify's appended ` - TinyAnalytics` does not create an unnecessarily long browser title.
6. Rewrite descriptions to 120–155 characters where practical. Lead with the outcome, include the natural query phrase once, and do not repeat the title verbatim.
7. Do not add meta-keyword stuffing. Mintlify `keywords` may help internal search, but Google does not need a page-level keyword list.
8. Open each page with a self-contained definition or outcome using the same language as the H1.
9. Add question-shaped H2s only when they reflect a real user question. Do not convert every heading mechanically.
10. Preserve short sidebar labels through `sidebarTitle`; SEO copy must not make navigation noisy.

## 4. Complete authored-page URL and H1 map

Routes below are repository-relative. The current preview adds `/doc`; a custom root domain would not.

### Start here

| Current route   | Proposed route                             | Proposed H1 / page title                   | Sidebar title |
| --------------- | ------------------------------------------ | ------------------------------------------ | ------------- |
| `/`             | `/`                                        | Privacy-Friendly Web and Product Analytics | Introduction  |
| `/quickstart`   | `/tinyanalytics-quickstart`                | Install TinyAnalytics in 5 Minutes         | Quickstart    |
| `/how-it-works` | `/how-tinyanalytics-works`                 | How TinyAnalytics Works                    | How it works  |
| `/migrate`      | `/migrate-analytics-data-to-tinyanalytics` | Migrate Analytics Data to TinyAnalytics    | Migrate       |

### Set up tracking

| Current route           | Proposed route                             | Proposed H1 / page title                    | Sidebar title        |
| ----------------------- | ------------------------------------------ | ------------------------------------------- | -------------------- |
| `/tracking-script`      | `/install-tinyanalytics-tracking-script`   | Install the TinyAnalytics Tracking Script   | Tracking script      |
| `/script-configuration` | `/configure-tinyanalytics-tracking-script` | Configure the TinyAnalytics Tracking Script | Script configuration |
| `/exclude-traffic`      | `/exclude-traffic-from-analytics`          | Exclude Internal and Unwanted Traffic       | Exclude traffic      |
| `/verify-your-setup`    | `/verify-tinyanalytics-installation`       | Verify Your TinyAnalytics Installation      | Verify your setup    |

### Collect data

| Current route     | Proposed route                   | Proposed H1 / page title                   | Sidebar title  |
| ----------------- | -------------------------------- | ------------------------------------------ | -------------- |
| `/autocapture`    | `/autocapture-analytics-events`  | Autocapture Analytics Events               | Autocapture    |
| `/custom-events`  | `/custom-event-tracking`         | Custom Event Tracking                      | Custom events  |
| `/identify-users` | `/user-identification-analytics` | Identify Users Across Sessions and Devices | Identify users |

### Web analytics — traffic and audience

| Current route            | Proposed route                     | Proposed H1 / page title            | Sidebar title         |
| ------------------------ | ---------------------------------- | ----------------------------------- | --------------------- |
| `/dashboard-overview`    | `/web-analytics-dashboard`         | Web Analytics Dashboard             | Dashboard overview    |
| `/realtime`              | `/realtime-analytics`              | Realtime Analytics                  | Realtime              |
| `/pages`                 | `/page-analytics`                  | Page Analytics                      | Pages                 |
| `/sessions`              | `/session-analytics`               | Session Analytics                   | Sessions              |
| `/users`                 | `/user-analytics`                  | User Analytics                      | Users                 |
| `/events`                | `/event-analytics`                 | Event Analytics                     | Events                |
| `/map`                   | `/geographic-analytics`            | Geographic Analytics: Map and Globe | Map and globe         |
| `/organization-overview` | `/organization-analytics-overview` | Organization Analytics Overview     | Organization overview |

### Web analytics — behavior and conversion

| Current route | Proposed route                | Proposed H1 / page title   | Sidebar title |
| ------------- | ----------------------------- | -------------------------- | ------------- |
| `/journeys`   | `/user-journey-analytics`     | User Journey Analytics     | Journeys      |
| `/funnels`    | `/funnel-analytics`           | Funnel Analytics           | Funnels       |
| `/goals`      | `/conversion-goal-tracking`   | Conversion Goal Tracking   | Goals         |
| `/retention`  | `/user-retention-analytics`   | User Retention Analytics   | Retention     |
| `/cohorts`    | `/behavioral-cohort-analysis` | Behavioral Cohort Analysis | Cohorts       |

### Web analytics — acquisition and quality

| Current route       | Proposed route                     | Proposed H1 / page title        | Sidebar title        |
| ------------------- | ---------------------------------- | ------------------------------- | -------------------- |
| `/user-acquisition` | `/user-acquisition-analytics`      | User Acquisition Analytics      | User acquisition     |
| `/ai-traffic`       | `/ai-referral-traffic-analytics`   | AI Referral Traffic Analytics   | AI traffic           |
| `/search-console`   | `/google-search-console-analytics` | Google Search Console Analytics | Search Console       |
| `/bots`             | `/bot-ai-crawler-analytics`        | Bot and AI Crawler Analytics    | Bots and AI crawlers |
| `/performance`      | `/core-web-vitals-analytics`       | Core Web Vitals Analytics       | Performance          |
| `/errors`           | `/javascript-error-tracking`       | JavaScript Error Tracking       | Error tracking       |

### Web analytics — reporting tools

| Current route  | Proposed route                 | Proposed H1 / page title    | Sidebar title   |
| -------------- | ------------------------------ | --------------------------- | --------------- |
| `/filters`     | `/analytics-filters`           | Analytics Filters           | Filters         |
| `/segments`    | `/saved-analytics-segments`    | Saved Analytics Segments    | Saved segments  |
| `/compare`     | `/analytics-period-comparison` | Analytics Period Comparison | Compare periods |
| `/annotations` | `/analytics-annotations`       | Analytics Annotations       | Annotations     |
| `/export`      | `/export-analytics-data`       | Export Analytics Data       | Export data     |

### Product analytics

| Current route        | Proposed route                 | Proposed H1 / page title             | Sidebar title     |
| -------------------- | ------------------------------ | ------------------------------------ | ----------------- |
| `/ask-ai`            | `/ai-analytics-assistant`      | AI Analytics Assistant               | Ask AI            |
| `/revenue`           | `/revenue-analytics`           | Revenue Analytics                    | Revenue analytics |
| `/stripe-revenue`    | `/stripe-revenue-analytics`    | Stripe Revenue Analytics Integration | Stripe revenue    |
| `/feature-flags`     | `/feature-flag-analytics`      | Feature Flag Analytics               | Feature flags     |
| `/experiments`       | `/ab-testing-analytics`        | A/B Testing Analytics                | Experiments       |
| `/surveys`           | `/product-feedback-surveys`    | Product Feedback and NPS Surveys     | Surveys           |
| `/custom-dashboards` | `/custom-analytics-dashboards` | Custom Analytics Dashboards          | Custom dashboards |
| `/sql-query-builder` | `/sql-analytics-query-builder` | SQL Analytics Query Builder          | SQL query builder |
| `/group-analytics`   | `/b2b-account-analytics`       | B2B and Account Analytics            | Group analytics   |

### Monitoring and automation

| Current route        | Proposed route                   | Proposed H1 / page title          | Sidebar title     |
| -------------------- | -------------------------------- | --------------------------------- | ----------------- |
| `/scheduled-reports` | `/scheduled-analytics-reports`   | Scheduled Analytics Reports       | Scheduled reports |
| `/alerts`            | `/analytics-alerts`              | Analytics Alerts                  | Alerts            |
| `/workflows`         | `/analytics-workflows`           | Event-Triggered Analytics Workflows | Workflows        |
| `/notification-destinations` | `/notification-destinations` | Notification Destinations for Alerts and Workflows | Notification destinations |
| `/uptime-monitoring` | `/website-api-uptime-monitoring` | Website and API Uptime Monitoring | Uptime monitoring |
| `/shortlinks`        | `/trackable-short-links`         | Trackable Short Links             | Shortlinks        |

### Sharing and embeds

| Current route           | Proposed route                 | Proposed H1 / page title     | Sidebar title        |
| ----------------------- | ------------------------------ | ---------------------------- | -------------------- |
| `/public-dashboards`    | `/public-analytics-dashboards` | Public Analytics Dashboards  | Public dashboards    |
| `/embed-dashboard`      | `/embed-analytics-dashboard`   | Embed an Analytics Dashboard | Embed dashboard      |
| `/live-visitors-widget` | `/live-visitor-count-widget`   | Live Visitor Count Widget    | Live-visitors widget |

### Data and imports

| Current route              | Proposed route                     | Proposed H1 / page title        | Sidebar title                |
| -------------------------- | ---------------------------------- | ------------------------------- | ---------------------------- |
| `/data-dictionary`         | `/analytics-data-dictionary`       | Analytics Data Dictionary       | Data dictionary              |
| `/import-ga4`              | `/import-google-analytics-4-data`  | Import Google Analytics 4 Data  | Import from GA4              |
| `/import-plausible`        | `/import-plausible-analytics-data` | Import Plausible Analytics Data | Import from Plausible        |
| `/import-umami`            | `/import-umami-analytics-data`     | Import Umami Analytics Data     | Import from Umami            |
| `/import-simple-analytics` | `/import-simple-analytics-data`    | Import Simple Analytics Data    | Import from Simple Analytics |

### Account and access

| Current route       | Proposed route                     | Proposed H1 / page title                 | Sidebar title         |
| ------------------- | ---------------------------------- | ---------------------------------------- | --------------------- |
| `/account-settings` | `/tinyanalytics-account-settings`  | TinyAnalytics Account Settings           | Account settings      |
| `/site-settings`    | `/analytics-site-settings`         | Analytics Site Settings                  | Site settings         |
| `/organizations`    | `/analytics-organizations-members` | Organizations and Members                | Organizations         |
| `/teams`            | `/team-site-access`                | Team-Based Site Access                   | Teams                 |
| `/roles`            | `/analytics-roles-permissions`     | Analytics Roles and Permissions          | Roles and permissions |
| `/invitations`      | `/invite-organization-members`     | Invite Organization Members              | Invitations           |
| `/billing-plans`    | `/tinyanalytics-pricing-plans`     | TinyAnalytics Pricing, Plans, and Limits | Billing and plans     |

### Integrations — overview and frameworks

| Current route             | Proposed route                            | Proposed H1 / page title             | Sidebar title |
| ------------------------- | ----------------------------------------- | ------------------------------------ | ------------- |
| `/integrations/overview`  | `/integrations/install-website-analytics` | Install TinyAnalytics on Any Website | Overview      |
| `/integrations/nextjs`    | `/integrations/nextjs-analytics`          | Next.js Analytics Integration        | Next.js       |
| `/integrations/react`     | `/integrations/react-analytics`           | React Analytics Integration          | React         |
| `/integrations/vue`       | `/integrations/vue-analytics`             | Vue Analytics Integration            | Vue           |
| `/integrations/nuxt`      | `/integrations/nuxt-analytics`            | Nuxt Analytics Integration           | Nuxt          |
| `/integrations/astro`     | `/integrations/astro-analytics`           | Astro Analytics Integration          | Astro         |
| `/integrations/sveltekit` | `/integrations/sveltekit-analytics`       | SvelteKit Analytics Integration      | SvelteKit     |
| `/integrations/gatsby`    | `/integrations/gatsby-analytics`          | Gatsby Analytics Integration         | Gatsby        |
| `/integrations/remix`     | `/integrations/remix-analytics`           | Remix Analytics Integration          | Remix         |
| `/integrations/angular`   | `/integrations/angular-analytics`         | Angular Analytics Integration        | Angular       |

### Integrations — CMS and website builders

| Current route               | Proposed route                        | Proposed H1 / page title          | Sidebar title |
| --------------------------- | ------------------------------------- | --------------------------------- | ------------- |
| `/integrations/wordpress`   | `/integrations/wordpress-analytics`   | WordPress Analytics Integration   | WordPress     |
| `/integrations/webflow`     | `/integrations/webflow-analytics`     | Webflow Analytics Integration     | Webflow       |
| `/integrations/wix`         | `/integrations/wix-analytics`         | Wix Analytics Integration         | Wix           |
| `/integrations/ghost`       | `/integrations/ghost-analytics`       | Ghost Analytics Integration       | Ghost         |
| `/integrations/squarespace` | `/integrations/squarespace-analytics` | Squarespace Analytics Integration | Squarespace   |
| `/integrations/framer`      | `/integrations/framer-analytics`      | Framer Analytics Integration      | Framer        |
| `/integrations/carrd`       | `/integrations/carrd-analytics`       | Carrd Analytics Integration       | Carrd         |
| `/integrations/bubble`      | `/integrations/bubble-analytics`      | Bubble Analytics Integration      | Bubble        |

### Integrations — docs, commerce, server-side, and mobile

| Current route                      | Proposed route                               | Proposed H1 / page title                 | Sidebar title      |
| ---------------------------------- | -------------------------------------------- | ---------------------------------------- | ------------------ |
| `/integrations/hugo`               | `/integrations/hugo-analytics`               | Hugo Analytics Integration               | Hugo               |
| `/integrations/jekyll`             | `/integrations/jekyll-analytics`             | Jekyll Analytics Integration             | Jekyll             |
| `/integrations/docusaurus`         | `/integrations/docusaurus-analytics`         | Docusaurus Analytics Integration         | Docusaurus         |
| `/integrations/vitepress`          | `/integrations/vitepress-analytics`          | VitePress Analytics Integration          | VitePress          |
| `/integrations/shopify`            | `/integrations/shopify-analytics`            | Shopify Analytics Integration            | Shopify            |
| `/integrations/woocommerce`        | `/integrations/woocommerce-analytics`        | WooCommerce Analytics Integration        | WooCommerce        |
| `/integrations/bigcommerce`        | `/integrations/bigcommerce-analytics`        | BigCommerce Analytics Integration        | BigCommerce        |
| `/integrations/google-tag-manager` | `/integrations/google-tag-manager-analytics` | Google Tag Manager Analytics Integration | Google Tag Manager |
| `/integrations/laravel`            | `/integrations/laravel-analytics`            | Laravel Analytics Integration            | Laravel            |
| `/integrations/drupal`             | `/integrations/drupal-analytics`             | Drupal Analytics Integration             | Drupal             |
| `/integrations/react-native`       | `/integrations/react-native-analytics`       | React Native Analytics Integration       | React Native       |

### Authored API guides

| Current route                 | Proposed route                      | Proposed H1 / page title     | Sidebar title        |
| ----------------------------- | ----------------------------------- | ---------------------------- | -------------------- |
| `/api-reference/introduction` | `/api-reference/tinyanalytics-api`  | TinyAnalytics API Reference  | Introduction         |
| `/api-reference/track`        | `/api-reference/track-events-api`   | Track Events API             | Tracking API         |
| `/api-reference/identify`     | `/api-reference/identify-users-api` | Identify Users API           | Identify API         |
| `/api-reference/read`         | `/api-reference/analytics-read-api` | Analytics Read API           | Read API             |
| `/api-reference/sql`          | `/api-reference/sql-analytics-api`  | SQL Analytics API            | Scoped SQL           |
| `/api-reference/api-keys`     | `/api-reference/api-authentication` | API Authentication Keys      | API keys             |
| `/api-reference/mcp-server`   | `/api-reference/mcp-server`         | Connect an AI Agent with the MCP Server | MCP server       |
| `/api-reference/rate-limits`  | `/api-reference/rate-limits-cors`   | API Rate Limits and CORS     | Rate limits and CORS |
| `/api-reference/playground`   | `/api-reference/api-playground`     | TinyAnalytics API Playground | API playground       |

### Resources

| Current route                       | Proposed route                                                 | Proposed H1 / page title                                | Sidebar title          |
| ----------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ---------------------- |
| `/resources/metrics-glossary`       | `/resources/analytics-metrics-glossary`                        | Analytics Metrics Glossary                              | Metric definitions     |
| `/resources/cookieless-identity`    | `/resources/cookieless-analytics-identity`                     | How Cookieless Analytics Identifies Visitors            | Cookieless identity    |
| `/resources/bot-detection`          | `/resources/analytics-bot-detection`                           | How Analytics Bot Detection Works                       | Bot detection          |
| `/resources/traffic-classification` | `/resources/analytics-channel-attribution`                     | Analytics Channels and Attribution                      | Traffic classification |
| `/resources/data-handling`          | `/resources/analytics-data-handling`                           | How TinyAnalytics Handles Analytics Data                | Data handling          |
| `/resources/privacy`                | `/resources/privacy-friendly-analytics-gdpr`                   | Privacy-Friendly Analytics and GDPR                     | Privacy and GDPR       |
| `/resources/comparison`             | `/resources/tinyanalytics-vs-google-analytics-plausible-umami` | TinyAnalytics vs Google Analytics, Plausible, and Umami | Comparison             |
| `/resources/use-with-ai`            | `/resources/tinyanalytics-docs-ai-tools`                       | Use TinyAnalytics Documentation with AI Tools           | Use docs with AI       |
| `/resources/tinyanalytics-agent-skills` | `/resources/tinyanalytics-agent-skills`                    | TinyAnalytics Agent Skills for AI Coding Agents          | Agent skills           |

## 5. Redirect and migration strategy

Every changed route gets a one-to-one permanent redirect in `docs.json`. Mintlify redirects are permanent by default (308). No old feature URL should redirect to the homepage or to an unrelated report.

Execution rules:

1. Build the final old → new route map from the approved table above.
2. Rename files with `mint rename` where possible so references are updated consistently.
3. Add explicit one-to-one `docs.json` redirects for every changed route, including the existing legacy `/guides/:slug*` paths where they resolve to a renamed page.
4. Update every navigation entry, card, Related block, inline link, prompt, and product deep link to the new route.
5. Update canonical URLs to the final production domain and verify each rendered page self-canonicalizes to its new URL.
6. Keep redirects for at least one year; retaining them indefinitely is preferable for documentation links in old emails, issues, and AI answers.
7. Keep the 149 generated endpoint pages `noindex` and outside the authored redirect migration unless an OpenAPI operation path itself changes.

## 6. Content enrichment during the same execution

Changing only the URL and H1 is insufficient. Each renamed page should receive a focused on-page pass:

- Rewrite the first paragraph so it defines the query in one or two sentences.
- Compress the 65 descriptions over 160 characters to approximately 120–155 characters.
- Ensure the primary phrase appears naturally in the H1, opening paragraph, and at least one useful subheading—not repeatedly in every heading.
- Add short, factual FAQ sections only where search intent supports them, such as realtime analytics, Stripe revenue, cookieless analytics, imports, and framework integrations.
- Strengthen topic clusters with descriptive internal links:
  - tracking script → configuration → verification → integrations
  - dashboard → pages → sessions → users → realtime
  - revenue → Stripe revenue → goals → funnels
  - privacy → cookieless identity → data handling → bot detection
  - API introduction → authentication → tracking → identify → reads → SQL
- Preserve answer-first writing, exact product behavior, and honest limitations.

## 7. Execution phases

### Phase 0 — configure the approved production URL

- Use `https://tinyanalytics.io/docs`, approved by the owner on 2026-07-30.
- Enable **Host at `/docs`** for `tinyanalytics.io` in the Mintlify dashboard.
- Configure the main website to rewrite or proxy `/docs` and `/docs/*` to the Mintlify project's matching `mintlify.dev` paths.
- Keep `https://tinyanalytics.io/docs` as the canonical base URL in `docs.json`.
- Confirm that the production `robots.txt` allows search crawling and that the production sitemap is populated.
- Add and verify the `https://tinyanalytics.io/docs` URL-prefix property in Google Search Console.

**Stop condition:** do not submit a sitemap or enable indexing while the preview still publishes `Disallow: /` and an empty sitemap.

### Phase 1 — approve the page map and copy pattern

- Review every row in §4.
- Confirm Title Case for H1s while keeping **TinyAnalytics** in its branded capital-T/capital-A form.
- Confirm that concise `sidebarTitle` labels should remain.
- Mark any route that should stay unchanged for product or support reasons.
- Freeze the map before file renames begin.

### Phase 2 — perform an atomic pre-index migration

- Rename the approved MDX files.
- Update frontmatter `title`, `sidebarTitle`, and `description`.
- Update `docs.json` navigation and add all one-to-one redirects.
- Update internal links and product deep links.
- Regenerate OpenAPI only if the source registry changed; preserve operation-level `noindex`.

Because the current preview is blocked from indexing, the safest path is to complete all approved route changes before the production crawl is opened. Avoid several waves of URL changes if a single pre-index migration is possible.

### Phase 3 — validate before launch

Run:

```bash
mint validate
mint broken-links
mint a11y
bun run scripts/audit-components.mjs
```

Add migration-specific checks:

- Compare the 108 authored MDX files with the 108 approved mapping rows.
- Confirm every changed old route has exactly one permanent redirect.
- Confirm redirect destinations return 200 and produce no chains or loops.
- Confirm all new pages have one rendered H1, a unique browser title, and a unique description.
- Confirm canonical tags use the production host and new path.
- Confirm the sitemap contains every intended authored page and excludes generated `noindex` operations.
- Confirm `robots.txt` permits Googlebot and does not advertise `search=no` for the production site.
- Confirm `/llms.txt` and `/llms-full.txt` both resolve on the production domain.
- Run the full live SEO crawl again and compare it with the pre-change baseline.
- Render priority pages on mobile, tablet, and desktop.

### Phase 4 — launch and monitor

- Deploy the renames, metadata, internal links, redirects, canonical domain, and crawl rules together.
- Submit the new sitemap in Google Search Console once.
- Inspect the three example URLs and the highest-intent integration/report pages with URL Inspection.
- Monitor Coverage/Pages, Crawl Stats, redirect errors, title rewrites, impressions, clicks, CTR, and position weekly for eight weeks.
- Expect temporary ranking fluctuation after URL changes; do not revert solely because the first crawl moves slowly.
- Keep an SEO regression check in the docs release process: duplicate titles, generic H1s, description length, missing redirects, empty sitemap, robots blocks, and orphan pages.

## 8. Acceptance criteria

- [x] Canonical production host and base path approved.
- [ ] Production `robots.txt` allows search crawling.
- [ ] Production sitemap lists all intended authored pages.
- [ ] All 108 authored pages appear exactly once in the approved mapping.
- [ ] Every changed route has a one-to-one permanent redirect.
- [ ] No redirect chains, loops, soft 404s, or homepage catch-all redirects.
- [ ] Every authored page has a unique, descriptive H1/title and concise `sidebarTitle` where needed.
- [ ] Every authored page has a unique, intent-aligned description; no description exceeds the approved limit without a deliberate reason.
- [ ] Internal links and navigation point directly to new routes.
- [ ] Canonical tags point to the final domain and new route.
- [ ] Generated OpenAPI operations remain `noindex`.
- [ ] `mint validate`, `mint broken-links`, `mint a11y`, component audit, anchor audit, and live SEO crawl pass.
- [ ] Google Search Console property, sitemap submission, and eight-week monitoring owner are assigned.

## 9. Execution decisions and remaining ownership

1. **Canonical base URL:** `https://tinyanalytics.io/docs` is recorded in `docs.json`; the owner still needs to enable **Host at `/docs`** in Mintlify and configure the main-site rewrite or proxy.
2. **Migration timing:** the repository uses one atomic pre-index migration.
3. **H1 style:** the approved Title Case pattern is applied while preserving **TinyAnalytics** brand casing.
4. **Mapping edits:** all 108 rows in §4 are applied without changes.
5. **Search Console owner:** still unassigned. The owner must verify the domain, submit the sitemap after the production crawl opens, and monitor the migration for eight weeks.

## 10. Sources used for this plan

- [Google Search Central: URL structure best practices](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [Google Search Central: influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Search Central: snippets and meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Google Search Central: site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Mintlify: documentation SEO](https://www.mintlify.com/docs/optimize/seo)
- [Mintlify: redirects](https://www.mintlify.com/docs/create/redirects)
- [Mintlify: custom domains and canonical URLs](https://www.mintlify.com/docs/customize/custom-domain)
- [Mintlify: host documentation at `/docs`](https://www.mintlify.com/docs/deploy/docs-subpath)
- [Mintlify: page metadata](https://mintlify.com/docs/pages)
- Live TinyAnalytics preview: rendered metadata, crawl policy, sitemap, and AI index endpoints.
- Local documentation inventory: all 108 authored MDX pages, `docs.json`, and the generated OpenAPI configuration.
