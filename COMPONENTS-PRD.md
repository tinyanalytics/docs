# PRD — tinyanalytics documentation component enrichment

| Field                 | Value                         |
| --------------------- | ----------------------------- |
| Status                | Draft v1.0                    |
| Owner                 | Documentation                 |
| Date                  | July 30, 2026                 |
| Companion document    | [`PRD.md`](./PRD.md)          |
| Implementation status | In progress — Phase 1 started |

### Implementation update — July 30, 2026

- Migrated all 105 authored `CardGroup` wrappers to `Columns`.
- Added visible verification results to the eight pages that used `Steps` without `Check`.
- Reclassified four irreversible deletion callouts from `Warning` to `Danger`.
- Added a repository component-audit script at `scripts/audit-components.mjs`.
- Added the component contract to the tinyanalytics documentation skill.
- Added verified Mermaid flows to the four priority concept pages.
- Recorded 15 simple integration pages as one-step or tabs-only exceptions instead of adding decorative `Steps`.
- Added a self-contained integration-assistant `Prompt` that does not depend on the unresolved public skill-install URL.
- The site now has 108 authored pages after the product-sync additions for User acquisition, Ask AI, and Billing and plans. The 104-page figures below remain the historical baseline for this component audit.

## 1. Summary

Enrich the 104 authored tinyanalytics documentation pages with deliberate, consistent Mintlify components that make tasks easier to complete and concepts easier to understand.

This project is not a visual redesign and does not set a component quota. A component belongs on a page only when it improves scanning, sequencing, comparison, comprehension, accessibility, or navigation. Plain prose remains the correct format when it communicates the answer most clearly.

Generated OpenAPI endpoint pages remain generated from the specification. This project may improve the source specification or shared API presentation, but it must not hand-edit generated output.

## 2. Problem

The documentation already has consistent frontmatter, navigation, related links, and broad use of cards and accordions. Component use is otherwise uneven:

- Navigation uses the legacy `CardGroup` wrapper on every authored page.
- Only 29 pages use `Steps`, although most integration pages describe sequential installation work.
- Eight pages use `Steps` without a `Check` verification result.
- API pages use code blocks and parameter fields, but request and response examples are not consistently structured.
- Concept and resource pages contain no Mermaid diagrams or other visual explanations.
- No page uses `Frame`, and no authored MDX page currently contains an image.
- `resources/use-with-ai.mdx` does not use the `Prompt` component planned in the main PRD.
- Several newer Mintlify components have no documented adoption rule, creating a risk that future edits use them as decoration or hide essential information.

The result is a site that is structurally consistent but does not always match the reader's task. Sequential work can read like prose, complex mechanisms lack visual models, API examples require extra scanning, and optional detail is not always distinguished from required instructions.

## 3. Product principles and boundaries

All work under this PRD follows the content, terminology, and voice requirements in `PRD.md`, `AGENTS.md`, and the project skills.

### 3.1 Product boundaries

- Document tinyanalytics as a hosted service at `dash.tinyanalytics.io`.
- Do not add self-hosting, platform installation, operator administration, or internal implementation guidance.
- Do not document unshipped features.
- Treat API keys as sensitive customer API credentials. They authenticate server-side ingestion, analytics reads, and site management as the key owner; browser tracking remains keyless.
- Verify product behavior against the wiki and product sources before changing factual content.
- Do not invent response fields, workflow states, UI controls, screenshots, or platform behavior to make a component complete.

### 3.2 Content principles

- Answer first. A component cannot delay the direct answer.
- Use components to serve a reader job, not to add visual variety.
- Keep prerequisites, required steps, warnings, limitations, and verification visible by default.
- Put only optional detail, edge cases, and secondary examples behind progressive disclosure.
- Keep each page self-contained in both its rendered web view and Mintlify's `.md` output for AI agents.
- Preserve semantic HTML order so the page remains understandable without visual styling.
- Prefer one clear component over deeply nested layouts. Component nesting should not exceed two structural levels without a documented reason.
- Keep mobile layouts, keyboard navigation, dark mode, and screen-reader behavior in scope.

