/* ==========================================================
   Content now comes from your Google Sheet through /api/data
   (edit it at yoursite/admin). Nothing to set here.
   ========================================================== */
const DATA_URL = "/api/data";

/* Shown only until the Google Sheet is connected (or if it can't load) */
const FALLBACK = {
  resources: [
    { keyword: "TOOLS", format: "PDF", new: "yes", show: "yes", link: "",
      title: "AI tools that save hours",
      title_ml: "സമയം ലാഭിക്കുന്ന AI tools",
      description: "Free and low-cost AI tools grouped by task, with free limits and who each one suits.",
      description_ml: "ജോലിക്കനുസരിച്ച് തരംതിരിച്ച സൗജന്യവും കുറഞ്ഞ ചെലവുള്ളതുമായ AI tools, free limit സഹിതം." },
    { keyword: "AUTO", format: "Workflow", new: "", show: "yes", link: "",
      title: "WhatsApp auto-reply setup",
      title_ml: "WhatsApp auto-reply setup",
      description: "Step-by-step guide with screenshots to set up instant replies for your business.",
      description_ml: "നിങ്ങളുടെ ബിസിനസ്സിന് instant replies set up ചെയ്യാനുള്ള screenshots സഹിതമുള്ള step-by-step guide." }
  ],
  posts: [
    { slug: "whatsapp-auto-reply", date: "2026-10-27", show: "yes", reel: "", keyword: "AUTO",
      title_en: "WhatsApp auto-reply in 5 minutes",
      title_ml: "5 മിനിറ്റിൽ WhatsApp auto-reply",
      summary_en: "Free WhatsApp Business tools that reply to customers when you're busy.",
      summary_ml: "തിരക്കുള്ളപ്പോൾ customers-ന് reply ചെയ്യുന്ന സൗജന്യ WhatsApp Business tools.",
      body_en: "Customers message at night or when you're busy, and a late reply can lose the order. WhatsApp Business has free tools that reply for you.\n\n## Set it up in 5 minutes\n- Open WhatsApp Business → Settings → Business tools\n- Greeting message: welcomes new customers automatically\n- Away message: replies when you're closed or busy\n- Quick replies: save answers to common questions, then type / to use them\n\n## Tip\nKeep messages short, and add your opening hours and a price list link.",
      body_ml: "രാത്രിയിലോ തിരക്കുള്ളപ്പോഴോ customers message ചെയ്യും. Reply വൈകിയാൽ order നഷ്ടപ്പെടാം. WhatsApp Business-ൽ നിങ്ങൾക്കുവേണ്ടി reply ചെയ്യുന്ന സൗജന്യ tools ഉണ്ട്.\n\n## 5 മിനിറ്റിൽ set up ചെയ്യാം\n- WhatsApp Business തുറക്കുക → Settings → Business tools\n- Greeting message: പുതിയ customers-നെ automatic ആയി സ്വാഗതം ചെയ്യും\n- Away message: കട അടച്ചിരിക്കുമ്പോഴോ തിരക്കിലായിരിക്കുമ്പോഴോ reply ചെയ്യും\n- Quick replies: സാധാരണ ചോദ്യങ്ങൾക്കുള്ള മറുപടികൾ save ചെയ്യുക, പിന്നെ / type ചെയ്ത് ഉപയോഗിക്കാം\n\n## ഒരു tip\nMessage ചെറുതാക്കുക, കട തുറക്കുന്ന സമയവും price list link-ഉം ചേർക്കുക." }
  ],
  links: {}
};

