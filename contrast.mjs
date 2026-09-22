#!/usr/bin/env node
/**
 * Reads the palette straight out of src/02-color-light.css and
 * src/03-color-dark.css and checks every text colour against the surface it
 * is actually painted on.
 *
 * AA body text is 4.5:1. --cairn-muted is exempt: it is Obsidian's
 * --text-faint, used for line numbers, fold arrows and unresolved links —
 * decoration, not reading matter, and the brand fixes its value.
 */

import { readFileSync } from "node:fs";

const parse = (file) => {
  const css = readFileSync(new URL(file, import.meta.url), "utf8");
  const vars = {};
  for (const [, k, v] of css.matchAll(/--(cairn-[\w-]+)\s*:\s*([^;]+);/gi)) {
    vars[k] = v.trim().replace(/\s+/g, " ");
  }
  return vars;
};

/* Tabs are painted with a vertical gradient. Check the darkest stop — the
   bottom of the tab, where the label sits over the least contrast. */
const gradientEnd = (v) => {
  const stops = v.match(/#[0-9a-f]{6}/gi);
  return stops ? stops[stops.length - 1] : null;
};

const toRgb = (v) =>
  v.startsWith("#")
    ? [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16))
    : v.split(",").map((n) => +n.trim());

const lum = (c) =>
  c
    .map((v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((a, v, i) => a + [0.2126, 0.7152, 0.0722][i] * v, 0);

const ratio = (a, b) => {
  const [l1, l2] = [lum(toRgb(a)), lum(toRgb(b))];
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/* Exempt from the 4.5 floor, with the reason each is exempt:
   - cairn-muted is --text-faint: line numbers, fold arrows, unresolved links.
     Decoration, not reading matter, and the brand fixes its value.
   - light:cairn-accent is the terracotta stamp colour. At 4.04 on paper it is
     never used as body text in this theme — links take --cairn-accent-deep.
     It paints the caret, button fills, borders and active states. In dark it
     IS the link colour, so there it is checked. */
const EXEMPT = new Set(["cairn-muted", "light:cairn-accent"]);
const FG = [
  "cairn-ink",
  "cairn-ink-soft",
  "cairn-muted",
  "cairn-accent-deep",
  "cairn-accent",
  "cairn-c-rule",
  "cairn-c-log",
  "cairn-c-know",
  "cairn-c-raw",
  "cairn-c-proc",
];

let failed = false;

for (const [scheme, file] of [
  ["light", "./src/02-color-light.css"],
  ["dark", "./src/03-color-dark.css"],
]) {
  const v = parse(file);
  const surface = v["cairn-panel"];
  console.log(`\n${scheme} · on ${surface}`);

  for (const key of FG) {
    if (!v[key]) continue;
    const r = ratio(v[key], surface);
    const exempt = EXEMPT.has(key) || EXEMPT.has(`${scheme}:${key}`);
    const ok = r >= 4.5 || exempt;
    if (!ok) failed = true;
    const mark = r >= 4.5 ? "✓" : exempt ? "— exempt" : "✗ below 4.5";
    console.log(`  --${key.padEnd(18)} ${v[key].padEnd(16)} ${r.toFixed(2).padStart(5)}  ${mark}`);
  }

  /* Blockquotes are printed on their own card stock, not the note surface. */
  for (const fg of ["cairn-ink", "cairn-ink-soft"]) {
    const bg = v["cairn-quote-paper"];
    if (!bg || !v[fg]) continue;
    const r = ratio(v[fg], bg);
    if (r < 4.5) failed = true;
    console.log(
      `  ${fg.padEnd(20)} on ${bg.padEnd(12)} ${r.toFixed(2).padStart(5)}  ${r >= 4.5 ? "✓" : "✗ below 4.5"}  quote card`
    );
  }
}

console.log();
if (failed) {
  console.error("contrast check failed");
  process.exit(1);
}
console.log("contrast ok");
