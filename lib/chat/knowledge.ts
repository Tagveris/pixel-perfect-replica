/**
 * TAGVERIS chat assistant — knowledge base (bilingual LT / EN).
 *
 * There is NO AI here. These are prepared answers matched locally by
 * engine.ts. No network calls, no API keys, no cost.
 *
 * `status` values:
 *   "live"    – the feature really works on the site
 *   "partial" – the page exists but runs on demo data
 *   "planned" – the feature is still being built; the answer MUST say so
 *
 * Rule: never change "planned" to "live" until the feature actually works
 * in production. The assistant must not pretend.
 */

export type Lang = "lt" | "en";

export type FaqStatus = "live" | "partial" | "planned";

export interface LocalizedText {
  lt: string;
  en: string;
}

export interface FaqEntry {
  id: string;
  /** Match keywords per language, lowercase, without diacritics. */
  keywords: Record<Lang, string[]>;
  /** Short question shown as a suggestion chip. */
  question: LocalizedText;
  /** Answer body. Paragraphs separated by \n\n. */
  answer: LocalizedText;
  status: FaqStatus;
  related?: string[];
}

export const CONTACT_EMAIL = "tavodangus@gmail.com";

/**
 * mailto link for the contact CTA.
 * The address itself must never be rendered as visible text on the site —
 * only the link/button label is shown.
 */
