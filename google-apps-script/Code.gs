/**
 * Sabith website backend (Google Apps Script)
 * ------------------------------------------------------------
 * Paste this whole file into your "Website" Google Sheet:
 *   Extensions → Apps Script → replace everything in Code.gs → Save.
 * Then change the password below, run setup() once, and deploy
 * as a Web app (see README, Part 2).
 */

const ADMIN_PASSWORD = "CHANGE-THIS-PASSWORD";   // ← change this before deploying
const IMAGE_FOLDER   = "Website images";          // Drive folder for uploaded images

const TABS = {
  resources: { name: "Resources", key: "keyword",
    headers: ["keyword", "format", "title", "title_ml", "description", "description_ml", "link", "new", "show"] },
  posts:     { name: "Posts", key: "slug",
    headers: ["slug", "date", "title_en", "title_ml", "summary_en", "summary_ml", "body_en", "body_ml", "image", "reel", "keyword", "show"] },
  links:     { name: "Links", key: "platform",
    headers: ["platform", "link"] },
  settings:  { name: "Settings", key: "key",
    headers: ["key", "en", "ml"] }
};

/* Run once from the editor: creates any missing tabs and columns. */
function setup() {
  Object.keys(TABS).forEach(function (t) { sheetFor(t); });
  const links = readTab("links");
  if (!links.length) {
    ["Instagram", "YouTube", "WhatsApp Channel", "LinkedIn"].forEach(function (p) { saveRow("links", { platform: p, link: "" }); });
  }
}

/* ---------- web endpoints ---------- */

function doGet() {
  return json({ ok: true, data: allData(false) });
}

function doPost(e) {
  var body = {};
  try { body = JSON.parse((e && e.postData && e.postData.contents) || "{}"); }
  catch (err) { return json({ ok: false, error: "Bad request" }); }

  if (ADMIN_PASSWORD === "CHANGE-THIS-PASSWORD") {
    return json({ ok: false, error: "Set your password in Code.gs first, then deploy a new version." });
  }
  if (String(body.password || "") !== ADMIN_PASSWORD) {
    Utilities.sleep(1500);
    return json({ ok: false, error: "Wrong password" });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    switch (body.action) {
      case "list":   return json({ ok: true, data: allData(true) });
      case "save":   return json({ ok: true, row: saveRow(body.type, body.row || {}, body.originalKey) });
      case "delete": deleteRow(body.type, body.key); return json({ ok: true });
      case "upload": return json({ ok: true, url: uploadImage(body.name, body.mime, body.data) });
      default:       return json({ ok: false, error: "Unknown action" });
    }
  } catch (err) {
    return json({ ok: false, error: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- sheet helpers ---------- */

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function tabInfo(type) {
  var t = TABS[type];
  if (!t) throw new Error("Unknown type: " + type);
  return t;
}

function sheetFor(type) {
  var t = tabInfo(type);
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(t.name) || ss.insertSheet(t.name);
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var head = sh.getLastRow() ? sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); }) : [];
  if (!head.filter(String).length) {
    sh.getRange(1, 1, 1, t.headers.length).setValues([t.headers]);
    head = t.headers.slice();
  }
  t.headers.forEach(function (h) {
    if (head.map(function (x) { return x.toLowerCase(); }).indexOf(h) === -1) {
      head.push(h);
      sh.getRange(1, head.length).setValue(h);
    }
  });
  return sh;
}

function headersOf(sh) {
  return sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0]
    .map(function (h) { return String(h).trim().toLowerCase(); });
}

function cellText(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  return String(v == null ? "" : v).trim();
}

function readTab(type) {
  var sh = sheetFor(type);
  var vals = sh.getDataRange().getValues();
  var head = vals.shift().map(function (h) { return String(h).trim().toLowerCase(); });
  return vals
    .filter(function (r) { return r.some(function (v) { return cellText(v) !== ""; }); })
    .map(function (r) {
      var o = {};
      head.forEach(function (h, i) { if (h) o[h] = cellText(r[i]); });
      return o;
    });
}

function isHidden(r) { return /^(no|n|false|0)$/i.test(String(r.show || "").trim()); }

function allData(includeHidden) {
  var settings = {};
  readTab("settings").forEach(function (r) { if (r.key) settings[r.key] = { en: r.en || "", ml: r.ml || "" }; });
  var keep = function (r) { return includeHidden || !isHidden(r); };
  return {
    resources: readTab("resources").filter(keep),
    posts: readTab("posts").filter(keep),
    links: readTab("links"),
    settings: settings,
    updated: new Date().toISOString()
  };
}

function slugify(s) {
  return String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

function saveRow(type, row, originalKey) {
  var t = tabInfo(type);
  var sh = sheetFor(type);
  if (type === "posts") row.slug = slugify(row.slug || row.title_en);
  var keyVal = String(row[t.key] || "").trim();
  if (!keyVal) throw new Error("Missing " + t.key);

  var head = headersOf(sh);
  var keyCol = head.indexOf(t.key);
  var findKey = String(originalKey || keyVal).trim().toLowerCase();
  var last = sh.getLastRow();
  var keys = last > 1 ? sh.getRange(2, keyCol + 1, last - 1, 1).getValues().map(function (r) { return cellText(r[0]).toLowerCase(); }) : [];
  var idx = keys.indexOf(findKey);

  if (idx === -1 || (originalKey && keyVal.toLowerCase() !== findKey)) {
    var clash = keys.indexOf(keyVal.toLowerCase());
    if (clash !== -1 && clash !== idx) throw new Error("\"" + keyVal + "\" already exists. Use a different " + t.key + ".");
  }

  var rowNum = idx === -1 ? last + 1 : idx + 2;
  var existing = idx === -1 ? [] : sh.getRange(rowNum, 1, 1, head.length).getValues()[0];
  var out = head.map(function (h, i) {
    return Object.prototype.hasOwnProperty.call(row, h) ? String(row[h] == null ? "" : row[h]) : cellText(existing[i]);
  });
  var range = sh.getRange(rowNum, 1, 1, head.length);
  range.setNumberFormat("@");
  range.setValues([out]);
  var saved = {};
  head.forEach(function (h, i) { if (h) saved[h] = out[i]; });
  return saved;
}

function deleteRow(type, key) {
  var t = tabInfo(type);
  var sh = sheetFor(type);
  var head = headersOf(sh);
  var keyCol = head.indexOf(t.key);
  var last = sh.getLastRow();
  if (last < 2) return;
  var keys = sh.getRange(2, keyCol + 1, last - 1, 1).getValues().map(function (r) { return cellText(r[0]).toLowerCase(); });
  var idx = keys.indexOf(String(key || "").trim().toLowerCase());
  if (idx !== -1) sh.deleteRow(idx + 2);
}

function uploadImage(name, mime, base64) {
  if (!base64) throw new Error("No image data");
  if (!/^image\/(jpeg|png|webp|gif)$/.test(String(mime))) throw new Error("Only JPG, PNG, WEBP or GIF images");
  var folders = DriveApp.getFoldersByName(IMAGE_FOLDER);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(IMAGE_FOLDER);
  var blob = Utilities.newBlob(Utilities.base64Decode(base64), mime, String(name || "image").slice(0, 80));
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return "https://lh3.googleusercontent.com/d/" + file.getId();
}
