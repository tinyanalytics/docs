# PRD — tinyanalytics documentation (AI-native, Mintlify)

**Status:** Draft v1.2 (execution underway) · **Owner:** Docs · **Last updated:** 2026-07-17
**Repo:** `tinyanalytics-docs` (Mintlify) · **Product repo:** `../tinyanalytics`
**Reference (behavioral spec only):** `../rybbit/rybbit/docs` · **Competitor refs:** Plausible, Umami

---

## 1. Summary

Build the public documentation for **tinyanalytics** — privacy-friendly, cookieless web **and** product analytics, offered as a hosted service at `dash.tinyanalytics.io` — as an **AI-native** Mintlify site. The product is **closed-source and hosted-only today**: these docs document the cloud product, and self-hosting is explicitly out of scope (§9). "AI-native" here means the docs are engineered so that both humans *and* AI tools (the in-docs assistant, the writing agent, `llms.txt`, `skill.md`, the hosted MCP server, IDE assistants) can answer questions accurately and act on them. The content is authored from the product's own knowledge base (`../tinyanalytics/wiki`), organized with a task- and feature-based information architecture drawn from the best of Plausible and Umami, and written to a single, disciplined voice.

This PRD defines **what** to document, **how** to structure and write it, and **what** to configure for the AI layer. It does not write the pages — it is the plan the page-building work executes against.

### Why now
The site is currently the empty Mintlify starter (two placeholder pages). The product, by contrast, ships a large, mature feature surface (§4). Every day without docs is friction on adoption and on migration off Google Analytics. And because the product is closed-source, the docs carry a burden open-source competitors outsource to "read the code": they are the **only** place a privacy-conscious buyer can verify how the mechanism works. AI-native docs additionally reduce support load: the assistant deflects questions, and `skill.md`/MCP let users' own AI tools drive tinyanalytics correctly.

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
| Metric | Target |
| --- | --- |
| Quickstart completion (add site → first event) | < 5 min, ≤ 6 steps |
| Feature coverage vs `wiki/features.md` | 100% of user-facing rows |
| Assistant deflection (top-20 questions answered from docs) | ≥ 90% |
| Every page has `title` + `description` frontmatter | 100% |
| Broken internal links / 404s in nav | 0 |
| Pages that "make sense read by headings alone" (F-pattern) | 100% |

---

## 3. Audience & positioning

### Primary readers (psychographic, not demographic)
1. **The privacy-conscious site owner** — wants GA-grade insight without cookie banners, GDPR risk, or handing data to Google. Values: ownership, simplicity, ethics. Often solo founder, indie hacker, agency.
2. **The developer installing the tracker** — needs the snippet, the framework guide, the event API, and a way to verify it works. Values: correct copy-paste, no surprises, small script.
3. **The privacy & compliance evaluator** — a DPO, agency, or founder vetting the GDPR/cookie-banner story before rollout. Can't audit the source (closed), so the docs must answer precisely: what is stored, what never is, how identity works. Values: precision, honesty, citable answers.
4. **The product analyst / growth engineer** — uses funnels, cohorts, experiments, flags, surveys, revenue, B2B group analytics. Values: depth, accuracy of definitions, trust in the numbers.
5. **The migrator** — leaving GA4/Plausible/Umami, worried about losing history. Values: "I keep my data," low switching cost.

### Awareness stage (Schwartz)
Docs readers are **product-aware** or **most-aware** — they already have or are evaluating tinyanalytics. Implication: pages lead with *how to do the thing* and *what it means*, not with *why analytics matters*. Persuasion lives in **descriptions, intros, and comparison pages**, not in every how-to.

### Positioning statement (the docs' throughline)
> tinyanalytics gives you Google-Analytics-grade web **and** product insight — cookieless, privacy-first, and honest about its mechanisms — without a cookie banner or a data-sharing bargain.

### The single promise (repeat, don't dilute)
**"Understand your traffic and your product without tracking people."** Cookieless by design: visitors are counted with a rotating, unstored hash — nothing personal to leak or consent to. Every intro, the Introduction page, and the comparison pages ladder back to this.

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

Authoritative source: `../tinyanalytics/wiki/features.md` + the decision log (`wiki/decisions/`). The clone documents **only what tinyanalytics ships**. Rybbit's `docs/content` tree is a *coverage checklist* (which topics exist), never a source of prose or structure.

### 4.1 Shipped, user-facing capabilities (must document)

