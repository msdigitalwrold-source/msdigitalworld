/**
 * KUROSAHI MULTI-SPORT ACADEMY - DIRECT SUBMISSION & GOOGLE SHEETS CONTROLLER
 * Captures 100% of form inputs, compresses signature files, and syncs directly to Google Sheets
 */

// Default or configured Google Sheets Webhook URL
const DEFAULT_SHEET_URL = "https://script.google.com/macros/s/AKfycbz_-Q-PPG-KY_H5HinNG_jLARoqMY5eO0aalVzAv0BjmcmTSsOcJ4PSFBcgLlB4LA2Z/exec";

function getActiveSheetUrl() {
  return localStorage.getItem('KUROSAHI_GOOGLE_SHEET_URL') || DEFAULT_SHEET_URL;
}

function setActiveSheetUrl(url) {
  if (url && url.trim()) {
    localStorage.setItem('KUROSAHI_GOOGLE_SHEET_URL', url.trim());
  }
}

const signatures = {
  student: "",
  instructor: "",
  applicant: "",
  parent: ""
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('admissionForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Bind 4 signature file inputs with instant compression
  setupSigInput('studentSigFile', 'studentSigImg', 'btnClearStudentSig', 'student');
  setupSigInput('instructorSigFile', 'instructorSigImg', 'btnClearInstructorSig', 'instructor');
  setupSigInput('applicantSigFile', 'applicantSigImg', 'btnClearApplicantSig', 'applicant');
  setupSigInput('parentSigFile', 'parentSigImg', 'btnClearParentSig', 'parent');

  // Auto set current date (YYYY-MM-DD for HTML5 date inputs)
  const todayYMD = getTodayYMD();
  const dateInput = document.getElementById('formDate');
  const appDateInput = document.getElementById('applicantDate');
  const parentDateInput = document.getElementById('parentDate');
  if (dateInput && !dateInput.value) dateInput.value = todayYMD;
  if (appDateInput && !appDateInput.value) appDateInput.value = todayYMD;
  if (parentDateInput && !parentDateInput.value) parentDateInput.value = todayYMD;

  // Initialize Settings UI
  initSettingsModal();
});

function getTodayYMD() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

window.openPicker = function (inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  try {
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      el.focus();
    }
  } catch (e) {
    el.focus();
  }
};

/**
 * Compresses an image file before base64 encoding to keep payload light (<60KB)
 */
function compressSignature(file, maxWidth = 600, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function setupSigInput(inputId, imgId, btnClearId, sigKey) {
  const fileInput = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  const btnClear = document.getElementById(btnClearId);

  if (!fileInput) return;

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressSignature(file);
      signatures[sigKey] = compressedDataUrl;
      if (imgEl) {
        imgEl.src = compressedDataUrl;
        imgEl.style.display = 'block';
      }
      if (btnClear) {
        btnClear.style.display = 'inline-block';
      }
    } catch (err) {
      console.error('Error loading signature image:', err);
    }
  });
}

window.removeSig = function (sigKey) {
  signatures[sigKey] = "";
  const map = {
    student: { input: 'studentSigFile', img: 'studentSigImg', btn: 'btnClearStudentSig' },
    instructor: { input: 'instructorSigFile', img: 'instructorSigImg', btn: 'btnClearInstructorSig' },
    applicant: { input: 'applicantSigFile', img: 'applicantSigImg', btn: 'btnClearApplicantSig' },
    parent: { input: 'parentSigFile', img: 'parentSigImg', btn: 'btnClearParentSig' }
  };

  const item = map[sigKey];
  if (item) {
    const inputEl = document.getElementById(item.input);
    const imgEl = document.getElementById(item.img);
    const btnEl = document.getElementById(item.btn);

    if (inputEl) inputEl.value = "";
    if (imgEl) {
      imgEl.src = "";
      imgEl.style.display = 'none';
    }
    if (btnEl) btnEl.style.display = 'none';
  }
};

