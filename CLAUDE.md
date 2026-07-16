# Mintlify documentation

## Working relationship
- You can push back on ideas-this can lead to better documentation. Cite sources and explain your reasoning when you do so
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up anything

## Project context
- Format: MDX files with YAML frontmatter
- Config: docs.json for navigation, theme, settings
- Components: Mintlify components

## Content strategy
- Document just enough for user success - not too much, not too little
- Prioritize accuracy and usability
- Make content evergreen when possible
- Search for existing content before adding anything new. Avoid duplication unless it is done for a strategic reason
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

## docs.json

- Refer to the [docs.json schema](https://mintlify.com/docs.json) when building the docs.json file and site navigation

## Frontmatter requirements for pages
- title: Clear, descriptive page title
- description: Concise summary for SEO/navigation

## Writing standards
- Second-person voice ("you")
- Prerequisites at start of procedural content
- Test all code examples before publishing
- Match style and formatting of existing pages
- Include both basic and advanced use cases
- Language tags on all code blocks
- Alt text on all images
- Relative paths for internal links

## GEO (Generative Engine Optimization)
Write so AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, Bing Copilot) can find, extract, and cite the docs accurately.
- Answer first: open every page and every section with a direct, self-contained answer before adding detail or background (inverted pyramid)
- Self-contained passages: write each `##`/`###` section so it stands on its own when quoted in isolation — AI engines cite passages, not whole pages; repeat essential context instead of relying on "as mentioned above"
- Question-shaped headings: phrase headings the way users actually ask (e.g. "How do I install the tracking script?"), and keep one H1 (the page title) with a logical heading hierarchy
- Citable specifics: state concrete, verifiable facts — exact values, limits, version numbers, defaults, dates — since engines favor precise statements. NEVER invent them; if unknown, ask or omit
- Consistent terminology: use one canonical term per concept across all pages so engines associate the entity reliably; avoid synonyms for the same thing
- Definitions and FAQs: give key concepts a one-sentence plain definition near first use, and add short FAQ blocks for common questions
- GEO-aware frontmatter: make each `description` read as a standalone summary that answers "what is this page about?" using the language users search with
- Descriptive links: use meaningful anchor text that names the target (never "click here"); cross-link related pages
- llms.txt: Mintlify auto-generates `/llms.txt` and `/llms-full.txt` from titles and descriptions — keep both accurate and descriptive so those files are useful to LLMs
- Keep facts evergreen and current: update docs when the product changes; stale or contradictory statements get skipped or misquoted by engines

## Git workflow
- NEVER use --no-verify when committing
- Ask how to handle uncommitted changes before starting
- Create a new branch when no clear branch exists for changes
- Commit frequently throughout development
- NEVER skip or disable pre-commit hooks

## Do not
- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions - always ask for clarification