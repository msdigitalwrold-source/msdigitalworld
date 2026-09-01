/**
 * KUROSAHI MULTI-SPORT ACADEMY - GOOGLE APPS SCRIPT WEBHOOK
 * 
 * Instructions:
 * 1. Open Google Sheets (create a new sheet or use an existing one).
 * 2. In the menu, go to: Extensions > Apps Script.
 * 3. Replace all code in the editor with this script.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Select type: 'Web app'.
 * 6. Set Description: 'Kurosahi Admission Form Receiver'.
 * 7. Set 'Execute as': 'Me' (your Google account).
 * 8. Set 'Who has access': 'Anyone' (IMPORTANT: Must be 'Anyone' so the website can submit data).
 * 9. Click 'Deploy' and copy the 'Web App URL'.
 * 10. Paste the Web App URL into app.js at GOOGLE_SHEET_URL.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // Check if headers exist, if not, create them
    var headers = [
      "Timestamp",
      "Application No",
      "Full Name",
      "Date of Birth",
      "Gender",
      "Father / Mother Name",
      "Mobile Number",
      "Email",
      "Address",
      "Selected Courses / Programs",
      "Preferred Batch Time",
      "Emergency Contact Name",
      "Emergency Relation",
      "Emergency Phone",
      "Medical Information",
      "Student Signature",
      "Instructor Signature",
      "Applicant Signature",
      "Parent Signature",
      "Declaration Accepted",
      "Submission Date"
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1a365d");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var courses = Array.isArray(data.courses) ? data.courses.join(", ") : (data.courses || "");
    var batches = Array.isArray(data.batches) ? data.batches.join(", ") : (data.batches || "");
    var appNo = data.appNo || ("KSA-" + Utilities.formatDate(new Date(), "GMT+5:30", "yyyyMMdd-HHmmss"));
    var timestamp = new Date();

    var newRow = [
      timestamp,
      appNo,
      data.fullName || "",
      data.dob || "",
      data.gender || "",
      data.parentName || "",
      data.mobile || "",
      data.email || "",
      data.address || "",
      courses,
      batches,
      data.emergencyName || "",
      data.emergencyRelation || "",
      data.emergencyPhone || "",
      data.medicalInfo || "None",
      data.studentSignature || "NO",
      data.instructorSignature || "NO",
      data.applicantSignature || "NO",
      data.parentSignature || "NO",
      data.declaration ? "YES" : "NO",
      data.submissionDate || Utilities.formatDate(new Date(), "GMT+5:30", "dd/MM/yyyy")
    ];

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "appNo": appNo, "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "academy": "Kurosahi Multi-Sport Academy Admission Service" }))
    .setMimeType(ContentService.MimeType.JSON);
}
