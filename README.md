# Readable ID — Raycast extension

Convert between UUIDs and Red Envelope **readable IDs** (`pmt_…`, `pmq_…`, `cpt_…`, …) without leaving Raycast.

All encode/decode is delegated to the shared [`@redenvelopeorg/utils`](https://github.com/redenvelopeorg) readable-id codec, so the logic and prefixes stay in lockstep with the backend — bump the dependency and you're up to date.

## Commands

| Command | Input | Output |
| --- | --- | --- |
| **Encode UUID to Readable ID** | a UUID + an object type (dropdown) | `prefix_base58` readable ID |
| **Decode Readable ID to UUID** | a readable ID (`pmt_…`) | the UUID (type auto-resolved from the prefix) |
| **Generate UUID V4** | — | a random UUID v4 |
| **Generate UUID V7** | — | a time-ordered UUID v7 |

All four open a small detail view, **auto-copy** the result to your clipboard, and confirm with a toast. Invalid input shows the codec's error message instead.

## Install locally

This is a private, unpublished extension — run it in Raycast's development mode.

**Prerequisites:** [Raycast](https://raycast.com), Node ≥ 22, `pnpm`, and npm auth for the `@redenvelopeorg` GitHub Packages scope (a `~/.npmrc` with a `//npm.pkg.github.com/:_authToken=…` line).

```bash
git clone git@github.com:redenvelopeorg/readable-id-raycast.git
cd readable-id-raycast
pnpm install
pnpm dev        # builds and loads the extension into Raycast (Raycast must be running)
```

`pnpm dev` imports the extension into Raycast and hot-reloads on change — leave it running while you use the commands. Once it has loaded successfully you can stop it (`Ctrl-C`) and the two commands remain available in Raycast. Search **"Encode UUID to Readable ID"** or **"Decode Readable ID to UUID"** to run them.

To produce a distributable build instead: `pnpm build`.

## Maintenance

- **Encode/decode logic + prefix strings** are pulled from `@redenvelopeorg/utils` at build time — nothing to maintain here; `pnpm update @redenvelopeorg/utils` keeps them current.
- **The dropdown list of object types** lives in `package.json` (`commands[0].arguments[].data`) because Raycast argument dropdowns are static. It's the only spot to touch if the registry ever gains a new object type.