**Setup & tracking**
- Cloud onboarding: sign up at `dash.tinyanalytics.io`, add a site, install the snippet
- Tracking script (`/script.js`, < 6 KB gz), `data-*` configuration, SPA route tracking
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
- Pages, Sessions (+ detail/timeline), Events explorer (log, custom events, event types, downloads), Users (+ profiles + traits explorer)
- Journeys (Sankey), Retention, Funnels, Goals, Performance (Core Web Vitals)
- Bots & AI crawlers, AI traffic report, Google Search Console, Map/Globe
- Filters, Saved segments, Behavioral cohorts, Period comparison (previous / year-over-year), Chart annotations, CSV/PDF export
- Date-range presets, browser-timezone querying

**Product analytics (advanced tier)**
- Feature flags, Experiments (A/B), Surveys (NPS/feedback), Custom dashboards (editor + SQL cards), SQL query builder, Group / B2B analytics (+ group retention)

**Monitoring & automation**
- Scheduled email reports (subscriptions), Analytics alerts (email/Slack/Discord/webhook), Uptime monitoring (monitors, incidents, notification channels), Shortlinks

**Data management & sharing**
- Data dictionary (event/property/trait catalog), Data import (GA4 live pull, Plausible, Umami)
- Public dashboards (share links), Dashboard embed (iframe), Live-visitors widget

**Accounts & administration**
- Account settings (name, password, API keys, delete), Organizations & members, Teams & site-access control, Organization switcher
- Per-site config (exclusions: bots/IPs/countries/paths), Tracking settings
- Invitations, Email verification, Password reset, Email preferences / one-click unsubscribe
- Billing & plans (Free / Growth / Business; read-time retention limits)

**Developer / API**
- Tracking API (`POST /api/track` wire contract), Identify API
- Read/analytics API (overview, timeseries, breakdown, sessions, events, and the broader read surface)
- Scoped SQL query endpoint, API keys (ingestion), API playground, rate limits & CORS

**Concepts & reference (the "why it's trustworthy" layer)**
- Cookieless identity model (one model: `sha256(ip+ua)`, `identify()` backfill, session window)
- Bot detection (UA + ASN + client signals), Channel attribution, Geo enrichment
- Metric definitions / glossary, Privacy & GDPR posture, Comparison vs GA4/Plausible/Umami/Rybbit

### 4.2 Integration guides (breadth matters for SEO + adoption)
Port the *topic list* from Rybbit's `guides/` as a checklist; write original install steps against tinyanalytics' snippet. Grouped in §5. Target set (v1 aims for the high-traffic ones first):
- **Frameworks:** Next.js, React (Vite/CRA), Gatsby, Remix, Vue, Nuxt, Svelte, SvelteKit, Angular, Astro
- **CMS / builders:** WordPress, Webflow, Framer, Ghost, Squarespace, Carrd, Bubble, Wix-style
- **E-commerce:** Shopify, BigCommerce, PrestaShop, ThriveCart
- **Docs / SSG:** Docusaurus, GitBook, Mintlify, VitePress, Hugo, Jekyll
- **Server-side / tag managers / CMS backends:** Google Tag Manager, Laravel, Drupal, Joomla, TYPO3, Contentful, Sanity, Strapi
- **Mobile:** React Native

---

## 5. Information architecture

