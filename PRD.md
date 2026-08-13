# PRD — TinyAnalytics documentation (AI-native, Mintlify)

**Status:** Draft v1.6 (execution underway) · **Owner:** Docs · **Last updated:** 2026-08-12
**Repo:** `tinyanalytics-docs` (Mintlify) · **Product repo:** `../tinyanalytics`
**Reference (behavioral spec only):** `../rybbit/rybbit/docs` · **Competitor refs:** Plausible, Umami

---

## 1. Summary

Build the public documentation for **TinyAnalytics** — privacy-friendly, cookieless web **and** product analytics, offered as a hosted service at `dash.tinyanalytics.io` — as an **AI-native** Mintlify site. The product is **closed-source and hosted-only today**: these docs document the cloud product, and self-hosting is explicitly out of scope (§9). "AI-native" here means the docs are engineered so that both humans _and_ AI tools (the in-docs assistant, the writing agent, `llms.txt`, `skill.md`, the hosted MCP server, IDE assistants) can answer questions accurately and act on them. The content is authored from the product's own knowledge base (`../tinyanalytics/wiki`), organized with a task- and feature-based information architecture drawn from the best of Plausible and Umami, and written to a single, disciplined voice.

This PRD defines **what** to document, **how** to structure and write it, and **what** to configure for the AI layer. It does not write the pages — it is the plan the page-building work executes against.

### Why now

The site is currently the empty Mintlify starter (two placeholder pages). The product, by contrast, ships a large, mature feature surface (§4). Every day without docs is friction on adoption and on migration off Google Analytics. And because the product is closed-source, the docs carry a burden open-source competitors outsource to "read the code": they are the **only** place a privacy-conscious buyer can verify how the mechanism works. AI-native docs additionally reduce support load: the assistant deflects questions, and `skill.md`/MCP let users' own AI tools drive TinyAnalytics correctly.

---

## 2. Goals & non-goals

### Goals

1. **Time-to-first-event < 5 minutes** for a new user following the Quickstart.
2. **Cover 100% of shipped, user-facing features** (§4) — no documented feature that doesn't exist, no shipped feature left undocumented.
3. **Answerable by AI**: the in-docs assistant and `llms.txt` resolve the top user questions (install, events, identify, import, privacy, billing) from page content alone.
4. **Migration wedge**: a clear "switch from GA4 / Plausible / Umami" path, since import is a shipped differentiator.
5. **Trust without source access**: the product is closed-source, so the docs must earn the trust the code can't lend — mechanism-level explanations of cookieless identity, bot detection, and data handling that a privacy evaluator can accept without reading source.
6. **One voice, scannable**: every page passes the copywriting scannability + specificity checks (§6).

### Non-goals (this PRD)

- **Self-hosting documentation** — the product is closed-source and hosted-only; no installation, Docker, environment, upgrade, or backup docs. Revisit only if a self-host offering ships (§9).
- Marketing site / landing page copy (separate surface).
- Writing the actual MDX pages (a follow-on execution task, scoped by §4 + §8).
- Documenting features that are **not shipped** (§9).
- Localization / i18n (English first; revisit later).
- API SDK generation or auto-generated reference from OpenAPI (may come later; §7.4 covers the manual approach for v1).

### Success metrics

| Metric                                                     | Target                   |
| ---------------------------------------------------------- | ------------------------ |
| Quickstart completion (add site → first event)             | < 5 min, ≤ 6 steps       |
| Feature coverage vs `wiki/features.md`                     | 100% of user-facing rows |
| Assistant deflection (top-20 questions answered from docs) | ≥ 90%                    |
| Every page has `title` + `description` frontmatter         | 100%                     |
| Broken internal links / 404s in nav                        | 0                        |
| Pages that "make sense read by headings alone" (F-pattern) | 100%                     |

---

## 3. Audience & positioning

### Primary readers (psychographic, not demographic)

1. **The privacy-conscious site owner** — wants GA-grade insight without cookie banners, GDPR risk, or handing data to Google. Values: ownership, simplicity, ethics. Often solo founder, indie hacker, agency.
2. **The developer installing the tracker** — needs the snippet, the framework guide, the event API, and a way to verify it works. Values: correct copy-paste, no surprises, small script.
3. **The privacy & compliance evaluator** — a DPO, agency, or founder vetting the GDPR/cookie-banner story before rollout. Can't audit the source (closed), so the docs must answer precisely: what is stored, what never is, how identity works. Values: precision, honesty, citable answers.
4. **The product analyst / growth engineer** — uses funnels, cohorts, experiments, flags, surveys, revenue, B2B group analytics. Values: depth, accuracy of definitions, trust in the numbers.
5. **The migrator** — leaving GA4/Plausible/Umami, worried about losing history. Values: "I keep my data," low switching cost.

### Awareness stage (Schwartz)

Docs readers are **product-aware** or **most-aware** — they already have or are evaluating TinyAnalytics. Implication: pages lead with _how to do the thing_ and _what it means_, not with _why analytics matters_. Persuasion lives in **descriptions, intros, and comparison pages**, not in every how-to.

### Positioning statement (the docs' throughline)

> TinyAnalytics combines hosted web and product analytics, AI discovery, revenue, experiments, and monitoring for teams that want clear answers without tracking people.

### The single promise (repeat, don't dilute)

**"Understand your traffic and your product without tracking people."** Core anonymous analytics sets no cookies, stores no raw IP addresses, and derives identity on the server instead of persisting an anonymous browser ID. Optional product features use purpose-specific browser storage and must be disclosed precisely. Every intro, the Introduction page, and the comparison pages ladder back to this.

### Voice & archetype

