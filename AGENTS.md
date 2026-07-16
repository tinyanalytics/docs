# tinyanalytics documentation — instructions for AI tools

This is the public documentation site for **tinyanalytics**, built on [Mintlify](https://mintlify.com). Pages are MDX with YAML frontmatter; site config is `docs.json`.

## Read these first

- **`PRD.md`** — the documentation spec: audience, voice, information architecture, phasing, and scope.
- **`.agents/skills/tinyanalytics-docs/SKILL.md`** — the project skill: sources of truth, hard content boundaries, terminology, and page templates. Load it before writing.
- **`.agents/skills/mintlify/SKILL.md`** — the platform skill: components, `docs.json`, frontmatter, and the `mint` CLI. Load it too.

## What this product is

tinyanalytics is privacy-friendly, cookieless web **and** product analytics, offered as a **hosted service** at `dash.tinyanalytics.io`. It is **closed-source and hosted-only** — write every page for a cloud customer.

## Content boundaries (do not cross)

- **Never document self-hosting or installation of the platform** — no Docker, `setup.sh`, environment variables, SMTP/geo-database setup, backups, or upgrades. (A first-party proxy for tracking through your own domain is a cloud-customer feature and is fine.)
- **Never document the admin console or operator internals** — instance ops, system-admin tooling, email diagnostics.
- **Never document unshipped features** — session replay is excluded by design. Check `../tinyanalytics/wiki/features.md` before writing about anything.
- **Never expose internal reasoning** — decision records inform pages; they are not pages.
- **API keys authenticate ingestion only** — never present them as auth for reading analytics.

## Terminology

- **tinyanalytics** — one word, all lowercase, even at the start of a sentence.
- **site** — a tracked website or app (not "property" or "project").
- **organization** — the top-level tenant; **team** — a site-access group inside an organization.
- **custom event** — a named event you send with `event()`; **identify** — attaching a user ID with `identify()`.
- **cookieless identity** — the hash-based visitor model. Explain the mechanism; never call it "fingerprinting" without the rotation/unstored context.

## Style

- Second person, active voice, present tense; sentence case for headings.
- Answer first: open every page and section with a direct, self-contained answer.
- Specifics over adjectives ("under 6 KB gzipped", not "lightweight"). No marketing words.
- Bold for UI elements (**Add website**); code font for files, commands, paths, and endpoints.
- Every how-to ends with a **Verify** step and a **Related** links block.

## Sources of truth

`../tinyanalytics/wiki/features.md` (capability matrix), `../tinyanalytics/wiki/` (behavior), and the product README. Never invent behavior — when unsure, cite the wiki or mark it with a `{/* TODO: verify against product */}` comment.

## Verify before you finish

Run `mint validate` and `mint broken-links` in this repo. Every page needs `title` + `description` frontmatter, and new pages must be added to `docs.json` navigation.
