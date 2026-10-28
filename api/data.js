// GET /api/data → all public website content as JSON (cached at Vercel's edge for speed)
const { getData } = require("./_lib");

module.exports = async (req, res) => {
  try {
    const data = await getData();
    res.setHeader("Cache-Control", data.connected ? "public, s-maxage=30, stale-while-revalidate=600" : "no-store");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } catch (e) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = 503;
    res.end(JSON.stringify({ error: "Could not load content" }));
  }
};
