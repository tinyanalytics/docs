---
name: tinyanalytics-docs
description: Project conventions for writing tinyanalytics documentation. Use
  whenever creating or editing pages in this repo — sources of truth, hard
  content boundaries (hosted-only product), terminology, voice, and page
  templates. Pair with the mintlify skill for platform mechanics.
compatibility: This repo (Mintlify site, docs.json at root). Product repo expected at ../tinyanalytics.
metadata:
  author: tinyanalytics
  version: "1.0"
---

# tinyanalytics documentation conventions

This skill is the project layer. Platform mechanics (components, `docs.json`,
frontmatter fields, CLI, deploy) live in the sibling `mintlify` skill
(`.agents/skills/mintlify/SKILL.md`) — read both before writing.

## What you are documenting

tinyanalytics is **privacy-friendly, cookieless web + product analytics**,
offered as a **hosted service** at `dash.tinyanalytics.io`. For anonymous web
analytics, the server derives a persistent, site-scoped, one-way ID from request
signals; it does not write the raw IP address to analytics data or store a browser
analytics ID. Anonymous user counts are therefore estimates, and `identify()` is
the stable model for signed-in users. It covers web analytics (overview, pages, sessions, users, journeys,
retention, funnels, goals) and product analytics (feature flags, experiments,
surveys, cohorts, group/B2B analytics, revenue), plus uptime monitoring, alerts,
scheduled reports, shortlinks, and GA4/Plausible/Umami import.

**The product is closed-source and hosted-only.** There is no public repo, no
installable distribution, no self-host offering. Write every page for a cloud
customer.

## Read first, in order

1. `PRD.md` (repo root) — the documentation spec: audience, IA, phasing, scope.
2. `docs.json` — current navigation and site config.
3. 2–3 existing pages near your target — match their voice and shape.

## Sources of truth (never invent behavior)

- `../tinyanalytics/wiki/features.md` — the authoritative capability matrix.
  If a feature is not user-facing there, it does not get a page.
- `../tinyanalytics/wiki/` (architecture/, algorithms/, concepts/, decisions/) —
  how features actually behave, including their honest limits.
- `../tinyanalytics/README.md` — product summary and tracking wire contract.
- The Rybbit reference (`../../rybbit/rybbit/docs`) is a **coverage checklist
  only** — which topics exist. Never copy its prose, structure, or naming
  (clean-room rule).

When the wiki and your assumption disagree, the wiki wins. When the wiki is
silent, mark the claim with `{/* TODO: verify against product */}` and say so.

## Hard content boundaries

Never document:

- **Self-hosting or installation of the platform** — no Docker, `setup.sh`,
  environment variables, SMTP/SES setup, backups, upgrades, or reverse-proxy
  _for running tinyanalytics_. (The proxy guide for _tracking through your own
  domain_ is fine — that is a cloud-customer feature.)
- **The admin console or operator internals** — system-admin promotion, email
  diagnostics, instance ops. Internal only.
- **Unshipped features** — session replay is explicitly excluded by design
  (decision 0049); check `features.md` before writing about anything new.
- **Internal reasoning** — decision records inform pages; they are not pages.
  Users get the behavior and its limits, not the engineering trade-offs.

Security-sensitive precision:

- **API keys authenticate programmatic customer access** — server-side ingestion,
  analytics reads, and site management. Reads and management use the key owner's
  existing organization/team permissions (decision 0096). Browser tracking is
  intentionally keyless; never put an API key in browser code.

## Terminology

| Use                       | Not                              | Notes                                                                                                                   |
| ------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| tinyanalytics (lowercase) | TinyAnalytics, Tiny Analytics    | Even at sentence start                                                                                                  |
| site                      | website, property, project       | A tracked website/app                                                                                                   |
| organization              | workspace, account (for the org) | Top-level tenant                                                                                                        |
| team                      | group (for access)               | Site-access unit inside an org                                                                                          |
| custom event              | track event, action              | `type: "custom_event"`                                                                                                  |
| identify                  | login tracking, user stitching   | `identify(userId)`                                                                                                      |
| cookieless identity       | browser fingerprinting           | Explain the server-derived one-way ID, its estimate limits, and that raw IP addresses are not written to analytics data |
| tracking script / snippet | pixel, tag                       | Served at `/script.js`                                                                                                  |
| dashboard                 | console, panel                   | The web app                                                                                                             |

## Voice

Primary **Sage** (truthful, evidence-led, explains the mechanism), secondary
**Everyman** (plain-spoken). Concretely:

- Clear, not clever. No puns in headings.
- Plain-spoken, not dumbed-down. Explain how it works; respect the reader.
- Honest, not hype. State limits in the page (e.g. "click-throughs only — not
  crawler ingestion"). Because users cannot read the source, honesty _is_ the
  trust story.
- Concrete, not abstract. "< 6.5 KB gzipped", not "lightweight".
- Second person, active voice, sentence case (see the mintlify skill for the
  full writing standards — they apply here unchanged).

## Page shape

Every page:

- Frontmatter `title` (sentence case, front-loaded, verb-led for how-tos) and a
  **benefit-bearing `description`** — it feeds `llms.txt`, search, and the
  assistant, so it is the highest-leverage line on the page. Never filler.

By archetype (details and examples in `PRD.md` §6):

- **How-to** — outcome intro (1–2 sentences) → prerequisites → `<Steps>` →
  **Verify** step → **Related** links. Always end with Verify + Related.
- **Feature guide** — screenshot near the top, what each metric means, common
  workflows, gotchas.
- **Concept** — what, why, the mechanism, the honest limits, related links.
- **Integration guide** — keep the shared shape (prerequisites → snippet →
  verify → framework notes) so guides stay batch-consistent.
- **Reference** — terse, complete, every field; no persuasion.

## Component contract

- Use `<Steps>` only for two or more ordered actions. End every procedure with
  a visible **Verify** section and `<Check>` result.
- Use `<Tabs>` for mutually exclusive choices, not sequential work. Keep shared
  prerequisites, risks, and verification outside the tabs.
- Group navigation cards with `<Columns>` and `<Card>`. Do not introduce new
  `<CardGroup>` wrappers.
- Keep required steps, safety constraints, limitations, and verification
  visible. Accordions contain only optional FAQs, troubleshooting, and edge
  cases.
- Match callouts to meaning: `<Note>` for neutral context, `<Info>` for
  supporting behavior or scope, `<Tip>` for optional improvements, `<Warning>`
  for recoverable risks, `<Danger>` for irreversible actions, and `<Check>` for
  successful results.
- Add API fields and response examples only from verified product or OpenAPI
  sources. Never infer a schema to complete a component.
- Use diagrams and screenshots only when they materially improve
  understanding. Screenshots must come from the live product and include
  useful alt text.

## Before submitting

Everything in the mintlify skill's verification checklist, plus:

- [ ] Every committed product change after the exact `PRD.md` sync marker was
      mapped to a public page or recorded as `Public docs impact: none`; advance
      the marker only after the complete pass validates
- [ ] Product API Playground changes regenerated `openapi.json`
- [ ] No self-hosting, installation, or operator content anywhere on the page
- [ ] Every behavioral claim traceable to the wiki (or TODO-marked)
- [ ] Feature exists in `../tinyanalytics/wiki/features.md` as user-facing
- [ ] Description is specific and benefit-bearing, not a restated title
- [ ] How-tos end with Verify + Related
- [ ] Terminology table respected (spot-check "site", "organization", casing)
