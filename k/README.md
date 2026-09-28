# KUROSAHI MULTI-SPORT ACADEMY - OFFICIAL WEBSITE & ADMISSION SYSTEM

A modern, responsive web application for **Kurosahi Multi-Sport Academy** (Bhubaneswar, Odisha) with real-time Google Sheets synchronization, digital signature capture, offline database backup, admin management dashboard, and printable admission receipts.

---

## 🌟 Key Features

1. **Complete Academy Showcase**:
   - Covers all **20 sports & disciplines**: Karate, Pencak Silat, MMA, Wrestling, Kickboxing, Boxing, Muay Thai, Chess, Badminton, Shooting, Zumba, Kr Fit Versal, Archery, Weight Gain/Loss, Physical Training for Govt Jobs, Yoga, Meditation, Nutrition, Child Development.
   - Interactive batch schedule selector for all morning, afternoon, and evening shifts.
   - Full student guidelines & code of conduct accordions matching official rules.
   - Dual-branch details: IRC Village Center & Chandrasekharpur Center with direct contact numbers and Google Map links.

2. **Official Multi-Step Admission Form**:
   - **Step 1**: Personal Details (Full name, DOB, Gender, Parent/Guardian name, WhatsApp Mobile, Email, Address).
   - **Step 2**: Course Selection & Preferred Batch timing.
   - **Step 3**: Emergency Contact (Name, Relation, Phone) & Medical History notes.
   - **Step 4**: Code of Conduct declaration & Touchscreen / Mouse **Digital Signature Pad**.

3. **Google Sheets Live Integration**:
   - Ready-to-use Google Apps Script backend ([google_apps_script.js](file:///c:/Users/MS/Downloads/k/google_apps_script.js)).
   - Automatically appends rows to your Google Sheet in real time.
   - Creates headers, timestamps, and unique Application IDs (`KSA-YYYY-XXXX`).

4. **Printable Admission Receipt & ID Badge**:
   - Formatted to replicate the official academy paper document.
   - Generates instant printable PDF or downloadable PNG with student details, selected sports, official stamp, and applicant signature.

5. **Built-in Admin Dashboard**:
   - Local database backup: submissions are saved locally even if offline or before setting up Google Sheets.
   - Filter & search records by name, application number, or phone.
   - 1-Click Export to **CSV / Excel**.
   - "Sync All to Google Sheet" button to batch upload offline submissions.

---

## 🚀 How to Run the Website

### Option 1: Double-Click
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Live Server / Dev Server
Run a lightweight HTTP server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js npx
npx serve .
```
Then visit `http://localhost:3000`.

---

## 📊 How to Connect to Google Sheets (2 Minutes)

1. Open [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name the sheet: `Kurosahi Academy Admissions`.
3. In the top menu, click **Extensions** &rarr; **Apps Script**.
4. Delete any code in the script editor and copy-paste the entire contents of [google_apps_script.js](file:///c:/Users/MS/Downloads/k/google_apps_script.js).
5. In the top right, click **Deploy** &rarr; **New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set:
   - **Description**: `Kurosahi Admissions Webhook`
   - **Execute as**: `Me (<your_email@gmail.com>)`
   - **Who has access**: `Anyone` *(Crucial so the form can submit data)*
8. Click **Deploy**, authorize permissions when prompted, and copy the **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).
9. Open the website, click the **"Google Sheets Setup"** button in the top bar, paste your Web App URL, and click **"Save Webhook URL"**!

---

## 📁 File Structure

```text
k/
├── assets/
│   ├── logo.jpg                 # Official academy crest logo
│   └── hero.jpg                 # Hero background training center banner
├── index.html                   # Main web page & admission portal
├── style.css                    # Design system, glassmorphism & responsive CSS
├── app.js                       # Form logic, canvas signature & Google Sheets sync
├── google_apps_script.js        # Google Apps Script code for Google Sheets
└── README.md                    # Setup documentation
```
