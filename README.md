# Pixel Perfect Replica

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Development

```sh
bun install --frozen-lockfile
bun run dev
```

## Cloudflare Workers deployment

This is a TanStack Start SSR application built by Vite/Nitro for Cloudflare Workers. Do **not** deploy `dist/` or `.output/public` as a Pages/static-only site: the Worker entry point is `.output/server/index.mjs`, and `.output/public` is only the static asset directory served through the Worker `ASSETS` binding.

### Build and deploy commands

Run from the repository root with Bun and Node.js installed:

```sh
bun install --frozen-lockfile && bun run build
```

Production deployment uses the production Wrangler config:

```sh
bunx wrangler deploy --config wrangler.jsonc
```

Preview deployment uses its own config and Worker, isolated from Production:

```sh
bunx wrangler deploy --config wrangler.preview.jsonc
```

The Preview Worker is `tagveris-preview` and its `DB` binding points to `tagveris-preview-db` (`8e99093c-c119-4aa6-9c95-37e52eb95421`). Production remains `pixel-perfect-replica`, with `DB` bound to `tagveris-db` (`5a538838-50fb-4697-8313-e6b0290ac320`). The Preview config is deliberately separate so Nitro's redirected Wrangler config cannot inherit an `env.preview` block.

Cloudflare deployment authentication requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the deployment environment, or an authenticated `wrangler login` session locally. Keep credentials secret and never define them as `VITE_*` variables. Do not override this Worker deploy with a static asset-only deployment.

### API status

`GET /api/health` reports Worker health. `GET /api/db/health` performs only the read-only query `SELECT 1` through the D1 binding. `/api/products`, `/api/tags`, and `/api/auth/session` currently return HTTP 501 because the repository does not yet contain a products/tags database schema or an authentication/session implementation. They intentionally do not return fabricated demo records or claim authentication is active.

### Production data protection

Preview-only configuration changes do not alter the Production Worker or its D1 binding. These deploy commands do not apply migrations. Do not run any Production database reset, DROP, delete, cleanup, or destructive migration command. No deployment is performed by these documentation instructions.
