// makefun-x-reposts-02 — westi entry.
//
// The entry is the X posts themselves. This program has one job: hand
// POSTS.json to the house. It reads POSTS.json from the repository root,
// checks that it is an object holding a "posts" list of 1 to 15 addresses,
// and writes it byte-for-byte into the output directory, where the gate
// reads it. Nothing else is written; the posts' counts are read by the
// house from X itself, never from anything this program outputs.
//
// Node 22+, standard library only, no network. Run it locally as:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const FILENAME = 'POSTS.json';

const sourcePath = join(BOT_DIR, FILENAME);
const raw = readFileSync(sourcePath, 'utf8');

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error(`${FILENAME} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof parsed !== 'object' ||
  parsed === null ||
  !Array.isArray((parsed as { posts?: unknown }).posts)
) {
  console.error(`${FILENAME} must be a JSON object with a "posts" array.`);
  process.exit(1);
}

const posts = (parsed as { posts: unknown[] }).posts;
if (posts.length < 1 || posts.length > 15) {
  console.error(`${FILENAME} must name 1 to 15 posts, found ${posts.length}.`);
  process.exit(1);
}

for (const item of posts) {
  if (typeof item !== 'string' || !/x\.com|twitter\.com/.test(item)) {
    console.error(`${FILENAME} holds a bad post address: ${String(item)}`);
    process.exit(1);
  }
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const targetPath = join(OUTPUT_DIR, FILENAME);
writeFileSync(targetPath, raw, 'utf8');
console.log(`Wrote ${posts.length} post(s) from ${FILENAME} to ${targetPath}.`);