- **Archetype:** primary **Sage** (truthful, evidence-led, explains the mechanism), with a **Everyman** secondary (plain-spoken, unpretentious). Never Ruler/luxury, never Jester.
- **Voice traits (do/don't):**
  - Clear, not clever. (No puns in headings, no cleverness that obscures.)
  - Plain-spoken, not dumbed-down. (Explain the mechanism; respect the reader.)
  - Honest, not hype. (State limits in-product — see the wiki's habit of documenting losses/caveats.)
  - Concrete, not abstract. (Numbers, commands, screenshots over adjectives.)
- **Tone flexes by section:** warm and encouraging in Get Started; precise and terse in API/Reference; calm and thorough in Troubleshooting and the privacy/data-handling pages.

---

## 4. Scope — the feature surface to document

Authoritative source: `../tinyanalytics/wiki/features.md` + the decision log (`wiki/decisions/`). The clone documents **only what TinyAnalytics ships**. Rybbit's `docs/content` tree is a _coverage checklist_ (which topics exist), never a source of prose or structure.

### 4.1 Shipped, user-facing capabilities (must document)

**Setup & tracking**

- Cloud onboarding: sign up at `dash.tinyanalytics.io`, add a site, install the snippet
- Tracking script (`/script.js`, < 6.5 KB gz), `data-*` configuration, SPA route tracking
- First-party proxy / custom domain (adblocker bypass), Mode A snippet builder
- Opt-out, path skip/mask, exclude yourself
- Auto-pageviews; custom events; `identify()` + persistent identity
- Auto-capture: outbound links, file downloads, button clicks, copy, form submit, input change
- Engagement capture (scroll depth, engaged time)
- Web Vitals / performance capture (opt-in, lazy chunk)
- Per-event tagging (`data-tag`), revenue on events, 404 tracking (opt-in recipe)
- React Native SDK (mobile sites)

**Dashboard / web analytics**

- Overview (stat cards, time-series chart, geo map, live counter), Realtime + live-sessions drawer
- Organization overview (combined metrics, per-site trends, comparison table) across accessible sites
- User acquisition (first-ever-session attribution, new/returning users, engagement by first-touch channel/source/campaign/referrer)
- Pages, Sessions (+ detail/timeline), Events explorer (log, custom events, event types, downloads), Users (+ profiles + traits explorer)
- Journeys (Sankey), Retention, Funnels, Goals, Performance (Core Web Vitals)
- Bots & AI crawlers, AI traffic report, Google Search Console, Map/Globe
- Filters, Saved segments, Behavioral cohorts, Period comparison (previous / year-over-year), Chart annotations, CSV/PDF export
- Date-range presets, browser-timezone querying

**Product analytics (advanced tier)**

- Ask AI at site and organization scope, with grounded reads, report links, approved writes, conversation history, feedback, and monthly credit/BYOK modes
- Client-event and Stripe revenue, Feature flags, Experiments (A/B), Surveys (NPS/feedback), Site and organization custom dashboards (editor + SQL cards), SQL query builder, Group / B2B analytics (+ group retention)

**Monitoring & automation**

- Scheduled email reports (subscriptions), scoped analytics alerts with templates (email/Slack/Discord/webhook), Uptime monitoring (monitors, incidents, notification channels), Shortlinks

**Data management & sharing**

- Data dictionary (event/property/trait catalog), Data import (GA4 live pull, Plausible, Umami)
- Public dashboards (share links), Dashboard embed (iframe), Live-visitors widget

**Accounts & administration**

- Account settings (name, password, API keys, delete), Organizations & members, Teams & site-access control, Organization switcher
- Per-site config (exclusions: bots/IPs/countries/paths), Tracking settings
- Invitations, Email verification, Password reset, Email preferences / one-click unsubscribe
- Billing & plans (Free / Growth / Business; read-time retention limits)

**Developer / API**

- Client-side browser event API (`pageview()`, `event()`, `trackOutbound()`, `trackError()`)
- Client-side browser identity API (`identify()`, `setTraits()`, `getUserId()`, `clearUserId()`)
- Read/analytics API (overview, timeseries, breakdown, sessions, events, and the broader read surface)
- Scoped SQL query endpoint, API keys (reads, management, SQL, and MCP as the key owner), API playground, rate limits & CORS

**Concepts & reference (the "why it's trustworthy" layer)**

- Cookieless identity model (one model: `sha256(ip+ua)`, `identify()` backfill, session window)
- Bot detection (UA + ASN + client signals), Channel attribution, Geo enrichment
- Metric definitions / glossary, Privacy & GDPR posture, Comparison vs GA4/Plausible/Umami/Rybbit

### 4.2 Integration guides (breadth matters for SEO + adoption)

Port the _topic list_ from Rybbit's `guides/` as a checklist; write original install steps against TinyAnalytics' snippet. Grouped in §5. Target set (v1 aims for the high-traffic ones first):

- **Frameworks:** Next.js, React (Vite/CRA), Gatsby, Remix, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro
- **CMS / builders:** WordPress, Webflow, Framer, Ghost, Squarespace, Carrd, Bubble, Wix-style
- **E-commerce:** Shopify, BigCommerce, PrestaShop, ThriveCart
- **Docs / SSG:** Docusaurus, GitBook, Mintlify, VitePress, Hugo, Jekyll
- **Web platforms / tag managers / CMS templates:** Google Tag Manager, Laravel, Drupal, Joomla, TYPO3, Contentful, Sanity, Strapi
- **Mobile:** React Native

---

## 5. Information architecture

Design principles:

- **Task spine for setup, feature spine for the dashboard.** Blend Plausible's task orientation with Umami's per-feature filtering.
- **Progressive disclosure.** Core analytics first (what everyone opens daily); advanced product-analytics tier separated so it doesn't overwhelm the site owner.
- **Front-load meaning** in every nav label (F-pattern): first word carries scent.
- **Sentence case, concise labels; verbs where they aid discovery** ("Track custom events" > "Custom events" when it's a how-to).
- **Descriptions carry the promise** (and feed `llms.txt`/search).

Mintlify structure: **tabs** at the top, **groups** within, nested pages where depth helps. Current tabs: **Get started · Integrations · API reference · Resources**. The setup, analysis, product, and account groups live together in the main **Get started** section, and their MDX files live at the repository root so their public URLs are `/doc/<slug>`. There is no Self-hosting tab — the product is hosted-only (§9). The trust content a self-host section would have carried — architecture, security, and data handling — lives in Resources at concept level.

### Main documentation tab

#### Start here

- Introduction — what TinyAnalytics is, the privacy promise, web + product analytics in one
- Quickstart — add a site, install the script, see your first event (≤ 6 steps)
- How TinyAnalytics works — ingestion → dashboard, cookieless identity in plain terms
- Switch from Google Analytics / Plausible / Umami — the migration overview (links to import)

#### Guides and feature groups

**Group — Install the tracker**

- The tracking script
- Script configuration (`data-*` attributes)
- Single-page apps & SPA routing
- Proxy & custom domains (bypass adblockers)
- Exclude yourself & opt-out
- Verify your setup / troubleshooting the tracker

**Group — Track what matters**

- Pageviews
- Custom events
- Identify users
- Outbound links
- File downloads
- Engagement (scroll & time)
- Button, form & copy auto-capture
- Web Vitals & performance
- Revenue
- Tag events
- Track 404s

**Group — Explore your data**

- Dashboard overview
- Realtime
- Pages
- Sessions
- Users & profiles
- Events explorer
- Journeys
- Retention
- Funnels
- Goals
- Performance (Core Web Vitals)
- Bots & AI crawlers
- AI traffic
- User acquisition
- Google Search Console
- Map & globe
- Organization overview
- Filters
- Saved segments
- Behavioral cohorts
- Compare periods (previous & year-over-year)
- Annotations
- Export data (CSV & PDF)

**Group — Product analytics**

- Ask AI
- Revenue analytics
- Connect Stripe revenue
- Feature flags
- Experiments (A/B testing)
- Surveys
- Custom dashboards
- SQL query builder
- Group & B2B analytics

**Group — Monitor & automate**

- Scheduled reports
- Alerts
- Uptime monitoring
- Shortlinks

**Group — Share & embed**

- Public dashboards
- Embed a dashboard
- Live-visitors widget

**Group — Manage data**

- Data dictionary
- Import from GA4
- Import from Plausible
- Import from Umami

**Group — Accounts & access**

- Account settings
- Organizations & members
- Teams & site access
- Roles & permissions
- Invitations
- Billing & plans

### Tab: Integrations

- Overview (how any install works: the snippet + verify)
- **Frameworks** (Next.js, React, Gatsby, Remix, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro)
- **CMS & website builders** (WordPress, Webflow, Framer, Ghost, Squarespace, Carrd, Bubble)
- **E-commerce** (Shopify, BigCommerce, PrestaShop, ThriveCart)
- **Docs & static sites** (Docusaurus, GitBook, Mintlify, VitePress, Hugo, Jekyll)
- **Web platforms & tag managers** (Google Tag Manager, Laravel, Drupal, Joomla, TYPO3, Contentful, Sanity, Strapi)
- **Mobile** (React Native)

### Tab: API reference

- Introduction (client-side collection vs authenticated data and management APIs)
- Browser event API (`pageview()`, `event()`, `trackOutbound()`, `trackError()`)
- Browser identity API (`identify()`, `setTraits()`, `getUserId()`, `clearUserId()`)
- Analytics read API (overview, timeseries, breakdown, sessions, events, live, …)
- Scoped SQL query
- API keys
- Rate limits & CORS
- API playground

### Tab: Resources

- Metric definitions (glossary)
- How cookieless identity works
- How bot detection works
- How traffic is classified (channels & attribution)
- How your data is handled — architecture & security at trust level: what's stored where, what never is, retention; **no operational detail** (the product is hosted, not distributed)
- Privacy & GDPR
- TinyAnalytics vs Google Analytics / Plausible / Umami — honest framing: Plausible and Umami are open source and TinyAnalytics is not; the docs answer the resulting trust question with mechanism-level transparency, never by dodging it
- Use these docs with AI (install the skill, connect the MCP server, ask the assistant)
- Changelog

---

## 6. Content standards & templates

### 6.1 Page frontmatter (required on every page)

```yaml
---
title: "Track custom events" # concise, sentence case, verb-led for how-tos
description: "Send named events with properties to measure the actions that matter — signups, clicks, purchases." # the promise; feeds llms.txt, search, assistant
icon: "cursor-click" # optional, Lucide/FontAwesome
---
```

- **`description` is not optional and not filler.** It is the single highest-leverage AI-native field: it seeds `llms.txt`, semantic search, and the assistant's answer. Write it as a benefit-bearing sentence, specific over generic. (Bad: "Custom events documentation." Good: the example above.)
- Titles: sentence case, front-loaded, ≤ ~60 chars. Verb-led for tasks, noun for concepts/reference.

### 6.2 Page archetypes (pick the matching template)

1. **How-to (task)** — one job, start to finish. Intro (1–2 sentences, the outcome) → Prerequisites (if any) → `<Steps>` → Verify → Related. Use `<CodeGroup>` for multi-language/multi-framework.
2. **Concept (explainer)** — what it is, why it works this way, the mechanism, the honest limits. Sage voice. End with "Related" links.
3. **Feature guide (dashboard)** — what the view shows, how to read each metric, common workflows, gotchas. Screenshot near the top.
4. **Integration guide** — Prerequisites → Install snippet (framework-specific) → Verify → Framework-specific notes (SPA routing, env vars). Keep them near-identical in shape so they're skimmable and easy to batch-author.
5. **Reference (API / definitions)** — terse, complete, exhaustive. Tables, request/response, every field. No persuasion.

### 6.3 Writing rules (from the copywriting pass)

- Second person, active voice, present tense. One idea per sentence.
- **Front-load meaning** in headings and the first two words of bullets (F-pattern; readers scan ~20–28% of words).
- **Specifics over adjectives** — "< 6.5 KB gzipped," "counts distinct sessions every second," not "blazing fast." No praise adjectives ("seamless," "powerful").
- **Show the mechanism** where trust is at stake (identity, bots, privacy) — the reason-why is the persuasion.
- **State limits honestly, in-product** — mirror the wiki's discipline (e.g. AI report is click-throughs only; import region breakdowns have known losses). Honesty _is_ the credibility.
- Bold for UI elements ("click **Add website**"); code font for files, commands, paths, endpoints.
- Every how-to ends with a **Verify** step and a **Related** links block (also strengthens internal linking for AI + SEO).

### 6.4 Components to standardize on

- `<Steps>` for sequences · `<CodeGroup>` for framework/language variants · `<Tabs>` for one-of-N reader choices (e.g. script tag vs npm) · `<Accordion>`/`<AccordionGroup>` for troubleshooting & FAQs · `<Card>` inside `<Columns>` for hub and related-link grids · `<Note>`/`<Info>`/`<Tip>`/`<Warning>`/`<Danger>`/`<Check>` according to meaning · `<ParamField>`/`<ResponseField>` for verified API reference fields · `<Frame>` for screenshots.
- `<Prompt>` component on the "Use these docs with AI" page for the skill-install command (§8.3).
- Keep prerequisites, required steps, risks, limitations, and verification visible. Accordions and other progressive-disclosure components contain optional detail only.

---

## 7. AI-native requirements

The thesis: **most AI-native features are automatic once deployed on Mintlify — the work is feeding them good content and turning on/tuning the right config.**

### 7.1 Automatic (hosted by Mintlify — no build work, but content-quality-dependent)

- **Markdown to agents** — every page serves as Markdown (`.md` URL) to AI tools; lower tokens, faster processing.
- **`llms.txt` / `llms-full.txt`** — hosted automatically; quality is a direct function of page `title` + `description` (§6.1). _Action: enforce descriptions everywhere._
- **`skill.md`** — hosted automatically; lists doc capabilities for agents.
- **Hosted MCP server** — users connect the docs to their AI tools for up-to-date product answers.
- **Semantic search + 404 suggestions** — intent-based, no config.

> Because these are generated _from_ our content, the AI-native quality bar is really a **content quality bar**: complete coverage (§4), strong descriptions (§6.1), dense internal links (§6.3), and honest, mechanism-level explanations.

### 7.2 Configured — the in-docs **assistant** (reading)

- Enable the assistant (dashboard). In `docs.json`, keep `assistant` available in the contextual menu.
- Configure: starter questions (top user intents: "How do I install the script?", "How do I track a custom event?", "Do I need a cookie banner?", "How do I import from GA4?"), support/sales deflection email, and any external sources it may search.
- Acceptance: assistant answers the top-20 questions (§2) from published content.

### 7.3 Configured — the **contextual menu** (discovering)

Current `docs.json` already sets `contextual.options`. Finalize to:

```json
"contextual": {
  "options": ["copy", "view", "assistant", "chatgpt", "claude", "perplexity", "mcp", "cursor", "vscode"],
  "display": "header"
}
```

Rationale: `copy`/`view` (Markdown), `assistant` (in-docs), the three AI chats users actually use, plus `mcp`/`cursor`/`vscode` for the developer audience. Drop options we won't support to avoid dead menu entries.

### 7.4 Configured — the **agent** & automations (writing/maintenance)

- Add the agent to the team's Slack so anyone can request doc updates conversationally.
- Set up **automations**: (a) on push to the product repo's changelog, open a PR proposing doc updates; (b) a scheduled "find stale pages / broken links" pass. Each automation = a prompt + a trigger.
- Configure Claude Code / Cursor via `AGENTS.md` (§8.2) so contributor edits follow the Mintlify schema + our style.

### 7.5 Configured — teach users to install the skill (discovering)

A dedicated Resources page, "Use these docs with AI," embeds the install prompt (§8.3) and explains the MCP connection + assistant. This turns readers into users whose _own_ AI tools drive TinyAnalytics correctly.

---

## 8. Technical configuration plan

### 8.1 `docs.json`

- `name`: "TinyAnalytics" (currently "Mintlify Starter Kit").
- `colors`: use the owner-approved green accents — `#006420` in light mode and `#009B32` in dark mode.
- `fonts`: use Inter for headings and body text through Mintlify's Google Fonts integration.
- `logo` / `favicon`: replace starter assets with the TinyAnalytics emblem — the green bolt over an
  arc, as used on the marketing site (light/dark).
- `navigation`: implement §5 (tabs → groups → pages).
- `navbar`: primary CTA → the app (`https://dash.tinyanalytics.io`); links → GitHub, Support.
- `footer.socials`: TinyAnalytics' real handles (replace Mintlify's).
- `contextual`: finalize per §7.3.
- SEO/metadata: set site-level `description` and OpenGraph defaults (the OG-image gap is noted in decision 0041/0101 — provide one).

### 8.2 `AGENTS.md`

Replace the placeholder with TinyAnalytics specifics:

- **Terminology:** "site" (a tracked website) vs "organization" vs "team"; "event" types; "cookieless identity"; product name **TinyAnalytics**, with a capital **T** and **A**.
- **Content boundaries:** the product is **hosted-only** — never document self-hosting, installation, or operator internals (admin console, instance ops); don't document unshipped features (§9); don't expose internal decision-record reasoning as user docs; document visitor collection through the keyless client-side browser API, and reserve API keys for reads, management, SQL, and MCP as their owner.
- **Point at the project skills** (§8.5) so any AI tool loads them before editing.
- **Style:** the §6.3 rules.
- **Sources of truth:** `../tinyanalytics/wiki/features.md`, the decision log, and the product README — never invent behavior; when unsure, cite the wiki.

### 8.3 Skill-install prompt (`<Prompt>` component)

On "Use these docs with AI":

```mdx
<Prompt
  description="Install the TinyAnalytics docs skill for your AI tools."
  actions={["copy", "cursor"]}
>
  npx skills add https://tinyanalytics.io/docs
</Prompt>
```

_(Domain assumption in §11.)_

### 8.4 `.mintignore` / housekeeping

- Keep `PRD.md`, `README.md`, drafts out of the published build (extend `.mintignore` as needed). `.agents/` is auto-ignored by Mintlify, so the skills never publish.

### 8.5 Project skills (`.agents/skills/`) — ✅ shipped with this PRD revision

Two in-repo skills, so any AI tool editing these docs (Claude Code, Cursor, the Mintlify agent) picks up both the platform mechanics and this project's rules:

- **`.agents/skills/mintlify/SKILL.md`** — the official Mintlify authoring skill (MIT): components, `docs.json` patterns, frontmatter, CLI (`mint dev`, `mint broken-links`, `mint validate`), writing standards, and the research → plan → write → verify workflow.
- **`.agents/skills/tinyanalytics-docs/SKILL.md`** — the project layer: what the product is (hosted-only, closed-source), sources of truth (`../tinyanalytics/wiki`, with the Rybbit reference as a coverage checklist only), **hard content boundaries** (no self-hosting/operator docs, no unshipped features, client-side visitor collection, and API keys kept out of browser code), the terminology table, voice rules, page archetype shapes, and a pre-submit checklist that extends the Mintlify one.

Layering rationale: the generic skill can be refreshed from upstream (`npx skills add https://mintlify.com/docs`) without touching project rules; the project skill encodes what no upstream skill can know. `AGENTS.md` references both (§8.2).

---

## 9. Out of scope — do NOT document (not shipped)

Per the gap analysis, decision log, and the product's distribution model, these are absent, excluded, or internal. Documenting them would be a correctness bug:

- **Self-hosting, in any form** — the product is closed-source and hosted-only. No installation, Docker/`setup.sh`, environment variables, SMTP/geo-database setup, updating, backup, or reverse-proxy-for-the-platform pages. (The internal compose stack exists for the team, not for users.) The _tracking proxy / custom domain_ guide is **in** scope — that's a cloud-customer feature. Revisit this bullet only if a self-host offering actually ships.
- **Admin console & operator internals** — system-admin promotion, email diagnostics, instance ops (decisions 0112, 0123) are internal tooling, not user features.
- **Session replay** — excluded by design (decision 0049; privacy-first fit).
- Anything Rybbit has that TinyAnalytics lacks and hasn't built — verify each candidate against `wiki/features.md` before writing.
- Server-side PDF export (TinyAnalytics exports client-side).
- TinyAnalytics' own billing/Stripe checkout flow beyond the shipped plan model (billing ships inert, `BILLING_ENFORCED=false`; document plans/limits as they actually behave, and mark cloud-only where relevant). The customer-facing Stripe revenue integration is separate, shipped, and in scope.

**Rule:** if a feature isn't in `wiki/features.md` as user-facing, it doesn't get a page. When in doubt, check the decision record, then ask.

---

## 10. Phasing & milestones

Ship in waves; each wave is independently useful and immediately deployable (Mintlify auto-deploys on merge).

**Phase 0 — Foundations (config, no content debt)** — ✅ done (2026-07-27)

- ✅ `docs.json` rebranded (name, owner-approved green palette, Inter font, tab/group nav, dashboard CTA, `contextual.display`); light/dark logo assets replaced with the TinyAnalytics emblem — the green bolt over an arc; `AGENTS.md` rewritten; project skills shipped (§8.5). The favicon lagged behind on a blue ascending-bars placeholder until 2026-07-30, when it was matched to the marketing site's `public/seo/favicon.svg`.
- ✅ Site metadata configured with a global description, Open Graph and Twitter defaults, and **TinyAnalytics** as the structured-data publisher. The 71 authored product, resource, and account pages are indexable; search exclusion is declared per page, so every `/api-reference/` guide and every `/integrations/` install guide sets `noindex: true` alongside the 148 generated endpoint operations. Mintlify generates per-page Open Graph images from each page's title and description plus the site logo and primary color. The canonical base URL is `https://tinyanalytics.io/docs`. Real footer socials remain an owner follow-up.

**Phase 1 — The golden path (highest leverage)** — ✅ done (2026-07-17)

- ✅ Introduction, Quickstart, How it works, Install the tracking script, Script configuration, Custom events, Identify users, Verify/troubleshoot. (The "Switch from GA4/Plausible/Umami" migration overview is deferred to Phase 3, alongside import.)
- _Outcome:_ a new user can install and see data; assistant/`llms.txt` have real substance.

**Phase 2 — Explore your data (the daily dashboard)** — ✅ done (2026-07-17)

- ✅ First wave: Dashboard overview, Realtime, Pages, Sessions, Users, Events explorer, Journeys, Retention, Funnels, Goals, Filters.
- ✅ Second wave: Performance (Core Web Vitals), Bots & AI crawlers, AI traffic, Google Search Console, Map & globe, Saved segments, Behavioral cohorts, Compare periods, Annotations, Export (CSV & PDF). Guides nav regrouped into four groups (Explore your data · Understand behavior · Acquisition & AI · Filter, save & share). Bot capture and GSC availability confirmed with the maintainer before writing.

**Phase 3 — Migration & data (adoption drivers)** — 🚧 first wave done (2026-07-17)

- ✅ First wave: migration overview (`migrate`), Data dictionary, and four import guides — GA4 (live OAuth pull), Plausible, Umami, Simple Analytics (file uploads). Added a "Manage data" group to Guides. Simple Analytics import added beyond the original three (it ships in the product).
- ✅ Second wave: Accounts & access group — Account settings, Organizations & members, Teams & site access, Roles & permissions, Invitations. Documents the current converged behavior (multi-org switching per 0083, emailed invitations per 0087, teams as the sole site-access mechanism per 0073–0075).
- ⬜ Deferred: Billing & plans. **Depends on open question #2** (is signup open / pricing page live) and shipped with billing not enforced (decision 0152) — confirm before writing.

**Phase 4 — Integrations breadth** — 🚧 second wave done (2026-07-17)

- ✅ First wave: Integrations tab + Overview and the top platforms — Next.js, React, WordPress, Webflow, Shopify, Google Tag Manager. Batch-authored from one template.
- ✅ Second wave (long tail): Frameworks — Vue, Nuxt, Astro, SvelteKit, Gatsby, Remix, Angular; CMS & builders — Ghost, Squarespace, Framer, Carrd, Bubble; Docs & static sites (new nav group) — Hugo, Jekyll, Docusaurus, VitePress; E-commerce — BigCommerce; web platforms — Laravel, Drupal. 19 pages, same template, platform placement stated accurately (e.g. Astro `is:inline`, Gatsby `<Script>`, plan-gating for Squarespace/Carrd).
- ⬜ Remaining candidates (later, if demand warrants): E-commerce (PrestaShop, ThriveCart); web platforms & tag managers (Joomla, TYPO3).
- 🚫 Deliberately **not** documented as platforms — no fabricated support:
  - **React Native / native mobile** — this earlier gap conclusion was superseded when the `@tinyanalytics/react-native` SDK shipped in decision 0165. It is now documented under Mobile apps.
  - **Headless CMSs (Contentful, Sanity, Strapi)** — these have no rendered frontend of their own; the site is served by a framework (Next.js, Nuxt, Astro, …) that already has a guide. Point users to the framework page rather than the CMS.
  - **GitBook / Mintlify** — script injection depends on plan/hosting specifics we can't state as fact; revisit only if we can verify the exact install point.

**Phase 5 — Advanced product analytics & ops** — ✅ done (2026-07-27)

- ✅ **Product analytics** group (8): Revenue analytics, Stripe revenue connection, Feature flags, Experiments (A/B), Surveys, Custom dashboards, SQL query builder, Group & B2B analytics. Custom dashboards now cover both site and organization scope. Sourced from `algorithms/{revenue-normalization,flag-evaluation,experiment-results,surveys,dashboard-cards,group-analytics}.md`, `architecture/stripe-revenue.md`, `concepts/scoped-sql-query.md`, and the tracker public-API table (`architecture/tracking-script.md` — `flag()`/`flagPayload()`/`flags()`, `group()`/`setGroupTraits()`/`resetGroups()`). Citable specifics kept exact: rollout %, exposure-vs-assignment measurement, the ≥30-sample / ≥95%-confidence significance rule, the 5-group-type cap, the 10 s / 1,000-row query caps, and Stripe replay deduplication.
- ✅ **Monitor & automate** group (4): Scheduled reports, Alerts, Uptime monitoring, Shortlinks. Sourced from `algorithms/{scheduled-reports,analytics-alerts,uptime-monitoring}.md` and `architecture/shortlinks.md` (decisions 0131–0133, 0138–0139, 0116–0119, 0159/0168, 0221). Alerts include client-event revenue, URL scope, event count/users with property filters, templates, and the 12 h default cooldown. Uptime incidents open/resolve on the 2nd consecutive failure/success; shortlink clicks remain excluded from overview traffic.
- ✅ **Share & embed** group (3): Public dashboards, Embed a dashboard, Live-visitors widget. Sourced from decisions 0089 (widget + embed-stats), 0105 (`/share` full-dashboard link), 0126 (embed UX: theme/hideSidebar, keyless-public sentinel, private link key). Public/private bearer-link model stated plainly.
- 13 pages at the documentation root, added as three guide groups (Product analytics · Monitor & automate · Share & embed). Build validates with zero broken links.
- 🚫 Not over-claimed: **hideBranding / white-label** — 0126 frames it as a self-host-friendly toggle; on the hosted product its availability may be plan-gated, so the embed docs cover theme + hide-sidebar only and omit branding removal until plan scope is confirmed (ties to open question #2). Alert **segment/filter picker** is carried in the engine but not yet in the dialog (ships site-wide first), so alerts are documented as site-wide.

**Phase 6 — API reference & Resources** — ✅ done (2026-07-17)

- ✅ **API reference** tab (8 pages): Introduction, Browser event API, Browser identity API, Analytics read API, Scoped SQL query, API keys, API access & CORS, and API playground. The 2026-08-12 client-side posture replaced raw HTTP event/identity guidance with the shipped `window.tinyanalytics` methods. API keys are documented only for private reads, management, SQL, and MCP; client-side collection remains keyless. The read API is documented at the pattern level with a pointer to the in-product playground for the full surface.
- ✅ **Resources** tab (8 pages, new tab with Reference · How it works · Trust & privacy · AI groups): Metric definitions (glossary), How cookieless identity works, How bot detection works, How traffic is classified, How your data is handled, Privacy & GDPR, TinyAnalytics vs GA/Plausible/Umami, Use these docs with AI. Sourced from `concepts/cookieless-identity.md`, `algorithms/{bot-detection,channel-classification,overview-metrics}.md`, `architecture/data-model.md` (confirmed **no raw-IP column** — grounds the privacy claims), and decision 0152 (read-time retention). Trust pages stay at mechanism level per the hosted-only boundary — no infra vendors, no operator internals. Privacy page asserts mechanism, not legal conclusions (explicit "not legal advice / depends on jurisdiction" hedge; no blanket "GDPR compliant" claim). Comparison page is honest about closed-source vs open-source Plausible/Umami and answers the trust question with the mechanism pages rather than dodging it.
- 🚫 **Changelog** page deliberately deferred: there is no verified public product changelog to source, and fabricating release history would violate the no-invention rule. Revisit once a real product changelog/release feed exists (the docs' own `CHANGELOG.md` tracks the documentation site, not the product).

**Phase 7 — AI-native activation & polish** — 🚧 in-repo polish done (2026-07-17)

- ✅ In-repo polish pass across all 95 pages: GEO/SEO frontmatter audit (every page has a title, a standalone benefit-bearing description, and an icon — no gaps), heading-hierarchy check (one H1 per page, no stray body `# ` headings), descriptive-link audit (no "click here"/bare-"here" anchors), and a full `mint broken-links` sweep (zero broken). Removed the 44 internal `{/* TODO: screenshot */}` placeholder comments from all pages ahead of the first push (they were invisible on the site and shouldn't ship as raw TODOs).
- ⬜ **Requires the Mintlify dashboard / owner action:** turn on the docs assistant + starter questions + deflection; set up the agent-in-Slack + automations. The contextual "Ask AI / copy / open in ChatGPT·Claude·Perplexity / MCP / Cursor / VS Code" menu is already configured in `docs.json` and documented in `resources/use-with-ai.mdx`; Mintlify auto-generates `/llms.txt` + `/llms-full.txt` from the (complete) titles/descriptions. A custom OG background remains optional; automatic social cards now use the supplied logo, page metadata, and primary color.
- 📌 **Screenshots** remain a genuine gap: every feature/integration page would benefit from captured images from a live instance (open question #5 — who captures them / from which instance). The inline markers are removed, but the need is still tracked here.

**Backlog — gap analysis vs Rybbit docs (checked 2026-07-17)**

Compared our coverage against the live Rybbit docs sidebar (`rybbit.com/docs`) as a behavioral reference (structure only; no expression copied). Every "to add" below is backed by the product wiki (the feature exists) and is in scope for hosted TinyAnalytics. Items Rybbit documents that we deliberately do **not** add follow, with reasons — so this stays an honest audit, not a copy of their table of contents.

_To add (confirmed, sourced):_

- ✅ **Exclude traffic** (`exclude-traffic.mdx`, added to the "Install the tracker" group, 2026-07-18) — ingest-time exclusions: IP (single/CIDR/range, v4+v6), country, path glob, hostname glob, and user-agent **substring** (the 0160 gotcha — UA is substring, not glob; page states it explicitly), plus the block-bots toggle and both "hide your own traffic" routes (localStorage opt-out + IP exclusion). Distinguishes exclusion (dropped at collection) from a dashboard filter (hides a report view). Source: decisions 0054, 0160; caps 100 entries / 256 chars.
- ✅ **Autocapture** (`autocapture.mdx`, added to the "Track what matters" group, 2026-07-18) — dedicated page for each auto-captured event (outbound link, file download, button click, copy, form submission, engagement): what each records, the toggle attribute, the form-shape-only privacy guarantee (and the honest note that copy events store truncated copied text), plus the `data-ta-prop-*` (add props) and `data-ta-event` (opt an element out) conventions. Source: decision 0110; `tracker/script/auto-capture.ts` (read at source for the `data-ta-*` semantics and per-event props).
- ✅ **Wix** (`integrations/wix.mdx`, 2026-07-18) — Custom Code → Head, all pages; Premium-plan gating noted (like Squarespace/Carrd); SPA tracking cross-link.
- ✅ **WooCommerce** (`integrations/woocommerce.mdx`, 2026-07-18) — install via the WordPress header method (cross-links the WordPress guide) plus a purchase-tracking section (custom event on the order-received page with `revenue`/`currency`, verified against the tracker schema's reserved-prop convention).

_Lower priority / optional:_

- ✅ **Site settings** orientation page (`site-settings.mdx`, added to "Accounts & access", 2026-07-19) — hub for the per-site Settings tabs: name/domain, reporting currency, public/private visibility, tracking + exclusions, embeds, imports, move-site, and delete. Canonical home for move-a-site-between-orgs (0161). Grounded in `settings/_components/general-tab.tsx`.
- ⬜ **Svelte (Vite, non-Kit)** integration — we ship SvelteKit; Rybbit also documents plain Svelte/Vite (different install point: `index.html` / app mount).
- ⬜ **Per-endpoint API pages** — Rybbit enumerates individual endpoint pages (sending-events, export-events, live-feed, channel-performance, funnel-dropoff, weekly-report). Ours is capability-structured (core-endpoints table + playground); enumerate more only if users ask.
- (Unchanged, already listed under Phase 4: PrestaShop, ThriveCart, Joomla, TYPO3.)

_Checked and deliberately NOT added (no fabrication):_

- 🚫 **Product MCP server** — Rybbit ships `/docs/mcp` (query your analytics via an MCP server). The TinyAnalytics wiki shows **no such product MCP server** (only incidental mentions), so a page would invent a feature. `resources/use-with-ai` documents the _docs_ MCP, a different thing. Revisit only if a product MCP server ships.
- 🚫 **Architecture / Self-hosting / Self-host vs Cloud / Managing your installation / v1 migration** — operator- and self-host-facing; out of scope under the hosted-only boundary.
- 🚫 **Contentful / Sanity / Strapi / GitBook / Mintlify** — deliberately omitted (headless CMSs render through a framework that has a guide; GitBook/Mintlify install points unverifiable). Reasons recorded under Phase 4. (**React Native** was formerly listed here as "no mobile SDK" — that's now false: the SDK shipped (0165) and is documented, see the codebase gap analysis below.)

_Confirmed already covered (no action):_ tagging (`data-tag`), skip/mask paths, client opt-out, and the auto-capture toggle (all in `script-configuration`); definitions, comparison, bot detection, data import, identify, funnels, goals, teams, invitations, account/org settings, tracking script, and troubleshooting (≈ our `verify-your-setup`). On the core analytics reports we are **more** comprehensive than Rybbit (a page per report vs their lighter treatment).

**Backlog — gap analysis vs the product codebase (checked 2026-07-19)**

Diffed our docs against the actual product surface — the web app route tree (`apps/web/src/app/websites/[siteId]/*`), the SDK folder (`sdks/`), and decisions **0140–0181** (which postdate the Phase-1–6 build). Every route with no matching doc page was a candidate; each below is source-grounded (fact sheets from `apps/api/src`, `apps/web/src`, `sdks/`, and the wiki) and confirmed shipped + user-facing. Scope decisions confirmed with the owner: build all; document revenue plainly (no plan caveats — despite `requireFeature("revenue")`); the React Native SDK is published/installable.

_New pages (all built 2026-07-19):_

- ✅ **Error tracking** (`errors.mdx`, "Explore your data") — opt-in `data-track-errors`; auto-captures `window.onerror` + unhandled rejections; manual `trackError(err, meta)`; report groups by message with occurrences, affected sessions, sparkline, and stack-trace drill-down; 60 s dedupe; `ResizeObserver`/cross-origin noise filtered. Source: `apps/api/src/api/errors.ts`, `tracker/script/tracker.ts`, `features.md`. Also added a script-config section + kept the `error` type accurate in `api-reference/track`.
- ✅ **Revenue analytics** (`revenue.mdx` + `stripe-revenue.mdx`, "Product analytics") — reserved `revenue` (major units, positive) + `currency` props on a client event, plus the Stripe source's restricted-key connection, verified charges/refunds/disputes, source tabs, attribution, replay deduplication, and privacy boundaries. Source: decisions 0140 and 0216, `architecture/stripe-revenue.md`, `revenue-currency.ts`, `revenue/page.tsx`.
- ✅ **Organization overview** (`organization-overview.mdx`, "Explore your data"; supersedes `rollup.mdx`) — combined stats across accessible sites in the active organization (6 cards with sparklines, selectable per-site trend, comparison table, 50-site display cap), team-scoped access, and users summed per site. Source: decisions 0076 and 0217, `apps/web/src/app/overview/`.
- ✅ **React Native** (`integrations/react-native.mdx`, new "Mobile apps" group) — `@tinyanalytics/react-native` SDK: install (+AsyncStorage), create a mobile-type site (app identifier, read-only), `init()`, `screen()`/`event()`/`identify()`/`error()`, React Navigation tracker, install-id identity, full API + config tables, and the web-vs-mobile differences (screens-as-pageviews, no web vitals, empty channel). `analyticsHost` set to `https://dash.tinyanalytics.io` for consistency with the rest of the docs. Source: decision 0165, `sdks/react-native/{README.md,index.d.ts}`.

_Enhancements (2026-07-19):_

- ✅ `pages.mdx` — added the alternate views (Titles / Entries / Exits / Hostnames) and a **Landing pages** section (entry-page report: bounce, avg duration, avg scroll, avg time). Source: decision 0178, `landing-pages-table.tsx`.
- ✅ `alerts.mdx` — added **Revenue** to the alert-metric table (was stale: previously said revenue "isn't wired" — it shipped; `ALERT_METRICS` includes `"revenue"`).
- ✅ `script-configuration.mdx` — dedicated "Capture JavaScript errors" section (the `data-track-errors` row already existed).
- ✅ `organizations.mdx` — move-a-site pointer into `site-settings`.
- ✅ `integrations/overview.mdx` — mobile-app note pointing to the React Native SDK.

_Deliberately NOT documented (accuracy over completeness):_

- 🚫 **Pages URL / hostname mode** (0181) — the breakdown API shipped (`pathname_host`/`entry_page_host`/`exit_page_host`) but the **web UI has not** (no `pagesMode` toggle in `apps/web/src`). Documenting it would describe something users can't do. Revisit when the UI ships.
- 🚫 Operator-internal surfaces flagged by the fact-sheets (superadmin site-move, `BILLING_ENFORCED` quota preHandler, ClickHouse storage internals) — out of scope under the hosted-only boundary.

_Confirmed already covered (no action):_ **Group & B2B analytics** (the owner's example — `group-analytics.mdx` already documents `group()`/`setGroupTraits()`/`resetGroups()`, the grain toggle, account funnels/retention, inactivity alerts, flag-by-account; the miss was discoverability, not content); `data-web-vitals` (in `script-configuration`); group traits (already the 4th row in `data-dictionary`); the `error`/`performance` event types + `revenue`/`currency` props (already in `api-reference/track`, one wording tweak).

_Open (owner input still needed):_ **Billing & plans** page (open Q2); **screenshots** (need a live instance).

**Mintlify component & GEO pass (done 2026-07-19)**

Scope chosen by the owner: entry pages + API reference + all guides in full; integrations on a
structure-only pass. Result across 95 pages — `ParamField`/`ResponseField`/`Expandable` in the API
reference, `CodeGroup` on 7 pages, FAQ `AccordionGroup` on 64, `Check` on 37, `Tabs` on 3,
question-shaped headings 26 → 58. House style captured in the commit; owner ruling on Revenue
(no plan caveats) verified as held.

_Deliberately not done, with reasons:_

- 🚫 **`resources/*` (9 pages)** — outside the owner's chosen Tier 1+2 line. `resources/comparison.mdx`
  and `resources/metrics-glossary.mdx` are the strongest remaining GEO candidates in the repo
  ("TinyAnalytics vs Google Analytics" and metric-definition queries are exactly what AI engines are
  asked). **Recommended as the next pass.**
- 🚫 **"snippet" → "the tracking script" across `integrations/*`** — 152 occurrences remain, mostly on
  the 30 integration pages that were deliberately structure-only. Not a blind find-and-replace:
  `embed-dashboard` and `live-visitors-widget` use "snippet" for the **embed iframe
  snippet**, which is the product's own UI term (`dashboard-embed-tab.tsx` renders "Copy snippet") and
  must stay. Needs a per-occurrence pass distinguishing concept from UI label.
- 🚫 **Question-shaping anchored headings** — `script-configuration#track-single-page-apps` alone has
  18 inbound references. Renaming these requires updating referrers in the same commit.
- 🚫 **`Tabs` for WordPress/Drupal Option 1 vs Option 2** — Option 2 carries a `<Warning>` that editing
  the parent theme gets the tracking script wiped by the next theme update, and that warning is also
  the argument _for_ Option 1. Tabs would hide a data-loss warning from the reader who most needs it.

_Tooling note:_ `mint broken-links` does **not** validate URL fragments. Anchor targets need a separate
check (a slugify-and-compare script) — one broken anchor was found and fixed this way after
`broken-links` reported clean.

---

## 10b. Product-sync pass (done 2026-07-20)

Audited the 15 product commits from `4ee8613` (07-19 22:41) through `d400019` (07-20 18:42) — the
window opened after the last docs commit that changed facts (`1afada1`, 07-19 22:21). 17 doc files
updated. `mint validate`, `mint broken-links`, and a custom anchor check (45 refs) all clean.

**Six pages were factually wrong, not merely incomplete.** See CHANGELOG for the itemized list. The
recurring cause is that a changed _default_ or a changed _interaction_ silently invalidates prose
that was accurate when written, and nothing in either repo flags the dependency.

### Tooling gaps this pass exposed

1. **No sync marker.** Neither repo records "docs are current as of product SHA X." The boundary had
   to be recovered from commit timestamps, which only works while both repos share one author and
   machine. _Recommendation:_ record the audited product SHA in this file at the end of each sync
   pass. **This pass audited through `d400019`.**
2. **`mint broken-links` does not validate URL fragments.** Re-confirmed. Heading renames break
   inbound anchors silently — this pass renamed a `pages` heading and only the custom
   slugify-and-compare script proved nothing pointed at the old slug.
3. **Stale source comments are a documentation hazard.** `apps/api/src/api/sites-validation.ts`
   asserts an `Etc/UTC` column default that migration 0035 does not create. Verify defaults against
   migrations and schema, never against comments.

### Deliberate non-actions

| Not done                                                                                     | Reason                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Standalone `timezone` and `resources/multi-host-sites` pages (both recommended by the audit) | Concepts documented where their controls live — `site-settings` and `pages` — with cross-links. One canonical home beats five places to drift. Revisit if SEO reach for "analytics timezone" justifies a dedicated page.                         |
| `events` split into two pages                                                                | The page now covers both the dashboard Events card and the Events page. A split is defensible if the Events page grows further.                                                                                                                  |
| Retention numeric-delta claim                                                                | The timezone mechanism is confirmed from source, but whether any given site sees a visible change is unmeasured, so the docs state the mechanism only. Cohort day/week _bucketing_ remains UTC-derived — do **not** claim cohort labels shifted. |
| `resources/*` GEO pass                                                                       | Still outstanding from the 2026-07-19 pass; `comparison.mdx` and `metrics-glossary.mdx` remain the strongest remaining GEO candidates.                                                                                                           |

### Escalation for the product owner (not a docs issue)

The Events log empty state links to **`https://rybbit.com/docs/track-events`**
(`apps/web/src/components/dashboard/event-log/event-log.tsx:34`) — the product ships a UI that sends
users to the reference implementation's documentation. This warrants attention on both product and
clean-room grounds. It should almost certainly point at `custom-events` in these docs.

---

## 10c. API reference generation (done 2026-07-20)

The hand-authored API reference described **9 endpoints**; the product's API playground exposes
**158**. Coverage was ~6%, and `api-reference/read.mdx` deliberately punted the remainder to the
playground — which sits behind dashboard auth, so 149 endpoints were invisible to logged-out
readers and to every AI answer engine. Given this project's GEO emphasis, that was the largest
single discoverability gap in the docs.

`scripts/generate-openapi.ts` now generates `openapi.json` from the playground's own endpoint
registry (`apps/web/src/app/websites/[siteId]/api-playground/utils/endpointConfig.ts`), and
`docs.json` renders it as an **Endpoints** group. **133 of 158 endpoints across 29 groups** are
published. Regenerate with `bun run scripts/generate-openapi.ts` (set `TINYANALYTICS_SRC` if the
product checkout is not a sibling directory).

### Why generate rather than hand-author

`EndpointConfig` already carries method, path, name, description, required and specific params,
path params, and a request-body example — most of an OpenAPI operation object. Generating means the
reference cannot drift from the playground, and adding an endpoint to the product publishes it here
on the next run. Hand-authoring 133 pages would guarantee drift.

### Curation — documenting an endpoint is a compatibility promise

The playground exposes everything the dashboard calls, including internal plumbing. The public
reference commits to a subset; the rest are withheld **in the script's own config**, so the choice
is visible and reversible in one line:

| Withheld                                            | Reason                                                                                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Billing (2)                                         | Account plumbing; shape follows the payment provider.                                                                                          |
| Imports (4)                                         | Migration tooling; batch semantics not settled. Reconsider — `POST /sites/:site/imports/:importId/events` is a genuine bulk-backfill use case. |
| Google Analytics 4 (7)                              | OAuth handshake plus a proxy to Google's own API.                                                                                              |
| Teams (4), Organizations member management (3 of 6) | Admin surface, not product API.                                                                                                                |
| Search Console OAuth (4 of 5)                       | Browser redirect flows, not callable API. Only `gsc/data` is published.                                                                        |
| `org-event-count` (1 of Misc's 3)                   | Internal quota counter. Retention and Journeys are published.                                                                                  |

### Known gap: no response schemas

`EndpointConfig` carries no response type, so every operation declares a bare `200` plus shared
`401`/`403`/`429`. Endpoint pages document requests fully and **say nothing about response bodies** —
stated plainly in `read.mdx` and `playground.mdx` rather than papered over. Two ways to close it:

1. **Attach response schemas to the Fastify routes** in `apps/api` and generate from the live API.
   Highest fidelity and self-maintaining, but it is a product change.
2. **Capture live sample responses** per endpoint. Accurate to today, but goes stale silently.

Until then the playground remains the way to see a real response, which is why it keeps its page.

### Verification

`mint validate` clean; `mint broken-links` clean; Redocly lint reports **0 errors, 1 warning**
(`info-license`, not applicable to a proprietary API). `mint broken-links` does **not** traverse
generated OpenAPI routes, so the four deep links added to `read.mdx` and `introduction.mdx` were
cross-checked against the 133 routes extracted from a running `mint dev` nav payload.

---

## 10d. Product-sync pass (done 2026-07-27)

Audited the shipped product from the previous documentation sync through product commit `964f322`
and checked decisions **0215–0222** against the wiki and implementation. This pass documents only
committed, user-facing behavior:

- **Pages full-URL display** (0215) — the display-only hostname toggle is distinguished from URL
  mode, which changes grouping.
- **Stripe revenue** (0216) — a new connection guide, source-aware Revenue report, raw scoped SQL
  table, settings pointer, and exact privacy/data-handling disclosures.
- **Organization overview** (0217) — replaces Cross-site rollup in navigation and content, with
  redirects from `/rollup` and `/guides/rollup`.
- **Organization custom dashboards** (0219) — multi-site scopes, templates, creator/edit rights,
  partial-access behavior, and site-level templates.
- **Alerts v2** (0221) — seven templates, page-path scope, event-property filters, and distinct
  event-user alerts.
- **API playground coverage** (0222) — the in-product catalog now covers every customer-facing
  REST route, including Shortlinks, organization analytics and dashboards, Stripe connections,
  user writes, autocapture discovery, and AI query generation; the phantom goal-update method was
  corrected from `PUT` to `PATCH`.
- **Accuracy fixes** — the tracker budget is now documented as under **6.5 KB gzipped** (0203);
  Goals and Funnels show their restored shared date/filter controls; custom shortlink slugs are
  documented as globally unique.

The public generated endpoint set remains curated. Decision 0096 is the current authentication
contract: an API key resolves to its owner for customer read and management routes, while browser
ingestion remains keyless. Cosmetic-only changes such as Journeys spacing and navigation loading
indicators do not need durable documentation.

## 10e. Product-sync pass (2026-07-30)

Audited the shipped product from `964f322` through `f5dd577` and added or expanded public coverage for:

- **User acquisition** (0224): first-ever-session attribution across six dimensions, new vs returning users, audience modes, selected-window engagement, filters, comparison, and the anonymous-identity caveat.
- **Ask AI** (0242–0246): site and organization scope, grounded reads and report links, approved write tools, team-aware access, conversation actions, AI credits, and Anthropic BYOK.
- **Billing and plans** (0152 plus the current plan catalog): Free/Growth/Business, the 14-day Business trial, pageview metering without collection blocking, read-time reporting history, and monthly AI credits.
- **Recent email/export behavior** (0239 and the July email wave): partial CSV success warnings, scheduled-report headline summaries and section links, and richer alert context.
- **Authoring contract corrections**: removed the stale rotating-hash language and clarified the key-owner permission model for private customer API access.

The generated OpenAPI reference is refreshed from the product playground registry in the same pass.

**Current sync marker:** product commit `f5dd5773073a7a11776d08c4e33e55dd451b939f`
(2026-07-30).

## 10f. Product-sync pass (2026-08-03)

Audited every committed product change after `f5dd577` through `eccefd0` and updated the public
contract for:

- **Least-privilege API keys and MCP** (0257, 0268, 0269): full-access or per-resource keys,
  read/write scope behavior, scoped MCP catalogs, and the corrected destructive-tool boundary for
  explicitly scoped write keys.
- **Scheduled-report AI digests** (0258): a weekly-only opt-in narrative, ordinary-report fallback,
  current-recipient filtering, and send-now preview behavior.
- **Ask AI depth and entry points** (0259–0265, 0270): funnel/retention/revenue reads, contextual
  starters, one-click report explanations, survey-response analysis, natural-language report
  filters, shared segment/cohort creation, signed persistent writes, and deliberate deletes.
- **Custom-query repair** (0261, 0269): **Fix with AI** uses the existing credit/BYOK path, replaces
  the editor only after guarded validation, and never runs repaired SQL automatically.
- **Period comparison** (0271): one date+baseline picker, four baseline modes, atomic Apply/Cancel,
  and the adjacent previous seven days as the fresh Last 7 days default with a persistent explicit
  off state.
- **Pages and URLs ranking** (0272): lists rank by the displayed distinct-session count before the
  server top-N limit, with pageviews retained as separate row data.

Reviewed changes with **Public docs impact: none**: the dashboard-list primitive refactor (0255),
assistant stream rendering (0256), the shared Anthropic provider runtime (0266), trusted-origin PUT
CORS correction (0267), deployment-only records, and hardening details that did not change a
customer-facing guarantee beyond the API-key/MCP corrections documented above.

No authored page was needed: each shipped behavior has an existing topic owner, so authored
navigation remains unchanged. The generated OpenAPI reference was refreshed from **158 total / 133
published** to **192 total / 148 published across 29 groups**, including the new comparison query
vocabulary and report-subscription request fields.

**Current sync marker:** product commit `eccefd07413343f03f182c2341888816ecd8f2f4`
(2026-08-02).

## 10g. Product-sync pass (2026-08-03 — Event Activity Explorer, released as `079bb71`)

Documented the **Event Activity Explorer** (product decision 0277), which rebuilds the Events page
as a table-first explorer:

- **`event-analytics.mdx`** rewritten for the three page-local views — **Explore** (default),
  **Trends** (the existing chart), and **Live** — covering server-backed search, event type/name
  pickers, typed event-property filters, configurable columns, the Overview/Properties/Raw/Session
  detail tabs, `?event=<uuid>` deep links, and Live's incremental pause/resume/clear lifecycle. The
  stale "Realtime refresh every 5 seconds" and "search filters only loaded rows" claims were
  removed; the FAQs were replaced to match.
- **`openapi.json`** regenerated from the product's playground endpoint registry: `GET
/sites/{site}/events/log` gains `cursor`, `direction`, `order`, `q`, `event_types`,
  `event_names`, `event_props`, and the legacy `before_timestamp`, and the new `GET
/sites/{site}/events/log/{eventId}` detail path was added (**148 → 149 published endpoints across
  29 groups**; the count references in `tinyanalytics-api.mdx`, `analytics-read-api.mdx`, and
  `api-playground.mdx` were updated). The product's playground registry
  (`apps/web/.../api-playground/utils/endpoints/events.ts`) declares the same contract as of the
  release commit, so regeneration is idempotent; `audit-seo-migration.mjs`'s expected noindex count
  moved 148 → 149 with it.
- **`analytics-read-api.mdx`** gained a short event-log paragraph pointing at the generated
  reference.

**Current sync marker:** product commit `0a685b0067eaa8a33bcd60bb2b12b940e9ae7641`
(`feat(events): table-first event activity explorer (0277)`, 2026-08-03) — the explorer product
change landed and deployed in the same wave; the marker advances to it.

## 10h. Product-sync pass (2026-08-04 — Dashboard listing UX, released as `10e1b81`)

Documented the **dashboard listing UX** change (product decision 0280):

- **`custom-analytics-dashboards.mdx`** — the create step now states the scope separation (site
  dashboards appear only on the site's page; organization dashboards appear only on the
  organization-level **Dashboards** page) and the shared list view's name search and sort control
  (recently updated, name, card count).

No navigation or API reference impact: no endpoint, route, or page ownership changed.

**Current sync marker:** product commit `10e1b81ece445f07398bc18dd02e25336119eec0`
(`feat: dashboard listing UX — scope separation, shared list view (0280)`, 2026-08-04) — the
product change landed and deployed in the same wave; the marker advances to it.

## 10i. Product-sync pass (2026-08-04 — Workflows and notification destinations)

Audited all **26 product commits** after `10e1b81` through `b6c5780`. The latest deployed
customer application commit is `c2c3cb7`; `b6c5780` is its deployment-record commit. The production
`/api/health/workflows` endpoint reported `enabled: true`, and `/settings/destinations` resolved
successfully during this pass.

- **Workflows v1** (`4551f4e`, enabled by `baee911`) — added a complete public guide for event
  triggers, frequency limits, delay/condition/notify/exit steps, draft autosave, testing, publish
  impact, immutable versions, lifecycle states, runs, metrics, retries, at-least-once delivery,
  permissions, and the 20-active-workflow site limit. The design-review sequence
  `a8919a8`–`83a2351` and the destination-visibility fix `b3e4cce` are reflected in the current UI
  instructions rather than documented as transient changes.
- **Notification destinations** (`c2c3cb7`) — added an organization-wide setup and management
  guide and corrected Alerts, Uptime, Site settings, Roles, and Workflows to point to the global
  **Notification destinations** page. The earlier same-day site-settings move (`26c9942`) was
  superseded before this sync and is deliberately not documented as current behavior.
- **Workflow API-key scope** — added **Workflows** to the API permission table and documented the v1
  boundary: scoped keys may read workflow definitions, runs, and metrics, while every mutation
  still requires an owner/admin cookie session. The generated playground does not list workflow
  routes yet.
- **Session-entry attribution follow-up** (`3833af5`) — tightened Referrer Exclusions guidance to
  use the narrowest workflow host and warn that excluding a broad domain such as `google.com`
  erases legitimate search attribution. The existing acquisition and session pages already
  described the entry-pageview and first-touch behavior, so no further rewrite was needed.
- **Generated API reference** — regenerated `openapi.json` after the playground registry changed
  “notification channels” to the current user-facing “notification destinations” description. The
  endpoint count remains **149 published across 29 groups**.

Reviewed with **Public docs impact: none**: deployment-record-only commits `0c57665`, `606217c`,
`0927bc6`, `e6d9d62`, `75caa82`, `ee98ead`, and `b6c5780`; the compose flag passthrough
`1f0ee82`; and implementation or localization follow-ups whose durable customer-visible result is
already covered by the Workflows and Notification destinations pages above.

**Current sync marker:** product commit `b6c5780328cfad391a869d176f66066482f27aa8`
(`docs(deploy): record notification-destinations release c2c3cb7`, 2026-08-04). The latest deployed
customer application commit at this marker is `c2c3cb72645803ac05051083b064e993a9c21730`.

The local product checkout also contains `bf8ee39` (`fix(workflows): don't flag a conflict when
publish bumps updatedAt`) one commit ahead of `origin/main`. It has no deployment record and is not
documented as shipped or included in this sync marker; audit it again after it lands and deploys.

## 10j. Product-sync pass (2026-08-05 — Workflows UX v2)

Audited product commits `b6c5780..11300b3`:

- **Workflows UX v2** (`11300b3`, product decision 0282) — rewrote the creation and editing
  walkthroughs in `analytics-workflows.mdx`: "Start from a template" became **Create a
  workflow** (the three-step guided dialog — template gallery, essentials with inline
  destination connect, review & turn on — with the would-have-run estimate and the
  saved-as-draft dismissal behavior); the trigger section now describes the collapsed trigger
  card, the Filters/Repeat-limit panel sections, and corrects the frequency default to the
  runtime truth (**no repeat limit = runs on every match** — the previous "defaults to once per
  session every 60 minutes" line described a v1 display bug, not behavior); step names follow
  the product vocabulary (**Wait** / **If** / Notify / Exit) with name/description/error
  handling under **Advanced**; a new **Read a workflow at a glance** section covers the
  view-first detail page and the draft-opens-in-editor rule; publishing is **Publish changes**
  (or **Turn on** for a first activation) with the sentence-plus-estimate dialog and its
  **Details** disclosure; lifecycle actions are documented on both the list and the workflow
  page's menu, with version numbers scoped to the list and runs.
- Reviewed with **Public docs impact: none**: `bf8ee39` (conflict-banner false positive on
  publish — makes the already-documented "Reload latest" contract behave as written) and the
  deployment-record commit `cf25553`.

Workflows have been **live in production since 2026-08-04** (product deploy record `baee911`
set `WORKFLOWS_ENABLED=true`), so this page is customer-visible and describes the v2
experience. `11300b3` is committed but not yet pushed or deployed — prod currently runs the v1
editor this pass's walkthroughs replace — so **publish this docs update together with the
product web deploy of `11300b3`**, not before it (0276: neither side is release-complete
alone).

**Current sync marker:** product commit `6ab578b` (`feat(heatmaps): click/rage-click/scroll
maps, coordinate-only (0287)`, 2026-08-10). Audited 11300b3..6ab578b: the only
customer-visible changes were the 0285 onboarding docs-link swap (docs-side no-op — the
links point INTO this site and all 27 targets were 200-verified product-side), the 0286
overview read-performance work (internal, no behavior change), and the 0287 heatmaps
feature documented in this pass ([website-heatmap-analytics.mdx](website-heatmap-analytics.mdx)).

## 10k. Product-sync pass (2026-08-10 — heatmap integration and first-party proxy)

Fetched `origin/main` and audited every committed product change after `6ab578b` through
`db807b8`:

- **Module integration matrix** (`b635fb5`, decision 0288) — internal release-process guidance.
  Reviewed with **Public docs impact: none**, matching the commit's explicit classification.
- **Heatmap integration follow-up** (`1074eee`, decisions 0287/0288) — the three heatmap GET routes
  now require **Analytics: Read** for a restricted API key; the dashboard has the Heatmaps browser
  title and a page-context starter; and the first-party proxy contract now carries
  `/api/site/:siteId/tracking-config`, `/script-heatmap.js`, and `/api/heatmap`. Updated
  `website-heatmap-analytics.mdx`, `api-reference/api-authentication.mdx`, and
  `api-reference/analytics-read-api.mdx` for the permission and proxy behavior.
- **Heatmaps deployment record** (`db807b8`) — records `1074eee` as live. Reviewed with **Public
  docs impact: none** beyond treating the already-documented behavior as shipped.

Closed an older public coverage gap at the same owner boundary: the product has had a verified
first-party proxy contract and a **Custom Domain (Proxy)** snippet builder since decisions
0127/0128, but the public install page still said the guide was "being added." Added
`first-party-analytics-proxy.mdx` with the strip-prefix contract, provider recipes, the
`X-Real-IP` / **First-party proxy** accuracy rule, split delivery through `data-api-host`,
verification, and heatmap/flag/survey lazy-path coverage; added it to **Set up tracking** and linked
it from the install and heatmap pages.

The product playground registry contains 196 operations. Updated the generator's public curation
to publish the three customer-facing heatmap reads and regenerated `openapi.json`: **149 → 152
published endpoints, 29 → 30 groups**. The SEO operation-count guard and current API overview,
read API, and playground counts moved with it. Uncommitted product working-tree changes remain
outside this marker and were not treated as shipped.

**Current sync marker:** product commit `db807b88a01c0ac0bf8b89cc730344a10880b797`
(`docs(deploy): record heatmaps release 1074eee (0287)`, 2026-08-10).

## 10l. Product-sync pass (2026-08-10 — Session replay, decision 0289)

Audited the committed product changes after `db807b8` through `49ba3df`:

- **Dual-track accuracy run notes** (`49ba3df`) — internal wiki-only test documentation
  (`wiki/data-accuracy.md`, `wiki/ideas.md`, `wiki/log.md`). **Public docs impact: none.**

Documented **session replay** (product decision `0289-session-replay.md`, spec
`PRD-session-replay.md` v1.2) against the decision record and
`wiki/architecture/session-replay.md`, with UI labels and defaults verified in the product
source (`replay-settings-card.tsx`, `replay-capture.ts`, `replays/page.tsx`):

- **New [session-replay.mdx](session-replay.mdx)** (Web Analytics → Behavior & conversion, next
  to Heatmaps) — rrweb playback framed privacy-first: off by default; input masking as a
  non-configurable floor (passwords/emails masked in the browser); strict all-text masking
  default with the Standard opt-down; `ta-mask`/`ta-block`/`ta-ignore` element hooks;
  deterministic per-visitor sampling (default 100%); the optional consent gate with
  `tinyanalytics.grantReplayConsent()` and the plain EU/ePrivacy consent-required statement;
  limits (1,000 recordings/site/month in early access, 30-minute recording cap, 50 MB/session,
  30-day retention); the two-part enablement (site toggle + operator early-access grant) framed
  honestly as gated early access; member-only viewing (never on public dashboards/share links);
  the Engagement → Replays list and player (speed presets, skip-inactive, seekable timeline,
  gap shading, masking badge, error deep-links); GDPR user-erasure and site-deletion purges;
  the residual in-recording URL caveat.
- **New [session-replay-troubleshooting.mdx](session-replay-troubleshooting.mdx)** (same group,
  next to the feature page — no dedicated troubleshooting group exists) — the "no replays
  appearing" checklist: toggle, early-access grant, deterministic sampled-out own-browser case,
  ungranted consent, monthly cap, CSP (`script-src` for `/script-replay.js`, `connect-src` for
  `POST /api/replay`, with a concrete policy line), web-only (React Native sites never record),
  and no-full-snapshot/short-session/expiry cases.
- **Extended [first-party-analytics-proxy.mdx](first-party-analytics-proxy.mdx)** — added
  `/script-replay.js` + `/api/replay` to the forwarded-paths table, a new
  "Allow the proxied paths in a Content-Security-Policy" section (same-origin `'self'` policy,
  explicit subdomain origin, no-proxy `dash.tinyanalytics.io` variant), and a CSP symptom row
  in the troubleshooting table.

Deferred, recorded here so the gaps aren't silent: the decision's self-host storage walkthrough
(open question #10 — self-hosting is not documented until it exists; the cloud product needs no
customer-side storage setup); replay read-endpoint reference pages (the product's published
OpenAPI curation does not yet include the replay routes); and cross-references from
`website-heatmap-analytics.mdx`, `javascript-error-tracking.mdx`, `session-analytics.mdx`, and
`resources/analytics-data-handling.mdx` (heatmaps file is owned by an in-flight concurrent
edit; add the links in a follow-up pass).

**Current sync marker:** unchanged at product commit
`db807b88a01c0ac0bf8b89cc730344a10880b797` for released work; the intervening `49ba3df` was
audited with no public docs impact. **Session replay is documented against decision `0289` with
its product commit pending** — the implementation is uncommitted in the product working tree at
the time of this pass. Do NOT treat these pages as release-complete, and advance the marker to
the session-replay commit SHA, once it lands and deploys (0276 paired gate). **RESOLVED
2026-08-11: session replay deployed to production as `0abb477`+ (2026-08-10, release table
row in the product wiki) — these pages are release-complete; the sync marker below now
covers them.**

## 10m. Product-sync pass (2026-08-11 — Person attributes, decision 0292)

Audited the committed product changes after `db807b8` through `2866629` (product HEAD). The
person-attributes wave is committed but **not yet deployed**; per the 0276 paired gate the
marker stays held (session replay above is also held).

- **A0 security gate** (`21785b8`, decision 0291) — the three `user-traits/*` reads are now
  member/`users:read`-gated (they were anonymous-open on public sites); scoped keys without
  `users:read` get a 403 naming the scope. Documented in
  `api-reference/api-authentication.mdx` and the regenerated OpenAPI descriptions.
- **Phase A** (`591bb4d`) — MCP `get_user_traits` + `merge_user_traits` tools (catalog 54 → 57,
  defaults 47 → 50), `PATCH /sites/:id/users/:userId/traits` merge write with RFC 9457 errors,
  `totalIdentified` on keys, `values?q=` search. Documented in `mcp-server.mdx`, the regenerated
  `openapi.json` (152 → 153 published endpoints, 30 groups), `rate-limits-cors.mdx`, and
  `user-identification-analytics.mdx` (write-surface table + connector contract).
- **Filter engine** (`97f3d48`) — `trait:<key>` filter dimension: identified-only, current-value,
  8 ops no regex, caps (4/query, 200-char key, 10k `TRAIT_FILTER_TOO_BROAD`), members-only access
  boundary. Documented in `analytics-filters.mdx` and `analytics-read-api.mdx` (+ the `filters`
  param description in `openapi.json`).
- **Web UI + decision 0292** (`a39ae5f`) — People-group picker, editable chip, status banner,
  Traits Explorer actions + coverage. Covered by the `analytics-filters.mdx` entry and the
  `user-analytics.mdx:76` drift fulfillment ("Segment by trait" was aspirational; now true).
- **check_tracking probe + setup.md** (`2866629`) — `check_tracking` gains `trait_key`; product
  `setup.md` + `llms.txt`/`mcp.md` updated product-side (agent front doors; tool-count drift
  47 → 50 corrected). Documented in `mcp-server.mdx` and the identify verification recipe;
  product-side front-door changes need no docs-repo change.
- **Privacy boundary (0292 §11)** — the blanket "no cookie banner" claim scoped to anonymous
  mode in `privacy-friendly-analytics-gdpr.mdx` and `react-native-analytics.mdx` (index,
  quickstart, how-it-works, GTM were already scoped); lawful-basis guidance added to
  `user-identification-analytics.mdx`.

**Current sync marker:** product commit `8c85147` (pages entry/exit completion, decision 0296,
audited through `7a32b77` + the deploy's url-mode fix `8c85147`) — **deployed to production
2026-08-13** (api+web; release-table row in the product wiki; live-verified on public site 229
including the exit-rate suppression semantics these pages document). The paired pages
(`page-analytics.mdx`, `analytics-alerts.mdx`, `analytics-filters.mdx`, `/exit-pages` in
`openapi.json`) are validated (mint validate + broken-links green) — the 0276 gate is met for
this wave. Prior marker `2866629` (person-attributes wave) — **deployed to
production 2026-08-11** (api+web; release-table row in the product wiki), advanced from
`db807b88a01c0ac0bf8b89cc730344a10880b797`
through `2866629` (covering session replay `0abb477`+, deployed 2026-08-10, per §10l's
resolution). **Recorded gap, not silent:** page-presence (product decision `0290`, deployed
`2d69a9f`) still has NO dedicated docs pages — the held batch; document it and note it here
when that pass runs. The follow-up deploy-record commit `8647919` is docs-only
(`Public docs impact: none`).

---

## 11. Assumptions & open questions

| #   | Assumption / question                         | Working default                                                                                                          | Needs confirmation                                                                                                            |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | Docs domain                                   | `https://tinyanalytics.io/docs`                                                                                          | Resolved by owner (2026-07-30). Use this base for skill installation and canonical URLs.                                      |
| 2   | Cloud is the only offering                    | Confirmed by owner (2026-07-16): closed-source, hosted-only; public pricing page verified in product source (2026-07-30) | Resolved for current billing-doc scope.                                                                                       |
| 3   | Brand accent color                            | Green — updated by owner (2026-07-27): `#006420` for light mode and `#009B32` for dark mode                              | Resolved.                                                                                                                     |
| 4   | Integration guide breadth for v1              | Top ~12 now, long tail later                                                                                             | Which platforms matter most to the audience?                                                                                  |
| 5   | Screenshots                                   | Needed for dashboard/feature pages                                                                                       | Who captures them / from which instance (demo seed)?                                                                          |
| 6   | API reference source                          | Hand-authored v1                                                                                                         | Is there an OpenAPI spec to auto-generate from later?                                                                         |
| 7   | Assistant external sources                    | None initially                                                                                                           | Any external sites the assistant should also search?                                                                          |
| 8   | Product name casing                           | **TinyAnalytics** everywhere in prose and metadata                                                                       | Resolved by owner (2026-08-04); technical identifiers remain lowercase.                                                      |
| 9   | Slack + repo access for the agent/automations | Deferred to Phase 7                                                                                                      | Which repo triggers doc-update PRs; Slack workspace access.                                                                   |
| 10  | Self-hosting may ship someday                 | Not documented until it exists                                                                                           | If the product open-sources or ships a self-host tier, add a Self-hosting tab then (the v1.0 draft of this PRD sketched one). |

---

## 12. Acceptance criteria (definition of done, per phase)

- Nav matches §5; zero broken links; every page has `title` + `description`.
- Each how-to has a Verify step and a Related block; each concept states its limits.
- Quickstart validated end-to-end against a real instance (≤ 6 steps, < 5 min).
- No page documents an unshipped feature (§9 checked against `wiki/features.md`).
- Contextual menu + assistant configured; `llms.txt` spot-checked for coverage of the top intents.
- Voice pass: pages read cleanly by headings alone; specifics over adjectives; one voice throughout.

---

## Appendix A — Source-to-page mapping (starter set)

The wiki is the behavioral spec; these are the primary sources per doc area. (Wiki paths are relative to `../tinyanalytics/wiki/`.)

| Doc page / area                                           | Primary wiki source(s)                                                                                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| How it works; Architecture                                | `architecture/overview.md`, `architecture/ingestion-pipeline.md`, `architecture/api-server.md`, `architecture/web-dashboard.md`                    |
| The tracking script; Script config; SPA                   | `architecture/tracking-script.md`, decisions 0012, 0013                                                                                            |
| First-party proxy / custom domain                         | `docs/proxy-guide.md`, decisions 0127, 0128, 0155, 0210                                                                                            |
| Custom events; auto-capture; downloads; engagement; 404   | decisions 0110, 0135, 0134, 0136, `algorithms/event-list.md`                                                                                       |
| Identify / cookieless identity                            | `concepts/cookieless-identity.md`, `algorithms/cookieless-identity-derivation.md`, decisions 0045, 0146                                            |
| Proxy / custom domain                                     | `docs/proxy-guide.md` (product), decisions 0127, 0128                                                                                              |
| Overview / metrics / comparison                           | `algorithms/overview-metrics.md`, `algorithms/timeseries-bucketing.md`, decisions 0149–0151                                                        |
| Sessions / Users / Journeys / Retention / Funnels / Goals | `algorithms/session-list.md`, `algorithms/journeys.md`, decisions 0046, 0047, 0068, 0065, 0055                                                     |
| Bots & AI crawlers; AI traffic                            | `algorithms/bot-detection.md`, decisions 0084–0086, 0147, 0148, 0167                                                                               |
| Performance / Web Vitals                                  | decisions 0056, 0057, 0080                                                                                                                         |
| Segments / Cohorts                                        | decisions 0141, 0145; `algorithms/behavioral-cohorts.md`                                                                                           |
| Feature flags / Experiments                               | `algorithms/flag-evaluation.md`, `algorithms/experiment-results.md`                                                                                |
| Surveys                                                   | `algorithms/surveys.md`, decision 0144                                                                                                             |
| Custom dashboards / SQL query                             | `algorithms/dashboard-cards.md`, `concepts/scoped-sql-query.md`, decisions 0090, 0114, 0115, 0219                                                  |
| Group / B2B analytics                                     | `algorithms/group-analytics.md`, decisions 0154, 0156, 0157                                                                                        |
| Revenue / Stripe                                          | `algorithms/revenue-normalization.md`, `architecture/stripe-revenue.md`, decisions 0140, 0216                                                      |
| Organization overview                                     | decisions 0076, 0217; `apps/web/src/app/overview/`                                                                                                 |
| Reports / Alerts / Uptime                                 | `algorithms/scheduled-reports.md`, `algorithms/analytics-alerts.md`, `algorithms/uptime-monitoring.md`, decisions 0131–0133, 0138, 0116–0119, 0221 |
| Shortlinks                                                | `architecture/shortlinks.md`, decision 0159                                                                                                        |
| Data dictionary                                           | `concepts/data-dictionary.md`, decision 0158                                                                                                       |
| Import (GA4 / Plausible / Umami)                          | `algorithms/import-mappers.md`, `algorithms/plausible-reconstruction.md`, decisions 0153, 0113                                                     |
| Public dashboards / embed / widget                        | decisions 0089, 0105, 0126                                                                                                                         |
| Accounts / orgs / teams / roles                           | decisions 0071–0077, 0083, 0112                                                                                                                    |
| Billing & plans                                           | decision 0152                                                                                                                                      |
| How your data is handled (Resources, trust-level)         | `architecture/overview.md`, `architecture/data-model.md`, `concepts/cookieless-identity.md` — concepts only, no operational detail                 |
| API reference / playground                                | `architecture/api-server.md`, decisions 0017–0021, 0051, 0093, 0222                                                                                |
| Channels / geo / definitions                              | `algorithms/channel-classification.md`, `algorithms/geo-enrichment.md`, decisions 0006, 0155                                                       |
| React Native / mobile                                     | `architecture/react-native-sdk.md`, decision 0165                                                                                                  |

---

## Appendix B — Competitor IA references (for benchmarking, not copying)

- **Plausible** (task-oriented): Get Started · Website Settings · Stats Dashboard · Goals and Events · Bypass Adblockers · APIs & Data Access · Account · Team · Billing.
- **Umami** (feature-oriented): Introduction · Quickstart · Configuration · Tracking (functions, config, events, IDs, tags, links, pixels) · Filtering (sessions, replays, performance, breakdown, goals, funnel, journey, retention, UTM, revenue, attribution) · Boards · Teams · Reference (metric definitions, integrations).
- **TinyAnalytics** takes the _superset_: task spine (Plausible) for setup + feature spine (Umami) for the dashboard + its own advanced product-analytics/ops tier that neither documents in depth.