export function contactMailto(subject = "TAGVERIS"): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export const FAQ: FaqEntry[] = [
  {
    id: "about",
    keywords: {
      lt: [
        "tagveris", "kas yra", "apie", "imone", "veikla", "ka darote",
        "kuo uzsiimate", "produktas", "platforma", "sistema",
      ],
      en: [
        "tagveris", "what is", "about", "company", "what do you do",
        "platform", "system", "product identity", "who are you",
      ],
    },
    question: {
      lt: "Kas yra TAGVERIS?",
      en: "What is TAGVERIS?",
    },
    answer: {
      lt:
        "TAGVERIS – produktų autentiškumo ir atsekamumo sprendimas gamintojams. Kiekvienam produktui priskiriama unikali QR arba NFC žymė, kurią nuskenavęs pirkėjas gali patikrinti, ar produktas tikras, ir pamatyti jo kilmės duomenis.\n\nSprendimas skirtas gamintojams, kurie nori apsisaugoti nuo padirbinių ir suteikti pirkėjams aiškų būdą įsitikinti produkto autentiškumu.",
      en:
        "TAGVERIS is a product authenticity and traceability solution for manufacturers. Every product gets a unique QR or NFC tag, so a buyer who taps or scans it can confirm the product is genuine and see its origin details.\n\nIt is built for manufacturers who want to protect their products from counterfeiting and give buyers a clear way to check authenticity.",
    },
    status: "live",
    related: ["qr", "nfc", "verify"],
  },
  {
    id: "qr",
    keywords: {
      lt: [
        "qr", "qr kodas", "qr kod", "kvadratinis", "nuskenuoti", "skenavimas",
        "zymejimas", "etiketė", "etiketė ant produkto",
      ],
      en: [
        "qr", "qr code", "qr codes", "scan", "scanning", "label", "labels",
        "tagging", "printed code", "sticker",
      ],
    },
    question: {
      lt: "Kaip veikia QR žymėjimas?",
      en: "How does QR tagging work?",
    },
    answer: {
      lt:
        "QR žymė – ant produkto ar pakuotės atspausdintas kodas. Jį nuskaičius telefonu atidaroma TAGVERIS patikros nuoroda, kuri parodo, ar kodas registruotas sistemoje ir ar jis aktyvus.\n\nQR žymėjimas yra pigiausias variantas, nes nereikia jokios papildomos aparatūros – pakanka spausdinimo. Jis tinka dideliems tiražams ir pigesnėms prekėms.",
      en:
        "A QR tag is a code printed on the product or its packaging. Scanning it with a phone opens the TAGVERIS verification page, which shows whether the code is registered in the system and whether it is active.\n\nQR tagging is the cheapest option because it needs no extra hardware — printing is enough. It suits large volumes and lower-priced goods.",
    },
    status: "live",
    related: ["nfc", "verify"],
  },
  {
    id: "nfc",
    keywords: {
      lt: [
        "nfc", "nfc zyme", "bekontakte", "prilesti", "priartinti",
        "raktu pakabukas", "pakabukas", "lustas", "chip",
      ],
      en: [
        "nfc", "nfc tag", "contactless", "tap", "tapping", "chip",
        "keychain", "key ring", "sticker nfc",
      ],
    },
    question: {
      lt: "Kaip veikia NFC žymėjimas?",
      en: "How does NFC tagging work?",
    },
    answer: {
      lt:
        "NFC žymė – mažas bekontaktis lustas, įklijuojamas ar įdedamas į produktą ar pakuotę. Pirkėjas prie jo tiesiog priartina telefoną – jokio kodo nereikia fotografuoti.\n\nNFC yra patogesnis naudoti nei QR, tačiau pats lusto tipas apsaugos neužtikrina: paprasti NFC lustai taip pat gali būti nukopijuoti. Stipresnį apsaugos lygį suteikia specialūs kriptografiniai NFC lustai, kuriuose naudojami raktai ir parašai. NFC žymės gali būti ir firminės atributikos forma – pavyzdžiui, raktų pakabukas.",
      en:
        "An NFC tag is a small contactless chip glued into or embedded in a product or its packaging. The buyer simply holds a phone near it — there is no code to photograph.\n\nNFC is more convenient to use than QR, but the tag type alone does not provide protection: ordinary NFC tags can also be copied. A stronger level of protection comes from special cryptographic NFC chips that use keys and signatures. NFC tags can also take the form of branded merchandise, such as a keychain.",
    },
    status: "live",
    related: ["qr", "verify", "merch"],
  },
  {
    id: "verify",
    keywords: {
      lt: [
        "patikra", "patikrinti", "autentiskumas", "tikras", "padirbinys",
        "padirbtas", "falsifikatas", "kaip patikrinti", "verifikacija",
        "nuskenavau", "kodas neveikia", "ar tikras",
      ],
      en: [
        "verify", "verification", "authentic", "authenticity", "genuine",
        "fake", "counterfeit", "check product", "code not working",
        "is this real", "validate",
      ],
    },
    question: {
      lt: "Kaip patikrinti produkto autentiškumą?",
      en: "How do I verify a product?",
    },
    answer: {
      lt:
        "Patikros puslapis svetainėje jau yra – jame įvedamas produkto kodas ir parodomas rezultatas.\n\nSvarbu žinoti: šiuo metu patikra veikia su demonstraciniais duomenimis, o ne su realia gamintojų duomenų baze. Tai reiškia, kad realaus jūsų produkto kodas kol kas nebus atpažintas. Prisijungimas prie tikros duomenų bazės yra ruošiamas.\n\nJei reikia patikrinti konkretų produktą, galite susisiekti el. paštu.",
      en:
        "The verification page already exists on the site — you enter a product code and it shows a result.\n\nImportant: verification currently runs on demo data, not on a live manufacturer database. That means a real code from your product will not be recognised yet. Connecting the real database is in progress.\n\nIf you need a specific product checked, you can contact us by email.",
    },
    status: "partial",
    related: ["qr", "nfc", "contact"],
  },
  {
    id: "registration",
    keywords: {
      lt: [
        "registracija", "registruotis", "gamintojas", "gamintojams",
        "paskyra", "susikurti paskyra", "prisijungti", "prisijungimas",
        "kaip pradeti", "onboarding",
      ],
      en: [
        "register", "registration", "sign up", "signup", "manufacturer",
        "manufacturers", "account", "create account", "login", "get started",
        "onboarding",
      ],
    },
    question: {
      lt: "Kaip gamintojui užsiregistruoti?",
      en: "How do manufacturers register?",
    },
    answer: {
      lt:
        "Gamintojo registracijos forma svetainėje jau yra – joje pateikiami įmonės duomenys (pavadinimas, šalis, PVM numeris, svetainė, numatomas metinis kiekis) ir kontaktinio asmens duomenys.\n\nSvarbu žinoti: registracija šiuo metu dar neįrašo duomenų į sistemą – tai ruošiama. Dėl registracijos galite susisiekti el. paštu; galimybės ir tolesni žingsniai priklauso nuo individualaus atvejo.",
      en:
        "The manufacturer registration form already exists on the site — it collects company details (name, country, VAT number, website, expected annual volume) and a contact person.\n\nImportant: registration does not yet save anything to the system — that part is still being built. For registration, you can contact us by email; options and next steps depend on the individual case.",
    },
    status: "planned",
    related: ["contact", "collaboration"],
  },
  {
    id: "collaboration",
    keywords: {
      lt: [
        "bendradarbiavimas", "bendradarbiauti", "partneryste", "partneris",
        "partneriai", "reseller", "atstovas", "integracija", "api",
        "dileris", "platinimas",
      ],
      en: [
        "partnership", "partner", "partners", "collaboration", "collaborate",
        "reseller", "distributor", "integration", "api", "work with you",
      ],
    },
    question: {
      lt: "Kaip pradėti bendradarbiavimą su TAGVERIS?",
      en: "How do we start a partnership?",
    },
    answer: {
      lt:
        "Bendradarbiavimo modeliai: žymėjimo sprendimo taikymas savo produkcijai, platinimas ar atstovavimas, techninė integracija su esamomis sistemomis.\n\nKiekvienas atvejis derinamas individualiai. Dėl bendradarbiavimo galite susisiekti el. paštu ir trumpai aprašyti, ką norite pasiekti.",
      en:
        "Partnership models include: applying the tagging solution to your own production, distribution or representation, and technical integration with your existing systems.\n\nEvery case is handled individually. For partnership questions, you can contact us by email with a short description of what you want to achieve.",
    },
    status: "live",
    related: ["contact", "registration"],
  },
  {
    id: "pricing",
    keywords: {
      lt: [
        "kaina", "kainos", "kiek kainuoja", "mokestis", "mokesciai",
        "planas", "planai", "tarifas", "prenumerata", "nemokamai", "brangu",
      ],
      en: [
        "price", "pricing", "cost", "how much", "fee", "fees", "plan",
        "plans", "subscription", "free", "expensive", "quote",
      ],
    },
    question: {
      lt: "Kiek kainuoja TAGVERIS sprendimas?",
      en: "How much does TAGVERIS cost?",
    },
    answer: {
      lt:
        "Konkretaus kainoraščio šiuo metu neteikiame – kaina priklauso nuo žymių kiekio, žymių tipo (QR ar NFC) ir reikalingų funkcijų.\n\nKainodaros klausimais galite susisiekti el. paštu. Atsakymo turinys ir terminai priklauso nuo individualaus atvejo.",
      en:
        "We do not publish a fixed price list — cost depends on tag volume, tag type (QR or NFC) and the features you need.\n\nFor pricing questions, you can contact us by email. The reply and its timing depend on the individual case.",
    },
    status: "live",
    related: ["contact", "collaboration"],
  },
  {
    id: "merch",
    keywords: {
      lt: [
        "suvenyras", "suvenyrai", "firminis", "firminiai", "reklaminiai",
        "dovanos", "dovana", "merch", "rasiklis", "aksesuarai",
        "atributika", "noriu suvenyru",
      ],
      en: [
        "merch", "merchandise", "souvenir", "souvenirs", "branded",
        "giveaway", "gift", "gifts", "pen", "pens", "keychain", "swag",
      ],
    },
    question: {
      lt: "Ar TAGVERIS turi firminės atributikos?",
      en: "Does TAGVERIS have branded merchandise?",
    },
    answer: {
      lt:
        "Svetainėje yra TAGVERIS firminės atributikos skiltis, kurioje pateikti mūsų prekės ženklo reprezentacijos pavyzdžiai: NFC raktų pakabukas, rašiklis ir kortelė su QR kodu.\n\nTai prekės ženklo reprezentacija, o ne atskira prekybos veikla. Šiuo metu internetinio krepšelio, mokėjimo ar patvirtintos prekių pasiūlos nėra. Klausimus šia tema galite siųsti el. paštu.",
      en:
        "The site has a TAGVERIS branded merchandise section showing examples of how we represent the brand: an NFC keychain, a pen and a QR card.\n\nThis is brand representation, not a separate trading activity. There is currently no online cart, no payment and no confirmed product offering. Questions on this topic can be sent by email.",
    },
    status: "live",
    related: ["contact", "nfc"],
  },
  {
    id: "contact",
    keywords: {
      lt: [
        "kontaktas", "kontaktai", "susisiekti", "rasyti", "el pastas",
        "email", "telefonas", "parasyti", "klausimas", "pagalba",
        "noriu paklausti",
      ],
      en: [
        "contact", "contacts", "get in touch", "email", "phone", "help",
        "support", "question", "reach you", "talk to someone",
      ],
    },
    question: {
      lt: "Kaip susisiekti su TAGVERIS?",
      en: "How do I contact TAGVERIS?",
    },
    answer: {
      lt: `Paprasčiausias būdas – parašyti mums laišką.\n\nTrumpai aprašykite, ko reikia: produkto patikra, registracija, bendradarbiavimas ar suvenyrai. Atsakysime per įprastą darbo laiką.`,
      en: `The simplest way is to write us an email.\n\nBriefly describe what you need — product verification, registration, partnership or merchandise — and we will reply within normal business hours.`,
    },
    status: "live",
    related: ["collaboration", "pricing"],
  },
];