## 4. Goals

1. Establish a documented component contract for every page archetype.
2. Make sequential procedures easy to follow and verify.
3. Add visual explanations where relationships or workflows are materially clearer as diagrams.
4. Make hand-authored API pages easier to scan without introducing unsupported schema claims.
5. Replace the legacy `CardGroup` pattern with Mintlify's current `Columns` and `Card` pattern.
6. Improve progressive disclosure without hiding required or safety-critical information.
7. Preserve complete, useful content for AI agents and `.md` readers.
8. Add automated and editorial checks that keep component use consistent.

## 5. Non-goals

- Redesigning the brand, theme, information architecture, or navigation.
- Rewriting every page solely to introduce a component.
- Adding one of every Mintlify component.
- Building custom React components or custom CSS before a built-in component is proven insufficient.
- Creating decorative screenshots, diagrams, badges, banners, or status labels.
- Capturing screenshots from mocked or unverified product states.
- Filling known API response-schema gaps without a product source of truth.
- Moving required content into accordions, tabs, tooltips, or human-only visibility blocks.
- Editing generated OpenAPI endpoint pages by hand.

## 6. Baseline audit

The baseline covers 104 authored MDX pages:

| Area                    |   Pages |
| ----------------------- | ------: |
| Main documentation root |      59 |
| Integrations            |      29 |
| API reference           |       8 |
| Resources               |       8 |
| **Total**               | **104** |

### 6.1 Current component instances

| Component        | Instances | Pages using it | Assessment                                                |
| ---------------- | --------: | -------------: | --------------------------------------------------------- |
| `Card`           |       428 |            104 | Broadly used for related links and hubs                   |
| `CardGroup`      |       105 |            104 | Replace with `Columns`                                    |
| `Accordion`      |       265 |             65 | Strong coverage; audit for duplicated or required content |
| `AccordionGroup` |        66 |             65 | Concentrated in guides                                    |
| `Step`           |        84 |             29 | Underused in sequential integration procedures            |
| `Steps`          |        29 |             29 | Normalize across procedural pages                         |
| `Note`           |        50 |             49 | Audit semantic fit                                        |
| `Check`          |        37 |             37 | Eight procedural pages still lack verification            |
| `Tip`            |        35 |             34 | Audit for essential instructions hidden as advice         |
| `Warning`        |        22 |             17 | Separate recoverable warnings from destructive actions    |
| `CodeGroup`      |         8 |              7 | Useful but sparse in hand-authored API content            |
| `Tab`            |         7 |              3 | Appropriate for mutually exclusive alternatives           |
| `Info`           |         6 |              5 | Audit overlap with `Note`                                 |
| `ParamField`     |        25 |              5 | Expand only when fields are verified                      |
| `ResponseField`  |         6 |              1 | Known response-schema gaps block broad rollout            |
| `Tabs`           |         3 |              3 | Keep selective                                            |
| `Expandable`     |         2 |              1 | Keep primarily for nested API fields                      |
| `Columns`        |         1 |              1 | Becomes the standard grouping primitive                   |

The following components currently have no authored-page usage: `Frame`, `Prompt`, `RequestExample`, `ResponseExample`, `Panel`, `Tile`, Mermaid diagrams, `Tree`, `Badge`, `Update`, `Tooltip`, `View`, and `Visibility`.

### 6.2 Priority gaps

- Fifteen platform installation guides, excluding the integrations overview, do not use `Steps`: Angular, Astro, Docusaurus, Drupal, Gatsby, Hugo, Jekyll, Laravel, Next.js, Nuxt, React, Remix, SvelteKit, VitePress, and Vue.
- Next.js already uses `Tabs` for App Router and Pages Router. Its migration should preserve that choice and add nested sequential structure only if it improves scanning.
- Eight pages use `Steps` without a terminal `Check`: annotations, cohorts, GA4 import, Search Console, segments, site settings, teams, and React Native.
- All eight resource pages lack FAQ accordions. This is a review queue, not a mandate to add FAQs; accordions are warranted only when they answer real, non-duplicative questions.
- No authored page contains an image. `Frame` adoption is blocked until verified live-product assets exist.
- Manual API pages use seven `CodeGroup` blocks but no `RequestExample` or `ResponseExample` blocks.
- Destructive workflows exist for users, sites, organizations, and accounts. Their callout semantics need explicit review.

