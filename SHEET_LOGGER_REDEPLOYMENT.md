# Google Apps Script Redeployment Guide

The Sheet Logger at the URL in `docs/admin/index.html` (line 169) is not responding. Follow these steps to redeploy it:

## Quick Check First
1. Go to https://script.google.com/home
2. Look for a project called "Pehli Kamai" or "signup logger"
3. If it exists, go to Step 3 below. If not, go to Step 1.

## Step 1: Create New Google Sheet (if needed)
1. Go to https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it **"Pehli Kamai — Signups"**
4. Note the Sheet ID from the URL (the long alphanumeric string after `/d/` and before `/edit`)

## Step 2: Create Apps Script Project
1. In your Sheet, go to **Extensions → Apps Script**
2. You'll see a code editor with a default `myFunction()` 
3. Delete everything and paste the entire contents of [Code.gs](sheet-logger/Code.gs) from this repo
4. **IMPORTANT:** Update line 26 with your Drive folder ID:
   ```javascript
   const RESUME_FOLDER_ID = '1Eyp_USesa7Od-YHGq_qw7NBhTlG_H54I';  // ← Replace this
   ```
   To find your folder ID:
   - Create a new folder in Google Drive called "Pehli Kamai Resumes"
   - Open it and copy the ID from the URL: `https://drive.google.com/drive/folders/THIS_PART`
   - Paste it in place of the old ID

5. Click **Save** (or Ctrl+S)

## Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the **gear icon** next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description:** "Pehli Kamai signup logger"
   - **Execute as:** Your email address (the Google account running this)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Google may ask you to authorize. Click through and approve for your own account.
7. You'll get a new **Deployment ID** and a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/ABC123XYZ.../exec
   ```

## Step 4: Update Pehli Kamai
1. Copy the new Web app URL
2. Update **TWO places** in the code:
   - In `docs/script.js` line ~78: `const SHEET_LOG_URL='...'`
   - In `docs/admin/index.html` line ~169: `const SHEET_STATUS_URL='...'`
   - Both must have the **same URL**
3. Commit and push:
   ```bash
   git add docs/script.js docs/admin/index.html
   git commit -m "Update Sheet Logger deployment URL"
   git push origin main
   ```

## Step 5: Verify
1. Go to the admin dashboard: https://pehli-kamai.vercel.app/admin
2. Click the "Sheet & Drive" tab
3. You should see "Sheet logger is working" (green status)
4. Create a test youth profile on the live site
5. Check your Google Sheet — a new row should appear in the "Youth Signups" tab

## Troubleshooting

**"Could not reach the Sheet logger"**
- Check that the URL in both `docs/script.js` and `docs/admin/index.html` are **exactly the same**
- Make sure you copied the entire URL including `?` parameter if the admin page adds one
- Verify the deployment is set to "Anyone" access (not "Only me")

**"Script function not found: doPost"**
- The deployment is pointing to the wrong version
- Delete the old deployment under Deploy → Manage deployments
- Create a new deployment following Step 3 above

**New entries not appearing in Sheet**
- Check that the spreadsheet's tab names are exactly: "HR Signups", "Youth Signups", "Contact Enquiries", "Grievances", "Errors"
- Make sure RESUME_FOLDER_ID points to a folder your account can write to
- Check the "Errors" tab in your Sheet for error messages

## Need Help?
Contact: pehlikamaitm@gmail.com or +91 93266 91744
