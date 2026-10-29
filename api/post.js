// GET /post/:slug → a real, Google-readable page for each post (built on the server)
const { getData, FALLBACK, esc, safeUrl, visible, formatBody, plain, baseUrl } = require("./_lib");

const HEADER = `
  <header>
    <a class="me" href="/">
      <span class="avatar"><img src="/assets/sabith.jpg" alt="Sabith" width="52" height="52"></span>
      <span><b>Sabith</b><span data-i18n="tagline">Practical AI &amp; automation · Malayalam</span></span>
    </a>
    <div class="hright">
      <nav aria-label="Sections">
        <a href="/#free" data-i18n="navFree">Free resources</a>
        <a href="/posts" data-i18n="navPosts">Posts</a>
        <a href="/#series" data-i18n="navSeries">Series</a>
        <a href="/#follow" data-i18n="navFollow">Follow</a>
      </nav>
      <div class="lang" role="group" aria-label="Language">
        <button type="button" data-lang="en" aria-pressed="true">EN</button>
        <button type="button" data-lang="ml" aria-pressed="false">മലയാളം</button>
      </div>
    </div>
  </header>`;

const fmtDate = d => {
  const x = new Date(d + "T00:00:00");
  return isNaN(x) ? esc(d) : x.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

function page({ title, description, url, image, jsonld, article, data, status }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${status === 404 ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(url)}">`}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#14213D">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@600;700;800&family=Figtree:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;600;700&display=swap">
<link rel="stylesheet" href="/assets/style.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, "\\u003c")}</script>` : ""}
</head>
<body>
<div class="wrap">
${HEADER}
  <main>
    <article class="post" id="post">${article}</article>
  </main>
  <footer>
    <span>© 2026 Sabith</span>
    <span data-i18n="footer">Kerala, India</span>
  </footer>
</div>
<script>window.__DATA__ = ${JSON.stringify(data).replace(/</g, "\\u003c")};</script>
<script src="/assets/site.js"></script>
</body>
</html>`;
}

module.exports = async (req, res) => {
  const slug = String((req.query && req.query.slug) || new URL(req.url, "http://x").searchParams.get("slug") || "").toLowerCase();
  const base = baseUrl(req);
  let data;
  try { data = await getData(); } catch (e) { data = { ...FALLBACK, connected: false }; }

  const post = (data.posts || []).filter(visible).find(p => String(p.slug).toLowerCase() === slug);
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (!post) {
    res.statusCode = 404;
    res.setHeader("Cache-Control", "public, s-maxage=30");
    res.end(page({
      title: "Post not found | Sabith", description: "This post isn't available.", url: base + "/posts",
      image: base + "/assets/og.jpg", status: 404,
      article: `<a class="back" href="/">← Home</a><h1>This post isn't available.</h1><p><a href="/posts">See all posts</a></p>`,
      data: { posts: [], resources: data.resources || [], links: data.links || [], settings: data.settings || {} }
    }));
    return;
  }

  const url = `${base}/post/${encodeURIComponent(post.slug)}`;
  const image = safeUrl(post.image) || base + "/assets/og.jpg";
  const title = `${post.title_en || post.title_ml} | Sabith`;
  const description = plain(post.summary_en || post.summary_ml || post.body_en).slice(0, 160);
  const reel = safeUrl(post.reel);
  const res0 = (data.resources || []).filter(visible).find(r => post.keyword && String(r.keyword).toLowerCase() === String(post.keyword).toLowerCase());
  const hasMl = !!(post.body_ml && post.body_ml.trim());

  // Server-rendered English version (what Google reads). The browser switches to Malayalam if chosen.
  const article = `
    <a class="back" href="/">← Home</a><br>
    ${hasMl ? `<button class="readin" type="button" data-lang="ml">മലയാളത്തിൽ വായിക്കൂ</button>` : ""}
    <h1>${esc(post.title_en || post.title_ml)}</h1>
    <p class="meta">${fmtDate(post.date)}</p>
    ${safeUrl(post.image) ? `<img class="cover" src="${esc(post.image)}" alt="">` : ""}
    ${reel ? `<div class="actions"><a class="btn btn-amber" href="${esc(reel)}" target="_blank" rel="noopener">Watch the reel</a></div>` : ""}
    <div class="body">${formatBody(post.body_en || post.body_ml)}</div>
    ${res0 ? `<div class="related"><span class="label">Free resource for this post</span></div>` : ""}
    <div class="related"><a class="btn btn-line" href="/#follow">Follow for weekly shortcuts</a></div>`;

  const jsonld = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title_en || post.title_ml, description, datePublished: post.date || undefined,
    image, url, inLanguage: hasMl ? ["en", "ml"] : "en",
    author: { "@type": "Person", name: "Sabith", url: base }
  };

  res.statusCode = 200;
  res.setHeader("Cache-Control", data.connected ? "public, s-maxage=60, stale-while-revalidate=31536000" : "no-store");
  res.end(page({
    title, description, url, image, jsonld, article,
    data: { posts: [post], resources: res0 ? [res0] : [], links: data.links || [], settings: data.settings || {} }
  }));
};
