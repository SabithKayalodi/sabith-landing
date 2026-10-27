# Sabith website (English + Malayalam)

A bilingual link-in-bio site: English by default, with an EN | മലയാളം switch. Free resources, posts with "Read in Malayalam", series and follow links. Content comes from one Google Sheet, so after setup you never edit code.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page |
| `posts.html` | All posts (opens at `/posts`) |
| `post.html` | One post (opens at `/post?p=slug`) |
| `assets/site.js` | All text in both languages + the Google Sheet links (CONFIG at the top) |
| `assets/style.css` | Design |
| `assets/sabith.jpg`, `assets/og.jpg` | Photo and share-preview image |
| `sheet-templates/` | Starter files for your Google Sheet |
| `favicon.svg`, `vercel.json` | Tab icon and Vercel settings |

## 1. Put it live on Vercel

1. On GitHub, create a repository `sabith-landing` and upload everything inside this folder (keep the `assets` and `sheet-templates` folders). Commit.
2. On vercel.com (your Gmail account is fine): **Add New → Project → Continue with GitHub**, allow access, pick `sabith-landing` → **Import → Deploy**.
3. Your link: something like `sabith-landing.vercel.app`.

Updating an existing deployment: upload the new files to the same GitHub repository (replace when asked) and commit. Vercel updates in about a minute.

## 2. Connect your Google Sheet (one time)

1. Create a Google Sheet with three tabs: **Resources**, **Posts**, **Links**.
2. Import each file from `sheet-templates/` into its tab (**File → Import → Upload**, choose "Replace current sheet" or "Insert new sheet").
3. **File → Share → Publish to web**: pick the **Resources** tab, format **Comma-separated values (.csv)**, **Publish**, copy the link. Repeat for **Posts** and **Links**.
4. On GitHub, open `assets/site.js`, tap the pencil, and paste the three links at the top:
   ```
   RESOURCES_CSV: "paste here",
   POSTS_CSV:     "paste here",
   LINKS_CSV:     "paste here"
   ```
5. Commit. From now on, edit the Sheet only.

## 3. Daily use

**Resources tab:** keyword · format · title · title_ml · description · description_ml · link · new (yes) · show (yes/no)

**Posts tab:** one row per post.

| Column | What to type |
| --- | --- |
| slug | Short page name, letters and dashes: `whatsapp-auto-reply` |
| date | `2026-11-05` (newest shows first) |
| title_en / title_ml | Title in English / Malayalam |
| summary_en / summary_ml | One line for the list |
| body_en / body_ml | The post. Blank line = new paragraph · `- ` = bullet · `## ` = sub-heading · links work automatically |
| reel | Instagram or YouTube link (optional) |
| keyword | Matching resource keyword, e.g. `AUTO` (shows that resource under the post) |
| show | yes / no |

In a Google Sheets cell, press **Ctrl+Enter** (or **Alt+Enter**; on phone, the line-break key) for a new line inside the post text.

Leave `body_ml` empty and the "Read in Malayalam" button hides on that post.

**Links tab:** paste your Instagram, YouTube, WhatsApp Channel and LinkedIn links.

Changes show within about 5 minutes (Google refreshes published sheets on its own schedule).

## Sharing in Malayalam

Add `?lang=ml` to any link to open it in Malayalam, e.g. `yoursite/post?p=whatsapp-auto-reply&lang=ml`.

## Changing page text

All page text (headings, buttons) is in `assets/site.js` under `STRINGS`, with `en` and `ml` versions side by side.

## Note

Published sheets are public: keep only website content in this Sheet. Posts from a Sheet suit reel companion posts; for Google search traffic, posts would later move into their own pages.