Design principles:
- **Task spine for setup, feature spine for the dashboard.** Blend Plausible's task orientation with Umami's per-feature filtering.
- **Progressive disclosure.** Core analytics first (what everyone opens daily); advanced product-analytics tier separated so it doesn't overwhelm the site owner.
- **Front-load meaning** in every nav label (F-pattern): first word carries scent.
- **Sentence case, concise labels; verbs where they aid discovery** ("Track custom events" > "Custom events" when it's a how-to).
- **Descriptions carry the promise** (and feed `llms.txt`/search).

Mintlify structure: **tabs** at the top, **groups** within, nested pages where depth helps. Proposed tabs: **Get started · Guides · Integrations · API reference · Resources**. (Account/billing folds into Guides; there is no Self-hosting tab — the product is hosted-only, §9. The trust content a self-host section would have carried — architecture, security, data handling — lives in Resources at concept level.)

### Tab: Get started
- Introduction — what tinyanalytics is, the privacy promise, web + product analytics in one
- Quickstart — add a site, install the script, see your first event (≤ 6 steps)
- How tinyanalytics works — ingestion → dashboard, cookieless identity in plain terms
- Switch from Google Analytics / Plausible / Umami — the migration overview (links to import)

### Tab: Guides

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
- Google Search Console
- Map & globe
- Filters
- Saved segments
- Behavioral cohorts
- Compare periods (previous & year-over-year)
- Annotations
- Export data (CSV & PDF)

**Group — Product analytics**
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
- **Server-side & tag managers** (Google Tag Manager, Laravel, Drupal, Joomla, TYPO3, Contentful, Sanity, Strapi)
- **Mobile** (React Native)

### Tab: API reference
- Introduction & authentication (session cookie for reads, API key for ingestion — call out the distinction; decision 0093)
- Tracking API (`POST /api/track` — the discriminated-union wire contract)
- Identify API
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
- tinyanalytics vs Google Analytics / Plausible / Umami — honest framing: Plausible and Umami are open source and tinyanalytics is not; the docs answer the resulting trust question with mechanism-level transparency, never by dodging it
- Use these docs with AI (install the skill, connect the MCP server, ask the assistant)
- Changelog

---

## 6. Content standards & templates

### 6.1 Page frontmatter (required on every page)
```yaml
---
title: "Track custom events"        # concise, sentence case, verb-led for how-tos
description: "Send named events with properties to measure the actions that matter — signups, clicks, purchases."  # the promise; feeds llms.txt, search, assistant
icon: "cursor-click"                 # optional, Lucide/FontAwesome
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
- **Specifics over adjectives** — "< 6 KB gzipped," "counts distinct sessions every second," not "blazing fast." No praise adjectives ("seamless," "powerful").
- **Show the mechanism** where trust is at stake (identity, bots, privacy) — the reason-why is the persuasion.
- **State limits honestly, in-product** — mirror the wiki's discipline (e.g. AI report is click-throughs only; import region breakdowns have known losses). Honesty *is* the credibility.
- Bold for UI elements ("click **Add website**"); code font for files, commands, paths, endpoints.
- Every how-to ends with a **Verify** step and a **Related** links block (also strengthens internal linking for AI + SEO).

### 6.4 Components to standardize on
- `<Steps>` for sequences · `<CodeGroup>` for framework/language variants · `<Tabs>` for one-of-N reader choices (e.g. script tag vs npm) · `<Accordion>`/`<AccordionGroup>` for troubleshooting & FAQs · `<Card>`/`<CardGroup>` for hub pages · `<Note>`/`<Warning>`/`<Tip>` for asides · `<ParamField>`/`<ResponseField>` for API reference · `<Frame>` for screenshots.
- `<Prompt>` component on the "Use these docs with AI" page for the skill-install command (§8.3).

---

## 7. AI-native requirements

The thesis: **most AI-native features are automatic once deployed on Mintlify — the work is feeding them good content and turning on/tuning the right config.**

### 7.1 Automatic (hosted by Mintlify — no build work, but content-quality-dependent)
- **Markdown to agents** — every page serves as Markdown (`.md` URL) to AI tools; lower tokens, faster processing.
- **`llms.txt` / `llms-full.txt`** — hosted automatically; quality is a direct function of page `title` + `description` (§6.1). *Action: enforce descriptions everywhere.*
- **`skill.md`** — hosted automatically; lists doc capabilities for agents.
- **Hosted MCP server** — users connect the docs to their AI tools for up-to-date product answers.
- **Semantic search + 404 suggestions** — intent-based, no config.

> Because these are generated *from* our content, the AI-native quality bar is really a **content quality bar**: complete coverage (§4), strong descriptions (§6.1), dense internal links (§6.3), and honest, mechanism-level explanations.

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
A dedicated Resources page, "Use these docs with AI," embeds the install prompt (§8.3) and explains the MCP connection + assistant. This turns readers into users whose *own* AI tools drive tinyanalytics correctly.

---

## 8. Technical configuration plan

### 8.1 `docs.json`
- `name`: "tinyanalytics" (currently "Mintlify Starter Kit").
- `colors`: adopt the product's indigo accent (decision 0041) — replace the green starter palette. Confirm exact hex from `../tinyanalytics/DESIGN.md`.
- `logo` / `favicon`: replace starter assets with the tinyanalytics ascending-bars mark (light/dark).
- `navigation`: implement §5 (tabs → groups → pages).
- `navbar`: primary CTA → the app (`https://dash.tinyanalytics.io`); links → GitHub, Support.
- `footer.socials`: tinyanalytics' real handles (replace Mintlify's).
- `contextual`: finalize per §7.3.
- SEO/metadata: set site-level `description` and OpenGraph defaults (the OG-image gap is noted in decision 0041/0101 — provide one).

