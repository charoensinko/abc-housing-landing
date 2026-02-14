const SHEET_NAME = "Signups";

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "ABC Housing signup endpoint is live"
  });
}

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = e && e.parameter ? e.parameter : {};

    sheet.appendRow([
      new Date(),
      valueOrEmpty_(data.fullName),
      valueOrEmpty_(data.email),
      valueOrEmpty_(data.company),
      valueOrEmpty_(data.teamSize),
      valueOrEmpty_(data.pageUrl),
      valueOrEmpty_(data.userAgent)
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Submitted At",
      "Full Name",
      "Email",
      "Company",
      "Team Size",
      "Page URL",
      "User Agent"
    ]);
  }

  return sheet;
}

function valueOrEmpty_(value) {
  return value ? String(value).trim() : "";
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
