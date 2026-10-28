// Shared helpers for the Vercel functions. Files starting with "_" are not routes.
const GAS_URL = (process.env.GAS_URL || "").trim();

const FALLBACK = {
  resources: [
    { keyword: "TOOLS", format: "PDF", new: "yes", show: "yes", link: "",
      title: "AI tools that save hours", title_ml: "സമയം ലാഭിക്കുന്ന AI tools",
      description: "Free and low-cost AI tools grouped by task, with free limits and who each one suits.",
      description_ml: "ജോലിക്കനുസരിച്ച് തരംതിരിച്ച സൗജന്യവും കുറഞ്ഞ ചെലവുള്ളതുമായ AI tools, free limit സഹിതം." },
    { keyword: "AUTO", format: "Workflow", new: "", show: "yes", link: "",
      title: "WhatsApp auto-reply setup", title_ml: "WhatsApp auto-reply setup",
      description: "Step-by-step guide with screenshots to set up instant replies for your business.",
      description_ml: "നിങ്ങളുടെ ബിസിനസ്സിന് instant replies set up ചെയ്യാനുള്ള screenshots സഹിതമുള്ള step-by-step guide." }
  ],
  posts: [
    { slug: "whatsapp-auto-reply", date: "2026-10-27", show: "yes", reel: "", image: "", keyword: "AUTO",
      title_en: "WhatsApp auto-reply in 5 minutes", title_ml: "5 മിനിറ്റിൽ WhatsApp auto-reply",
      summary_en: "Free WhatsApp Business tools that reply to customers when you're busy.",
      summary_ml: "തിരക്കുള്ളപ്പോൾ customers-ന് reply ചെയ്യുന്ന സൗജന്യ WhatsApp Business tools.",
      body_en: "Customers message at night or when you're busy, and a late reply can lose the order. WhatsApp Business has free tools that reply for you.\n\n## Set it up in 5 minutes\n- Open WhatsApp Business → Settings → Business tools\n- Greeting message: welcomes new customers automatically\n- Away message: replies when you're closed or busy\n- Quick replies: save answers to common questions, then type / to use them\n\n## Tip\nKeep messages short, and add your opening hours and a price list link.",
      body_ml: "രാത്രിയിലോ തിരക്കുള്ളപ്പോഴോ customers message ചെയ്യും. Reply വൈകിയാൽ order നഷ്ടപ്പെടാം. WhatsApp Business-ൽ നിങ്ങൾക്കുവേണ്ടി reply ചെയ്യുന്ന സൗജന്യ tools ഉണ്ട്.\n\n## 5 മിനിറ്റിൽ set up ചെയ്യാം\n- WhatsApp Business തുറക്കുക → Settings → Business tools\n- Greeting message: പുതിയ customers-നെ automatic ആയി സ്വാഗതം ചെയ്യും\n- Away message: കട അടച്ചിരിക്കുമ്പോഴോ തിരക്കിലായിരിക്കുമ്പോഴോ reply ചെയ്യും\n- Quick replies: സാധാരണ ചോദ്യങ്ങൾക്കുള്ള മറുപടികൾ save ചെയ്യുക, പിന്നെ / type ചെയ്ത് ഉപയോഗിക്കാം\n\n## ഒരു tip\nMessage ചെറുതാക്കുക, കട തുറക്കുന്ന സമയവും price list link-ഉം ചേർക്കുക." }
  ],
  links: [],
  settings: {}
};

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = u => /^https?:\/\//i.test(String(u || "").trim()) ? String(u).trim() : "";
const visible = r => !/^(no|n|false|0)$/i.test(String(r.show || "").trim());

async function fetchJSON(url, options = {}, ms = 9000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url, { redirect: "follow", ...options, signal: ctl.signal });
    const text = await res.text();
    return JSON.parse(text);
  } finally { clearTimeout(timer); }
}

// Public site data (hidden rows already removed by the script). Falls back to the sample content if not connected yet.
async function getData() {
  if (!GAS_URL) return { ...FALLBACK, connected: false };
  const j = await fetchJSON(GAS_URL);
  if (!j || !j.ok || !j.data) throw new Error((j && j.error) || "Bad response");
  return { ...j.data, connected: true };
}

// Same text formatting as the browser: blank line = paragraph, "- " = bullet, "## " = heading, links auto-detected
function formatBody(text) {
  const link = s => s.replace(/(https?:\/\/[^\s<]+)/g, u => `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
  return String(text || "").replace(/\r/g, "").split(/\n\s*\n/).map(block => {
    const lines = block.split("\n").filter(l => l.trim() !== "");
    let html = "";
    if (lines[0] && lines[0].startsWith("## ")) html += `<h2>${link(esc(lines.shift().slice(3)))}</h2>`;
    if (!lines.length) return html;
    const isB = l => l.trim().startsWith("- ");
    const li = l => `<li>${link(esc(l.trim().slice(2)))}</li>`;
    if (lines.every(isB)) return html + `<ul>${lines.map(li).join("")}</ul>`;
    const b = lines.findIndex(isB);
    if (b > 0 && lines.slice(b).every(isB)) return html + `<p>${lines.slice(0, b).map(l => link(esc(l))).join("<br>")}</p><ul>${lines.slice(b).map(li).join("")}</ul>`;
    return html + `<p>${lines.map(l => link(esc(l))).join("<br>")}</p>`;
  }).join("");
}

const plain = s => String(s || "").replace(/\s+/g, " ").trim();
const baseUrl = req => `https://${req.headers["x-forwarded-host"] || req.headers.host || "localhost"}`;

module.exports = { GAS_URL, FALLBACK, esc, safeUrl, visible, fetchJSON, getData, formatBody, plain, baseUrl };
