/* Post text → HTML. One file used by the post pages (server), the site (browser) and the admin preview.
   Supports: ## / ### headings, paragraphs (a single line break stays a line break), - bullets, 1. numbered lists,
   ``` code blocks (get a Copy button; [PLACEHOLDERS] in capitals are highlighted), | tables |, > tip boxes,
   **bold**, *italic*, `code`, [text](https://link), ![alt](https://image), bare links, and --- lines.
   Everything is escaped first, so text typed in the admin can never inject HTML. */
(function (root) {
  "use strict";
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var okUrl = function (u) { return /^https?:\/\/[^\s"'<>]+$/i.test(u) || /^\/[^\s"'<>]*$/.test(u); };
  var ext = function (u) { return /^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : ""; };

  function inline(raw) {
    var keep = [];
    var hold = function (html) { keep.push(html); return "\u0000" + (keep.length - 1) + "\u0000"; };
    var s = String(raw);
    // inline code first, so nothing inside it is formatted
    s = s.replace(/`([^`]+)`/g, function (_, c) { return hold('<code class="i">' + esc(c) + "</code>"); });
    // images and links (http(s) or site-relative only)
    s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, function (m, alt, u) {
      return okUrl(u) ? hold('<img src="' + esc(u) + '" alt="' + esc(alt) + '" loading="lazy">') : m;
    });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, text, u) {
      return okUrl(u) ? hold('<a href="' + esc(u) + '"' + ext(u) + ">" + inlineText(text) + "</a>") : m;
    });
    s = s.replace(/https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"]/g, function (u) {
      return hold('<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(u) + "</a>");
    });
    s = inlineText(s);
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return keep[+i]; });
  }
  function inlineText(s) {
    return esc(s)
      .replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, "<b>$1</b>")
      .replace(/(^|[^*\w])\*(?=\S)([^*]*?\S)\*(?!\w)/g, "$1<i>$2</i>");
  }

  var isFence = function (l) { return /^\s*```/.test(l); };
  var isHead = function (l) { return /^#{1,3}\s+\S/.test(l); };
  var isUl = function (l) { return /^\s*[-*•]\s+\S/.test(l); };
  var isOl = function (l) { return /^\s*\d+[.)]\s+\S/.test(l); };
  var isQuote = function (l) { return /^\s*>/.test(l); };
  var isHr = function (l) { return /^\s*(---+|\*\*\*+)\s*$/.test(l); };
  var isRow = function (l) { return /^\s*\|.*\|\s*$/.test(l); };
  var isSep = function (l) { return /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/.test(l); };
  var cells = function (l) { return l.trim().replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); }); };
  var starts = function (l, next) {
    return isFence(l) || isHead(l) || isUl(l) || isOl(l) || isQuote(l) || isHr(l) || (isRow(l) && next != null && isSep(next));
  };

  function codeBlock(lines) {
    var body = esc(lines.join("\n")).replace(/\[([A-Z0-9][A-Z0-9 _\-.,:/']*)\]/g, '<span class="ph">[$1]</span>');
    return '<div class="code"><pre>' + body + '</pre><button type="button" class="copy">Copy</button></div>';
  }

  function render(text) {
    var L = String(text || "").replace(/\r\n?/g, "\n").split("\n");
    var out = [], i = 0, para = [];
    var flush = function () {
      if (para.length) out.push("<p>" + para.map(inline).join("<br>") + "</p>");
      para = [];
    };
    while (i < L.length) {
      var l = L[i];
      if (!l.trim()) { flush(); i++; continue; }
      if (!starts(l, L[i + 1])) { para.push(l.trim()); i++; continue; }
      flush();
      if (isFence(l)) {
        var code = []; i++;
        while (i < L.length && !isFence(L[i])) code.push(L[i++]);
        i++; // closing ``` (or end of text)
        while (code.length && !code[code.length - 1].trim()) code.pop();
        out.push(codeBlock(code));
      } else if (isHead(l)) {
        var lvl = l.match(/^#+/)[0].length;
        out.push((lvl === 3 ? "<h3>" : "<h2>") + inline(l.replace(/^#+\s+/, "")) + (lvl === 3 ? "</h3>" : "</h2>"));
        i++;
      } else if (isHr(l)) {
        out.push("<hr>"); i++;
      } else if (isQuote(l)) {
        var q = [];
        while (i < L.length && isQuote(L[i])) q.push(L[i++].replace(/^\s*>\s?/, ""));
        out.push('<div class="tip">' + render(q.join("\n")) + "</div>");
      } else if (isRow(l)) {
        var head = cells(l); i += 2;
        var rows = [];
        while (i < L.length && isRow(L[i])) rows.push(cells(L[i++]));
        out.push('<div class="tbl"><table><thead><tr>' + head.map(function (c) { return "<th>" + inline(c) + "</th>"; }).join("") +
          "</tr></thead><tbody>" + rows.map(function (r) {
            return "<tr>" + head.map(function (_, k) { return "<td>" + inline(r[k] || "") + "</td>"; }).join("") + "</tr>";
          }).join("") + "</tbody></table></div>");
      } else {
        var ol = isOl(l), test = ol ? isOl : isUl, items = [], first = ol ? parseInt(l, 10) : 1;
        while (i < L.length && test(L[i])) {
          var item = L[i++].replace(ol ? /^\s*\d+[.)]\s+/ : /^\s*[-*•]\s+/, "");
          // indented lines right under an item belong to it
          while (i < L.length && /^\s{2,}\S/.test(L[i]) && !test(L[i])) item += "\n" + L[i++].trim();
          items.push("<li>" + item.split("\n").map(inline).join("<br>") + "</li>");
        }
        out.push(ol ? "<ol" + (first > 1 ? ' start="' + first + '"' : "") + ">" + items.join("") + "</ol>" : "<ul>" + items.join("") + "</ul>");
      }
    }
    flush();
    return out.join("");
  }

  var api = { render: render };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SabithMD = api;
})(this);
