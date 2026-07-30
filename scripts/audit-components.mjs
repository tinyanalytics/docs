#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const ignoredDirectories = new Set([
  ".agents",
  ".claude",
  ".git",
  ".gstack",
  "node_modules",
  "scripts",
]);
const integrationStepExceptions = new Map([
  [
    "integrations/angular-analytics.mdx",
    "one file edit; verification is documented separately",
  ],
  ["integrations/astro-analytics.mdx", "one shared-layout edit"],
  ["integrations/docusaurus-analytics.mdx", "one configuration entry"],
  [
    "integrations/drupal-analytics.mdx",
    "mutually exclusive template and tag-manager methods",
  ],
  ["integrations/gatsby-analytics.mdx", "one shared-layout edit"],
  ["integrations/hugo-analytics.mdx", "one template or partial edit"],
  ["integrations/jekyll-analytics.mdx", "one include or layout edit"],
  ["integrations/laravel-analytics.mdx", "one shared-layout edit"],
  [
    "integrations/nextjs-analytics.mdx",
    "mutually exclusive App Router and Pages Router tabs",
  ],
  ["integrations/nuxt-analytics.mdx", "one configuration entry"],
  ["integrations/react-analytics.mdx", "one HTML-shell edit"],
  ["integrations/remix-analytics.mdx", "one root-document edit"],
  ["integrations/sveltekit-analytics.mdx", "one HTML-shell edit"],
  ["integrations/vitepress-analytics.mdx", "one configuration entry"],
  ["integrations/vue-analytics.mdx", "one HTML-shell edit"],
]);

async function findMdxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(absolutePath)));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(absolutePath);
    }
  }

  return files;
}

function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

const files = (await findMdxFiles(root)).sort();
const componentInstances = new Map();
const componentPages = new Map();
const hardErrors = [];
const reviewQueue = [];
const documentedExceptions = [];

for (const absolutePath of files) {
  const source = await readFile(absolutePath, "utf8");
  const relativePath = path.relative(root, absolutePath);
  const pageComponents = new Set();
  const sourceWithoutCode = source
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]+`/g, "");
  const mermaidInstances = source.match(/^```mermaid\s*$/gm)?.length ?? 0;

  if (mermaidInstances > 0) {
    componentInstances.set(
      "Mermaid",
      (componentInstances.get("Mermaid") ?? 0) + mermaidInstances,
    );
    pageComponents.add("Mermaid");
  }

  for (const match of sourceWithoutCode.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
    const component = match[1];
    increment(componentInstances, component);
    pageComponents.add(component);
  }

  for (const component of pageComponents) {
    increment(componentPages, component);
  }

  const frontmatter = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);

  if (!frontmatter) {
    hardErrors.push(`${relativePath}: missing YAML frontmatter`);
  } else {
    if (!/^title:\s*.+$/m.test(frontmatter[1])) {
      hardErrors.push(`${relativePath}: missing frontmatter title`);
    }
    if (!/^description:\s*.+$/m.test(frontmatter[1])) {
      hardErrors.push(`${relativePath}: missing frontmatter description`);
    }
  }

  if (source.includes("<CardGroup")) {
    hardErrors.push(`${relativePath}: replace CardGroup with Columns`);
  }

  if (source.includes("<Steps>") && !source.includes("<Check>")) {
    hardErrors.push(`${relativePath}: Steps has no visible Check result`);
  }

  if (/^## Related\s*$/m.test(source) && !source.includes("<Columns")) {
    hardErrors.push(`${relativePath}: Related links are not grouped with Columns`);
  }

  if (
    relativePath.startsWith(`integrations${path.sep}`) &&
    relativePath !==
      path.join("integrations", "install-website-analytics.mdx") &&
    !source.includes("<Steps>")
  ) {
    const reason = integrationStepExceptions.get(relativePath);

    if (reason) {
      documentedExceptions.push(`${relativePath}: ${reason}`);
    } else {
      reviewQueue.push(
        `${relativePath}: add Steps or record a one-step/tabs-only exception`,
      );
    }
  }
}

const rows = [...componentInstances.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([component, instances]) => ({
    component,
    instances,
    pages: componentPages.get(component) ?? 0,
  }));

console.log(`Authored MDX pages: ${files.length}`);
console.log("");
console.log("Component               Instances  Pages");
console.log("----------------------  ---------  -----");

for (const row of rows) {
  console.log(
    `${row.component.padEnd(22)}  ${String(row.instances).padStart(9)}  ${String(row.pages).padStart(5)}`,
  );
}

console.log("");
console.log(`Hard errors: ${hardErrors.length}`);
for (const error of hardErrors) {
  console.log(`- ${error}`);
}

console.log("");
console.log(`Review queue: ${reviewQueue.length}`);
for (const item of reviewQueue) {
  console.log(`- ${item}`);
}

console.log("");
console.log(`Documented integration exceptions: ${documentedExceptions.length}`);
for (const item of documentedExceptions) {
  console.log(`- ${item}`);
}

if (hardErrors.length > 0 || (strict && reviewQueue.length > 0)) {
  process.exitCode = 1;
}