export const GREETING: LocalizedText = {
  lt:
    "Sveiki! Esu TAGVERIS asistentas. Atsakau apie QR ir NFC žymėjimą, produktų autentiškumo patikrą, gamintojų registraciją ir bendradarbiavimą.",
  en:
    "Hello! I'm the TAGVERIS assistant. I can answer questions about QR and NFC tagging, product verification, manufacturer registration and partnerships.",
};

export const FALLBACK: LocalizedText = {
  lt: `Šio klausimo tikslaus atsakymo neturiu. Kad nepateikčiau neteisingos informacijos, geriau paklauskite tiesiogiai – parašykite mums laišką.\n\nGalite paklausti ir apie: QR žymėjimą, NFC žymėjimą, produkto patikrą, gamintojų registraciją, bendradarbiavimą ar firminius suvenyrus.`,
  en: `I don't have a reliable answer to that. Rather than guess, it's better to ask us directly — write us an email.\n\nYou can also ask about: QR tagging, NFC tagging, product verification, manufacturer registration, partnerships or branded merchandise.`,
};

/** Questions shown as chips when the panel is first opened. */
export const SUGGESTED_IDS = ["about", "qr", "nfc", "verify", "registration", "merch"];

/** All interface strings, per language. */
export const UI_COPY = {
  lt: {
    title: "TAGVERIS asistentas",
    subtitle: "Atsakymai iš paruoštų DUK",
    placeholder: "Įrašykite klausimą…",
    inputLabel: "Klausimas TAGVERIS asistentui",
    send: "Siųsti klausimą",
    open: "Atidaryti pokalbį su TAGVERIS asistentu",
    close: "Uždaryti pokalbį",
    thinking: "Ruošiamas atsakymas",
    footer: "Asistentas atsako iš paruoštų DUK. Sudėtingais klausimais parašykite laišką.",
    emailCta: "Parašyti laišką",
    statusPlanned: "Funkcija dar ruošiama",
    statusPartial: "Veikia su demonstraciniais duomenimis",
    switchLabel: "Perjungti kalbą",
  },
  en: {
    title: "TAGVERIS assistant",
    subtitle: "Answers from a prepared FAQ",
    placeholder: "Type your question…",
    inputLabel: "Question for the TAGVERIS assistant",
    send: "Send question",
    open: "Open chat with the TAGVERIS assistant",
    close: "Close chat",
    thinking: "Preparing an answer",
    footer: "Answers come from a prepared FAQ. For anything complex, write us an email.",
    emailCta: "Write an email",
    statusPlanned: "Feature in development",
    statusPartial: "Running on demo data",
    switchLabel: "Switch language",
  },
} as const;