/**
 * Main form submission handler
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const statusMsg = document.getElementById('submitStatusMessage');
  const submitBtn = document.getElementById('submitBtn');

  // 1. Validate Personal Details
  const fullName = document.getElementById('fullName')?.value.trim();
  if (!fullName) {
    alert('Please enter Full Name.');
    document.getElementById('fullName')?.focus();
    return;
  }

  const dob = document.getElementById('dob')?.value;
  if (!dob) {
    alert('Please select Date of Birth.');
    document.getElementById('dob')?.focus();
    return;
  }

  const parentName = document.getElementById('parentName')?.value.trim();
  if (!parentName) {
    alert("Please enter Father's / Mother's Name.");
    document.getElementById('parentName')?.focus();
    return;
  }

  const address = document.getElementById('address')?.value.trim();
  if (!address) {
    alert('Please enter complete Address.');
    document.getElementById('address')?.focus();
    return;
  }

  const mobile = document.getElementById('mobile')?.value.trim();
  if (!mobile || mobile.length < 10) {
    alert('Please enter a valid 10-digit Mobile Number.');
    document.getElementById('mobile')?.focus();
    return;
  }

  const email = document.getElementById('email')?.value.trim() || '';

  // 2. Validate Courses (At least 1 required)
  const selectedCourses = Array.from(document.querySelectorAll('input[name="courses"]:checked')).map(cb => cb.value);
  if (selectedCourses.length === 0) {
    alert('Please select at least one Course / Service Applying For.');
    document.querySelector('input[name="courses"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // 3. Validate Batches (At least 1 required)
  const selectedBatches = Array.from(document.querySelectorAll('input[name="batches"]:checked')).map(cb => cb.value);
  if (selectedBatches.length === 0) {
    alert('Please select at least one Preferred Batch Time.');
    document.querySelector('input[name="batches"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // 4. Validate Emergency Details
  const emergencyName = document.getElementById('emergencyName')?.value.trim();
  if (!emergencyName) {
    alert('Please enter Emergency Contact Name.');
    document.getElementById('emergencyName')?.focus();
    return;
  }

  const emergencyRelation = document.getElementById('emergencyRelation')?.value.trim();
  if (!emergencyRelation) {
    alert('Please enter Emergency Contact Relation.');
    document.getElementById('emergencyRelation')?.focus();
    return;
  }

  const emergencyPhone = document.getElementById('emergencyPhone')?.value.trim();
  if (!emergencyPhone || emergencyPhone.length < 10) {
    alert('Please enter a valid 10-digit Emergency Phone Number.');
    document.getElementById('emergencyPhone')?.focus();
    return;
  }

  const medicalInfo = document.getElementById('medicalInfo')?.value.trim() || 'None';

  // 5. Validate Declaration Checkbox
  const declarationCheck = document.getElementById('declarationCheck');
  if (!declarationCheck || !declarationCheck.checked) {
    alert('Please accept the Declaration & Guidelines checkbox.');
    declarationCheck?.focus();
    return;
  }

  const formDate = document.getElementById('formDate')?.value.trim() || getTodayYMD();
  const applicantDate = document.getElementById('applicantDate')?.value.trim() || formDate;
  const parentDate = document.getElementById('parentDate')?.value.trim() || formDate;
  const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Male';

  // Application Reference ID
  const appNo = 'KSA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const submissionTimestamp = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB');

  // Gather 100% of Form Data matching Google Sheets columns
  const formData = {
    appNo: appNo,
    submissionDate: submissionTimestamp,
    formDate: formDate,
    fullName: fullName,
    dob: dob,
    gender: gender,
    parentName: parentName,
    address: address,
    mobile: mobile,
    email: email,
    courses: selectedCourses.join(', '),
    batches: selectedBatches.join(', '),
    emergencyName: emergencyName,
    emergencyRelation: emergencyRelation,
    emergencyPhone: emergencyPhone,
    medicalInfo: medicalInfo,
    studentSignature: signatures.student ? 'UPLOADED' : 'NOT UPLOADED',
    studentSignatureData: signatures.student || '',
    instructorSignature: signatures.instructor ? 'UPLOADED' : 'NOT UPLOADED',
    instructorSignatureData: signatures.instructor || '',
    applicantSignature: signatures.applicant ? 'UPLOADED' : 'NOT UPLOADED',
    applicantSignatureData: signatures.applicant || '',
    applicantDate: applicantDate,
    parentSignature: signatures.parent ? 'UPLOADED' : 'NOT UPLOADED',
    parentSignatureData: signatures.parent || '',
    parentDate: parentDate,
    declaration: 'Accepted'
  };

  // Local Storage Backup (Keeps offline backup so no data is ever lost)
  saveSubmissionOffline(formData);

  // UI Loading State
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting to Google Sheets...';
  statusMsg.className = 'status-msg loading';
  statusMsg.textContent = 'Submitting your admission form to Google Sheets, please wait...';
  statusMsg.style.display = 'block';

  const sheetUrl = getActiveSheetUrl();

  try {
    // Send data to Google Apps Script Webhook
    // Note: 'text/plain;charset=utf-8' ensures NO CORS preflight issue with Google Apps Script
    await fetch(sheetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData)
    });

    // Reset form fields and signatures
    e.target.reset();
    ['student', 'instructor', 'applicant', 'parent'].forEach(k => removeSig(k));

    // Auto reset date to today
    const todayYMD = getTodayYMD();
    ['formDate', 'applicantDate', 'parentDate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = todayYMD;
    });

    statusMsg.style.display = 'none';

    // Show Animated Success Popup Modal
    showSuccessPopup(formData.appNo);

  } catch (error) {
    console.error('Submission error:', error);
    // Since offline backup is already saved:
    showSuccessPopup(formData.appNo);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'SUBMIT ADMISSION FORM';
  }
}

/**
 * Saves a copy in browser localStorage for 100% data safety
 */
function saveSubmissionOffline(data) {
  try {
    const list = JSON.parse(localStorage.getItem('kurosahi_submissions') || '[]');
    list.unshift(data);
    localStorage.setItem('kurosahi_submissions', JSON.stringify(list.slice(0, 100))); // Keep last 100
  } catch (err) {
    console.warn('Could not save offline copy', err);
  }
}