## 7. Component contract

### 7.1 Structural components

| Component          | Use when                                                                                        | Do not use when                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Steps` and `Step` | The reader must complete two or more ordered actions                                            | The content is a conceptual sequence, unordered checklist, or single action |
| `Tabs`             | The reader chooses one mutually exclusive platform, language, router, or method                 | Readers need to compare all content at once, or the content is sequential   |
| `CodeGroup`        | Two or more equivalent code examples represent the same task in different languages or variants | Only one canonical example exists                                           |
| `Columns`          | Cards or short related items benefit from a responsive grid                                     | Long prose would become harder to read side by side                         |
| `Column`           | A short comparison or paired visual needs a responsive side-by-side layout                      | Reading order would become ambiguous on mobile                              |
| `Panel`            | A page has genuinely supplementary tools or context that should replace the table of contents   | Site-wide adoption, required instructions, or ordinary related links        |

Rules:

- Replace every `<CardGroup cols={N}>` wrapper with `<Columns cols={N}>`.
- Preserve a logical source order inside columns because mobile and assistive views read sequentially.
- If two tab groups reuse labels for unrelated choices, set `sync={false}` so changing one does not unexpectedly change the other.
- Put shared prerequisites, warnings, and verification outside tabs.

### 7.2 Attention components

| Component | Semantic use                                                                 |
| --------- | ---------------------------------------------------------------------------- |
| `Note`    | Neutral context that helps interpretation                                    |
| `Info`    | Supporting information about behavior, scope, or availability                |
| `Tip`     | Optional improvement or shortcut                                             |
| `Check`   | Successful result or explicit verification outcome                           |
| `Warning` | A recoverable risk, caveat, or action requiring care                         |
| `Danger`  | An irreversible or destructive action                                        |
| `Banner`  | A temporary, site-wide announcement with an owner and removal date           |
| `Badge`   | A short, verified status label that remains meaningful out of context        |
| `Update`  | A dated change that materially affects the page's instructions               |
| `Tooltip` | A brief definition for a secondary term that does not carry required meaning |

Rules:

- Do not use a callout as a substitute for a heading or paragraph.
- Put destructive consequences in `Danger`, immediately before the destructive action.
- Do not hide prerequisites or failure consequences inside a tooltip.
- Every `Banner`, `Badge`, and `Update` needs an explicit source of truth and maintenance owner before adoption.
- Do not use callout titles such as "Important" when the component's semantic type already communicates the purpose.

### 7.3 Progressive disclosure

| Component                        | Use when                                                                              | Guardrail                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Accordion` and `AccordionGroup` | Optional troubleshooting, FAQs, edge cases, or detailed explanations                  | The page must still be complete if all accordions remain closed |
| `Expandable`                     | A verified API object contains nested fields                                          | Do not use it as a general prose accordion                      |
| `Visibility`                     | A controlled pilot needs different presentation for web readers and AI agents         | Never maintain two conflicting versions of a product fact       |
| `View`                           | The documentation introduces a durable, global reader mode with a clear audience need | Do not create page-local pseudo-tabs with it                    |

Rules:

- Required steps, security constraints, limitations, and verification stay visible.
- Accordion titles must be questions or clear outcome labels, not vague labels such as "More."
- `Visibility` remains pilot-only until rendered pages and `.md` output have an automated parity check.
- `View` is out of scope until a site-wide view model is approved.

### 7.4 Visual context

