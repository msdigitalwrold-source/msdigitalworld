/**
 * =========================================================================
 * KUROSAHI MULTI-SPORT ACADEMY - GOOGLE APPS SCRIPT WEBHOOK (NEAT & CLEAN V5)
 * =========================================================================
 * 
 * ✅ SHEET ID: 1bvajaEJxrldSE6z3TyLc1tleGeQAf3IGKjTHTirjuNM
 * 🎨 FEATURES: Executive Dark Navy Header, Auto-width columns, Centered IDs & Dates, Neat Grid
 */

var SPREADSHEET_ID = "1bvajaEJxrldSE6z3TyLc1tleGeQAf3IGKjTHTirjuNM";

var HEADERS = [
  "Date & Time",
  "Application ID",
  "Student Full Name",
  "Date of Birth",
  "Gender",
  "Father / Mother Name",
  "Mobile Number",
  "Email",
  "Address",
  "Selected Courses",
  "Preferred Batches",
  "Emergency Contact Name",
  "Emergency Relation",
  "Emergency Phone",
  "Medical Info",
  "Student Signature",
  "Instructor Signature",
  "Applicant Signature",
  "Applicant Date",
  "Parent Signature",
  "Parent Date",
  "Declaration",
  "Form Date",
  "Status"
];

/**
 * 🧹 1-CLICK CLEANUP & FORMATTING:
 * Upar dropdown me 'formatSheetClean' select karke '▶ Run' karein!
 * Yeh aapki Google Sheet ko 1 second me bilkul Neat, Clean aur Professional bana dega!
 */
function formatSheetClean() {
  var sheet = getTargetSheet();
  if (!sheet) {
    Logger.log("❌ Sheet not found!");
    return;
  }

  // 1. Set Row 1 Headers
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  headerRange.setBackground("#1e3a8a"); // Deep Navy Blue
  headerRange.setFontColor("#ffffff"); // Crisp White
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // 2. Format existing data rows
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment("middle");

    // Set row heights
    for (var r = 2; r <= lastRow; r++) {
      sheet.setRowHeight(r, 32);
    }

    // Set borders (neat light gray grid)
    dataRange.setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);

    // Centered columns: Date & Time(1), App ID(2), DOB(4), Gender(5), Mobile(7), Emergency Phone(14), Dates(19,21,23), Status(24)
    [1, 2, 4, 5, 7, 14, 19, 21, 22, 23, 24].forEach(function (col) {
      sheet.getRange(2, col, lastRow - 1, 1).setHorizontalAlignment("center");
    });

    // Left align text columns: Names, Address, Courses, Batches
    [3, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20].forEach(function (col) {
      sheet.getRange(2, col, lastRow - 1, 1).setHorizontalAlignment("left");
    });

    // Highlight App ID Column with subtle badge color
    sheet.getRange(2, 2, lastRow - 1, 1).setFontWeight("bold").setFontColor("#1e3a8a").setBackground("#eff6ff");
  }

  // 3. Auto resize all columns
  for (var c = 1; c <= HEADERS.length; c++) {
    sheet.autoResizeColumn(c);
    var currentWidth = sheet.getColumnWidth(c);
    // Minimum comfortable width
    if (currentWidth < 120) {
      sheet.setColumnWidth(c, 130);
    }
  }

  Logger.log("🎉 SUCCESS: Aapki Google Sheet bilkul Neat & Clean format ho chuki hai!");
}

/**
 * Gets sheet reference
 */
function getTargetSheet() {
  var doc = null;
  try {
    doc = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) { }

  if (!doc && SPREADSHEET_ID) {
    doc = SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  if (doc) {
    return doc.getSheetByName("Sheet1") || doc.getActiveSheet() || doc.getSheets()[0];
  }
  return null;
}

/**
 * Handles incoming form submissions from the website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = getTargetSheet();
    if (!sheet) {
      throw new Error("Could not find Google Sheet.");
    }

    // Auto format header if not already formatted
    var firstCell = "";
    try {
      firstCell = sheet.getRange(1, 1).getValue().toString().trim();
    } catch (err) { }

    if (sheet.getLastRow() === 0 || firstCell !== HEADERS[0]) {
      formatSheetClean();
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var appNo = data.appNo || ("KSA-" + Utilities.formatDate(new Date(), "GMT+5:30", "yyyyMMdd-HHmmss"));
    var timestamp = Utilities.formatDate(new Date(), "GMT+5:30", "yyyy-MM-dd HH:mm:ss");

    var studentSigLink = handleSignature(data.studentSignatureData, appNo + "_Student_Sig");
    var instructorSigLink = handleSignature(data.instructorSignatureData, appNo + "_Instructor_Sig");
    var applicantSigLink = handleSignature(data.applicantSignatureData, appNo + "_Applicant_Sig");
    var parentSigLink = handleSignature(data.parentSignatureData, appNo + "_Parent_Sig");

    if (!studentSigLink) studentSigLink = data.studentSignature || "Not Uploaded";
    if (!instructorSigLink) instructorSigLink = data.instructorSignature || "Not Uploaded";
    if (!applicantSigLink) applicantSigLink = data.applicantSignature || "Not Uploaded";
    if (!parentSigLink) parentSigLink = data.parentSignature || "Not Uploaded";

    var courses = Array.isArray(data.courses) ? data.courses.join(", ") : (data.courses || "");
    var batches = Array.isArray(data.batches) ? data.batches.join(", ") : (data.batches || "");

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
      studentSigLink,
      instructorSigLink,
      applicantSigLink,
      data.applicantDate || "",
      parentSigLink,
      data.parentDate || "",
      data.declaration || "Accepted",
      data.formDate || "",
      "Confirmed"
    ];

    sheet.appendRow(newRow);
    var addedRowNum = sheet.getLastRow();

    // Style the newly added row neatly
    var addedRange = sheet.getRange(addedRowNum, 1, 1, HEADERS.length);
    addedRange.setFontSize(10);
    addedRange.setVerticalAlignment("middle");
    addedRange.setBorder(true, true, true, true, true, true, "#cbd5e1", SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(addedRowNum, 32);

    // Center specific columns
    [1, 2, 4, 5, 7, 14, 19, 21, 22, 23, 24].forEach(function (col) {
      sheet.getRange(addedRowNum, col).setHorizontalAlignment("center");
    });
    // Left align text columns
    [3, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20].forEach(function (col) {
      sheet.getRange(addedRowNum, col).setHorizontalAlignment("left");
    });
    // App ID style
    sheet.getRange(addedRowNum, 2).setFontWeight("bold").setFontColor("#1e3a8a").setBackground("#eff6ff");

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Form saved successfully to Google Sheet",
        appNo: appNo,
        row: addedRowNum
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles Signature images in Google Drive
 */
function handleSignature(base64Data, filename) {
  if (!base64Data || typeof base64Data !== "string" || !base64Data.startsWith("data:image")) {
    return "";
  }
  try {
    var parts = base64Data.split(",");
    if (parts.length < 2) return "";
    var contentType = parts[0].split(":")[1].split(";")[0];
    var decoded = Utilities.base64Decode(parts[1]);
    var ext = contentType.indexOf("png") !== -1 ? ".png" : ".jpg";
    var blob = Utilities.newBlob(decoded, contentType, filename + ext);

    var folders = DriveApp.getFoldersByName("Kurosahi Academy Signatures");
    var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("Kurosahi Academy Signatures");
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return "Uploaded (Local)";
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      service: "Kurosahi Live Webhook",
      sheetId: SPREADSHEET_ID,
      time: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
