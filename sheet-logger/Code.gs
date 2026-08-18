/**
 * Pehli Kamai — signup logger
 *
 * Receives every new HR signup, youth signup, "Let's talk" contact-form
 * submission, and "Report a concern" grievance from the live site and:
 *  - appends a row to a "HR Signups", "Youth Signups", "Contact
 *    Enquiries", or "Grievances" tab in this script's bound Google Sheet
 *  - for youth signups, saves the auto-generated resume (HTML) as a
 *    file in a specific Drive folder (see RESUME_FOLDER_ID below) and
 *    puts a link to it in the sheet row
 *  - for grievances, adds a "Status" column (Open by default) -- update
 *    it by hand as you work through each one; this tab is the grievance
 *    register itself, doubling as the team's tracking dashboard until
 *    there's a real admin page for it
 *
 * See SETUP.md in this folder for how to deploy this and wire it up —
 * this file is not run automatically, it has to be pasted into a Google
 * Apps Script project you create and deploy yourself (Claude can't do
 * that step — it needs your own Google account's permission).
 */

// The folder ID from your Drive folder's share link:
// https://drive.google.com/drive/folders/THIS_PART?usp=sharing
// Must be a folder your own Google account (the one running this script)
// can write to.
const RESUME_FOLDER_ID = '1Eyp_USesa7Od-YHGq_qw7NBhTlG_H54I';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.type === 'hr') {
      logHR_(data);
    } else if (data.type === 'youth') {
      logYouth_(data);
    } else if (data.type === 'contact') {
      logContact_(data);
    } else if (data.type === 'grievance') {
      logGrievance_(data);
    }
  } catch (err) {
    logError_(err);
  }
  return ContentService.createTextOutput('ok');
}

// Lock only around the check-and-create step, not the whole request --
// under a burst of simultaneous signups, two requests could both see a tab
// (e.g. "Youth Signups") doesn't exist yet and both try to create it at
// once. A lock across the entire request would be worse: hundreds of
// people queuing one by one could time each other out. This keeps the
// lock brief (a lookup, and rarely a create) so appendRow calls -- the
// common case once the tab already exists -- never wait on it.
function getSheet_(name, headers) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    return sheet;
  } finally {
    lock.releaseLock();
  }
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

function logContact_(data) {
  const sheet = getSheet_('Contact Enquiries', ['Timestamp', 'Name', 'Organisation', 'Email', 'I am a...', 'Message']);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.org || '',
    data.email || '',
    data.contactType || '',
    data.msg || ''
  ]);
}

function logGrievance_(data) {
  const sheet = getSheet_('Grievances', ['Timestamp', 'Reference', 'Name', 'Email', 'Category', 'What happened', 'Status']);
  sheet.appendRow([
    new Date(),
    data.refNo || '',
    data.name || '',
    data.email || '',
    data.category || '',
    data.description || '',
    'Open'
  ]);
}

function getFolder_() {
  return DriveApp.getFolderById(RESUME_FOLDER_ID);
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
