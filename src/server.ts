import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type D1Database = {
  prepare(query: string): {
    first<T = unknown>(): Promise<T | null>;
  };
};

type WorkerEnv = {
  DB?: D1Database;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

/** Worker-owned API endpoints are handled before TanStack SSR. */
async function handleApi(request: Request, env: WorkerEnv): Promise<Response | null> {
  const { pathname } = new URL(request.url);
  if (pathname !== "/api/health" && pathname !== "/api/db/health") return null;

  if (request.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (pathname === "/api/health") {
    return jsonResponse({ ok: true, service: "pixel-perfect-replica" });
  }

  if (!env.DB) {
    return jsonResponse({ ok: false, error: "D1 binding DB is not configured" }, 503);
  }

  try {
    const result = await env.DB.prepare("SELECT 1 AS ok").first<{ ok: number }>();
    if (result?.ok !== 1) throw new Error("D1 health query returned an unexpected result");
    return jsonResponse({ ok: true, d1: true });
  } catch (error) {
    console.error("D1 health check failed", error);
    return jsonResponse({ ok: false, error: "D1 is unavailable" }, 503);
  }
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: WorkerEnv, ctx: unknown) {
    try {
      const apiResponse = await handleApi(request, env);
      if (apiResponse) return apiResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      if (new URL(request.url).pathname.startsWith("/api/")) {
        return jsonResponse({ ok: false, error: "Internal API error" }, 500);
      }
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
