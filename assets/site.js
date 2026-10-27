/* ==========================================================
   SETUP (one time): paste your Google Sheet CSV links here.
   After that, add and edit everything in Google Sheets.
   See README.md, step 2.
   ========================================================== */
const CONFIG = {
  RESOURCES_CSV: "",   // "Resources" tab, published as CSV
  POSTS_CSV:     "",   // "Posts" tab, published as CSV
  LINKS_CSV:     ""    // "Links" tab, published as CSV
};

/* Shown only until the sheet links above are added (or if a sheet can't load) */
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
  links: { instagram: "", youtube: "", whatsappChannel: "", linkedin: "" }
};

/* All page text in both languages */
const STRINGS = {
  en: {
    tagline: "Practical AI & automation · Malayalam",
    navFree: "Free resources", navPosts: "Posts", navSeries: "Series", navFollow: "Follow",
    tag: "Free · No coding",
    headline: 'Practical AI &amp; <span class="hl">automation workflows</span>',
    sub: "Save hours at work and in business.",
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
    aboutTag: "About", aboutHead: "Hi, I'm Sabith",
    aboutText: "I test AI tools and automations on real work every week, and share only what actually saves time, in simple Malayalam. No coding, no hype.",
    followTag: "Follow", followHead: "New shortcuts every week",
    fInsta: "AI shortcuts & workflows", fYt: "Full tutorials", fWa: "New workflow alerts", fLi: "Lessons in English", linkSoon: "link soon",
    loading: "Loading…",
    back: "← Home", readIn: "മലയാളത്തിൽ വായിക്കൂ", watch: "Watch the reel",
    related: "Free resource for this post", notFound: "This post isn't available.",
    noMl: "", footer: "Kerala, India"
  },
  ml: {
    tagline: "പ്രായോഗിക AI & automation · മലയാളം",
    navFree: "സൗജന്യ resources", navPosts: "Posts", navSeries: "സീരീസ്", navFollow: "ഫോളോ",
    tag: "സൗജന്യം · കോഡിംഗ് വേണ്ട",
    headline: 'പ്രായോഗിക AI-യും <span class="hl">automation workflows-ഉം</span>',
    sub: "ജോലിയിലും ബിസിനസ്സിലും മണിക്കൂറുകൾ ലാഭിക്കാം.",
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
    aboutTag: "About", aboutHead: "ഹായ്, ഞാൻ സബിത്ത്",
    aboutText: "എല്ലാ ആഴ്ചയും AI tools-ഉം automations-ഉം യഥാർത്ഥ ജോലിയിൽ പരീക്ഷിച്ച്, ശരിക്കും സമയം ലാഭിക്കുന്നവ മാത്രം ലളിതമായ മലയാളത്തിൽ പങ്കുവെക്കുന്നു. കോഡിംഗ് വേണ്ട, hype ഇല്ല.",
    followTag: "ഫോളോ", followHead: "എല്ലാ ആഴ്ചയും പുതിയ shortcuts",
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
const t = k => (STRINGS[LANG] && STRINGS[LANG][k]) ?? STRINGS.en[k] ?? "";
const pick = (r, base) => (LANG === "ml" && r[base + "_ml"]) ? r[base + "_ml"] : (r[base + "_en"] ?? r[base] ?? "");

function applyStrings() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === LANG ? "true" : "false"));
}
function setLang(l) { LANG = l; store.set("sb_lang", l); renderAll(); }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-lang]");
  if (b) setLang(b.dataset.lang);
});

/* ---------- Google Sheet loading ---------- */
function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  const head = (rows.shift() || []).map(h => h.trim().toLowerCase());
  return rows.filter(r => r.some(v => v.trim() !== ""))
             .map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}