### 8.2 `AGENTS.md`
Replace the placeholder with tinyanalytics specifics:
- **Terminology:** "site" (a tracked website) vs "organization" vs "team"; "event" types; "cookieless identity"; product name lowercase **tinyanalytics**.
- **Content boundaries:** the product is **hosted-only** — never document self-hosting, installation, or operator internals (admin console, instance ops); don't document unshipped features (§9); don't expose internal decision-record reasoning as user docs; API keys authenticate ingestion only (never reads).
- **Point at the project skills** (§8.5) so any AI tool loads them before editing.
- **Style:** the §6.3 rules.
- **Sources of truth:** `../tinyanalytics/wiki/features.md`, the decision log, and the product README — never invent behavior; when unsure, cite the wiki.

### 8.3 Skill-install prompt (`<Prompt>` component)
On "Use these docs with AI":
```mdx
<Prompt description="Install the tinyanalytics docs skill for your AI tools." actions={["copy", "cursor"]}>
npx skills add https://docs.tinyanalytics.io
</Prompt>
```
*(Domain assumption in §11.)*

### 8.4 `.mintignore` / housekeeping
- Keep `PRD.md`, `README.md`, drafts out of the published build (extend `.mintignore` as needed). `.agents/` is auto-ignored by Mintlify, so the skills never publish.

### 8.5 Project skills (`.agents/skills/`) — ✅ shipped with this PRD revision
Two in-repo skills, so any AI tool editing these docs (Claude Code, Cursor, the Mintlify agent) picks up both the platform mechanics and this project's rules:
- **`.agents/skills/mintlify/SKILL.md`** — the official Mintlify authoring skill (MIT): components, `docs.json` patterns, frontmatter, CLI (`mint dev`, `mint broken-links`, `mint validate`), writing standards, and the research → plan → write → verify workflow.
- **`.agents/skills/tinyanalytics-docs/SKILL.md`** — the project layer: what the product is (hosted-only, closed-source), sources of truth (`../tinyanalytics/wiki`, with the Rybbit reference as a coverage checklist only), **hard content boundaries** (no self-hosting/operator docs, no unshipped features, API keys = ingestion only), the terminology table, voice rules, page archetype shapes, and a pre-submit checklist that extends the Mintlify one.

Layering rationale: the generic skill can be refreshed from upstream (`npx skills add https://mintlify.com/docs`) without touching project rules; the project skill encodes what no upstream skill can know. `AGENTS.md` references both (§8.2).

---

## 9. Out of scope — do NOT document (not shipped)

Per the gap analysis, decision log, and the product's distribution model, these are absent, excluded, or internal. Documenting them would be a correctness bug:
- **Self-hosting, in any form** — the product is closed-source and hosted-only. No installation, Docker/`setup.sh`, environment variables, SMTP/geo-database setup, updating, backup, or reverse-proxy-for-the-platform pages. (The internal compose stack exists for the team, not for users.) The *tracking proxy / custom domain* guide is **in** scope — that's a cloud-customer feature. Revisit this bullet only if a self-host offering actually ships.
- **Admin console & operator internals** — system-admin promotion, email diagnostics, instance ops (decisions 0112, 0123) are internal tooling, not user features.
- **Session replay** — excluded by design (decision 0049; privacy-first fit).
- Anything Rybbit has that tinyanalytics lacks and hasn't built — verify each candidate against `wiki/features.md` before writing.
- Server-side PDF export (tinyanalytics exports client-side).
- Any billing/Stripe checkout flow beyond the shipped plan model (billing ships inert, `BILLING_ENFORCED=false`; document plans/limits as they actually behave, and mark cloud-only where relevant).

**Rule:** if a feature isn't in `wiki/features.md` as user-facing, it doesn't get a page. When in doubt, check the decision record, then ask.

---

## 10. Phasing & milestones

Ship in waves; each wave is independently useful and immediately deployable (Mintlify auto-deploys on merge).

**Phase 0 — Foundations (config, no content debt)** — 🚧 mostly done (2026-07-17)
- ✅ `docs.json` rebranded (name, indigo palette from DESIGN.md, tab/group nav, dashboard CTA, `contextual.display`); favicon replaced with the ascending-bars mark; `AGENTS.md` rewritten; project skills shipped (§8.5).
- ⬜ Pending: dedicated logo asset (the site name currently renders as the wordmark), real footer socials, site-level SEO `description` + an OpenGraph image.

**Phase 1 — The golden path (highest leverage)** — ✅ done (2026-07-17)
- ✅ Introduction, Quickstart, How it works, Install the tracking script, Script configuration, Custom events, Identify users, Verify/troubleshoot. (The "Switch from GA4/Plausible/Umami" migration overview is deferred to Phase 3, alongside import.)
- *Outcome:* a new user can install and see data; assistant/`llms.txt` have real substance.

