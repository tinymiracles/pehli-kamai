/**
 * Pehli Kamai — signup logger
 *
 * Receives every new HR and youth signup from the live site and:
 *  - appends a row to a "HR Signups" or "Youth Signups" tab in this
 *    script's bound Google Sheet
 *  - for youth signups, saves the auto-generated resume (HTML) as a
 *    file in a "Pehli Kamai — Resumes" Drive folder and puts a link to
 *    it in the sheet row
 *
 * See SETUP.md in this folder for how to deploy this and wire it up —
 * this file is not run automatically, it has to be pasted into a Google
 * Apps Script project you create and deploy yourself (Claude can't do
 * that step — it needs your own Google account's permission).
 */

const DRIVE_FOLDER_NAME = 'Pehli Kamai — Resumes';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type === 'hr') {
      logHR_(data);
    } else if (data.type === 'youth') {
      logYouth_(data);
    }
  } catch (err) {
    logError_(err);
  }
  return ContentService.createTextOutput('ok');
}

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function logHR_(data) {
  const sheet = getSheet_('HR Signups', ['Timestamp', 'Name', 'Organisation', 'Industry', 'City', 'Email', 'Phone']);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.org || '',
    data.industry || '',
    data.city || '',
    data.email || '',
    data.phone || ''
  ]);
}

function logYouth_(data) {
  const sheet = getSheet_('Youth Signups', [
    'Timestamp', 'Name', 'Email', 'Phone', 'Education', 'Institution',
    'Sector', 'Location', 'Skills', 'About', 'Resume link'
  ]);
  let resumeLink = '';
  if (data.resumeHtml) {
    resumeLink = saveResumeToDrive_(data.name || 'candidate', data.resumeHtml);
  }
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.edu || '',
    data.institution || '',
    data.sector || '',
    data.location || '',
    data.skills || '',
    data.about || '',
    resumeLink
  ]);
}

function getFolder_() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

function saveResumeToDrive_(name, html) {
  const folder = getFolder_();
  const safeName = name.replace(/[^a-z0-9]+/gi, '_');
  const fileName = safeName + '_' + Date.now() + '.html';
  const file = folder.createFile(fileName, html, MimeType.HTML);
  return file.getUrl();
}

function logError_(err) {
  const sheet = getSheet_('Errors', ['Timestamp', 'Message']);
  sheet.appendRow([new Date(), String(err)]);
}
