// POST /api/admin → passes admin actions (with the password) to your Google Apps Script
const { GAS_URL, fetchJSON } = require("./_lib");

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const send = (code, obj) => { res.statusCode = code; res.end(JSON.stringify(obj)); };

  if (req.method !== "POST") return send(405, { ok: false, error: "Use POST" });
  if (!GAS_URL) return send(500, { ok: false, error: "Not connected yet: add GAS_URL in Vercel → Settings → Environment Variables, then redeploy." });

  let body;
  try { body = await readBody(req); } catch (e) { return send(400, { ok: false, error: "Bad request" }); }

  try {
    const j = await fetchJSON(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body)
    }, 25000);
    return send(j && j.ok ? 200 : 400, j || { ok: false, error: "No response" });
  } catch (e) {
    return send(502, { ok: false, error: "Could not reach Google. Check the GAS_URL and that the script is deployed for Anyone." });
  }
};