**Phase 2 — Explore your data (the daily dashboard)** — ✅ done (2026-07-17)
- ✅ First wave: Dashboard overview, Realtime, Pages, Sessions, Users, Events explorer, Journeys, Retention, Funnels, Goals, Filters.
- ✅ Second wave: Performance (Core Web Vitals), Bots & AI crawlers, AI traffic, Google Search Console, Map & globe, Saved segments, Behavioral cohorts, Compare periods, Annotations, Export (CSV & PDF). Guides nav regrouped into four groups (Explore your data · Understand behavior · Acquisition & AI · Filter, save & share). Bot capture and GSC availability confirmed with the maintainer before writing.

**Phase 3 — Migration & data (adoption drivers)** — 🚧 first wave done (2026-07-17)
- ✅ First wave: migration overview (`migrate`), Data dictionary, and four import guides — GA4 (live OAuth pull), Plausible, Umami, Simple Analytics (file uploads). Added a "Manage data" group to Guides. Simple Analytics import added beyond the original three (it ships in the product).
- ✅ Second wave: Accounts & access group — Account settings, Organizations & members, Teams & site access, Roles & permissions, Invitations. Documents the current converged behavior (multi-org switching per 0083, emailed invitations per 0087, teams as the sole site-access mechanism per 0073–0075).
- ⬜ Deferred: Billing & plans. **Depends on open question #2** (is signup open / pricing page live) and shipped with billing not enforced (decision 0152) — confirm before writing.

**Phase 4 — Integrations breadth** — 🚧 second wave done (2026-07-17)
- ✅ First wave: Integrations tab + Overview and the top platforms — Next.js, React, WordPress, Webflow, Shopify, Google Tag Manager. Batch-authored from one template.
- ✅ Second wave (long tail): Frameworks — Vue, Nuxt, Astro, SvelteKit, Gatsby, Remix, Angular; CMS & builders — Ghost, Squarespace, Framer, Carrd, Bubble; Docs & static sites (new nav group) — Hugo, Jekyll, Docusaurus, VitePress; E-commerce — BigCommerce; Server-side — Laravel, Drupal. 19 pages, same template, platform placement stated accurately (e.g. Astro `is:inline`, Gatsby `<Script>`, plan-gating for Squarespace/Carrd).
- ⬜ Remaining candidates (later, if demand warrants): E-commerce (PrestaShop, ThriveCart); Server-side & tag managers (Joomla, TYPO3).
- 🚫 Deliberately **not** documented as platforms — no fabricated support:
  - **React Native / native mobile** — tinyanalytics ships a browser DOM script (`script.js`), not a mobile SDK. There is no native install point to document; adding one would invent a capability the product doesn't have.
  - **Headless CMSs (Contentful, Sanity, Strapi)** — these have no rendered frontend of their own; the site is served by a framework (Next.js, Nuxt, Astro, …) that already has a guide. Point users to the framework page rather than the CMS.
  - **GitBook / Mintlify** — script injection depends on plan/hosting specifics we can't state as fact; revisit only if we can verify the exact install point.

