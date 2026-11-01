/**
 * Pre-launch gate: lists every UNVERIFIED tag and unverified figure in src/, and exits 1 while any remain.
 * Run before going live: npm run check:launch. Not wired into `build`, so previews still deploy.
 * See CONTENT-TODO.md for what each item needs.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) yield p;
  }
}

const hits = [];
for await (const file of walk("src")) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    if (/UNVERIFIED/.test(line) || /verified:\s*false/.test(line)) hits.push(`${file.replaceAll("\\", "/")}:${i + 1}  ${line.trim().slice(0, 110)}`);
  });
}

if (hits.length) {
  console.error(`\n${hits.length} unverified item(s) — not ready to launch:\n`);
  for (const h of hits) console.error(`  ${h}`);
  console.error("\nConfirm or replace each one, remove its tag, then run this again. Details: CONTENT-TODO.md\n");
  process.exit(1);
}
console.log("No unverified content tags. Ready for launch review.");
