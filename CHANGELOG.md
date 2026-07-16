# Changelog

All notable changes to the tinyanalytics documentation site are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project adheres to semantic versioning where practical.

## [Unreleased]

### Changed
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
