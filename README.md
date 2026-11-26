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

Run from the repository root with Bun and Node.js installed. The exact build command is:

```sh
bun install --frozen-lockfile && bun run build
```

That creates the Worker at `.output/server/index.mjs` and static assets at `.output/public/`. Deploy production with:

```sh
bunx wrangler deploy --config wrangler.jsonc
```

Deploy the existing Preview Worker with:

```sh
bunx wrangler deploy --config wrangler.jsonc --env preview
```

The Preview environment is explicitly named `tagveris-preview`; it uses `DB` bound to `tagveris-preview-db` (`8e99093c-c119-4aa6-9c95-37e52eb95421`) and `ASSETS` from `.output/public/`. The production environment remains `pixel-perfect-replica` and its `DB` remains `tagveris-db` (`5a538838-50fb-4697-8313-e6b0290ac320`).

Wrangler deploys the Worker defined by `main`, plus the assets and D1 binding in the configuration; do not override the command with a static asset-only deployment. No application secrets or runtime environment variables are currently required by the local FAQ assistant or health endpoints. Cloudflare deployment authentication requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the deployment environment, or an authenticated `wrangler login` session locally. Keep credentials secret and never define them as `VITE_*` variables.

### API status

`GET /api/health` reports Worker health. `GET /api/db/health` performs only the read-only query `SELECT 1` through the D1 binding. `/api/products`, `/api/tags`, and `/api/auth/session` return HTTP 501 because the repository does not yet contain a products/tags database schema or an authentication/session implementation. They intentionally do not return fabricated demo records or claim a session is active.

### Production data protection

Preview-only configuration changes do not alter the production Worker or its D1 binding. Deploying this Worker does not require applying migrations. Do not run any production database reset, DROP, delete, cleanup, or destructive migration command. No deployment was performed as part of this configuration update.
