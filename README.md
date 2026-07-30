# tinyanalytics documentation

This repository contains the public documentation for **tinyanalytics**, the hosted web and product analytics platform that helps you understand traffic and product behavior without tracking people.

The site is built with [Mintlify](https://www.mintlify.com) from MDX pages and `docs.json`.

## Before you edit

Read these files before changing documentation:

- [`AGENTS.md`](./AGENTS.md) for repository rules and verification requirements.
- [`PRD.md`](./PRD.md) for the audience, information architecture, voice, and scope.
- [`.agents/skills/tinyanalytics-docs/SKILL.md`](./.agents/skills/tinyanalytics-docs/SKILL.md) for product terminology, sources of truth, and content boundaries.
- [`.agents/skills/mintlify/SKILL.md`](./.agents/skills/mintlify/SKILL.md) for Mintlify components and authoring rules.
- [`BRAND-MARKETING.md`](./BRAND-MARKETING.md) for internal positioning, messaging, and claim-verification gates.

## Product boundaries

- Write for customers of the hosted service at [dash.tinyanalytics.io](https://dash.tinyanalytics.io).
- Do not document self-hosting, operator internals, or unshipped features.
- Verify product behavior against `../tinyanalytics/wiki/` before publishing it.
- Use **tinyanalytics** in lowercase and call each tracked website or app a **site**.

## Development

Run a local preview from the repository root:

```bash
mint dev
```

View your local preview at `http://localhost:3000`.

## Validate changes

Before opening a pull request, run:

```bash
mint validate
mint broken-links
```

Every page needs `title` and `description` frontmatter. Add new pages to the navigation in `docs.json`.

## Publishing

Changes deploy through the repository's connected Mintlify project after they reach the default branch.
