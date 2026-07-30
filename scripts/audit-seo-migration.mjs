#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const plan = readFileSync(
  path.join(root, "drafts", "SEO-MIGRATION-PLAN.md"),
  "utf8",
);
const mappingPattern =
  /^\| `([^`]+)`\s+\| `([^`]+)`\s+\| ([^|]+?)\s+\| ([^|]+?)\s+\|$/gm;
const mappings = [...plan.matchAll(mappingPattern)].map((match) => ({
  oldRoute: match[1],
  newRoute: match[2],
  title: match[3].trim(),
  sidebarTitle: match[4].trim(),
}));
const errors = [];
const warnings = [];

function routeToFile(route) {
  return route === "/" ? "index.mdx" : `${route.slice(1)}.mdx`;
}

function findMdxFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (
      entry.name.startsWith(".") ||
      ["node_modules", "drafts", "scripts"].includes(entry.name)
    ) {
      return [];
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return findMdxFiles(absolute);
    }
    return entry.isFile() && entry.name.endsWith(".mdx") ? [absolute] : [];
  });
}

function parseFrontmatter(file) {
  const source = readFileSync(file, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) {
    errors.push(`${path.relative(root, file)}: missing frontmatter`);
    return { source };
  }
  const field = (name) => {
    const fieldMatch = match[1].match(
      new RegExp(`^${name}:\\s*["']?(.*?)["']?\\s*$`, "m"),
    );
    return fieldMatch?.[1] ?? "";
  };
  return {
    source,
    title: field("title"),
    sidebarTitle: field("sidebarTitle"),
    description: field("description"),
    noindex: /^noindex:\s*true\s*$/m.test(match[1]),
  };
}

if (mappings.length !== 108) {
  errors.push(`migration plan has ${mappings.length} rows; expected 108`);
}

const authoredFiles = findMdxFiles(root).sort();
if (authoredFiles.length !== mappings.length) {
  errors.push(
    `repository has ${authoredFiles.length} authored MDX pages; expected ${mappings.length}`,
  );
}

const expectedFiles = new Set(
  mappings.map((mapping) => routeToFile(mapping.newRoute)),
);
const actualFiles = new Set(
  authoredFiles.map((file) => path.relative(root, file)),
);

for (const file of expectedFiles) {
  if (!actualFiles.has(file)) {
    errors.push(`${file}: expected migrated page is missing`);
  }
}
for (const file of actualFiles) {
  if (!expectedFiles.has(file)) {
    errors.push(`${file}: authored page is not in the approved map`);
  }
}

const titleOwners = new Map();
const descriptionOwners = new Map();
for (const mapping of mappings) {
  const relativeFile = routeToFile(mapping.newRoute);
  if (!actualFiles.has(relativeFile)) {
    continue;
  }
  const page = parseFrontmatter(path.join(root, relativeFile));

  if (page.title !== mapping.title) {
    errors.push(
      `${relativeFile}: title is "${page.title}", expected "${mapping.title}"`,
    );
  }
  if (page.sidebarTitle !== mapping.sidebarTitle) {
    errors.push(
      `${relativeFile}: sidebarTitle is "${page.sidebarTitle}", expected "${mapping.sidebarTitle}"`,
    );
  }
  if (!page.description) {
    errors.push(`${relativeFile}: missing description`);
  } else {
    if (page.description.length > 155) {
      errors.push(
        `${relativeFile}: description is ${page.description.length} characters`,
      );
    }
    if (page.description.length < 100) {
      warnings.push(
        `${relativeFile}: description is only ${page.description.length} characters`,
      );
    }
    const owner = descriptionOwners.get(page.description);
    if (owner) {
      errors.push(`${relativeFile}: duplicate description also used by ${owner}`);
    }
    descriptionOwners.set(page.description, relativeFile);
  }
  const titleOwner = titleOwners.get(page.title);
  if (titleOwner) {
    errors.push(`${relativeFile}: duplicate title also used by ${titleOwner}`);
  }
  titleOwners.set(page.title, relativeFile);

  if (page.noindex) {
    errors.push(`${relativeFile}: authored page must not set noindex`);
  }
  if (/^#\s+/m.test(page.source.replace(/^---\n[\s\S]*?\n---\n?/, ""))) {
    errors.push(`${relativeFile}: body contains an extra H1`);
  }
}

