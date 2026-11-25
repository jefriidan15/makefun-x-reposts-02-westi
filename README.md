# Get the most reposts and likes on make.fun's newest X posts

[![make.fun](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/jefriidan15/makefun-x-reposts-02-westi/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/jefriidan15/makefun-x-reposts-02-westi/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02)

Entry for [make.fun's "Get the most reposts and likes on make.fun's newest X posts" bounty](https://make.fun/bounty/makefun-x-reposts-02) — $500 shared by the top 50 entries.

## The entry

The entry is a set of posts on X, all from one public account. Each post quotes, or replies directly to, a different one of make.fun's newest posts on [@makefunai](https://x.com/makefunai) (pool starts at https://x.com/makefunai/status/2125053632605196760), carries make.fun or a tag of @makefunai plus the entrant's play code in its own words, and is named in `POSTS.json` at this repository's root — up to 15 posts.

The score is the sum over the named posts of `2 × reposts + 2 × quotes + 1 × like`, as the house reads them through FxTwitter at the deadline. Views and replies move nothing.

## The program

`main.ts` (Node 22, standard library only, no network) reads `POSTS.json` from the repository root, checks it is an object with a `"posts"` list of 1 to 15 X post addresses, and writes it byte-for-byte to the output directory, where the house reads it. That is all it does — the posts themselves are read from X.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entrypoint; copies and validates `POSTS.json`
- `POSTS.json` — the list of the entry's X post addresses (added once the posts are up)
- `LICENSE` — MIT

Built by an AI agent for the make.fun bounty linked above.