/* All page text in both languages */
const STRINGS = {
  en: {
    name: "Sabith",
    tagline: "Practical AI & automation · Malayalam",
    guidesHead: "Free guides", guidesLine: "Tap a guide to open it. New ones show up here first.",
    searchPh: "Type a keyword from a reel", noMatch: "No guide with that keyword yet. Check the reel caption, or follow below to get it first.",
    followLine: "New guides every week.", open: "Open", soonShort: "Soon",
    navFree: "Free resources", navPosts: "Posts", navSeries: "Series", navFollow: "Follow",
    tag: "Free · No coding",
    headline: "Practical AI & *automation workflows*",
    sub: "Every guide from my reels, in one place.",
    lead: "Every PDF and workflow from my reels, in one place. Download, copy and use it today.",
    btnFree: "Get the free resources", btnFollow: "Follow for weekly shortcuts",
    freeTag: "Free resources", freeHead: "Saw a reel? Find its resource here",
    freeLine: "Each one matches the keyword I mention in the reel. No sign-up needed.",
    getFree: "Get it free", soon: "Coming soon", newLabel: "New",
    nextLabel: "Next", nextHead: "New workflow every week", nextLine: "Follow on Instagram to know when it drops.",
    postsTag: "Posts", postsHead: "Latest posts", allPosts: "See all posts →", read: "Read →",
    allPostsHead: "All posts", noPosts: "First post coming soon.",
    seriesTag: "Series", seriesHead: "Two series, every week",
    s1: "One tool or trick that saves you time, shown start to finish in under a minute, with the free limit and price.",
    s1small: "3 new shortcuts every week",
    s2: "One real workflow you can copy, like WhatsApp auto-replies or an auto-filled lead sheet, with a free step-by-step guide here.",
    s2small: "1 new workflow every week",
    aboutTag: "About me", aboutHead: "Hi, I'm Sabith",
    aboutText: "I test AI tools and automations on real work every week, and share only what actually saves time, in simple Malayalam. No coding, no hype.",
    followTag: "Follow", followHead: "Follow for new guides",
    fInsta: "AI shortcuts & workflows", fYt: "Full tutorials", fWa: "New workflow alerts", fLi: "Lessons in English", linkSoon: "link soon",
    loading: "Loading…",
    back: "← Home", readIn: "മലയാളത്തിൽ വായിക്കൂ", watch: "Watch the reel",
    related: "Free resource for this post", notFound: "This post isn't available.",
    noMl: "", footer: "Kerala, India"
  },
  ml: {
    name: "Sabith",
    tagline: "പ്രായോഗിക AI & automation · മലയാളം",
    guidesHead: "സൗജന്യ guides", guidesLine: "ഒരു guide തുറക്കാൻ അതിൽ tap ചെയ്യൂ. പുതിയവ ആദ്യം ഇവിടെ വരും.",
    searchPh: "Reel-ലെ keyword type ചെയ്യൂ", noMatch: "ആ keyword-ൽ ഇതുവരെ guide ഇല്ല. Reel caption നോക്കൂ, അല്ലെങ്കിൽ താഴെ follow ചെയ്ത് ആദ്യം അറിയൂ.",
    followLine: "എല്ലാ ആഴ്ചയും പുതിയ guides.", open: "തുറക്കൂ", soonShort: "ഉടൻ",
    navFree: "സൗജന്യ resources", navPosts: "Posts", navSeries: "സീരീസ്", navFollow: "ഫോളോ",
    tag: "സൗജന്യം · കോഡിംഗ് വേണ്ട",
    headline: "പ്രായോഗിക AI-യും *automation workflows-ഉം*",
    sub: "എന്റെ reels-ലെ എല്ലാ guides-ഉം ഒരിടത്ത്.",
    lead: "എന്റെ reels-ലെ എല്ലാ PDF-കളും workflows-ഉം ഒരിടത്ത്. ഇന്നുതന്നെ download ചെയ്ത് ഉപയോഗിക്കൂ.",
    btnFree: "സൗജന്യ resources നേടൂ", btnFollow: "ആഴ്ചതോറുമുള്ള shortcuts-ന് follow ചെയ്യൂ",
    freeTag: "സൗജന്യ resources", freeHead: "Reel കണ്ടോ? അതിന്റെ resource ഇവിടെയുണ്ട്",
    freeLine: "Reel-ൽ പറയുന്ന keyword-ന് അനുസരിച്ചാണ് ഓരോന്നും. Sign-up വേണ്ട.",
    getFree: "സൗജന്യമായി നേടൂ", soon: "ഉടൻ വരുന്നു", newLabel: "പുതിയത്",
    nextLabel: "അടുത്തത്", nextHead: "എല്ലാ ആഴ്ചയും പുതിയ workflow", nextLine: "പുതിയത് വരുമ്പോൾ അറിയാൻ Instagram-ൽ follow ചെയ്യൂ.",
    postsTag: "Posts", postsHead: "പുതിയ posts", allPosts: "എല്ലാ posts-ഉം കാണൂ →", read: "വായിക്കൂ →",
    allPostsHead: "എല്ലാ posts", noPosts: "ആദ്യ post ഉടൻ വരുന്നു.",
    seriesTag: "സീരീസ്", seriesHead: "എല്ലാ ആഴ്ചയും രണ്ട് സീരീസ്",
    s1: "സമയം ലാഭിക്കുന്ന ഒരു tool അല്ലെങ്കിൽ trick, ഒരു മിനിറ്റിനുള്ളിൽ, free limit-ഉം വിലയും സഹിതം.",
    s1small: "ആഴ്ചയിൽ 3 പുതിയ shortcuts",
    s2: "WhatsApp auto-reply പോലുള്ള, നിങ്ങൾക്ക് copy ചെയ്യാവുന്ന ഒരു യഥാർത്ഥ workflow, സൗജന്യ step-by-step guide സഹിതം.",
    s2small: "ആഴ്ചയിൽ 1 പുതിയ workflow",
    aboutTag: "എന്നെക്കുറിച്ച്", aboutHead: "ഹായ്, ഞാൻ സബിത്ത്",
    aboutText: "എല്ലാ ആഴ്ചയും AI tools-ഉം automations-ഉം യഥാർത്ഥ ജോലിയിൽ പരീക്ഷിച്ച്, ശരിക്കും സമയം ലാഭിക്കുന്നവ മാത്രം ലളിതമായ മലയാളത്തിൽ പങ്കുവെക്കുന്നു. കോഡിംഗ് വേണ്ട, hype ഇല്ല.",
    followTag: "ഫോളോ", followHead: "പുതിയ guides-ന് follow ചെയ്യൂ",
    fInsta: "AI shortcuts & workflows", fYt: "മുഴുവൻ tutorials", fWa: "പുതിയ workflow alerts", fLi: "English-ൽ lessons", linkSoon: "link ഉടൻ",
    loading: "ലോഡ് ചെയ്യുന്നു…",
    back: "← ഹോം", readIn: "Read in English", watch: "Reel കാണൂ",
    related: "ഈ post-നുള്ള സൗജന്യ resource", notFound: "ഈ post ഇപ്പോൾ ലഭ്യമല്ല.",
    noMl: "ഈ post-ന്റെ മലയാളം version ഉടൻ വരും. ഇപ്പോൾ English-ൽ വായിക്കാം.", footer: "കേരളം, ഇന്ത്യ"
  }
};

