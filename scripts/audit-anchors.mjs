#!/usr/bin/env node

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".agents",
  ".git",
  "drafts",
  "node_modules",
  "scripts",
]);
const errors = [];

function findMdxFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) {
      return [];
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return findMdxFiles(absolute);
    }
    return entry.isFile() && entry.name.endsWith(".mdx") ? [absolute] : [];
  });
}

function routeForFile(file) {
  const relative = path.relative(root, file).replace(/\.mdx$/, "");
  return relative === "index" ? "/" : `/${relative}`;
}

function slugifyHeading(heading) {
  return heading
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/&amp;/g, "and")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sourceWithoutCodeFences(source) {
  return source.replace(/```[\s\S]*?```/g, "");
}

const files = findMdxFiles(root).sort();
const pages = new Map();

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const headings = new Set();
  const counts = new Map();

  for (const match of sourceWithoutCodeFences(source).matchAll(
    /^#{2,6}\s+(.+?)\s*$/gm,
  )) {
    const base = slugifyHeading(match[1]);
    const duplicateCount = counts.get(base) ?? 0;
    counts.set(base, duplicateCount + 1);
    headings.add(duplicateCount === 0 ? base : `${base}-${duplicateCount}`);
  }

  pages.set(routeForFile(file), { file, source, headings });
}

let checked = 0;
for (const [sourceRoute, page] of pages) {
  const source = sourceWithoutCodeFences(page.source);
  const links = [
    ...source.matchAll(/\]\((\/[^)\s#]*)#([^)]+)\)/g),
    ...source.matchAll(/href="(\/[^"#]*)#([^"]+)"/g),
  ];

  for (const match of links) {
    checked += 1;
    const targetRoute = match[1] || sourceRoute;
    const anchor = decodeURIComponent(match[2]);
    const target = pages.get(targetRoute);

    if (!target) {
      errors.push(
        `${path.relative(root, page.file)}: anchor target page ${targetRoute} does not exist`,
      );
      continue;
    }
    if (!target.headings.has(anchor)) {
      errors.push(
        `${path.relative(root, page.file)}: #${anchor} is missing from ${targetRoute}`,
      );
    }
  }
}

console.log(`Anchor links checked: ${checked}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) {
  console.log(`- ${error}`);
}

if (errors.length > 0) {
  process.exitCode = 1;
}
