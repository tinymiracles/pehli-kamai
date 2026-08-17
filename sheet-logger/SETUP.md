# Signup logger — setup

This mirrors every HR signup, youth signup, and "Let's talk" contact-form
submission on the live site into a Google Sheet, and saves each youth's
auto-generated resume into a Drive folder. It costs nothing to run and needs
no server — it's a small script tied to your own Google account.

This has to be set up once, by you (or whoever owns the Google account you
want the Sheet/Drive folder to live in) — Claude can't click through Google's
permission screens on your behalf.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet. Name it something like **"Pehli Kamai — Signups"**.
2. In the menu, go to **Extensions → Apps Script**. This opens a script
   editor bound to this specific sheet.

## 2. Paste the script

1. In the Apps Script editor, delete whatever's in the default `Code.gs`
   file and paste in the entire contents of [`Code.gs`](Code.gs) from this
   folder.
2. Click the save icon (or Ctrl/Cmd+S).

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: anything, e.g. "signup logger"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script (since it
   needs permission to write to your Sheet and Drive) — click through
   your own account, and click **Advanced → Go to [project name] (unsafe)**
   if it shows an "unverified app" warning. This is expected for a script
   you wrote yourself; it's not actually unsafe, Google just flags anything
   that hasn't gone through their formal app-review process.
6. Copy the **Web app URL** it gives you (looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).

## 4. Wire it into the site

1. Open [`docs/script.js`](../docs/script.js) and find this line near the top:
   ```js
   const SHEET_LOG_URL='';
   ```
2. Paste your Web app URL between the quotes:
   ```js
   const SHEET_LOG_URL='https://script.google.com/macros/s/AKfycb.../exec';
   ```
3. Commit and push. From then on, every HR signup, every new youth profile,
   and every "Let's talk" contact-form submission on the live site will add
   a row to your Sheet — HR signups on an "HR Signups" tab, youth signups
   (with a link to their auto-generated resume, saved in a "Pehli Kamai —
   Resumes" Drive folder) on a "Youth Signups" tab, and contact-form
   messages on a "Contact Enquiries" tab. All three tabs are created
   automatically the first time something is logged.

## Notes

- If you ever need to redeploy after editing `Code.gs` (e.g. to add a new
  field), use **Deploy → Manage deployments → edit (pencil icon) → New
  version → Deploy** — creating a brand new deployment instead would give
  you a different URL, which you'd then have to update in `script.js` again.
- This is separate from, not a replacement for, the real Firestore data
  (`hr_accounts`, `youth_accounts`, `candidates`) the site already writes to
  — think of it as an easy-to-browse mirror for your team, not the source
  of truth.
- If a signup fails to log for some reason, it fails silently on the site
  (same as the existing email notifications) so a hiccup in the Sheet never
  blocks someone from actually signing up. Check the "Errors" tab in the
  Sheet (created automatically) if something seems to be missing.