| Component | Use when                                                                               | Required evidence                                                                          |
| --------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Frame`   | A screenshot, diagram image, or video provides task-critical visual context            | Real asset, useful alt text, and a caption or label that explains why it matters           |
| Mermaid   | A process, relationship, state change, or decision has at least three meaningful nodes | Diagram matches verified product behavior and remains readable on mobile                   |
| `Tree`    | File placement or project structure is central to an integration step                  | Paths match the documented framework and supported setup                                   |
| `Tile`    | A hub benefits from an asset-backed visual choice                                      | Approved preview asset with consistent aspect ratio, size, alt text, and maintenance owner |
| `Color`   | An exact color value is itself part of the instruction                                 | The value is a verified product or integration requirement                                 |
| Icon      | A small visual cue improves card or callout scanning                                   | Icon choice is consistent and has no standalone semantic burden                            |

Rules:

- Never create a screenshot or UI diagram that implies unverified product behavior.
- Do not use Mermaid for a linear list that reads more clearly as `Steps`.
- Prefer diagrams for mechanisms and relationships; prefer screenshots for UI location and recognition.
- All image assets must remain useful in dark mode or provide appropriate light and dark variants.

### 7.5 API documentation

| Component         | Use when                                                           | Guardrail                                              |
| ----------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `ParamField`      | A request parameter, header, path value, or body field is verified | Include type and requirement status only when sourced  |
| `ResponseField`   | A returned field and its type are verified                         | Do not infer schemas from a single example             |
| `Expandable`      | A request or response field contains a verified nested object      | Preserve readable nesting and avoid excessive depth    |
| `RequestExample`  | A hand-authored API page benefits from a prominent request example | Use tested examples with safe placeholder values       |
| `ResponseExample` | A verified response example exists                                 | Show only fields and statuses confirmed by the product |
| `CodeGroup`       | Equivalent examples exist in multiple languages or tools           | Keep examples behaviorally equivalent                  |

Rules:

- Do not manufacture a complete response schema to satisfy the layout.
- Keep secrets, real API keys, personal data, and production identifiers out of examples.
- Preserve OpenAPI as the source of truth for generated endpoints.
- When a response is not yet documented, state the verified limitation or add a source comment for follow-up instead of guessing.

### 7.6 AI prompt component

Use `Prompt` on `resources/use-with-ai.mdx` for a copyable, self-contained prompt that helps a reader give an AI tool the tinyanalytics documentation context it needs.

The prompt must:

- use verified public documentation URLs and terminology;
- contain no internal paths, decision records, credentials, or private implementation details;
- remain useful when copied without surrounding prose;
- have a description that states its purpose;
- be tested with the enabled copy and editor actions.

Do not add prompt blocks across ordinary guides merely because a task could be delegated to an AI tool.

## 8. Page archetype requirements

These are content patterns, not rigid templates. Editors may omit a component when the reader's task does not need it, but exceptions to a required element must be evident in review.

### 8.1 How-to guide

1. Direct outcome and prerequisites.
2. `Steps` for two or more ordered actions.
3. Code blocks or `CodeGroup` at the action where the reader uses them.
4. Semantic callouts immediately before the relevant risk or exception.
5. A terminal **Verify** section with `Check`.
6. Optional troubleshooting in `AccordionGroup`.
7. **Related** links in `Columns` with `Card` children.

### 8.2 Feature guide

1. Direct explanation of what the feature shows or enables.
2. A verified `Frame` screenshot near the first UI-location instruction when assets are available.
3. Definitions or tables for metrics and controls.
4. `Steps` for configuration workflows.
5. Visible caveats and limitations.
6. FAQs only for real questions not answered cleanly in the main flow.
7. **Related** links in `Columns`.

### 8.3 Concept page

1. Direct definition.
2. Mermaid diagram when a mechanism, relationship, or lifecycle is materially easier to understand visually.
3. Mechanism, limitations, privacy implications, and examples in visible prose.
4. Accordions only for secondary questions.
5. **Related** links in `Columns`.

### 8.4 Integration guide

1. Supported method and prerequisites.
2. Optional `Tree` when file placement is otherwise ambiguous.
3. `Steps` for the installation flow.
4. `Tabs` only for mutually exclusive framework variants.
5. Platform-specific notes at the relevant step.
6. A terminal **Verify** section with `Check`.
7. **Related** links in `Columns`.

### 8.5 Hand-authored API page

1. Endpoint or capability summary and correct authentication context.
2. `RequestExample` or `CodeGroup` for tested requests.
3. `ParamField` entries for verified inputs.
4. `ResponseExample`, `ResponseField`, and `Expandable` only where the response is verified.
5. Visible status, error, rate-limit, and safety information when known.
6. **Related** links in `Columns`.

### 8.6 Hub and resource page

1. Direct scope statement.
2. `Columns` with `Card` children for navigational choices.
3. `Tile` only when approved visual assets improve selection.
4. Tables for dense comparisons.
5. FAQs only when they add retrieval value without duplicating the page.
6. **Related** links in `Columns`.

## 9. Implementation plan

### Phase 0 — foundations

- Add a component-audit script that reports component instances, page coverage, and page-archetype exceptions.
- Add the component contract to the project documentation skill or its directly referenced guidance.
- Define review exemptions in machine-readable form where practical.
- Capture a pre-change responsive and dark-mode baseline for representative pages.

Exit criteria:

- The audit is reproducible from the repository.
- Page archetypes and allowed exceptions have owners.
- Representative pages are selected for visual regression review.

### Phase 1 — current layout primitives

- Replace all 105 `CardGroup` wrappers with `Columns`.
- Preserve column counts, card order, links, icons, and descriptions.
- Review column behavior at mobile, tablet, and desktop widths.
- Audit all callouts and distinguish `Note`, `Info`, `Tip`, `Warning`, `Check`, and `Danger` by meaning.
- Review destructive workflows for users, sites, organizations, and accounts.

Exit criteria:

- No authored MDX page contains `CardGroup`.
- Related links and hub cards remain complete and readable.
- Destructive actions use `Danger` where consequences are irreversible.

### Phase 2 — golden paths and integrations

Prioritize:

- quickstart;
- tracking script;
- script configuration;
- custom events;
- identify;
- verification and troubleshooting;
- all platform integrations.

Work:

- Normalize multi-action procedures to `Steps`.
- Preserve `Tabs` for genuine alternatives such as Next.js router types.
- Add or repair terminal **Verify** sections with `Check`.
- Add `Tree` only where framework file placement is hard to infer.
- Keep framework prerequisites and shared warnings outside tabs.

Exit criteria:

- Every platform integration has `Steps` or a documented one-step or tabs-only exception.
- Every installation guide has a visible verification outcome.
- All existing pages that use `Steps` finish with a visible verification result unless explicitly classified as non-procedural.

### Phase 3 — hand-authored API pages

Prioritize:

- tracking API;
- identify;
- read API;
- SQL;
- API keys;
- API playground.

Work:

- Convert verified inputs to consistent `ParamField` structures.
- Add `RequestExample` and `CodeGroup` where tested examples exist.
- Add `ResponseExample`, `ResponseField`, and `Expandable` only from verified schemas or behavior.
- Keep authentication language aligned with the current API-key contract: server-side ingestion, reads, and management as the key owner; no key in browser tracking.
- Record unresolved response-schema gaps as source follow-ups.

Exit criteria:

- Tested request examples are visually consistent.
- Structured response documentation contains no inferred fields.
- No example contains a credential or real user data.
- Generated OpenAPI pages remain controlled by the specification.

### Phase 4 — concepts, resources, and AI use

Prioritize Mermaid candidates:

- how tinyanalytics works;
- cookieless identity;
- bot detection;
- traffic classification.

Review group analytics and experiments as secondary candidates only if their relationships cannot be explained more clearly in prose or a table.

Work:

- Add the `Prompt` component to the AI-use resource.
- Add verified diagrams to the four priority concept pages.
- Review resource pages for real FAQ and retrieval gaps.
- Do not add blanket accordion groups merely for component consistency.

Exit criteria:

- The AI-use page contains one tested, copyable prompt.
- At least four high-value concept diagrams are published.
- Every diagram has a concise introduction and remains understandable in `.md` output.
- Resource accordions contain no duplicated required content.

### Phase 5 — visual feature guides

- Define an approved process for capturing screenshots from the live hosted product.
- Capture screenshots only from verified, privacy-safe sample data.
- Add `Frame`, alt text, and a useful caption to each adopted screenshot.
- Prioritize dashboard overview, site settings, custom events, funnels, user profiles, organizations, and teams.
- Pilot `Tile` on the integrations overview only if consistent, maintainable preview assets exist.

Exit criteria:

- No fake, stale, sensitive, or unverified UI is published.
- Every screenshot uses `Frame` and has useful alt text.
- Screenshots remain legible on mobile and in dark mode.
- The integration hub uses tiles only if the pilot outperforms cards for scanning and maintenance.

### Phase 6 — quality and maintenance

- Run Mintlify validation, broken-link, and accessibility checks.
- Run the repository's anchor checker.
- Spot-check representative rendered pages on mobile, tablet, and desktop.
- Check light and dark mode.
- Review at least 12 representative `.md` page outputs, spanning every page archetype.
- Add the component audit to CI if it proves stable and actionable.
- Document the maintenance owner for dated or asset-backed components.

Exit criteria:

- All automated checks pass.
- Required information is present in web and `.md` outputs.
- No component introduces horizontal overflow, unreadable code, broken anchors, or keyboard traps.

## 10. Acceptance criteria

### 10.1 Repository-wide

- [ ] All 104 authored pages use `Columns` instead of `CardGroup`; the repository contains zero `<CardGroup` tags.
- [ ] All pages retain valid `title` and `description` frontmatter.
- [ ] All new assets and components render in light mode, dark mode, mobile, tablet, and desktop views.
- [ ] No required step, prerequisite, safety condition, limitation, or verification result is hidden by default.
- [ ] Component nesting remains at two structural levels or fewer unless an exception is documented.
- [ ] Every page remains self-contained and useful through its `.md` representation.
- [ ] No product boundary or terminology regression is introduced.

### 10.2 Procedures and integrations

- [ ] All 28 platform integration guides use `Steps` or have a documented one-step or tabs-only exception.
- [ ] Every platform integration has a visible **Verify** section and `Check` result.
- [ ] The eight current `Steps`-without-`Check` gaps are resolved.
- [ ] Shared tab prerequisites, warnings, and verification remain outside the tabs.

### 10.3 APIs

- [ ] Every structured field is backed by a product source, OpenAPI specification, or verified behavior.
- [ ] Selected hand-authored API pages use `RequestExample` or `CodeGroup` consistently.
- [ ] `ResponseExample` and `ResponseField` appear only where verified responses exist.
- [ ] No API example exposes a real secret, user identity, or production identifier.
- [ ] API-key examples explain the key-owner permission model and never expose a key in browser code.

### 10.4 Visual and AI components

- [ ] `resources/use-with-ai.mdx` contains one tested `Prompt`.
- [ ] At least four priority concept pages contain useful, verified Mermaid diagrams.
- [ ] Every screenshot uses `Frame`, useful alt text, and an explanatory caption.
- [ ] No fabricated screenshot or unsupported diagram is published.
- [ ] `Visibility` is not used outside an approved parity-tested pilot.

### 10.5 Validation

- [ ] `mint validate` passes.
- [ ] `mint broken-links` passes.
- [ ] `mint a11y` passes.
- [ ] The custom anchor checker passes.
- [ ] The component audit reports no unexplained contract violations.
- [ ] Representative pages pass editorial, responsive, dark-mode, keyboard, and `.md` reviews.

## 11. Measurement

The first release measures quality through completion and consistency rather than an assumed engagement lift.

Track:

- percentage of procedural pages with `Steps` and a verified outcome;
- percentage of integration guides conforming to the integration archetype;
- number of unresolved component-contract exceptions;
- number of broken links, invalid pages, accessibility errors, and anchor errors;
- number of API fields or examples blocked on source verification;
- percentage of screenshots with a recorded capture date and owner;
- support and documentation-search questions that reveal missing steps, unclear terminology, or failed verification.

If reliable documentation analytics are available, compare task exits and searches on the selected golden-path pages before and after rollout. Do not treat page views alone as evidence of improved comprehension.

## 12. Risks and mitigations

| Risk                                       | Impact                                            | Mitigation                                                                   |
| ------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| Component overuse                          | Pages become visually noisy and slower to scan    | Require a reader-job rationale; plain prose is always acceptable             |
| Critical content is hidden                 | Readers miss required steps or safety constraints | Keep prerequisites, risks, limitations, and verification visible             |
| MDX syntax regressions                     | Pages fail to build or render                     | Migrate in small batches and run validation after each batch                 |
| Broad `CardGroup` migration changes layout | Related links or hubs regress on some viewports   | Preserve source order and perform representative visual checks               |
| Screenshots become stale                   | UI instructions lose trust                        | Record source, capture date, owner, and review trigger                       |
| Sensitive data appears in assets           | Privacy or security incident                      | Use approved sample data and review every asset before commit                |
| API schema is inferred                     | Documentation promises unsupported behavior       | Require a product or OpenAPI source for every structured field               |
| Tabs and visibility create duplicate facts | Variants drift over time                          | Keep shared facts outside variants and restrict `Visibility`                 |
| Diagrams oversimplify behavior             | Readers form an incorrect mental model            | Validate diagrams against product sources and keep caveats visible           |
| Mobile or assistive views break            | Content becomes inaccessible                      | Preserve semantic order and test keyboard, screen reader, and mobile layouts |

## 13. Deliverables

1. A versioned component audit and page-archetype exception report.
2. A reusable component contract in the project authoring guidance.
3. Migrated `Columns` and semantically reviewed callouts.
4. Normalized golden-path and integration procedures.
5. Structured, verified hand-authored API examples and fields.
6. A tested AI prompt and verified concept diagrams.
7. An approved screenshot process and framed feature-guide assets.
8. Automated validation and an editorial QA checklist.

## 14. Definition of done

This project is complete when every acceptance criterion is met, all phases have passed their exit criteria, and the component audit has no unexplained violations.

Completion does not require adopting every Mintlify component. Components explicitly kept out of scope remain unused unless a later product requirement supplies a reader need, source of truth, owner, and maintenance plan.

## 15. Open questions

1. Who owns live-product screenshot capture, redaction, and refresh?
2. Which source will supply verified response schemas for the hand-authored read and SQL API pages?
3. Should the component audit become a blocking CI check after its first stable release?
4. Should the component contract live directly in the tinyanalytics documentation skill or in a linked reference file?
5. Are maintainable visual assets available for an integrations-overview `Tile` pilot?
6. Which documentation analytics and support-search data are available for before-and-after evaluation?

## 16. References

- [Mintlify components overview](https://www.mintlify.com/docs/components)
- [Tabs](https://www.mintlify.com/docs/components/tabs)
- [Code groups](https://www.mintlify.com/docs/components/code-groups)
- [Steps](https://www.mintlify.com/docs/components/steps)
- [Columns](https://www.mintlify.com/docs/components/columns)
- [Callouts](https://www.mintlify.com/docs/components/callouts)
- [Frames](https://www.mintlify.com/docs/components/frames)
- [Prompt](https://www.mintlify.com/docs/components/prompt)
- [Accordions](https://www.mintlify.com/docs/components/accordions)
- [Visibility](https://www.mintlify.com/docs/components/visibility)
- [View](https://www.mintlify.com/docs/components/view)
- [API examples](https://www.mintlify.com/docs/components/examples)
- [Cards](https://www.mintlify.com/docs/components/cards)
- [Tiles](https://www.mintlify.com/docs/components/tiles)
- [Mermaid diagrams](https://www.mintlify.com/docs/components/mermaid-diagrams)
- [Tree](https://www.mintlify.com/docs/components/tree)
- [Fields](https://www.mintlify.com/docs/components/fields)
- [Expandables](https://www.mintlify.com/docs/components/expandables)
- [Panel](https://www.mintlify.com/docs/components/panel)
