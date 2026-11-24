import { GAS_WEB_APP_URL } from '../config'

/**
 * Submits form data to the Google Sheet through the deployed
 * Google Apps Script Web App (see GoogleSheets-Setup.md).
 *
 * The Apps Script creates/uses a tab named after `form` and appends a
 * row whose columns are defined by the keys of `data`. A "Timestamp"
 * column is prepended automatically so every row records when it was
 * submitted.
 *
 * The request body is sent as `text/plain` (not `application/json`)
 * because that avoids the CORS preflight that Google Apps Script does
 * not support — the Apps Script still receives the JSON string.
 *
 * SUCCESS IS ONLY REPORTED WHEN THE SERVER CONFIRMS THE SAVE:
 * resolve.ok is `true` only if the Apps Script returned
 * `{ ok: true, saved: true, targetTab, rowNumber, ... }`, i.e. the row
 * was actually appended to the sheet. Any other outcome (network
 * error, HTTP 403 HTML page, missing `saved: true`) resolves with
 * `ok: false` plus a human-readable `error` message.
 *
 * @param {{ form: string, data: Record<string, string|number> }} payload
 * @returns {Promise<{
 *   ok: boolean,
 *   saved?: boolean,
 *   demo?: boolean,
 *   error?: string,
 *   confirmation?: { tab: string, rowNumber: number, spreadsheetUrl: string }
 * }>}
 */
export async function submitFormData({ form, data }) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  })

  const headers = ['Timestamp', ...Object.keys(data)]
  const values = [submittedAt, ...Object.values(data).map((v) => (v == null ? '' : v))]

  // If the web app URL has not been configured, fail loudly so the user
  // knows nothing was saved (demo mode would silently lose submissions).
  if (!GAS_WEB_APP_URL) {
    console.warn(
      '[sheetApi] VITE_GAS_WEB_APP_URL is not configured — form data was NOT sent to the sheet.',
      { form, data }
    )
    return {
      ok: false,
      saved: false,
      demo: true,
      error: 'Google Sheets is not configured (VITE_GAS_WEB_APP_URL is missing).',
    }
  }

  try {
    const res = await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      cache: 'no-store',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ form, submittedAt, headers, values }),
    })

    const text = await res.text()

    // The Apps Script answers with JSON; anything non-JSON (e.g. a
    // Google "requesting access" HTML page) means the request never
    // reached the script (403 / stale deployment).
    let json = null
    try {
      json = text ? JSON.parse(text) : null
    } catch {
      json = null
    }

    if (!res.ok) {
      const hint =
        res.status === 403
          ? 'The Apps Script web app rejected the request. Redeploy it with "Execute as: Me" and "Who has access: Anyone", or the /exec URL is stale (redeploy and copy the NEW URL).'
          : `The Google sheet endpoint responded with HTTP ${res.status}.`
      return { ok: false, saved: false, error: hint }
    }

    // Require an explicit confirmation from the script that the row was
    // written — "HTTP 200" alone is not enough.
    if (!json || json.ok !== true || json.saved !== true) {
      return {
        ok: false,
        saved: false,
        error: json?.error || 'The Apps Script did not confirm the save.',
      }
    }

    return {
      ok: true,
      saved: true,
      confirmation: {
        tab: json.tab,
        rowNumber: json.rowNumber,
        spreadsheetUrl: json.spreadsheetUrl,
      },
    }
  } catch (err) {
    return { ok: false, saved: false, error: err?.message || String(err) }
  }
}
