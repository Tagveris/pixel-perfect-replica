/**
 * TAGVERIS chat engine — bilingual (LT / EN).
 *
 * CURRENT MODE: local FAQ matching. No network calls, no API keys, no cost.
 *
 * FUTURE AI: `AI_ENDPOINT` below is the single place to enable a real agent
 * (Workers AI / AI Gateway). The UI does not change. Any failure silently
 * falls back to the local FAQ, so visitors never see an error.
 */

import {
  FAQ,
  FALLBACK,
  GREETING,
  type FaqEntry,
  type FaqStatus,
  type Lang,
} from "./knowledge";

export type { Lang };

export interface ChatAnswer {
  text: string;
  /** Language the answer was produced in. */
  lang: Lang;
  status: FaqStatus | "fallback";
  /** "faq" (local) or "ai" (future). */
  source: "faq" | "ai";
  /** Follow-up questions to offer as chips. */
  related: { id: string; question: string }[];
}

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

/** Lowercase, strip diacritics, drop punctuation, collapse whitespace. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------------------------------------------ */
/* Language detection                                                  */
/* ------------------------------------------------------------------ */

const LT_DIACRITICS = /[ąčęėįšųūž]/i;

const LT_WORDS = [
  "ar", "kaip", "kas", "kiek", "kur", "kada", "kodel", "kuri", "kuris",
  "noriu", "galima", "yra", "apie", "patikrinti", "kainuoja", "kaina",
  "mano", "jusu", "labas", "sveiki", "aciu", "prasau", "reikia", "turi",
  "butu", "gal", "taip", "ne", "su", "ir", "kad", "tai", "del",
];

const EN_WORDS = [
  "what", "how", "is", "are", "can", "do", "does", "the", "about", "price",
  "cost", "verify", "register", "registration", "you", "your", "i", "my",
  "need", "want", "hello", "hi", "thanks", "please", "where", "when", "why",
  "which", "there", "for", "with", "and", "this", "that",
];

/**
 * Detects the language of a question.
 * Order: diacritics → word hits → explicit fallback.
 */
export function detectLang(input: string, fallback: Lang = "en"): Lang {
  const raw = input.trim();
  if (!raw) return fallback;

  if (LT_DIACRITICS.test(raw)) return "lt";

  const normalized = normalize(raw);
  const tokens = normalized.split(" ").filter(Boolean);

  let lt = 0;
  let en = 0;
  for (const token of tokens) {
    if (LT_WORDS.includes(token)) lt += 1;
    if (EN_WORDS.includes(token)) en += 1;
  }

  // Lithuanian word endings are a decent extra signal for diacritic-free input.
  if (lt === en) {
    for (const token of tokens) {
      if (/(as|is|us|ai|iai|ti|oje|umo)$/.test(token) && token.length > 4) lt += 0.5;
    }
  }

  if (lt > en) return "lt";
  if (en > lt) return "en";
  return fallback;
}

/* ------------------------------------------------------------------ */
/* FAQ matching                                                        */
/* ------------------------------------------------------------------ */

const GREETING_WORDS = [
  "labas", "laba", "sveiki", "sveikas", "laba diena",
  "hey", "hi", "hello", "good morning", "good afternoon",
];

function isGreeting(normalized: string): boolean {
  if (normalized.length > 24) return false;
  return GREETING_WORDS.some((w) => normalized === w || normalized.startsWith(w + " "));
}

/**
 * Longer keywords weigh more, because they are more specific
 * ("nfc tag" scores higher than "nfc").
 */
function scoreEntry(entry: FaqEntry, normalized: string, lang: Lang): number {
  let score = 0;
  for (const keyword of entry.keywords[lang]) {
    const k = normalize(keyword);
    if (!k) continue;
    if (normalized.includes(k)) {
      score += k.includes(" ") ? k.length * 2 : k.length;
    }
  }
  return score;
}

/** Minimum score for an answer to be considered reliable. */
const MIN_SCORE = 4;

function toAnswer(entry: FaqEntry, lang: Lang): ChatAnswer {
  return {
    text: entry.answer[lang],
    lang,
    status: entry.status,
    source: "faq",
    related: (entry.related ?? [])
      .map((id) => FAQ.find((e) => e.id === id))
      .filter((e): e is FaqEntry => Boolean(e))
      .map((e) => ({ id: e.id, question: e.question[lang] })),
  };
}

export function answerFromFaq(question: string, lang?: Lang): ChatAnswer {
  const resolved: Lang = lang ?? detectLang(question);
  const normalized = normalize(question);

  if (!normalized || isGreeting(normalized)) {
    return { text: GREETING[resolved], lang: resolved, status: "live", source: "faq", related: [] };
  }

  let best: { entry: FaqEntry; score: number } | null = null;
  for (const entry of FAQ) {
    // Score against both languages so a Lithuanian question still finds an
    // entry whose English keywords match, and vice versa.
    const score = Math.max(
      scoreEntry(entry, normalized, resolved),
      scoreEntry(entry, normalized, resolved === "lt" ? "en" : "lt") * 0.75,
    );
    if (!best || score > best.score) best = { entry, score };
  }

  if (!best || best.score < MIN_SCORE) {
    return { text: FALLBACK[resolved], lang: resolved, status: "fallback", source: "faq", related: [] };
  }

  return toAnswer(best.entry, resolved);
}

/* ------------------------------------------------------------------ */
/* FUTURE AI HOOK                                                      */
/* ------------------------------------------------------------------ */

/**
 * Set this to your server route (e.g. "/api/chat" backed by Workers AI)
 * once that route actually works. While it is null, no AI is ever called.
 *
 * Do NOT enable it before the route is live — otherwise visitors will hit
 * errors instead of FAQ answers.
 */
export const AI_ENDPOINT: string | null = null;

async function remoteProvider(question: string, lang: Lang): Promise<ChatAnswer | null> {
  if (!AI_ENDPOINT) return null;
  try {
    const res = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, lang }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { text?: string };
    if (!data?.text) return null;
    return { text: data.text, lang, status: "live", source: "ai", related: [] };
  } catch {
    // Any failure → silent fallback to the local FAQ.
    return null;
  }
}

/**
 * The only function the UI calls.
 * Today: local FAQ. Tomorrow: AI first, FAQ as the safety net.
 */
export async function answer(question: string, lang?: Lang): Promise<ChatAnswer> {
  const resolved: Lang = lang ?? detectLang(question);
  const remote = await remoteProvider(question, resolved);
  if (remote) return remote;
  return answerFromFaq(question, resolved);
}
