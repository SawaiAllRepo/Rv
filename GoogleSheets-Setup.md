# Google Sheets Integration — Setup Guide

All form submissions in this app (Contact, Enquiry, Provider Application,
Bookings and Direct Service Enquiries) are saved to this spreadsheet:

**https://docs.google.com/spreadsheets/d/18E-rZXPh_sWYFDqTSh8KbAHkj0nt5UevXvISKAcCzl0/edit**

A static frontend cannot write directly into a private Google Sheet, so the
data is routed through a **Google Apps Script Web App** that appends rows into
the sheet.

---

## 1. Open the spreadsheet

Open the spreadsheet linked above with the Google account that owns it.

> The spreadsheet is **private** — that is fine. The Apps Script runs *as you*
> (the owner) so writes still work. You only share the *web app* URL publicly,
> never the sheet itself.

## 2. Create / update the Apps Script

In the spreadsheet, go to **Extensions → Apps Script**.

Delete the default `function myFunction() {}` and paste the full contents of
[`google-apps-script/Code.gs`](google-apps-script/Code.gs).

Click the save icon (💾 or Ctrl/Cmd+S) and name the project, e.g.
`RV24-FormSubmissions`.

## 3. Deploy (or REDEPLOY) as a Web App — read the ⚠️ notes

- Click **Deploy → New deployment** → click the gear icon ⚙️ → choose **Web app**.
- Set:
  - **Description**: `RV24 form submissions`
  - **Execute as**: `Me` (the spreadsheet owner)
  - **Who has access**: `Anyone`  ← **required**, otherwise the frontend gets `HTTP 403`
- Click **Deploy** and approve the authorisation.

> ⚠️ **If you get `HTTP 403` / “Message could not be saved.”**
> This is the #1 cause of “nothing is being saved”. It means the request
> never reached the script because:
>   1. **`Who has access` is NOT set to `Anyone`**, or
>   2. **The `/exec` URL is stale** — Apps Script invalidates old deployment
>      URLs whenever the code changes. You MUST create a **new deployment**
>      after every edit and copy the **new** `/exec` URL into the frontend.

Copy the **Web app URL** — it ends with `/exec`, e.g.:

```
https://script.google.com/macros/s/AKfycb.../exec
```

**Test the deployment** by opening that URL in a browser — you should see:

```json
{ "ok": true, "message": "Deployment is active. POST form data to this URL.", ... }
```

If you see a Google “requesting access” page instead, the deployment is not
publicly accessible — fix item 1 above and redeploy.

## 4. Connect the frontend

Create a `.env` file at the project root (copy from
[`.env.example`](.env.example)) and set the App Script URL:

```sh
# .env  (local dev — never commit)
VITE_GAS_WEB_APP_URL=https://script.google.com/macros/s/AKfycb.../exec
VITE_SHEET_ID=18E-rZXPh_sWYFDqTSh8KbAHkj0nt5UevXvISKAcCzl0
```

The frontend reads these from `src/config.js` via Vite's `import.meta.env`.

> Committed [`.env.production`](.env.production) ships the same public `VITE_*`
> values so Vercel/CI production builds work out of the box. Vercel dashboard
> environment variables take precedence if you ever need to override them.

Restart the dev server / rebuild, then submit a form.

## 5. Confirm a save actually happened

The Apps Script now **explicitly confirms** each write. A successful response
looks like:

```json
{
  "ok": true,
  "saved": true,
  "tab": "Contact Message",
  "spreadsheetId": "18E-rZXPh_sWYFDqTSh8KbAHkj0nt5UevXvISKAcCzl0",
  "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/18E-r.../edit#gid=...",
  "rowNumber": 12,
  "timestamp": "16/09/2026, 10:30:00 am"
}
```

The frontend only shows the success toast when `saved: true` is returned; the
**Contact** page even shows which row was added (e.g. *“Added Row #12 to
Contact Message”*). Open the spreadsheet and verify the same row is there.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Message could not be saved` + toast shows `HTTP 403` / “*who has access*” | Redeploy the web app with **Execute as: Me** + **Who has access: Anyone**; copy the **NEW** `/exec` URL and update it in `.env` / `.env.production` / Vercel vars. |
| Opening the `/exec` URL shows “requesting access” (not the ok:true JSON) | The deployment is not public. Change **Who has access → Anyone** and deploy a new version. |
| `CORS` / blocked request | The web app must be deployed with **Who has access: Anyone**. Also keep the request `Content-Type: text/plain` (the code already does). |
| New submissions aren't appearing | Check the sheet tabs; check **Executions** log in the Apps Script editor (left sidebar → Executions) for the error detail. |
| Success toast shows but spreadsheet is empty | That should no longer happen — success is only shown after `saved: true`. If the toast says “not saved”, read the error text in the toast. |