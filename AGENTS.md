<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Marketing pages wrap content in `SiteLayout`; dashboards (`/dashboard/*`, `/admin/*`) use `AppShell` layout routes — keeps the public site chrome out of app screens.
- Brand logo files are served from `public/brand/` (not the asset CDN) — the site is also deployed outside Lovable hosting.
- All not-yet-connected features (verification lookup, auth, cart checkout, dashboard data) live in `src/lib/verify.ts`, `src/lib/cart.tsx`, `src/lib/demo-data.ts` and must stay visibly labelled as demo — the brief forbids pretending verification or auth is live.
- Rules in `src/lib/verify.ts` and `src/lib/cart.tsx` are covered by `src/test/rules.test.ts`; update tests when the rules change.