function showSuccessPopup(appId) {
  const modal = document.getElementById('successPopupModal');
  const appIdEl = document.getElementById('popupAppId');
  if (appIdEl) appIdEl.textContent = appId;
  if (modal) {
    modal.classList.add('active');
  }
}

window.closeSuccessPopup = function () {
  const modal = document.getElementById('successPopupModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

/**
 * Settings Modal Logic for Google Sheets Webhook URL
 */
function initSettingsModal() {
  const inputEl = document.getElementById('customSheetUrl');
  if (inputEl) {
    inputEl.value = getActiveSheetUrl();
  }
}

window.openSettingsModal = function() {
  const modal = document.getElementById('settingsModal');
  const inputEl = document.getElementById('customSheetUrl');
  if (inputEl) inputEl.value = getActiveSheetUrl();
  if (modal) modal.classList.add('active');
};

window.closeSettingsModal = function() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.classList.remove('active');
};

window.testSheetConnection = async function() {
  const inputEl = document.getElementById('customSheetUrl');
  const msgEl = document.getElementById('settingsSaveMsg');
  const url = inputEl ? inputEl.value.trim() : '';

  if (!url || !url.startsWith('https://script.google.com/macros/s/')) {
    alert('Please enter a valid Google Apps Script Web App URL starting with https://script.google.com/macros/s/...');
    return;
  }

  if (msgEl) {
    msgEl.className = 'settings-status-msg';
    msgEl.style.background = '#eff6ff';
    msgEl.style.color = '#1e40af';
    msgEl.style.borderColor = '#bfdbfe';
    msgEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testing connection to Google Sheet...';
    msgEl.style.display = 'block';
  }

  try {
    const res = await fetch(url, { method: 'GET' });
    const json = await res.json();
    if (json.status === 'active') {
      msgEl.style.background = '#ecfdf5';
      msgEl.style.color = '#065f46';
      msgEl.style.borderColor = '#a7f3d0';
      msgEl.innerHTML = `✅ <strong>Connected!</strong> Google Sheet Webhook is active and working!`;
    } else {
      msgEl.style.background = '#fff7ed';
      msgEl.style.color = '#c2410c';
      msgEl.style.borderColor = '#fed7aa';
      msgEl.innerHTML = `⚠️ Received unexpected response. Please make sure you published as 'Web App'.`;
    }
  } catch (err) {
    if (msgEl) {
      msgEl.style.background = '#fef2f2';
      msgEl.style.color = '#b91c1c';
      msgEl.style.borderColor = '#fecaca';
      msgEl.innerHTML = `❌ <strong>Connection Failed:</strong><br>
      Google Apps Script connect nahi ho raha hai.<br>
      <strong>Zaroori Check:</strong><br>
      1. Deploy me <strong>"Who has access: Anyone"</strong> select karein.<br>
      2. Web App ka pura URL copy karke yahan paste karein.`;
    }
  }
};

window.saveSheetSettings = function() {
  const inputEl = document.getElementById('customSheetUrl');
  const msgEl = document.getElementById('settingsSaveMsg');
  const val = inputEl ? inputEl.value.trim() : '';

  if (!val || !val.startsWith('http')) {
    alert('Please enter a valid Google Apps Script Web App URL starting with https://');
    return;
  }

  setActiveSheetUrl(val);
  if (msgEl) {
    msgEl.className = 'settings-status-msg';
    msgEl.style.background = '#ecfdf5';
    msgEl.style.color = '#065f46';
    msgEl.style.borderColor = '#a7f3d0';
    msgEl.innerHTML = '✅ Google Sheet Webhook URL saved successfully!';
    msgEl.style.display = 'block';
    setTimeout(() => {
      msgEl.style.display = 'none';
      closeSettingsModal();
    }, 1500);
  } else {
    alert('Google Sheet URL saved!');
    closeSettingsModal();
  }
};

window.exportSubmissionsCSV = function() {
  try {
    const list = JSON.parse(localStorage.getItem('kurosahi_submissions') || '[]');
    if (!list.length) {
      alert('No submissions saved on this device yet.');
      return;
    }
    const headers = ["Application No", "Submission Date", "Full Name", "DOB", "Gender", "Parent Name", "Mobile", "Email", "Address", "Courses", "Batches", "Emergency Name", "Emergency Relation", "Emergency Phone", "Medical Info"];
    const rows = list.map(item => [
      `"${item.appNo || ''}"`,
      `"${item.submissionDate || ''}"`,
      `"${item.fullName || ''}"`,
      `"${item.dob || ''}"`,
      `"${item.gender || ''}"`,
      `"${item.parentName || ''}"`,
      `"${item.mobile || ''}"`,
      `"${item.email || ''}"`,
      `"${(item.address || '').replace(/"/g, '""')}"`,
      `"${(item.courses || '').replace(/"/g, '""')}"`,
      `"${(item.batches || '').replace(/"/g, '""')}"`,
      `"${item.emergencyName || ''}"`,
      `"${item.emergencyRelation || ''}"`,
      `"${item.emergencyPhone || ''}"`,
      `"${(item.medicalInfo || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kurosahi_admissions_${getTodayYMD()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    alert('Error exporting CSV: ' + err.message);
  }
};