**Phase 5 — Advanced product analytics & ops** — ✅ done (2026-07-17)
- ✅ **Product analytics** group (6): Feature flags, Experiments (A/B), Surveys, Custom dashboards, SQL query builder, Group & B2B analytics. Sourced from `algorithms/{flag-evaluation,experiment-results,surveys,dashboard-cards,group-analytics}.md`, `concepts/scoped-sql-query.md`, and the tracker public-API table (`architecture/tracking-script.md` — `flag()`/`flagPayload()`/`flags()`, `group()`/`setGroupTraits()`/`resetGroups()`). Citable specifics kept exact: rollout %, exposure-vs-assignment measurement, the ≥30-sample / ≥95%-confidence significance rule, the 5-group-type cap, the 10 s / 1,000-row query caps.
- ✅ **Monitor & automate** group (4): Scheduled reports, Alerts, Uptime monitoring, Shortlinks. Sourced from `algorithms/{scheduled-reports,analytics-alerts,uptime-monitoring}.md` and `architecture/shortlinks.md` (decisions 0131–0133, 0138–0139, 0116–0119, 0159/0168). Documents the shipped alert metrics (sessions/users/pageviews/bounce/event count/active accounts — **not revenue**, which isn't wired), the 12 h default cooldown, incident open/resolve on the 2nd consecutive failure/success, and that shortlink clicks are excluded from overview traffic.
- ✅ **Share & embed** group (3): Public dashboards, Embed a dashboard, Live-visitors widget. Sourced from decisions 0089 (widget + embed-stats), 0105 (`/share` full-dashboard link), 0126 (embed UX: theme/hideSidebar, keyless-public sentinel, private link key). Public/private bearer-link model stated plainly.
- 13 pages under `guides/`, added as three new Guides groups (Product analytics · Monitor & automate · Share & embed). Build validates with zero broken links.
- 🚫 Not over-claimed: **hideBranding / white-label** — 0126 frames it as a self-host-friendly toggle; on the hosted product its availability may be plan-gated, so the embed docs cover theme + hide-sidebar only and omit branding removal until plan scope is confirmed (ties to open question #2). Alert **segment/filter picker** is carried in the engine but not yet in the dialog (ships site-wide first), so alerts are documented as site-wide.

**Phase 6 — API reference & Resources** — ✅ done (2026-07-17)
- ✅ **API reference** tab (8 pages, new tab with Get started · Ingestion · Reading data · Access & tools groups): Introduction & authentication, Tracking API, Identify API, Analytics read API, Scoped SQL query, API keys, Rate limits & CORS, API playground. Sourced from `architecture/{api-server,ingestion-pipeline}.md`, the actual tracker Zod schema (`apps/api/src/tracker/schema.ts` — exact wire fields/caps, read at source), and decisions 0036 (API-key ingestion + Valkey rate limit), 0096 (API-key Bearer for reads/management), 0090 (scoped SQL), 0050 (CORS). Base URL `https://dash.tinyanalytics.io`; the two-credential model (session cookie vs `Authorization: Bearer <key>`) stated exactly; ingestion returns 204, reads return `{ data }`. Accuracy calls: the `ipAddress`/`userAgent` overrides are documented as **key-gated** (ignored without a valid key); the ingestion rate limit is described as per-key → 429 **without** citing a specific numeric default (it's env-configured, `INGEST_RATE_LIMIT_*`, no citable constant); the read API is documented at the pattern level + the stable core endpoints (not all ~40) with a pointer to the in-product playground for the full surface.
- ✅ **Resources** tab (8 pages, new tab with Reference · How it works · Trust & privacy · AI groups): Metric definitions (glossary), How cookieless identity works, How bot detection works, How traffic is classified, How your data is handled, Privacy & GDPR, tinyanalytics vs GA/Plausible/Umami, Use these docs with AI. Sourced from `concepts/cookieless-identity.md`, `algorithms/{bot-detection,channel-classification,overview-metrics}.md`, `architecture/data-model.md` (confirmed **no raw-IP column** — grounds the privacy claims), and decision 0152 (read-time retention). Trust pages stay at mechanism level per the hosted-only boundary — no infra vendors, no operator internals. Privacy page asserts mechanism, not legal conclusions (explicit "not legal advice / depends on jurisdiction" hedge; no blanket "GDPR compliant" claim). Comparison page is honest about closed-source vs open-source Plausible/Umami and answers the trust question with the mechanism pages rather than dodging it.
- 🚫 **Changelog** page deliberately deferred: there is no verified public product changelog to source, and fabricating release history would violate the no-invention rule. Revisit once a real product changelog/release feed exists (the docs' own `CHANGELOG.md` tracks the documentation site, not the product).

**Phase 7 — AI-native activation & polish** — 🚧 in-repo polish done (2026-07-17)
- ✅ In-repo polish pass across all 95 pages: GEO/SEO frontmatter audit (every page has a title, a standalone benefit-bearing description, and an icon — no gaps), heading-hierarchy check (one H1 per page, no stray body `# ` headings), descriptive-link audit (no "click here"/bare-"here" anchors), and a full `mint broken-links` sweep (zero broken). Removed the 44 internal `{/* TODO: screenshot */}` placeholder comments from all pages ahead of the first push (they were invisible on the site and shouldn't ship as raw TODOs).
- ⬜ **Requires the Mintlify dashboard / real assets (owner action, not in-repo):** turn on the docs assistant + starter questions + deflection; set up the agent-in-Slack + automations; add a real OG/social share image (no asset to embed yet — not fabricated). The contextual "Ask AI / copy / open in ChatGPT·Claude·Perplexity / MCP / Cursor / VS Code" menu is already configured in `docs.json` and documented in `resources/use-with-ai.mdx`; Mintlify auto-generates `/llms.txt` + `/llms-full.txt` from the (complete) titles/descriptions.
- 📌 **Screenshots** remain a genuine gap: every feature/integration page would benefit from captured images from a live instance (open question #5 — who captures them / from which instance). The inline markers are removed, but the need is still tracked here.

**Backlog — gap analysis vs Rybbit docs (checked 2026-07-17)**

Compared our coverage against the live Rybbit docs sidebar (`rybbit.com/docs`) as a behavioral reference (structure only; no expression copied). Every "to add" below is backed by the product wiki (the feature exists) and is in scope for hosted tinyanalytics. Items Rybbit documents that we deliberately do **not** add follow, with reasons — so this stays an honest audit, not a copy of their table of contents.

*To add (confirmed, sourced):*
- ⬜ **Filter & exclude traffic** — new page for ingest-time exclusions: excluded IPs, excluded countries, excluded paths / hostnames / user-agents, plus the per-site bot-blocking toggle. Fold in "hide your own traffic" (exclude your own IP + the client opt-out already documented in `script-configuration`). Source: decisions 0054, 0160; `tracker/site-config.ts`. Rybbit splits this across *Filter traffic* + *Hiding your own traffic*. **Not documented anywhere today — highest-value gap.**
- ⬜ **Autocapture** — promote the toggle section in `script-configuration` to a dedicated page covering each auto-captured event (outbound link, download, button click, copy, form submit, engagement), what each records, and the form-shape-only privacy guarantee. Source: decision 0110. (The on/off toggle is documented; the deep-dive page is the gap.)
- ⬜ **Wix** integration guide — website builder, real header/custom-code install point (general web-dev fact).
- ⬜ **WooCommerce** integration guide — WordPress e-commerce; real install point (WordPress/header).

*Lower priority / optional:*
- ⬜ **Site settings** orientation page — Rybbit has one; our per-site settings (domain, public/private link, exclusions, embed) are documented piecemeal.
- ⬜ **Svelte (Vite, non-Kit)** integration — we ship SvelteKit; Rybbit also documents plain Svelte/Vite (different install point: `index.html` / app mount).
- ⬜ **Per-endpoint API pages** — Rybbit enumerates individual endpoint pages (sending-events, export-events, live-feed, channel-performance, funnel-dropoff, weekly-report). Ours is capability-structured (core-endpoints table + playground); enumerate more only if users ask.
- (Unchanged, already listed under Phase 4: PrestaShop, ThriveCart, Joomla, TYPO3.)

*Checked and deliberately NOT added (no fabrication):*
- 🚫 **Product MCP server** — Rybbit ships `/docs/mcp` (query your analytics via an MCP server). The tinyanalytics wiki shows **no such product MCP server** (only incidental mentions), so a page would invent a feature. `resources/use-with-ai` documents the *docs* MCP, a different thing. Revisit only if a product MCP server ships.
- 🚫 **Architecture / Self-hosting / Self-host vs Cloud / Managing your installation / v1 migration** — operator- and self-host-facing; out of scope under the hosted-only boundary.
- 🚫 **Contentful / Sanity / Strapi / GitBook / Mintlify / React Native** — deliberately omitted already (headless CMSs render through a framework that has a guide; GitBook/Mintlify install points unverifiable; no mobile SDK). Reasons recorded under Phase 4.

*Confirmed already covered (no action):* tagging (`data-tag`), skip/mask paths, client opt-out, and the auto-capture toggle (all in `script-configuration`); definitions, comparison, bot detection, data import, identify, funnels, goals, teams, invitations, account/org settings, tracking script, and troubleshooting (≈ our `verify-your-setup`). On the core analytics reports we are **more** comprehensive than Rybbit (a page per report vs their lighter treatment).

---

## 11. Assumptions & open questions

| # | Assumption / question | Working default | Needs confirmation |
| --- | --- | --- | --- |
| 1 | Docs domain | `docs.tinyanalytics.io` | App is `dash.tinyanalytics.io`; confirm docs host (subdomain vs `/docs`). Affects skill-install prompt + canonical URLs. |
| 2 | Cloud is the only offering | Confirmed by owner (2026-07-16): closed-source, hosted-only | Is signup open to everyone? Pricing page live? Determines billing docs depth. |
| 3 | Brand accent color | Indigo — confirmed by owner (2026-07-17); hex `#345FCF` / `#537FEB` / `#2249B7`, converted from DESIGN.md's oklch tokens | Resolved. Note: the live app currently runs a green trial theme (DESIGN.md 0171); the docs match the brand baseline, not the trial. |
| 4 | Integration guide breadth for v1 | Top ~12 now, long tail later | Which platforms matter most to the audience? |
| 5 | Screenshots | Needed for dashboard/feature pages | Who captures them / from which instance (demo seed)? |
| 6 | API reference source | Hand-authored v1 | Is there an OpenAPI spec to auto-generate from later? |
| 7 | Assistant external sources | None initially | Any external sites the assistant should also search? |
| 8 | Product name casing | lowercase **tinyanalytics** everywhere | Confirm (matches README). |
| 9 | Slack + repo access for the agent/automations | Deferred to Phase 7 | Which repo triggers doc-update PRs; Slack workspace access. |
| 10 | Self-hosting may ship someday | Not documented until it exists | If the product open-sources or ships a self-host tier, add a Self-hosting tab then (the v1.0 draft of this PRD sketched one). |

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

| Doc page / area | Primary wiki source(s) |
| --- | --- |
| How it works; Architecture | `architecture/overview.md`, `architecture/ingestion-pipeline.md`, `architecture/api-server.md`, `architecture/web-dashboard.md` |
| The tracking script; Script config; SPA | `architecture/tracking-script.md`, decisions 0012, 0013 |
| Custom events; auto-capture; downloads; engagement; 404 | decisions 0110, 0135, 0134, 0136, `algorithms/event-list.md` |
| Identify / cookieless identity | `concepts/cookieless-identity.md`, `algorithms/cookieless-identity-derivation.md`, decisions 0045, 0146 |
| Proxy / custom domain | `docs/proxy-guide.md` (product), decisions 0127, 0128 |
| Overview / metrics / comparison | `algorithms/overview-metrics.md`, `algorithms/timeseries-bucketing.md`, decisions 0149–0151 |
| Sessions / Users / Journeys / Retention / Funnels / Goals | `algorithms/session-list.md`, `algorithms/journeys.md`, decisions 0046, 0047, 0068, 0065, 0055 |
| Bots & AI crawlers; AI traffic | `algorithms/bot-detection.md`, decisions 0084–0086, 0147, 0148, 0167 |
| Performance / Web Vitals | decisions 0056, 0057, 0080 |
| Segments / Cohorts | decisions 0141, 0145; `algorithms/behavioral-cohorts.md` |
| Feature flags / Experiments | `algorithms/flag-evaluation.md`, `algorithms/experiment-results.md` |
| Surveys | `algorithms/surveys.md`, decision 0144 |
| Custom dashboards / SQL query | `algorithms/dashboard-cards.md`, `concepts/scoped-sql-query.md`, decisions 0090, 0114, 0115 |
| Group / B2B analytics | `algorithms/group-analytics.md`, decisions 0154, 0156, 0157 |
| Revenue | `algorithms/revenue-normalization.md`, decision 0140 |
| Reports / Alerts / Uptime | `algorithms/scheduled-reports.md`, `algorithms/analytics-alerts.md`, `algorithms/uptime-monitoring.md`, decisions 0131–0133, 0138, 0116–0119 |
| Shortlinks | `architecture/shortlinks.md`, decision 0159 |
| Data dictionary | `concepts/data-dictionary.md`, decision 0158 |
| Import (GA4 / Plausible / Umami) | `algorithms/import-mappers.md`, `algorithms/plausible-reconstruction.md`, decisions 0153, 0113 |
| Public dashboards / embed / widget | decisions 0089, 0105, 0126 |
| Accounts / orgs / teams / roles | decisions 0071–0077, 0083, 0112 |
| Billing & plans | decision 0152 |
| How your data is handled (Resources, trust-level) | `architecture/overview.md`, `architecture/data-model.md`, `concepts/cookieless-identity.md` — concepts only, no operational detail |
| API reference | `architecture/api-server.md`, decisions 0017–0021, 0051, 0093 |
| Channels / geo / definitions | `algorithms/channel-classification.md`, `algorithms/geo-enrichment.md`, decisions 0006, 0155 |
| React Native / mobile | `architecture/react-native-sdk.md`, decision 0165 |

---

## Appendix B — Competitor IA references (for benchmarking, not copying)
- **Plausible** (task-oriented): Get Started · Website Settings · Stats Dashboard · Goals and Events · Bypass Adblockers · APIs & Data Access · Account · Team · Billing.
- **Umami** (feature-oriented): Introduction · Quickstart · Configuration · Tracking (functions, config, events, IDs, tags, links, pixels) · Filtering (sessions, replays, performance, breakdown, goals, funnel, journey, retention, UTM, revenue, attribution) · Boards · Teams · Reference (metric definitions, integrations).
- **tinyanalytics** takes the *superset*: task spine (Plausible) for setup + feature spine (Umami) for the dashboard + its own advanced product-analytics/ops tier that neither documents in depth.
