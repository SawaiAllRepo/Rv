/**
 * RV Solutions 24 — Google Sheets form storage (v2)
 * =================================================
 *
 * Paste this file into the Apps Script editor of the target Google
 * Sheet (Extensions > Apps Script), then deploy it as a Web App:
 *
 *   Deploy > New deployment > Web app
 *     - Description     : RV24 form submissions
 *     - Execute as      : Me
 *     - Who has access  : Anyone      <-- REQUIRED, otherwise HTTP 403
 *
 * Copy the resulting "Web app" URL (ends with /exec) into the frontend
 * `.env` / `.env.production` as VITE_GAS_WEB_APP_URL.
 *
 * IMPORTANT: every code change requires a NEW deployment. Old /exec
 * URLs become invalid once the script changes, so redeploy and update
 * the URL afterwards.
 *
 * The frontend POSTs a JSON payload shaped like:
 *   {
 *     "form": "Contact Message",
 *     "submittedAt": "16/09/2026, 10:30:00 am",
 *     "headers": ["Timestamp", "Name", "Email", ...],
 *     "values":   ["16/09/2026...", "John", "j@x.com", ...]
 *   }
 *
 * On success the response explicitly confirms the save:
 *   {
 *     "ok": true, "saved": true,
 *     "tab": "Contact Message", "spreadsheetId": "...",
 *     "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/...",
 *     "rowNumber": 12, "timestamp": "16/09/2026, 10:30:00 am"
 *   }
 */

// Optional: force every form into a single tab instead of one tab per
// form type, e.g. var SINGLE_TAB = 'All Submissions';
var SINGLE_TAB = null;

// Fallback spreadsheet if this script is run as a *standalone* script
// (not bound to a sheet). Leave as '' when container-bound — the script
// then uses the sheet it lives in.
var TARGET_SHEET_ID = '18E-rZXPh_sWYFDqTSh8KbAHkj0nt5UevXvISKAcCzl0';

/**
 * Receives a form submission and appends it to the spreadsheet.
 */
function doPost(e) {
  var out = { ok: false, saved: false };
  var lock = LockService.getScriptLock();
  try {
    // Prevent concurrent writes from corrupting header/row handling.
    lock.waitLock(20000);

    var payload = JSON.parse(e.postData.contents || '{}');
    var form = String(payload.form || 'Submissions');
    var submittedAt = String(payload.submittedAt || new Date().toString());
    var headers = Array.isArray(payload.headers) ? payload.headers : [];
    var values = Array.isArray(payload.values) ? payload.values : [];

    // Fallback: derive headers/values from a flat `data` object when the
    // caller did not pre-split them (keeps integration flexible).
    if (!headers.length && payload.data && typeof payload.data === 'object') {
      headers = ['Timestamp'].concat(Object.keys(payload.data));
      values = [submittedAt].concat(
        Object.keys(payload.data).map(function (k) {
          var v = payload.data[k];
          return v === null || v === undefined ? '' : String(v);
        })
      );
    }

    var ss = getSpreadsheet_();
    var tab = sanitizeTabName_(SINGLE_TAB || form);
    var sheet = ss.getSheetByName(tab);
    if (!sheet) sheet = ss.insertSheet(tab);

    // Read the existing header row, if any.
    var lastCol = sheet.getLastColumn();
    var existing = [];
    if (lastCol > 0) {
      existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    // Map header name -> submitted value.
    var valueMap = {};
    for (var i = 0; i < headers.length; i++) {
      valueMap[headers[i]] = values[i] !== undefined ? values[i] : '';
    }

    // Merge submitted headers with existing ones (new columns appended).
    var finalHeaders = existing.slice();
    for (var j = 0; j < headers.length; j++) {
      if (finalHeaders.indexOf(headers[j]) === -1) finalHeaders.push(headers[j]);
    }

    // Ensure the header row exists / is up to date.
    sheet.getRange(1, 1, 1, finalHeaders.length).setValues([finalHeaders]);

    // Build the row in header order ('' for missing values).
    var row = finalHeaders.map(function (h) {
      return valueMap[h] !== undefined ? valueMap[h] : '';
    });

    var rowNumber = sheet.getLastRow() + 1;
    sheet.getRange(rowNumber, 1, 1, row.length).setValues([row]);

    out = {
      ok: true,
      saved: true,
      tab: sheet.getName(),
      spreadsheetId: ss.getId(),
      spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/edit#gid=' + sheet.getSheetId(),
      rowNumber: rowNumber,
      timestamp: submittedAt,
    };
  } catch (err) {
    out.error = String((err && err.message) || err);
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
  return json_(out);
}

/**
 * Simple health check: open the deployed URL in a browser — you should
 * see { "ok": true, "message": "Deployment is active" }.
 */
function doGet() {
  return json_({
    ok: true,
    message: 'Deployment is active. POST form data to this URL.',
    time: new Date().toString(),
  });
}

/**
 * Returns the spreadsheet to write to: the sheet this script is bound
 * to, or (standalone scripts) the one matching TARGET_SHEET_ID.
 */
function getSpreadsheet_() {
  var ss = null;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    ss = null;
  }
  // getActiveSpreadsheet() returns null for standalone scripts — fall
  // back to the explicit spreadsheet id when needed.
  if (ss) return ss;
  return SpreadsheetApp.openById(TARGET_SHEET_ID);
}

/**
 * Google sheet tab names cannot contain  : \ / ? * [ ]
 * and are limited to 100 characters.
 */
function sanitizeTabName_(name) {
  var clean = String(name).replace(/[:\\/?*[\]]/g, ' ').trim();
  return (clean || 'Submissions').slice(0, 100);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
