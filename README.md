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

Deploy the isolated Preview Worker with:

```sh
bunx wrangler deploy --config wrangler.jsonc --env preview
```

For one-shot commands including the build, use `bun install --frozen-lockfile && bun run build && bunx wrangler deploy --config wrangler.jsonc` (production), or append `--env preview` (preview). Wrangler deploys the Worker defined by `main`, plus the assets and D1 binding in the configuration; do not override the command with a static asset-only deployment.

The configured D1 bindings are:

- Production `DB`: `tagveris-db` (`5a538838-50fb-4697-8313-e6b0290ac320`).
- Preview `DB`: `tagveris-preview-db` (`8e99093c-c119-4aa6-9c95-37e52eb95421`).

The Worker exposes `GET /api/health` and `GET /api/db/health`; the latter performs only `SELECT 1` and does not read or modify application data. Use these after deployment to check that the server Worker and its D1 binding are present.

### Credentials and environment

No application secrets or runtime environment variables are currently required by the local FAQ assistant or these health endpoints. Cloudflare deployment authentication requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the deployment environment, or an authenticated `wrangler login` session locally. Keep both values secret; never commit them to this repository. Do not define the Cloudflare credentials as `VITE_*` variables, since Vite variables are client-exposed.

### Production data protection

Deploying this Worker does not require applying migrations. Do not run `wrangler d1 migrations apply`, `wrangler d1 execute`, or any database reset/cleanup command as part of this deployment unless a separately reviewed, non-destructive migration is explicitly approved. In particular, never reset, drop, or delete data in production `tagveris-db`. The API health check uses a read-only `SELECT 1` query.

### Cloudflare agent deployment instructions

1. Check out the requested commit/branch and repository root. Confirm `wrangler.jsonc` is the configuration file used by the deployment.
2. Install dependencies with `bun install --frozen-lockfile` and run `bun run build`.
3. Confirm both `.output/server/index.mjs` and `.output/public/` exist. Do not select `dist/` or `.output/public/` as the sole deployment artifact.
4. Authenticate with the account's secret `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` (or an existing secure Wrangler login).
5. Deploy production using `bunx wrangler deploy --config wrangler.jsonc`. Verify the deployed Worker has both the `ASSETS` binding and `DB` bound to `tagveris-db` with the production ID above. Smoke-test `/api/health` and `/api/db/health`.
6. For a preview environment only, deploy with `bunx wrangler deploy --config wrangler.jsonc --env preview` and verify `DB` resolves to `tagveris-preview-db` and the Preview Worker name is `pixel-perfect-replica-preview`.
7. Do not apply database migrations or execute any destructive D1 operation during deployment. If Wrangler reports an unrecognized or missing binding, stop and report it rather than changing database IDs or running migration/reset commands.
