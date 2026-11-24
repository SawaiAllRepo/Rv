// =====================================================================
// Google Sheets / Apps Script configuration
//
// The form data from this app is saved into a Google Sheet via a
// Google Apps Script Web App endpoint. Follow GoogleSheets-Setup.md to
// deploy it, then provide the deployed "/exec" URL through environment
// variables instead of hard-coding it here.
//
// Values are read from Vite's environment variables (see `.env.example`
// for the template). Vite loads them in this order (later overrides):
//   `.env`              -> local dev (gitignored, real values)
//   `.env.production`   -> committed public VITE_* build config so
//                          Vercel/CI production builds work out of the box
//
//   VITE_GAS_WEB_APP_URL  Deployed Apps Script Web App "/exec" URL
//   VITE_SHEET_ID         ID of the target spreadsheet
//
// Setup flow:
//   1. Open the spreadsheet.
//   2. Extensions > Apps Script > paste google-apps-script/Code.gs
//   3. Deploy > New deployment > Web app
//        - Execute as : Me
//        - Who has access : Anyone
//   4. Copy the Web app URL into VITE_GAS_WEB_APP_URL in `.env`.
// =====================================================================

export const GAS_WEB_APP_URL = import.meta.env.VITE_GAS_WEB_APP_URL ?? ''

// ID of the target spreadsheet from its URL:
// https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit...
export const SHEET_ID = import.meta.env.VITE_SHEET_ID ?? ''
