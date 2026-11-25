/**
 * TAGVERIS chat assistant — bilingual (LT / EN).
 *
 * Self-contained: no external libraries beyond React, no network calls,
 * no API keys. Answers come from src/lib/chat/engine.ts (local FAQ).
 *
 * Colours use the real TAGVERIS tokens from styles.css:
 *   navy / navy-deep / navy-foreground / navy-muted / teal / teal-strong /
 *   teal-foreground / surface
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { answer, detectLang, type ChatAnswer, type Lang } from "@/lib/chat/engine";
import {
  contactMailto,
  FAQ,
  GREETING,
  SUGGESTED_IDS,
  UI_COPY,
  type FaqEntry,
} from "@/lib/chat/knowledge";

const LANG_STORAGE_KEY = "tagveris:chat-lang";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  lang: Lang;
  status?: ChatAnswer["status"];
  related?: ChatAnswer["related"];
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: GREETING.en, lang: "en", status: "live" },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextId = useRef(1);

  const copy = UI_COPY[lang];

  /* Restore the visitor's language choice after mount (SSR-safe). */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      stored = null;
    }

    const pageLang = document.documentElement.lang?.toLowerCase().startsWith("lt") ? "lt" : "en";
    const initial: Lang = stored === "lt" || stored === "en" ? stored : pageLang;

    if (initial !== "en") {
      setLang(initial);
      setMessages([{ id: 0, role: "bot", text: GREETING[initial], lang: initial, status: "live" }]);
    }
  }, []);

  const changeLang = useCallback((next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* private mode — ignore */
    }
    setMessages((prev) => {
      // Only the greeting is re-translated; answers already given stay as they were.
      if (prev.length === 1 && prev[0].role === "bot") {
        return [{ id: 0, role: "bot", text: GREETING[next], lang: next, status: "live" }];
      }
      return prev;
    });
  }, []);

  const suggestions = useMemo(
    () =>
      SUGGESTED_IDS.map((id) => FAQ.find((e) => e.id === id))
        .filter((e): e is FaqEntry => Boolean(e))
        .map((e) => ({ id: e.id, question: e.question[lang] })),
    [lang],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || busy) return;

      const askedLang = detectLang(question, lang);

      setInput("");
      setBusy(true);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "user", text: question, lang: askedLang },
      ]);

      const result = await answer(question, askedLang);

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "bot",
          text: result.text,
          lang: result.lang,
          status: result.status,
          related: result.related,
        },
      ]);
      setBusy(false);
    },
    [busy, lang],
  );

  const statusLabel = (status?: ChatAnswer["status"]) => {
    if (status === "planned") return copy.statusPlanned;
    if (status === "partial") return copy.statusPartial;
    return null;
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-lg transition-colors hover:bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.5A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="13" cy="12" r="1" fill="currentColor" />
            <circle cx="17" cy="12" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={copy.title}
          lang={lang}
          className="fixed bottom-24 right-5 z-50 flex max-h-[70vh] w-[380px] max-w-[92vw] flex-col overflow-hidden rounded-xl border border-navy/10 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy px-4 py-3 text-navy-foreground">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-foreground/10 font-display text-sm font-semibold">
              TV
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold">{copy.title}</p>
              <p className="truncate text-xs text-navy-muted">{copy.subtitle}</p>
            </div>

            {/* Language switch */}
            <div
              className="flex shrink-0 items-center gap-0.5 rounded-full bg-navy-foreground/10 p-0.5"
              role="group"
              aria-label={copy.switchLabel}
            >
              {(["lt", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => changeLang(code)}
                  aria-pressed={lang === code}
                  className={
                    lang === code
                      ? "rounded-full bg-teal px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-foreground"
                      : "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase text-navy-muted transition-colors hover:text-navy-foreground"
                  }
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {messages.map((m) => {
              const label = statusLabel(m.status);
              return (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className="max-w-[85%]">
                    <div
                      lang={m.lang}
                      className={
                        m.role === "user"
                          ? "rounded-xl rounded-br-sm bg-navy px-3.5 py-2.5 text-sm leading-relaxed text-navy-foreground"
                          : "rounded-xl rounded-bl-sm border border-navy/10 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy"
                      }
                    >
                      {m.text.split("\n\n").map((para, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : undefined}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Honest status badge for features that are not live yet */}
                    {label && (
                      <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                        <span aria-hidden="true">●</span>
                        {label}
                      </p>
                    )}

                    {/* Related questions */}
                    {m.related && m.related.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.related.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => void send(r.question)}
                            className="rounded-full border border-navy/15 bg-white px-2.5 py-1 text-[11px] text-navy/70 transition-colors hover:border-teal-strong hover:text-navy"
                          >
                            {r.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {busy && (
              <div className="flex justify-start">
                <div className="rounded-xl rounded-bl-sm border border-navy/10 bg-white px-3.5 py-2.5">
                  <span className="flex gap-1" aria-label={copy.thinking}>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy/40" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy/40" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy/40" />
                  </span>
                </div>
              </div>
            )}

            {/* Suggestions only at the start of the conversation */}
            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => void send(s.question)}
                    className="rounded-full border border-navy/15 bg-white px-2.5 py-1 text-[11px] text-navy/70 transition-colors hover:border-teal-strong hover:text-navy"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-navy/10 bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              aria-label={copy.inputLabel}
              maxLength={300}
              className="min-w-0 flex-1 rounded-lg border border-navy/10 bg-surface px-3 py-2 text-sm text-navy outline-none placeholder:text-navy/40 focus:border-teal-strong"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={copy.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal text-teal-foreground transition-colors hover:bg-teal-strong disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div className="border-t border-navy/5 bg-white px-4 py-2 text-center text-[10px] leading-snug text-navy/50">
            <p>{copy.footer}</p>
            <a
              href={contactMailto()}
              className="mt-1 inline-block font-medium text-teal-strong underline-offset-2 hover:underline"
            >
              {copy.emailCta}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatAssistant;