const docs = JSON.parse(readFileSync(path.join(root, "docs.json"), "utf8"));
if (
  docs.seo?.metatags?.canonical !== "https://tinyanalytics.io/docs"
) {
  errors.push(
    "docs.json: canonical base URL is not https://tinyanalytics.io/docs",
  );
}

const navigationPages = [];
function collectNavigationPages(value, key = "") {
  if (Array.isArray(value)) {
    if (key === "pages") {
      for (const child of value) {
        if (typeof child === "string") {
          navigationPages.push(child);
        }
      }
    }
    for (const child of value) {
      collectNavigationPages(child);
    }
    return;
  }
  if (value && typeof value === "object") {
    for (const [childKey, child] of Object.entries(value)) {
      collectNavigationPages(child, childKey);
    }
  }
}
collectNavigationPages(docs.navigation);

const expectedNavigationPages = new Set(
  mappings.map((mapping) =>
    routeToFile(mapping.newRoute).replace(/\.mdx$/, ""),
  ),
);
const actualNavigationPages = new Set(navigationPages);
if (navigationPages.length !== mappings.length) {
  errors.push(
    `docs.json: navigation has ${navigationPages.length} authored page entries; expected ${mappings.length}`,
  );
}
for (const page of expectedNavigationPages) {
  if (!actualNavigationPages.has(page)) {
    errors.push(`docs.json: navigation is missing ${page}`);
  }
}

const redirectCounts = new Map();
for (const redirect of docs.redirects ?? []) {
  redirectCounts.set(
    redirect.source,
    (redirectCounts.get(redirect.source) ?? 0) + 1,
  );
  if (redirect.permanent !== true) {
    errors.push(`${redirect.source}: redirect is not explicitly permanent`);
  }
}

for (const mapping of mappings) {
  if (mapping.oldRoute === mapping.newRoute) {
    continue;
  }
  const sources = [mapping.oldRoute, `/guides${mapping.oldRoute}`];
  for (const source of sources) {
    const matches = (docs.redirects ?? []).filter(
      (redirect) => redirect.source === source,
    );
    if (matches.length !== 1) {
      errors.push(`${source}: expected one redirect, found ${matches.length}`);
    } else if (matches[0].destination !== mapping.newRoute) {
      errors.push(
        `${source}: redirects to ${matches[0].destination}, expected ${mapping.newRoute}`,
      );
    }
  }
}

for (const [source, count] of redirectCounts) {
  if (count > 1) {
    errors.push(`${source}: duplicate redirect source`);
  }
}

const redirectSources = new Set(
  (docs.redirects ?? []).map((redirect) => redirect.source),
);
for (const redirect of docs.redirects ?? []) {
  if (redirectSources.has(redirect.destination)) {
    errors.push(
      `${redirect.source}: redirect chain continues through ${redirect.destination}`,
    );
  }
}

const changedMappings = mappings.filter(
  (mapping) => mapping.oldRoute !== mapping.newRoute,
);
for (const file of authoredFiles) {
  const source = readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file);
  for (const mapping of changedMappings) {
    const escaped = mapping.oldRoute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const oldLink = new RegExp(
      `(?:href=\"|\\]\\()${escaped}(?=[#?\"')])`,
    );
    if (oldLink.test(source)) {
      errors.push(
        `${relativeFile}: internal link still uses ${mapping.oldRoute}`,
      );
    }
  }
}

const openapi = JSON.parse(
  readFileSync(path.join(root, "openapi.json"), "utf8"),
);
let generatedNoindexCount = 0;
for (const methods of Object.values(openapi.paths ?? {})) {
  for (const operation of Object.values(methods)) {
    if (
      operation &&
      typeof operation === "object" &&
      operation["x-mint"]?.metadata?.noindex === true
    ) {
      generatedNoindexCount += 1;
    }
  }
}
if (generatedNoindexCount !== 148) {
  errors.push(
    `openapi.json: ${generatedNoindexCount} generated operations set noindex; expected 148`,
  );
}

console.log(`Authored pages: ${authoredFiles.length}`);
console.log(`Approved route changes: ${changedMappings.length}`);
console.log(`Permanent redirects: ${(docs.redirects ?? []).length}`);
console.log(`Generated noindex operations: ${generatedNoindexCount}`);
console.log(`Warnings: ${warnings.length}`);
for (const warning of warnings) {
  console.log(`- ${warning}`);
}
console.log(`Errors: ${errors.length}`);
for (const error of errors) {
  console.log(`- ${error}`);
}

if (errors.length > 0) {
  process.exitCode = 1;
}
