#!/usr/bin/env node
/**
 * Checks theme.css against the Obsidian theme guidelines before release:
 *   - no !important (users must be able to override with snippets)
 *   - no remote assets (themes must work offline)
 *   - no @import
 *   - balanced braces
 *   - both .theme-light and .theme-dark are defined
 */

import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8");

/* Strip comments before scanning — the Style Settings block and the prose in
   src/ both legitimately mention things like @import. Newlines are preserved
   so reported line numbers still match the file. */
const code = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const lines = code.split("\n");
const problems = [];

lines.forEach((line, i) => {
  const n = i + 1;
  if (/!important/.test(line)) problems.push(`${n}: !important`);
  if (/url\(\s*['"]?(https?:)?\/\//.test(line)) problems.push(`${n}: remote asset in url()`);
  if (/@import/.test(line)) problems.push(`${n}: @import`);
});

/* Anything comment-like left after stripping means a comment was mis-closed
   and real CSS is sitting outside a rule. */
for (const stray of ["/*", "*/"]) {
  const at = code.indexOf(stray);
  if (at !== -1) {
    problems.push(`${code.slice(0, at).split("\n").length}: stray ${stray} — unbalanced comment`);
  }
}

const open = (code.match(/{/g) || []).length;
const close = (code.match(/}/g) || []).length;
if (open !== close) problems.push(`unbalanced braces: ${open} { vs ${close} }`);

for (const scheme of [".theme-light", ".theme-dark"]) {
  if (!css.includes(scheme)) problems.push(`missing ${scheme} block`);
}

if (problems.length) {
  console.error("theme.css has issues:\n" + problems.map((p) => "  " + p).join("\n"));
  process.exit(1);
}

console.log(`theme.css looks clean (${lines.length} lines, ${open} rule blocks)`);