/* ---------------- no need to edit below ---------------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const safeUrl = u => /^https?:\/\//i.test(String(u || "").trim()) ? String(u).trim() : "";
const yes = v => /^(yes|y|true|1)$/i.test(String(v || "").trim());
const visible = r => r.show === undefined || r.show === "" || yes(r.show);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- language ---------- */
let LANG = (() => {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "ml" || q === "en") { store.set("sb_lang", q); return q; }
  return store.get("sb_lang") === "ml" ? "ml" : "en";
})();
/* "*words*" in a setting = amber highlight */
const hl = s => esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');
/* Home page sections switched on/off in admin (Home page tab) */
const SECTION_DEFAULT = { showHero: true, showSearch: true, showPosts: false, showAbout: true };
const SETTINGS = {};
const sectionOn = k => { const v = SETTINGS[k] && SETTINGS[k].en; return v ? yes(v) : !!SECTION_DEFAULT[k]; };
const t = k => (STRINGS[LANG] && STRINGS[LANG][k]) ?? STRINGS.en[k] ?? "";
const pick = (r, base) => (LANG === "ml" && r[base + "_ml"]) ? r[base + "_ml"] : (r[base + "_en"] ?? r[base] ?? "");

function applyStrings() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll("[data-i18n-hl]").forEach(el => { el.innerHTML = hl(t(el.dataset.i18nHl)); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-section]").forEach(el => { el.hidden = !sectionOn(el.dataset.section); });
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === LANG ? "true" : "false"));
}
function setLang(l) { LANG = l; store.set("sb_lang", l); renderAll(); }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-lang]");
  if (b) setLang(b.dataset.lang);
});

/* ---------- loading (instant from cache, then fresh) ---------- */
async function fetchData() {
  try {
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 8000);
    const res = await fetch(DATA_URL, { signal: ctl.signal }); clearTimeout(timer);
    if (!res.ok) return null;
    const d = await res.json();
    return d && Array.isArray(d.posts) ? d : null;
  } catch (e) { return null; }
}
function applySettings(settings) {
  Object.entries(settings || {}).forEach(([k, v]) => {
    if (!v) return;
    SETTINGS[k] = v;
    if (/^show[A-Z]/.test(k) || k === "hideGuides") return;
    if (k === "headline" && /<span/.test(v.en || "")) return;
    if (v.en) STRINGS.en[k] = v.en;
    if (v.ml) STRINGS.ml[k] = v.ml;
  });
}

