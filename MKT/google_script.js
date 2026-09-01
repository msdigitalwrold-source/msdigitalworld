// If your Apps Script was created from script.google.com directly (standalone),
// paste your Google Sheet ID or Full URL below between quotes:
const SPREADSHEET_ID_OR_URL = ''; // Leave blank if opened via Extensions > Apps Script in Sheet

const DEFAULT_HEADERS = [
  'Timestamp',
  'name',
  'contact',
  'email',
  'food_quality',
  'taste',
  'service',
  'ambience',
  'cleanliness',
  'value_for_money',
  'comments',
  'dob',
  'anniversary',
  'other_date',
  'supervisor',
  'server'
];

function getTargetSheet() {
  let ss = null;
  if (typeof SPREADSHEET_ID_OR_URL !== 'undefined' && SPREADSHEET_ID_OR_URL.trim() !== '') {
    if (SPREADSHEET_ID_OR_URL.startsWith('http')) {
      ss = SpreadsheetApp.openByUrl(SPREADSHEET_ID_OR_URL);
    } else {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID_OR_URL);
    }
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  return ss ? ss.getSheets()[0] : null;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = getTargetSheet();

    if (!sheet) {
      throw new Error('Google Sheet not linked.');
    }

    // Auto-create headers if sheet is empty
    if (sheet.getLastColumn() === 0 || sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length).setValues([DEFAULT_HEADERS]);
      sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length).setFontWeight('bold');
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header === 'Timestamp') {
        return new Date();
      } else {
        return (e && e.parameter && e.parameter[header] !== undefined) ? e.parameter[header] : '';
      }
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
