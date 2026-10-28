# Sabith website v3: admin page + Google-friendly posts

English + Malayalam site with:

- **Admin page** at `yoursite/admin` (password protected) to add posts, resources, links and About text from your phone
- **Real post pages** at `yoursite/post/your-post-name`, readable by Google, with WhatsApp/Instagram link previews
- **Sitemap** at `yoursite/sitemap.xml`
- Changes go live in about a minute

Everything stays free: Vercel (site), Google Sheets (storage), Google Apps Script (saving), Google Drive (images).

---

## Part 1: Update the site on GitHub (5 minutes)

1. Unzip this file and open the `sabith-landing` folder.
2. In your GitHub repository: **Add file → Upload files**, then drag in **everything** inside the folder, including the new `api` and `google-apps-script` folders.
3. Delete the old `post.html` from GitHub if it's there (open it → ⋯ → **Delete file** → Commit).
4. **Commit changes**. Vercel redeploys automatically.

Until Part 2 is done, the site shows the sample content and the admin page says "Not connected yet". That's expected.

## Part 2: Create the Google backend (10 minutes, one time)

1. Go to **sheets.google.com** → **Blank spreadsheet** → name it **Website**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete everything in `Code.gs`, then paste the full contents of `google-apps-script/Code.gs` from this folder.
4. Near the top, change `CHANGE-THIS-PASSWORD` to your own strong password (keep the quotes). This is your admin password.
5. Click **Save** (disk icon).
6. In the function dropdown at the top, choose **setup** → click **Run**.
   - Google asks for permission: **Review permissions** → choose your account → **Advanced** → **Go to (unsafe)** → **Allow**. ("Unsafe" only means Google hasn't reviewed your own script.)
   - This creates the tabs: Resources, Posts, Links, Settings.
7. Click **Deploy → New deployment** → gear icon → **Web app**:
   - Description: `website`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and allow access again if asked.
8. Copy the **Web app URL** (ends with `/exec`).

Optional: to start with the sample post and resources, import the files from `sheet-templates/` into the matching tabs (**File → Import → Upload → Replace current sheet**). Or simply add everything through the admin page.

## Part 3: Connect Vercel to Google (3 minutes, one time)

1. In Vercel, open your project → **Settings → Environment Variables**.
2. Add:
   - **Key:** `GAS_URL`
   - **Value:** the Web app URL from Part 2
   - Environments: all (Production, Preview, Development)
3. **Save**.
4. Go to **Deployments** → on the top deployment click **⋯ → Redeploy** → **Redeploy**.

## Part 4: Use it

- Open **`yoursite/admin`** on your phone and log in with your password.
- **Posts:** New post → English and Malayalam tabs → optional cover image → Preview → Save.
- **Resources:** keyword, titles, descriptions, Google Drive link.
- **Links:** Instagram, YouTube, WhatsApp Channel, LinkedIn.
- **About & text:** About section and home page lines in both languages.

Changes appear on the site within about a minute.

## Part 5: Google Search (one time)

1. Go to **search.google.com/search-console** → **Add property → URL prefix** → your site address.
2. Verify with the **HTML tag** method (paste the tag into `index.html` right after `<head>` on GitHub, commit, then click Verify).
3. Open **Sitemaps** → enter `sitemap.xml` → **Submit**.

## Changing the password

Edit `ADMIN_PASSWORD` in Apps Script → Save → **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same.

## If something goes wrong

| Problem | Fix |
| --- | --- |
| Admin says "Not connected yet" | Part 3 not done, or you didn't Redeploy after adding `GAS_URL` |
| "Could not reach Google" | In Apps Script, the deployment must be **Who has access: Anyone** |
| "Set your password in Code.gs first" | Change the password, Save, then deploy a **New version** |
| Changes in Code.gs don't apply | Every Code.gs change needs **Manage deployments → Edit → New version** |
| Images don't show | Check the "Website images" folder exists in your Google Drive |

## Notes

- Keep your admin password private. Anyone with it can edit the site.
- You can still edit the Google Sheet directly; the admin page and the sheet stay in sync.
- Hidden posts (Show on website unticked) never appear on the site or in Google.