async function fetchSheet(url) {
  try {
    const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 5000);
    const res = await fetch(url, { cache: "no-store", signal: ctl.signal }); clearTimeout(timer);
    return res.ok ? parseCSV(await res.text()) : null;
  } catch (e) { return null; }
}
/* Instant: cached copy first, fresh copy when it arrives. null = still loading */
function useSheet(url, key, fallback, done) {
  if (!safeUrl(url)) { done(fallback); return; }
  const cached = store.get(key);
  done(cached && cached.length ? cached : null);
  fetchSheet(url).then(rows => {
    if (rows && rows.length) { store.set(key, rows); done(rows); }
    else if (!(cached && cached.length)) done(fallback);
  });
}

/* ---------- state + renderers ---------- */
const state = { resources: null, posts: null, links: null };
const LINK_KEY = { instagram: "instagram", youtube: "youtube", whatsapp: "whatsappChannel", "whatsapp channel": "whatsappChannel", linkedin: "linkedin" };
const toLinks = rows => Array.isArray(rows)
  ? rows.reduce((m, r) => { const k = LINK_KEY[(r.platform || "").toLowerCase()]; if (k) m[k] = r.link; return m; }, { ...FALLBACK.links })
  : rows;
const sortedPosts = () => (state.posts || []).filter(visible).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
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
    <a class="post-row" href="/post?p=${encodeURIComponent(p.slug)}">
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

/* post text: blank line = paragraph, "- " = bullet, "## " = heading, links auto-detected */
function formatBody(text) {
  const link = s => s.replace(/(https?:\/\/[^\s<]+)/g, u => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
  return String(text || "").replace(/\r/g, "").split(/\n\s*\n/).map(block => {
    const lines = block.split("\n").filter(l => l.trim() !== "");
    let html = "";
    if (lines[0] && lines[0].startsWith("## ")) { html += `<h2>${link(esc(lines.shift().slice(3)))}</h2>`; }
    if (!lines.length) return html;
    if (lines.every(l => l.trim().startsWith("- "))) return html + `<ul>${lines.map(l => `<li>${link(esc(l.trim().slice(2)))}</li>`).join("")}</ul>`;
    const bullets = lines.findIndex(l => l.trim().startsWith("- "));
    if (bullets > 0 && lines.slice(bullets).every(l => l.trim().startsWith("- "))) {
      return html + `<p>${lines.slice(0, bullets).map(l => link(esc(l))).join("<br>")}</p><ul>${lines.slice(bullets).map(l => `<li>${link(esc(l.trim().slice(2)))}</li>`).join("")}</ul>`;
    }
    return html + `<p>${lines.map(l => link(esc(l))).join("<br>")}</p>`;
  }).join("");
}
function renderPost() {
  const el = document.getElementById("post"); if (!el) return;
  if (state.posts === null) { el.innerHTML = `<p class="meta">${esc(t("loading"))}</p>`; return; }
  const slug = new URLSearchParams(location.search).get("p") || "";
  const p = sortedPosts().find(x => x.slug === slug);
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
    ${reel ? `<div class="actions"><a class="btn btn-amber" href="${esc(reel)}" target="_blank" rel="noopener">${esc(t("watch"))}</a></div>` : ""}
    <div class="body">${formatBody(body)}</div>
    ${res ? `<div class="related"><span class="label">${esc(t("related"))}</span>${resourceCard(res)}</div>` : ""}
    <div class="related"><a class="btn btn-line" href="/#follow">${esc(t("btnFollow"))}</a></div>`;
}

function renderAll() { applyStrings(); renderResources(); renderPosts(); renderLinks(); renderPost(); }

/* ---------- start ---------- */
renderAll();
useSheet(CONFIG.RESOURCES_CSV, "sb_resources", FALLBACK.resources, rows => { state.resources = rows; renderResources(); renderPost(); });
useSheet(CONFIG.POSTS_CSV, "sb_posts", FALLBACK.posts, rows => { state.posts = rows; renderPosts(); renderPost(); });
useSheet(CONFIG.LINKS_CSV, "sb_links", FALLBACK.links, rows => { state.links = toLinks(rows); renderLinks(); });