/* ---------- state + renderers ---------- */
const state = { resources: null, posts: null, links: null, guides: null };
const LINK_KEY = { instagram: "instagram", youtube: "youtube", whatsapp: "whatsappChannel", "whatsapp channel": "whatsappChannel", linkedin: "linkedin",
  x: "x", twitter: "x", "x (twitter)": "x", facebook: "facebook", threads: "threads", telegram: "telegram" };
const toLinks = rows => Array.isArray(rows)
  ? rows.reduce((m, r) => { const k = LINK_KEY[(r.platform || "").toLowerCase()]; if (k) m[k] = r.link; return m; }, { ...FALLBACK.links })
  : rows;
const sortedPosts = () => (state.posts || []).map((p, i) => [p, i]).filter(([p]) => visible(p))
  .sort((a, b) => String(b[0].date).localeCompare(String(a[0].date)) || b[1] - a[1]).map(([p]) => p);
const fmtDate = d => {
  const x = new Date(d + "T00:00:00");
  if (isNaN(x)) return esc(d);
  try { return x.toLocaleDateString(LANG === "ml" ? "ml-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }); }
  catch (e) { return esc(d); }
};

function resourceCard(r) {
  const u = safeUrl(r.link);
  return `<article class="card">
    <div class="card-top">${r.keyword ? `<span class="kw">${esc(r.keyword)}</span>` : ""}<span class="fmt">${esc(r.format)}</span>${yes(r.new) ? `<span class="new">${esc(t("newLabel"))}</span>` : ""}</div>
    <h3>${esc(pick(r, "title"))}</h3>
    <p>${esc(pick(r, "description"))}</p>
    ${u ? `<a class="btn btn-navy" href="${esc(u)}" target="_blank" rel="noopener">${esc(t("getFree"))}</a>`
        : `<span class="btn" aria-disabled="true">${esc(t("soon"))}</span>`}
  </article>`;
}
function renderResources() {
  const el = document.getElementById("grid"); if (!el) return;
  if (state.resources === null) { el.innerHTML = `<article class="card soon" aria-busy="true"><h3>${esc(t("loading"))}</h3></article>`; return; }
  el.innerHTML = state.resources.filter(visible).map(resourceCard).join("") +
    `<article class="card soon"><div class="card-top"><span class="fmt">${esc(t("nextLabel"))}</span></div><h3>${esc(t("nextHead"))}</h3><p>${esc(t("nextLine"))}</p></article>`;
}
function renderPosts() {
  const el = document.getElementById("posts"); if (!el) return;
  const limit = Number(el.dataset.limit || 0);
  if (state.posts === null) { el.innerHTML = `<p class="meta">${esc(t("loading"))}</p>`; return; }
  const list = sortedPosts();
  const shown = limit ? list.slice(0, limit) : list;
  el.innerHTML = shown.length ? shown.map(p => `
    <a class="post-row" href="/post/${encodeURIComponent(p.slug)}">
      <span class="meta">${fmtDate(p.date)}</span>
      <h3>${esc(pick(p, "title"))}</h3>
      <p>${esc(pick(p, "summary"))}</p>
      <span class="meta" style="color:var(--ink);font-weight:700">${esc(t("read"))}</span>
    </a>`).join("") : `<p class="meta">${esc(t("noPosts"))}</p>`;
  const more = document.getElementById("more-posts");
  if (more) more.hidden = !(limit && list.length > limit);
}
const ARROW = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';
function renderLinks() {
  const el = document.getElementById("follow-links"); if (!el) return;
  const links = state.links || FALLBACK.links;
  const items = [["instagram", "Instagram", "fInsta"], ["youtube", "YouTube", "fYt"], ["whatsappChannel", "WhatsApp Channel", "fWa"], ["linkedin", "LinkedIn", "fLi"]];
  el.innerHTML = items.map(([k, name, sk]) => {
    const u = safeUrl(links[k]);
    return u ? `<a class="fl" href="${esc(u)}" target="_blank" rel="noopener"><span><b>${name}</b><span>${esc(t(sk))}</span></span>${ARROW}</a>`
             : `<div class="fl"><span><b>${name}</b><span>${esc(t(sk))} · ${esc(t("linkSoon"))}</span></span></div>`;
  }).join("");
}

/* post text → HTML (Markdown), from /assets/markdown.js */
function formatBody(text) {
  return window.SabithMD ? window.SabithMD.render(text) : `<p>${esc(text).split("\n").join("<br>")}</p>`;
}
/* Copy buttons on code blocks inside posts */
document.addEventListener("click", e => {
  const b = e.target.closest(".body .code .copy"); if (!b) return;
  const text = b.parentNode.querySelector("pre").innerText;
  const done = () => { const t0 = b.textContent; b.textContent = "Copied ✓"; setTimeout(() => { b.textContent = t0; }, 1500); };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => {});
  else { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (x) {} ta.remove(); }
});
function renderPost() {
  const el = document.getElementById("post"); if (!el) return;
  if (state.posts === null) { el.innerHTML = `<p class="meta">${esc(t("loading"))}</p>`; return; }
  const m = location.pathname.match(/^\/post\/([^/?#]+)/);
  const slug = decodeURIComponent((m && m[1]) || new URLSearchParams(location.search).get("p") || "").toLowerCase();
  const p = sortedPosts().find(x => String(x.slug).toLowerCase() === slug);
  if (!p) { el.innerHTML = `<a class="back" href="/">${esc(t("back"))}</a><h1>${esc(t("notFound"))}</h1>`; return; }
  const hasMl = !!(p.body_ml && p.body_ml.trim());
  const other = LANG === "ml" ? "en" : "ml";
  const body = (LANG === "ml" && hasMl) ? p.body_ml : (p.body_en || p.body || "");
  const reel = safeUrl(p.reel);
  const res = (state.resources || []).filter(visible).find(r => p.keyword && (r.keyword || "").toLowerCase() === p.keyword.toLowerCase());
  document.title = `${pick(p, "title")} | Sabith`;
  el.innerHTML = `
    <a class="back" href="/">${esc(t("back"))}</a><br>
    ${hasMl ? `<button class="readin" type="button" data-lang="${other}">${esc(t("readIn"))}</button>` : ""}
    <h1>${esc(pick(p, "title"))}</h1>
    <p class="meta">${fmtDate(p.date)}</p>
    ${LANG === "ml" && !hasMl ? `<p class="note">${esc(t("noMl"))}</p>` : ""}
    ${safeUrl(p.image) ? `<img class="cover" src="${esc(p.image)}" alt="">` : ""}
    ${reel ? `<div class="actions"><a class="btn btn-amber" href="${esc(reel)}" target="_blank" rel="noopener">${esc(t("watch"))}</a></div>` : ""}
    <div class="body">${formatBody(body)}</div>
    ${res ? `<div class="related"><span class="label">${esc(t("related"))}</span>${resourceCard(res)}</div>` : ""}
    <div class="related"><a class="btn btn-line" href="/#follow">${esc(t("btnFollow"))}</a></div>`;
}

/* ---------- home: guide list ----------
   Pages Claude builds are listed in /guides.json and appear here automatically.
   Admin → Resources can hide one, change its text, or add your own items (e.g. a Drive PDF). */
const kwOf = r => String(r.keyword || "").trim().toUpperCase();
function mergedGuides() {
  const hide = String((SETTINGS.hideGuides && SETTINGS.hideGuides.en) || "").toUpperCase().split(/[\s,]+/).filter(Boolean);
  const res = (state.resources || []).filter(visible);
  const used = new Set();
  const list = (state.guides || []).map((g, i) => {
    const o = res.find(r => kwOf(r) && kwOf(r) === kwOf(g));
    if (o) used.add(o);
    const m = { ...g, _i: i };
    if (o) ["format", "title", "title_ml", "description", "description_ml", "link", "new"].forEach(k => { if (String(o[k] || "").trim()) m[k] = o[k]; });
    return m;
  }).filter(g => !hide.includes(kwOf(g)));
  const own = res.filter(r => !used.has(r)).map((r, i) => ({ ...r, _i: 1000 + i }));
  return list.concat(own).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || a._i - b._i);
}
const isNew = g => yes(g.new) || (!!g.date && (Date.now() - new Date(g.date + "T00:00:00")) / 864e5 < 14);
const GO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
function guideRow(g) {
  const link = String(g.link || "").trim();
  const href = /^\/[^/]/.test(link) ? link + (LANG === "ml" ? "?lang=ml" : "") : safeUrl(link);
  const ext = /^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : "";
  const meta = '<div class="gmeta">' + (kwOf(g) ? '<span class="kw">' + esc(kwOf(g)) + '</span>' : "") +
    (g.format ? '<span class="fmt">' + esc(g.format) + '</span>' : "") +
    (href && isNew(g) ? '<span class="new">' + esc(t("newLabel")) + '</span>' : "") +
    (g.date ? '<span class="gdate">' + fmtDate(g.date) + '</span>' : "") + '</div>';
  const desc = pick(g, "description");
  const body = meta + '<h3>' + esc(pick(g, "title")) + '</h3>' + (desc ? '<p>' + esc(desc) + '</p>' : "");
  return href
    ? '<a class="g" href="' + esc(href) + '"' + ext + '><div class="gtext">' + body + '</div><span class="ggo" aria-hidden="true">' + GO + '</span></a>'
    : '<div class="g soon"><div class="gtext">' + body + '</div><span class="gsoon">' + esc(t("soon")) + '</span></div>';
}
function renderGuides() {
  const el = document.getElementById("guides"); if (!el) return;
  if (state.guides === null && state.resources === null) { el.innerHTML = '<p class="meta">' + esc(t("loading")) + '</p>'; return; }
  const q = ((document.getElementById("gsearch") || {}).value || "").trim().toLowerCase();
  let list = mergedGuides();
  if (q) list = list.filter(g => [kwOf(g), g.title, g.title_ml, g.description, g.description_ml].join(" ").toLowerCase().includes(q));
  el.innerHTML = list.length ? list.map(guideRow).join("") : '<p class="gnone">' + esc(t("noMatch")) + '</p>';
}
document.addEventListener("input", e => { if (e.target && e.target.id === "gsearch") renderGuides(); });

/* ---------- home: follow buttons (live link = glowing, empty = grey) ---------- */
const ICONS = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  whatsappChannel: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.5l1-1.2 1.8.8"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M12 17v-3.6a2.3 2.3 0 0 1 4.6 0V17M12 10.5V17"/><circle cx="8" cy="7.4" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3a20 20 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.2H8.6v3h2.7V21"/>',
  threads: '<circle cx="12" cy="12" r="3.6"/><path d="M15.6 12v1.4a2.6 2.6 0 0 0 5.2 0V12a8.8 8.8 0 1 0-3.4 6.9"/>',
  telegram: '<path d="M21 4L3 11.2l6 2.2 2.2 6.1 3.3-4 4.6 3.5z"/><path d="M9 13.4L21 4"/>'
};
const PLATFORMS = [["instagram", "Instagram"], ["youtube", "YouTube"], ["x", "X"], ["whatsappChannel", "WhatsApp"], ["linkedin", "LinkedIn"], ["facebook", "Facebook"], ["threads", "Threads"], ["telegram", "Telegram"]];
function renderFollow() {
  const el = document.getElementById("social"); if (!el) return;
  const links = state.links || {};
  const ico = k => '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[k] + '</svg>';
  const live = PLATFORMS.filter(([k]) => safeUrl(links[k]));
  el.innerHTML = live.map(([k, n]) => '<a class="sbtn on" href="' + esc(safeUrl(links[k])) + '" target="_blank" rel="noopener">' + ico(k) + '<span>' + n + '</span></a>').join("");
  const box = document.getElementById("followbox"); if (box) box.hidden = !live.length;
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
}

function renderAll() { applyStrings(); renderResources(); renderGuides(); renderPosts(); renderLinks(); renderFollow(); renderPost(); }

/* ---------- start ---------- */
function useData(d) {
  if (!d) return;
  applySettings(d.settings);
  state.resources = d.resources || [];
  state.posts = d.posts || [];
  state.links = toLinks(d.links || []);
  renderAll();
}
/* guides.json: the pages on this website (instant from cache, then fresh) */
if (document.getElementById("guides")) {
  state.guides = store.get("sb_guides");
  fetch("/guides.json", { cache: "no-cache" }).then(r => r.ok ? r.json() : null).then(g => {
    if (Array.isArray(g)) { state.guides = g; store.set("sb_guides", g); renderGuides(); }
    else if (state.guides === null) { state.guides = []; renderGuides(); }
  }).catch(() => { if (state.guides === null) { state.guides = []; renderGuides(); } });
}
if (window.__DATA__) {
  useData(window.__DATA__);              // post pages arrive with their content already inside
} else {
  const cached = store.get("sb_data");
  if (cached) useData(cached); else renderAll();
  fetchData().then(d => {
    if (d) { store.set("sb_data", d); useData(d); }
    else if (!cached) useData(FALLBACK);
  });
}
