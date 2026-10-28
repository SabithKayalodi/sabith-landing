// GET /sitemap.xml → tells Google about the home page and every post
const { getData, visible, esc, baseUrl } = require("./_lib");

module.exports = async (req, res) => {
  const base = baseUrl(req);
  let posts = [];
  try { posts = ((await getData()).posts || []).filter(visible); } catch (e) { posts = []; }
  const urls = [
    { loc: base + "/", pri: "1.0" },
    { loc: base + "/posts", pri: "0.8" },
    ...posts.map(p => ({ loc: `${base}/post/${encodeURIComponent(p.slug)}`, lastmod: /^\d{4}-\d{2}-\d{2}$/.test(p.date) ? p.date : "", pri: "0.7" }))
  ];
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.statusCode = 200;
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.pri}</priority></url>`).join("\n")}
</urlset>`);
};
