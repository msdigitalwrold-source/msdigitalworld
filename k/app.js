/**
 * KUROSAHI MULTI-SPORT ACADEMY - DIRECT SUBMISSION CONTROLLER
 * Strict field validation, 4 individual signature uploads & animated popup
 */

// >>> CONNECTED LIVE GOOGLE SHEET WEB APP URL <<<
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz_-Q-PPG-KY_H5HinNG_jLARoqMY5eO0aalVzAv0BjmcmTSsOcJ4PSFBcgLlB4LA2Z/exec";

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

  // Bind 4 signature file inputs
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

function setupSigInput(inputId, imgId, btnClearId, sigKey) {
  const fileInput = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  const btnClear = document.getElementById(btnClearId);

  if (!fileInput) return;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      signatures[sigKey] = event.target.result;
      if (imgEl) {
        imgEl.src = event.target.result;
        imgEl.style.display = 'block';
      }
      if (btnClear) {
        btnClear.style.display = 'inline-block';
      }
    };
    reader.readAsDataURL(file);
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

  const email = document.getElementById('email')?.value.trim();

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

  // Gather Form Data
  const formData = {
    appNo: 'KSA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    submissionDate: formDate + ' ' + new Date().toLocaleTimeString('en-GB'),
    fullName: fullName,
    dob: dob,
    gender: document.querySelector('input[name="gender"]:checked')?.value || 'Male',
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
    instructorSignature: signatures.instructor ? 'UPLOADED' : 'NOT UPLOADED',
    applicantSignature: signatures.applicant ? 'UPLOADED' : 'NOT UPLOADED',
    parentSignature: signatures.parent ? 'UPLOADED' : 'NOT UPLOADED',
    declaration: 'Accepted'
  };

  // UI Loading State
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting form, please wait...';
  statusMsg.className = 'status-msg loading';
  statusMsg.textContent = 'Submitting form, please wait...';
  statusMsg.style.display = 'block';

  try {
    // Send directly to backend webhook
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
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
    statusMsg.className = 'status-msg error';
    statusMsg.innerHTML = `<strong>Error submitting form:</strong> Please check your internet connection and try again.`;
    statusMsg.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT ADMISSION FORM';
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
