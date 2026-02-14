# Google Sheets Setup (Apps Script)

1. Open the Google Sheet where you want signups stored.
2. Go to `Extensions` -> `Apps Script`.
3. Replace the default script with the contents of `apps-script/Code.gs`.
4. Click `Deploy` -> `New deployment`.
5. Select type `Web app`.
6. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
7. Deploy and copy the generated Web App URL.
8. In `script.js`, set `APPS_SCRIPT_URL` to that Web App URL.
9. Reload your landing page and submit the form.

Notes:
- The first submission auto-creates a `Signups` tab with headers.
- If you redeploy with a new version, keep using the latest Web App URL.
