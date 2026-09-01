/**
 * APNA TOUR & TRAVELS - ENTERPRISE MULTI-ROLE SYSTEM
 * Complete Business Operations Engine: Auth, User Portal, Reception Counter,
 * Master Admin Control (Expenses P&L, Driver Payroll, Fleet Expiry Watchdog, Rate Cards, CRM, Google Sheets)
 */

// Storage Keys
const USERS_KEY = 'apna_users_db_v4';
const BOOKINGS_KEY = 'apna_bookings_db_v4';
const FLEET_KEY = 'apna_fleet_db_v4';
const PACKAGES_KEY = 'apna_packages_db_v4';
const EXPENSES_KEY = 'apna_expenses_db_v4';
const PAYROLL_KEY = 'apna_payroll_db_v4';
const RATE_CARD_KEY = 'apna_rate_card_v4';
const SESSION_KEY = 'apna_current_session_v4';
const GSHEET_CONFIG_KEY = 'apna_gsheet_config_v4';

// Default Accounts
const defaultUsers = [
    { id: 'usr-1', name: 'Rajesh Sharma', phone: '9876543210', email: 'user@apna.com', password: '123', role: 'user' },
    { id: 'usr-2', name: 'Farzana Nishi', phone: '9811223344', email: 'reception@apna.com', password: '123', role: 'reception' },
    { id: 'usr-3', name: 'Master Admin', phone: '9999988888', email: 'admin@apna.com', password: '123', role: 'admin' }
];

// Default Tour Packages
const defaultPackages = [
    { id: 'pkg-1', name: 'Goa Beach Special', duration: '4 Days, 3 Nights', price: 16500, vehicle: 'Premium SUV (Innova Crysta)', rating: '4.9', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&auto=format&fit=crop&q=80' },
    { id: 'pkg-2', name: 'Shimla & Manali Tour', duration: '5 Days, 4 Nights', price: 22500, vehicle: 'SUV (Ertiga / Triber)', rating: '4.8', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&auto=format&fit=crop&q=80' },
    { id: 'pkg-3', name: 'Jaipur & Agra Golden', duration: '3 Days, 2 Nights', price: 12200, vehicle: 'Sedan (Dzire / Etios)', rating: '4.7', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&auto=format&fit=crop&q=80' },
    { id: 'pkg-4', name: 'Kashmir Paradise Valley', duration: '6 Days, 5 Nights', price: 34000, vehicle: 'Premium SUV (Innova Crysta)', rating: '4.9', img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&auto=format&fit=crop&q=80' },
    { id: 'pkg-5', name: 'Haridwar & Rishikesh', duration: '2 Days, 1 Night', price: 7500, vehicle: 'Sedan (Dzire / Etios)', rating: '4.8', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&auto=format&fit=crop&q=80' },
    { id: 'pkg-6', name: 'Delhi Full Day City Tour', duration: '1 Day (8 Hr / 80 Km)', price: 2800, vehicle: 'Sedan (Dzire / Etios)', rating: '4.9', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop&q=80' }
];

// Default Fleet
const defaultFleet = [
    { id: 'drv-1', name: 'Ramesh Singh', phone: '9876500001', vehicle: 'Innova Crysta', carNo: 'DL-1Z-9876', fuel: 'Diesel / 7 Seats', insurance: '2027-05-15', fitness: '2027-08-20', status: 'Available' },
    { id: 'drv-2', name: 'Satish Kumar', phone: '9876500002', vehicle: 'Swift Dzire', carNo: 'DL-1T-4321', fuel: 'CNG / 4 Seats', insurance: '2026-11-30', fitness: '2027-02-14', status: 'On Trip' },
    { id: 'drv-3', name: 'Vipin Sharma', phone: '9876500003', vehicle: 'Maruti Ertiga', carNo: 'DL-1Y-5544', fuel: 'Diesel / 6 Seats', insurance: '2027-04-10', fitness: '2027-09-05', status: 'Available' },
    { id: 'drv-4', name: 'Kuldeep Yadav', phone: '9876500004', vehicle: 'Tempo Traveller (17 Seater)', carNo: 'DL-1V-7788', fuel: 'Diesel / 17 Seats', insurance: '2026-10-15', fitness: '2026-12-01', status: 'Available' }
];

// Default Bookings
const defaultBookings = [
    {
        id: 'TT-2026-0001',
        createdAt: '2026-09-01T10:30:00',
        custName: 'Rajesh Sharma',
        custPhone: '9876543210',
        custEmail: 'user@apna.com',
        serviceType: 'Outstation Round-Trip',
        pickupLocation: 'Hotel Taj Palace, Sardar Patel Marg',
        dropLocation: 'Jaipur - Amer Fort (3 Days Tour)',
        pickupDateTime: '2026-09-02T06:00',
        returnDateTime: '2026-09-04T21:00',
        vehicleType: 'Premium SUV (Innova Crysta)',
        driverAssigned: 'Ramesh Singh (DL-1Z-9876)',
        passengerCount: 4,
        totalFare: 14500,
        advancePaid: 3000,
        balanceDue: 11500,
        paymentMode: 'UPI / QR Code',
        bookingStatus: 'Confirmed'
    },
    {
        id: 'TT-2026-0002',
        createdAt: '2026-09-01T11:15:00',
        custName: 'Amit Verma',
        custPhone: '9811223344',
        custEmail: 'amit@gmail.com',
        serviceType: 'Local Sightseeing (8Hr/80Km)',
        pickupLocation: 'Aerocity Hotel Pride Plaza',
        dropLocation: 'Delhi Full Day City Sightseeing Tour',
        pickupDateTime: '2026-09-01T14:00',
        returnDateTime: '2026-09-01T22:30',
        vehicleType: 'Sedan (Dzire / Etios)',
        driverAssigned: 'Satish Kumar (DL-1T-4321)',
        passengerCount: 2,
        totalFare: 2800,
        advancePaid: 2800,
        balanceDue: 0,
        paymentMode: 'Cash',
        bookingStatus: 'Active / On Trip'
    }
];

// Default Expenses (Kharcha)
const defaultExpenses = [
    { id: 'exp-1', bookingId: 'TT-2026-0001', date: '2026-09-01', category: 'Fuel (Diesel / CNG)', details: 'Diesel filling 45L @ HPCL', amount: 4100, recordedBy: 'Admin' },
    { id: 'exp-2', bookingId: 'TT-2026-0001', date: '2026-09-01', category: 'Fastag / Toll Plaza', details: 'Delhi-Jaipur Expressway Tolls', amount: 850, recordedBy: 'Admin' },
    { id: 'exp-3', bookingId: 'TT-2026-0001', date: '2026-09-01', category: 'Driver Allowance (Bata)', details: 'Driver 3 Days DA @ 400/day', amount: 1200, recordedBy: 'Reception' },
    { id: 'exp-4', bookingId: 'TT-2026-0002', date: '2026-09-01', category: 'Fuel (Diesel / CNG)', details: 'CNG gas filling', amount: 650, recordedBy: 'Reception' }
];

// Default Driver Payroll
const defaultPayroll = [
    { driverId: 'drv-1', driverName: 'Ramesh Singh', phone: '9876500001', vehicle: 'Innova Crysta', totalTrips: 5, earnedBata: 4500, settled: 3000, pendingPayout: 1500 },
    { driverId: 'drv-2', driverName: 'Satish Kumar', phone: '9876500002', vehicle: 'Swift Dzire', totalTrips: 8, earnedBata: 3200, settled: 3200, pendingPayout: 0 },
    { driverId: 'drv-3', driverName: 'Vipin Sharma', phone: '9876500003', vehicle: 'Maruti Ertiga', totalTrips: 3, earnedBata: 2400, settled: 1200, pendingPayout: 1200 }
];

// Rate Card Settings
const defaultRateCard = {
    sedan: 12,
    suv: 16,
    innova: 20,
    tempo: 28,
    minKm: 250,
    driverDa: 400
};

// Global App State
let appState = {
    users: [],
    bookings: [],
    fleet: [],
    packages: [],
    expenses: [],
    payroll: [],
    rateCard: { ...defaultRateCard },
    currentUser: null,
    gsheetConfig: { webhookUrl: '', autoSync: true },
    calDate: new Date(),
    searchQuery: '',
    recFilter: 'all',
    activeBookingForInvoice: null,
    activeBookingForPayment: null
};

// =========================================================
// INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    loadDatabases();
    initClock();
    checkSession();
    setupAuthListeners();
    setupCoreListeners();
});

function loadDatabases() {
    appState.users = JSON.parse(localStorage.getItem(USERS_KEY)) || [...defaultUsers];
    appState.bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [...defaultBookings];
    appState.fleet = JSON.parse(localStorage.getItem(FLEET_KEY)) || [...defaultFleet];
    appState.packages = JSON.parse(localStorage.getItem(PACKAGES_KEY)) || [...defaultPackages];
    appState.expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY)) || [...defaultExpenses];
    appState.payroll = JSON.parse(localStorage.getItem(PAYROLL_KEY)) || [...defaultPayroll];
    appState.rateCard = JSON.parse(localStorage.getItem(RATE_CARD_KEY)) || { ...defaultRateCard };
    appState.gsheetConfig = JSON.parse(localStorage.getItem(GSHEET_CONFIG_KEY)) || { webhookUrl: '', autoSync: true };

    saveDatabases();
}

function saveDatabases() {
    localStorage.setItem(USERS_KEY, JSON.stringify(appState.users));
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(appState.bookings));
    localStorage.setItem(FLEET_KEY, JSON.stringify(appState.fleet));
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(appState.packages));
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(appState.expenses));
    localStorage.setItem(PAYROLL_KEY, JSON.stringify(appState.payroll));
    localStorage.setItem(RATE_CARD_KEY, JSON.stringify(appState.rateCard));
    localStorage.setItem(GSHEET_CONFIG_KEY, JSON.stringify(appState.gsheetConfig));
}

function initClock() {
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('liveClock');
        const dateEl = document.getElementById('liveDate');
        if (clockEl) clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (dateEl) dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
    }, 1000);
}

// =========================================================
// 1. AUTH & SESSION
// =========================================================
function checkSession() {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
        try {
            appState.currentUser = JSON.parse(session);
            launchPortal(appState.currentUser.role);
            return;
        } catch (e) {}
    }
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
}

window.switchAuthTab = function(tab) {
    const loginBtn = document.getElementById('tabLoginBtn');
    const signupBtn = document.getElementById('tabSignupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (tab === 'login') {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.style.display = 'flex';
        signupForm.style.display = 'none';
    } else {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.style.display = 'flex';
        loginForm.style.display = 'none';
    }
};

window.quickLogin = function(role) {
    let demoUser = appState.users.find(u => u.role === role);
    if (!demoUser) {
        demoUser = defaultUsers.find(u => u.role === role);
        appState.users.push(demoUser);
        saveDatabases();
    }
    setSession(demoUser);
};

function setSession(user) {
    appState.currentUser = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    showToast(`Welcome, ${user.name}! Logged in as ${user.role.toUpperCase()}`, 'success');
    launchPortal(user.role);
}

window.logoutSession = function() {
    localStorage.removeItem(SESSION_KEY);
    appState.currentUser = null;
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
    showToast('Signed out', 'info');
};

function setupAuthListeners() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const emailOrPhone = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value.trim();
        const role = document.getElementById('loginRole').value;

        const foundUser = appState.users.find(u => 
            (u.email.toLowerCase() === emailOrPhone || u.phone === emailOrPhone) &&
            u.password === password &&
            u.role === role
        );

        if (foundUser) {
            setSession(foundUser);
        } else {
            showToast('Invalid credentials! Try 1-Click Demo login buttons.', 'error');
        }
    });

    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const phone = document.getElementById('signupPhone').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const role = document.getElementById('signupRole').value;
        const password = document.getElementById('signupPassword').value.trim();

        const newUser = { id: `usr-${Date.now()}`, name, phone, email, role, password };
        appState.users.push(newUser);
        saveDatabases();
        setSession(newUser);
    });
}

// =========================================================
// 2. PORTAL ROUTING
// =========================================================
function launchPortal(role) {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';

    document.getElementById('topUserName').textContent = appState.currentUser.name;
    document.getElementById('topUserRole').textContent = role.toUpperCase();
    document.getElementById('headerRoleBadge').textContent = role.toUpperCase();
    document.getElementById('roleTitle').textContent = `${role.toUpperCase()} PORTAL`;
    document.getElementById('roleUserName').textContent = appState.currentUser.name;

    document.getElementById('portalUser').style.display = 'none';
    document.getElementById('portalReception').style.display = 'none';
    document.getElementById('portalAdmin').style.display = 'none';

    buildSidebar(role);

    if (role === 'user') {
        document.getElementById('portalUser').style.display = 'block';
        document.getElementById('topPageTitle').textContent = 'Traveler Hub';
        document.getElementById('userGreetingName').textContent = appState.currentUser.name.split(' ')[0];
        renderUserPortal();
    } else if (role === 'reception') {
        document.getElementById('portalReception').style.display = 'block';
        document.getElementById('topPageTitle').textContent = 'Reception Booking Desk';
        renderReceptionPortal();
    } else if (role === 'admin') {
        document.getElementById('portalAdmin').style.display = 'block';
        document.getElementById('topPageTitle').textContent = 'Master Admin Control Hub';
        renderAdminDashboard();
    }
}

function buildSidebar(role) {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';

    if (role === 'user') {
        nav.innerHTML = `
            <button class="nav-item active" onclick="userSwitchTab('user-packages')"><i class="fa-solid fa-compass"></i><span>Explore Tours</span></button>
            <button class="nav-item" onclick="userSwitchTab('user-book')"><i class="fa-solid fa-taxi"></i><span>Book Taxi / Cab</span></button>
            <button class="nav-item" onclick="userSwitchTab('user-trips')"><i class="fa-solid fa-ticket"></i><span>My Bookings</span></button>
        `;
    } else if (role === 'reception') {
        nav.innerHTML = `
            <button class="nav-item active" onclick="receptionSwitchTab('reception-dash')"><i class="fa-solid fa-table-cells-large"></i><span>Dashboard</span></button>
            <button class="nav-item" onclick="openWalkInBookingDialog()"><i class="fa-solid fa-circle-plus"></i><span>Walk-In Booking</span></button>
            <button class="nav-item" onclick="receptionSwitchTab('reception-queue')"><i class="fa-solid fa-route"></i><span>Booking Queue</span></button>
            <button class="nav-item" onclick="openGSheetConfigModal()"><i class="fa-solid fa-table"></i><span>Google Sheet Sync</span></button>
        `;
    } else if (role === 'admin') {
        nav.innerHTML = `
            <button class="nav-item active" onclick="adminSwitchTab('admin-dash')"><i class="fa-solid fa-chart-pie"></i><span>Master Analytics</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-expenses')"><i class="fa-solid fa-gas-pump"></i><span>Trip Expenses (Kharcha)</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-payroll')"><i class="fa-solid fa-money-check-dollar"></i><span>Driver Payroll &amp; DA</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-fleet')"><i class="fa-solid fa-taxi"></i><span>Fleet &amp; Garage</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-packages')"><i class="fa-solid fa-map-location-dot"></i><span>Tour Packages</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-rate-card')"><i class="fa-solid fa-tags"></i><span>Rate Card Matrix</span></button>
            <button class="nav-item" onclick="adminSwitchTab('admin-crm')"><i class="fa-solid fa-users"></i><span>Customers &amp; Staff</span></button>
            <button class="nav-item" onclick="openGSheetConfigModal()"><i class="fa-solid fa-table"></i><span>Google Sheets Sync</span></button>
        `;
    }
}

// =========================================================
// 3. USER PORTAL
// =========================================================
window.userSwitchTab = function(tab) {
    document.querySelectorAll('.user-sub-view').forEach(v => v.style.display = 'none');
    if (tab === 'user-packages') document.getElementById('userViewPackages').style.display = 'block';
    else if (tab === 'user-book') document.getElementById('userViewBookForm').style.display = 'block';
    else if (tab === 'user-trips') {
        document.getElementById('userViewMyTrips').style.display = 'block';
        renderUserMyTrips();
    }
};

function renderUserPortal() {
    const grid = document.getElementById('userPackagesGrid');
    grid.innerHTML = '';
    appState.packages.forEach(pkg => {
        const div = document.createElement('div');
        div.className = 'pkg-card';
        div.onclick = () => {
            userSwitchTab('user-book');
            document.getElementById('userTripType').value = 'Custom Tour Package';
            document.getElementById('userDropLoc').value = `${pkg.name} (${pkg.duration})`;
            document.getElementById('userVehicleType').value = pkg.vehicle;
            document.getElementById('userFareEstimated').value = pkg.price;
            document.getElementById('userAdvanceAmount').value = Math.round(pkg.price * 0.2);
            showToast(`Selected "${pkg.name}"!`, 'info');
        };
        div.innerHTML = `
            <div class="pkg-img-wrap">
                <img src="${pkg.img}" alt="${pkg.name}">
                <div class="pkg-rating"><i class="fa-solid fa-star text-amber"></i> ${pkg.rating}</div>
            </div>
            <div class="pkg-details">
                <h4 class="pkg-name">${pkg.name}</h4>
                <span class="pkg-duration">${pkg.duration}</span>
                <div class="pkg-bottom">
                    <span class="pkg-price font-mono">₹${pkg.price.toLocaleString('en-IN')}</span>
                    <button class="btn-pkg-action">Book Now</button>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });

    renderUserMyTrips();
}

function renderUserMyTrips() {
    const user = appState.currentUser;
    const myBookings = appState.bookings.filter(b => b.custPhone === user.phone || b.custEmail === user.email || b.custName === user.name);
    document.getElementById('userMyTripsCount').textContent = myBookings.length;

    const tbody = document.getElementById('userTripsTableBody');
    tbody.innerHTML = '';
    if (myBookings.length === 0) {
        document.getElementById('userTripsEmpty').style.display = 'block';
        return;
    }
    document.getElementById('userTripsEmpty').style.display = 'none';

    myBookings.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong class="font-mono text-primary">${b.id}</strong></td>
            <td><strong>${escapeHtml(b.dropLocation)}</strong><br><small class="text-muted">From: ${escapeHtml(b.pickupLocation)}</small></td>
            <td>${escapeHtml(b.vehicleType.split('(')[0])}</td>
            <td>${b.pickupDateTime ? new Date(b.pickupDateTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Flexible'}</td>
            <td>
                <div class="font-mono font-bold">₹${b.totalFare.toLocaleString('en-IN')}</div>
                ${b.balanceDue > 0 ? `<small class="text-danger font-bold">Due: ₹${b.balanceDue.toLocaleString('en-IN')}</small>` : `<small class="text-success font-bold">Paid</small>`}
            </td>
            <td><span class="status-pill status-confirmed">${b.bookingStatus}</span></td>
            <td class="text-right"><button class="btn btn-primary btn-sm" onclick="openInvoiceModalById('${b.id}')"><i class="fa-solid fa-receipt"></i> Slip</button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.autoCalculateUserFare = function() {
    const vType = document.getElementById('userVehicleType').value;
    const rc = appState.rateCard;
    let baseRate = 4500;
    if (vType.includes('Sedan')) baseRate = rc.sedan * rc.minKm;
    else if (vType.includes('Ertiga')) baseRate = rc.suv * rc.minKm;
    else if (vType.includes('Innova')) baseRate = rc.innova * rc.minKm;
    else if (vType.includes('Tempo')) baseRate = rc.tempo * rc.minKm;

    document.getElementById('userFareEstimated').value = baseRate;
    document.getElementById('userAdvanceAmount').value = Math.round(baseRate * 0.25);
};

// =========================================================
// 4. RECEPTION PORTAL
// =========================================================
window.receptionSwitchTab = function(tab) {
    if (tab === 'reception-queue') document.getElementById('receptionQueueSection').scrollIntoView({ behavior: 'smooth' });
};

function renderReceptionPortal() {
    const grid = document.getElementById('receptionPackagesGrid');
    grid.innerHTML = '';
    appState.packages.slice(0, 3).forEach(pkg => {
        const div = document.createElement('div');
        div.className = 'pkg-card';
        div.onclick = () => openWalkInBookingDialog(pkg);
        div.innerHTML = `
            <div class="pkg-img-wrap">
                <img src="${pkg.img}" alt="${pkg.name}">
                <div class="pkg-rating"><i class="fa-solid fa-star text-amber"></i> ${pkg.rating}</div>
            </div>
            <div class="pkg-details">
                <h4 class="pkg-name">${pkg.name}</h4>
                <span class="pkg-duration">${pkg.duration}</span>
                <div class="pkg-bottom">
                    <span class="pkg-price font-mono">₹${pkg.price.toLocaleString('en-IN')}</span>
                    <button class="btn-pkg-action">Book</button>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });

    renderReceptionQueue();
    renderCalendar();
}

function renderReceptionQueue() {
    const tbody = document.getElementById('receptionQueueTableBody');
    tbody.innerHTML = '';
    let list = [...appState.bookings];

    if (appState.recFilter === 'today') {
        const today = new Date().toISOString().slice(0, 10);
        list = list.filter(b => b.pickupDateTime && b.pickupDateTime.startsWith(today));
    } else if (appState.recFilter === 'pending-balance') {
        list = list.filter(b => b.balanceDue > 0);
    } else if (appState.recFilter !== 'all') {
        list = list.filter(b => b.bookingStatus === appState.recFilter);
    }

    document.getElementById('recQueueCountBadge').textContent = `${list.length} Total`;
    list.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong class="font-mono text-primary">${b.id}</strong></td>
            <td><strong>${escapeHtml(b.custName)}</strong><br><small><i class="fa-brands fa-whatsapp text-success"></i> ${escapeHtml(b.custPhone)}</small></td>
            <td><strong>${escapeHtml(b.dropLocation.substring(0, 20))}...</strong><br><small>${escapeHtml(b.vehicleType.split('(')[0])}</small></td>
            <td>${b.pickupDateTime ? new Date(b.pickupDateTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Immediate'}</td>
            <td>
                <div class="font-mono font-bold">₹${b.totalFare.toLocaleString('en-IN')}</div>
                ${b.balanceDue > 0 ? `<small class="text-danger font-bold">Due: ₹${b.balanceDue.toLocaleString('en-IN')}</small>` : `<small class="text-success font-bold">Paid</small>`}
            </td>
            <td><span class="status-pill status-confirmed">${b.bookingStatus}</span></td>
            <td class="text-right">
                <div class="table-actions">
                    <button class="btn-icon whatsapp" title="WhatsApp" onclick="sendWhatsAppSlip('${b.id}')"><i class="fa-brands fa-whatsapp"></i></button>
                    <button class="btn-icon print" title="Voucher" onclick="openInvoiceModalById('${b.id}')"><i class="fa-solid fa-print"></i></button>
                    ${b.balanceDue > 0 ? `<button class="btn-icon pay" title="Collect" onclick="openCollectBalanceModal('${b.id}')"><i class="fa-solid fa-indian-rupee-sign"></i></button>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    renderUpcomingTripsSide();
}

function renderUpcomingTripsSide() {
    const container = document.getElementById('recUpcomingTripsList');
    container.innerHTML = '';
    appState.bookings.slice(0, 3).forEach(b => {
        const div = document.createElement('div');
        div.className = 'trip-item-side';
        div.innerHTML = `
            <div class="trip-thumb"><img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=100&auto=format&fit=crop&q=80" alt="Trip"></div>
            <div class="trip-side-info">
                <h5 class="trip-side-title">${escapeHtml(b.dropLocation.substring(0, 22))}...</h5>
                <div class="trip-side-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${b.pickupDateTime ? new Date(b.pickupDateTime).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Today'}</span>
                    <span><i class="fa-solid fa-user"></i> ${escapeHtml(b.custName.split(' ')[0])}</span>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCalendar() {
    const d = appState.calDate;
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    document.getElementById('recCalMonthTitle').textContent = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

    const grid = document.getElementById('recCalDaysGrid');
    grid.innerHTML = '';
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }

    const today = new Date().getDate();
    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day';
        dayDiv.textContent = day;
        if (day === 16) dayDiv.classList.add('range-start');
        else if (day > 16 && day < 20) dayDiv.classList.add('active-range');
        else if (day === 20) dayDiv.classList.add('range-end');
        if (day === today && month === new Date().getMonth()) dayDiv.classList.add('today');
        grid.appendChild(dayDiv);
    }
}

// =========================================================
// 5. MASTER ADMIN CONTROL & MODULES
// =========================================================
window.adminSwitchTab = function(tab) {
    document.querySelectorAll('.admin-sub-view').forEach(v => v.style.display = 'none');
    if (tab === 'admin-dash') {
        document.getElementById('adminViewDashboard').style.display = 'block';
        renderAdminDashboard();
    } else if (tab === 'admin-expenses') {
        document.getElementById('adminViewExpenses').style.display = 'block';
        renderAdminExpenses();
    } else if (tab === 'admin-payroll') {
        document.getElementById('adminViewDriverPayroll').style.display = 'block';
        renderAdminPayroll();
    } else if (tab === 'admin-fleet') {
        document.getElementById('adminViewFleet').style.display = 'block';
        renderAdminFleet();
    } else if (tab === 'admin-packages') {
        document.getElementById('adminViewPackages').style.display = 'block';
        renderAdminPackages();
    } else if (tab === 'admin-rate-card') {
        document.getElementById('adminViewRateCard').style.display = 'block';
        renderAdminRateCard();
    } else if (tab === 'admin-crm') {
        document.getElementById('adminViewCRM').style.display = 'block';
        renderAdminCRM();
    }
};

function renderAdminDashboard() {
    let gross = 0, advance = 0, balance = 0;
    appState.bookings.forEach(b => {
        if (b.bookingStatus !== 'Cancelled') {
            gross += (b.totalFare || 0);
            advance += (b.advancePaid || 0);
            balance += (b.balanceDue || 0);
        }
    });

    let totalExp = 0;
    appState.expenses.forEach(e => totalExp += (e.amount || 0));
    const netProfit = Math.max(0, gross - totalExp);

    document.getElementById('admKpiGross').textContent = `₹${gross.toLocaleString('en-IN')}`;
    document.getElementById('admKpiAdvance').textContent = `₹${advance.toLocaleString('en-IN')}`;
    document.getElementById('admKpiBalance').textContent = `₹${balance.toLocaleString('en-IN')}`;
    document.getElementById('admKpiNetProfit').textContent = `₹${netProfit.toLocaleString('en-IN')}`;
    document.getElementById('admBookingsCountBadge').textContent = `${appState.bookings.length} Total`;

    const tbody = document.getElementById('admBookingsTableBody');
    tbody.innerHTML = '';
    appState.bookings.forEach((b, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong class="font-mono text-primary">${b.id}</strong></td>
            <td><strong>${escapeHtml(b.custName)}</strong><br><small>${escapeHtml(b.custPhone)}</small></td>
            <td><strong>${escapeHtml(b.dropLocation.substring(0, 20))}...</strong><br><small>${escapeHtml(b.vehicleType.split('(')[0])}</small></td>
            <td>${escapeHtml(b.driverAssigned || 'Not Assigned')}</td>
            <td class="font-mono font-bold">₹${b.totalFare.toLocaleString('en-IN')}</td>
            <td class="font-mono ${b.balanceDue > 0 ? 'text-danger font-bold' : 'text-success'}">₹${b.balanceDue.toLocaleString('en-IN')}</td>
            <td><span class="status-pill status-confirmed">${b.bookingStatus}</span></td>
            <td class="text-right">
                <div class="table-actions">
                    <button class="btn-icon print" title="Voucher" onclick="openInvoiceModalById('${b.id}')"><i class="fa-solid fa-receipt"></i></button>
                    <button class="btn-icon pay" title="Collect Balance" onclick="openCollectBalanceModal('${b.id}')"><i class="fa-solid fa-indian-rupee-sign"></i></button>
                    <button class="btn-icon" title="Delete" onclick="deleteBooking(${index})"><i class="fa-solid fa-trash text-danger"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 1. Trip Expenses (Kharcha)
function renderAdminExpenses() {
    let totalRevenue = 0;
    appState.bookings.forEach(b => { if (b.bookingStatus !== 'Cancelled') totalRevenue += b.totalFare; });

    let totalExp = 0;
    appState.expenses.forEach(e => totalExp += e.amount);
    const netProfit = Math.max(0, totalRevenue - totalExp);

    document.getElementById('expKpiRevenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
    document.getElementById('expKpiTotalExp').textContent = `₹${totalExp.toLocaleString('en-IN')}`;
    document.getElementById('expKpiProfit').textContent = `₹${netProfit.toLocaleString('en-IN')}`;

    const tbody = document.getElementById('admExpensesTableBody');
    tbody.innerHTML = '';
    appState.expenses.forEach((e, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong class="font-mono text-primary">${e.bookingId}</strong></td>
            <td>${e.date}</td>
            <td><span class="status-pill status-active">${e.category}</span></td>
            <td>${escapeHtml(e.details)}</td>
            <td class="font-mono font-bold text-danger">₹${e.amount.toLocaleString('en-IN')}</td>
            <td><small>${e.recordedBy}</small></td>
            <td class="text-right"><button class="btn btn-secondary btn-sm" onclick="removeExpense(${idx})"><i class="fa-solid fa-trash text-danger"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.openAddExpenseModal = function() {
    const sel = document.getElementById('expBookingSelect');
    sel.innerHTML = '';
    appState.bookings.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = `${b.id} - ${b.custName} (${b.dropLocation.substring(0, 20)})`;
        sel.appendChild(opt);
    });
    document.getElementById('addExpenseModal').style.display = 'flex';
};
window.closeAddExpenseModal = function() { document.getElementById('addExpenseModal').style.display = 'none'; };
window.submitAddExpense = function() {
    const bookingId = document.getElementById('expBookingSelect').value;
    const category = document.getElementById('expCategory').value;
    const amount = parseFloat(document.getElementById('expAmount').value) || 0;
    const details = document.getElementById('expNotes').value.trim() || category;

    if (amount <= 0) return;
    const newExp = {
        id: `exp-${Date.now()}`,
        bookingId,
        date: new Date().toISOString().slice(0, 10),
        category,
        details,
        amount,
        recordedBy: appState.currentUser.name
    };
    appState.expenses.unshift(newExp);
    saveDatabases();
    syncBookingToGoogleSheets(newExp);
    closeAddExpenseModal();
    renderAdminExpenses();
    showToast('Trip expense recorded!', 'success');
};
window.removeExpense = function(idx) {
    if (confirm('Delete expense record?')) {
        appState.expenses.splice(idx, 1);
        saveDatabases();
        renderAdminExpenses();
    }
};

// 2. Driver Payroll & Payout Settlement
function renderAdminPayroll() {
    const tbody = document.getElementById('admDriverPayrollTableBody');
    tbody.innerHTML = '';
    appState.payroll.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(p.driverName)}</strong></td>
            <td>${p.phone}</td>
            <td>${p.vehicle}</td>
            <td>${p.totalTrips} Trips</td>
            <td class="font-mono">₹${p.earnedBata.toLocaleString('en-IN')}</td>
            <td class="font-mono text-success">₹${p.settled.toLocaleString('en-IN')}</td>
            <td class="font-mono ${p.pendingPayout > 0 ? 'text-danger font-bold' : 'text-success'}">₹${p.pendingPayout.toLocaleString('en-IN')}</td>
            <td class="text-right">
                ${p.pendingPayout > 0 ? `<button class="btn btn-primary btn-sm" onclick="openSettleDriverModal('${p.driverId}')"><i class="fa-solid fa-money-bill-transfer"></i> Settle</button>` : `<span class="status-pill status-confirmed">Cleared</span>`}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.openSettleDriverModal = function(driverId) {
    const sel = document.getElementById('settleDriverSelect');
    sel.innerHTML = '';
    appState.payroll.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.driverId;
        opt.textContent = `${p.driverName} (Due: ₹${p.pendingPayout})`;
        if (driverId && p.driverId === driverId) opt.selected = true;
        sel.appendChild(opt);
    });
    autoLoadDriverPendingPayout();
    document.getElementById('settleDriverModal').style.display = 'flex';
};
window.closeSettleDriverModal = function() { document.getElementById('settleDriverModal').style.display = 'none'; };
window.autoLoadDriverPendingPayout = function() {
    const dId = document.getElementById('settleDriverSelect').value;
    const p = appState.payroll.find(item => item.driverId === dId);
    if (p) {
        document.getElementById('settleDueAmount').textContent = `₹${p.pendingPayout.toLocaleString('en-IN')}`;
        document.getElementById('settleAmount').value = p.pendingPayout;
    }
};
window.submitDriverSettlement = function() {
    const dId = document.getElementById('settleDriverSelect').value;
    const amount = parseFloat(document.getElementById('settleAmount').value) || 0;
    const p = appState.payroll.find(item => item.driverId === dId);
    if (!p || amount <= 0) return;

    p.settled += amount;
    p.pendingPayout = Math.max(0, p.earnedBata - p.settled);
    saveDatabases();
    closeSettleDriverModal();
    renderAdminPayroll();
    showToast(`Settled ₹${amount.toLocaleString('en-IN')} for ${p.driverName}!`, 'success');
};

// 3. Fleet & Garage Expiry Watchdog
function renderAdminFleet() {
    const tbody = document.getElementById('admFleetTableBody');
    tbody.innerHTML = '';
    appState.fleet.forEach((d, idx) => {
        const isInsExpired = new Date(d.insurance) < new Date();
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(d.vehicle)}</strong><br><span class="font-mono font-bold text-primary">${escapeHtml(d.carNo)}</span></td>
            <td><strong>${escapeHtml(d.name)}</strong><br><small>${d.phone}</small></td>
            <td>${d.fuel || 'Diesel / 7 Seats'}</td>
            <td>
                <span class="status-pill ${isInsExpired ? 'status-cancelled' : 'status-confirmed'}">${d.insurance}</span>
            </td>
            <td><span class="status-pill status-confirmed">${d.fitness}</span></td>
            <td><span class="status-pill ${d.status === 'Available' ? 'status-confirmed' : 'status-active'}">${d.status}</span></td>
            <td class="text-right"><button class="btn btn-secondary btn-sm" onclick="removeDriver(${idx})"><i class="fa-solid fa-trash text-danger"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}
window.openAddDriverModal = function() { document.getElementById('addDriverModal').style.display = 'flex'; };
window.closeAddDriverModal = function() { document.getElementById('addDriverModal').style.display = 'none'; };
window.submitAddDriver = function() {
    const name = document.getElementById('newDriverName').value.trim();
    const phone = document.getElementById('newDriverPhone').value.trim();
    const vehicle = document.getElementById('newDriverVehicle').value.trim();
    const carNo = document.getElementById('newDriverCarNo').value.trim();
    const fuel = document.getElementById('newDriverFuel').value.trim();
    const insurance = document.getElementById('newDriverInsurance').value;
    const fitness = document.getElementById('newDriverFitness').value;

    if (!name || !phone || !vehicle || !carNo) return;
    const newDrv = { id: `drv-${Date.now()}`, name, phone, vehicle, carNo, fuel, insurance, fitness, status: 'Available' };
    appState.fleet.push(newDrv);
    appState.payroll.push({ driverId: newDrv.id, driverName: name, phone, vehicle, totalTrips: 0, earnedBata: 0, settled: 0, pendingPayout: 0 });
    saveDatabases();
    closeAddDriverModal();
    renderAdminFleet();
    showToast('Vehicle & Chauffeur registered!', 'success');
};
window.removeDriver = function(idx) {
    if (confirm('Delete vehicle & driver from fleet?')) {
        appState.fleet.splice(idx, 1);
        saveDatabases();
        renderAdminFleet();
    }
};

// 4. Tour Packages
function renderAdminPackages() {
    const grid = document.getElementById('admPackagesGrid');
    grid.innerHTML = '';
    appState.packages.forEach((pkg, idx) => {
        const div = document.createElement('div');
        div.className = 'pkg-card';
        div.innerHTML = `
            <div class="pkg-img-wrap">
                <img src="${pkg.img}" alt="${pkg.name}">
                <div class="pkg-rating"><i class="fa-solid fa-star text-amber"></i> ${pkg.rating}</div>
            </div>
            <div class="pkg-details">
                <h4 class="pkg-name">${pkg.name}</h4>
                <span class="pkg-duration">${pkg.duration} • ${pkg.vehicle}</span>
                <div class="pkg-bottom">
                    <span class="pkg-price font-mono">₹${pkg.price.toLocaleString('en-IN')}</span>
                    <button class="btn btn-secondary btn-sm" onclick="removePackage(${idx})"><i class="fa-solid fa-trash text-danger"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });
}
window.openAddPackageModal = function() { document.getElementById('addPackageModal').style.display = 'flex'; };
window.closeAddPackageModal = function() { document.getElementById('addPackageModal').style.display = 'none'; };
window.submitAddPackage = function() {
    const name = document.getElementById('newPkgName').value.trim();
    const duration = document.getElementById('newPkgDuration').value.trim();
    const price = parseFloat(document.getElementById('newPkgPrice').value) || 0;
    const vehicle = document.getElementById('newPkgVehicle').value.trim();
    const img = document.getElementById('newPkgImg').value.trim() || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=80';

    if (!name || !duration || !price) return;
    appState.packages.push({ id: `pkg-${Date.now()}`, name, duration, price, vehicle, rating: '4.8', img });
    saveDatabases();
    closeAddPackageModal();
    renderAdminPackages();
    showToast('New tour package added!', 'success');
};
window.removePackage = function(idx) {
    if (confirm('Delete tour package?')) {
        appState.packages.splice(idx, 1);
        saveDatabases();
        renderAdminPackages();
    }
};

// 5. Rate Card Matrix
function renderAdminRateCard() {
    const rc = appState.rateCard;
    document.getElementById('rateSedan').value = rc.sedan;
    document.getElementById('rateSuv').value = rc.suv;
    document.getElementById('rateInnova').value = rc.innova;
    document.getElementById('rateTempo').value = rc.tempo;
    document.getElementById('rateMinKm').value = rc.minKm;
    document.getElementById('rateDriverDa').value = rc.driverDa;
}
window.saveRateCardSettings = function() {
    appState.rateCard = {
        sedan: parseFloat(document.getElementById('rateSedan').value) || 12,
        suv: parseFloat(document.getElementById('rateSuv').value) || 16,
        innova: parseFloat(document.getElementById('rateInnova').value) || 20,
        tempo: parseFloat(document.getElementById('rateTempo').value) || 28,
        minKm: parseFloat(document.getElementById('rateMinKm').value) || 250,
        driverDa: parseFloat(document.getElementById('rateDriverDa').value) || 400
    };
    saveDatabases();
    showToast('Rate Card & Per KM Matrix updated!', 'success');
};

// 6. CRM & Staff Access
function renderAdminCRM() {
    // Customers lifetime
    const customerMap = {};
    appState.bookings.forEach(b => {
        if (!customerMap[b.custPhone]) {
            customerMap[b.custPhone] = { name: b.custName, phone: b.custPhone, total: 0, count: 0 };
        }
        customerMap[b.custPhone].total += b.totalFare;
        customerMap[b.custPhone].count++;
    });

    const crmTbody = document.getElementById('admCrmTableBody');
    crmTbody.innerHTML = '';
    Object.values(customerMap).forEach(c => {
        const isVip = c.total >= 10000 || c.count >= 2;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(c.name)}</strong></td>
            <td><i class="fa-brands fa-whatsapp text-success"></i> ${escapeHtml(c.phone)}</td>
            <td>${c.count} Bookings</td>
            <td class="font-mono font-bold text-primary">₹${c.total.toLocaleString('en-IN')}</td>
            <td><span class="tag-pill ${isVip ? 'tag-vip' : 'tag-regular'}">${isVip ? '⭐ VIP Client' : 'Regular'}</span></td>
            <td class="text-right"><a href="https://api.whatsapp.com/send?phone=91${c.phone}" target="_blank" class="btn btn-success btn-sm"><i class="fa-brands fa-whatsapp"></i> Chat</a></td>
        `;
        crmTbody.appendChild(tr);
    });

    // Staff table
    const staffTbody = document.getElementById('admStaffTableBody');
    staffTbody.innerHTML = '';
    appState.users.filter(u => u.role !== 'user').forEach((s, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${escapeHtml(s.name)}</strong></td>
            <td>${escapeHtml(s.phone)}</td>
            <td>${escapeHtml(s.email)}</td>
            <td><span class="status-pill ${s.role === 'admin' ? 'status-active' : 'status-confirmed'}">${s.role.toUpperCase()}</span></td>
            <td class="text-right">
                ${s.role !== 'admin' ? `<button class="btn btn-secondary btn-sm" onclick="removeStaff('${s.id}')"><i class="fa-solid fa-trash text-danger"></i></button>` : `<small class="text-muted">Master</small>`}
            </td>
        `;
        staffTbody.appendChild(tr);
    });
}
window.openAddStaffModal = function() { document.getElementById('addStaffModal').style.display = 'flex'; };
window.closeAddStaffModal = function() { document.getElementById('addStaffModal').style.display = 'none'; };
window.submitAddStaff = function() {
    const name = document.getElementById('newStaffName').value.trim();
    const phone = document.getElementById('newStaffPhone').value.trim();
    const email = document.getElementById('newStaffEmail').value.trim();
    const password = document.getElementById('newStaffPass').value.trim();

    if (!name || !phone || !email || !password) return;
    appState.users.push({ id: `usr-${Date.now()}`, name, phone, email, password, role: 'reception' });
    saveDatabases();
    closeAddStaffModal();
    renderAdminCRM();
    showToast(`Staff account created for ${name}!`, 'success');
};
window.removeStaff = function(id) {
    if (confirm('Delete staff account?')) {
        appState.users = appState.users.filter(u => u.id !== id);
        saveDatabases();
        renderAdminCRM();
    }
};

window.deleteBooking = function(idx) {
    if (confirm('Delete this booking record?')) {
        appState.bookings.splice(idx, 1);
        saveDatabases();
        renderAdminDashboard();
        showToast('Booking deleted', 'info');
    }
};

// =========================================================
// 6. WALK-IN RECEPTION BOOKING MODAL
// =========================================================
window.openWalkInBookingDialog = function(pkg = null) {
    const driverSel = document.getElementById('walkDriverSelect');
    driverSel.innerHTML = '<option value="">Select Available Chauffeur...</option>';
    appState.fleet.forEach(d => {
        const opt = document.createElement('option');
        opt.value = `${d.name} (${d.carNo})`;
        opt.textContent = `${d.name} - ${d.vehicle} (${d.carNo})`;
        driverSel.appendChild(opt);
    });

    const now = new Date();
    now.setHours(now.getHours() + 2, 0, 0, 0);
    document.getElementById('walkPickupTime').value = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

    if (pkg) {
        document.getElementById('walkDropLoc').value = `${pkg.name} (${pkg.duration})`;
        document.getElementById('walkVehicleType').value = pkg.vehicle;
        document.getElementById('walkTotalFare').value = pkg.price;
        document.getElementById('walkAdvancePaid').value = Math.round(pkg.price * 0.25);
    }
    document.getElementById('walkInModal').style.display = 'flex';
};
window.closeWalkInBookingDialog = function() { document.getElementById('walkInModal').style.display = 'none'; };
window.submitWalkInBooking = function() {
    const custName = document.getElementById('walkCustName').value.trim();
    const custPhone = document.getElementById('walkCustPhone').value.trim();
    const serviceType = document.getElementById('walkServiceType').value;
    const pickupLocation = document.getElementById('walkPickupLoc').value.trim();
    const dropLocation = document.getElementById('walkDropLoc').value.trim();
    const pickupDateTime = document.getElementById('walkPickupTime').value;
    const vehicleType = document.getElementById('walkVehicleType').value;
    const driverAssigned = document.getElementById('walkDriverSelect').value || 'To be assigned';
    const totalFare = parseFloat(document.getElementById('walkTotalFare').value) || 0;
    const advancePaid = parseFloat(document.getElementById('walkAdvancePaid').value) || 0;
    const paymentMode = document.getElementById('walkPayMode').value;
    const balanceDue = Math.max(0, totalFare - advancePaid);

    if (!custName || !custPhone || !pickupLocation || !dropLocation) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    const newB = {
        id: `TT-2026-${String(appState.bookings.length + 1).padStart(4, '0')}`,
        createdAt: new Date().toISOString(),
        custName, custPhone, custEmail: '', serviceType, pickupLocation, dropLocation,
        pickupDateTime, returnDateTime: '', vehicleType, driverAssigned,
        passengerCount: 2, totalFare, advancePaid, balanceDue, paymentMode, bookingStatus: 'Confirmed'
    };

    appState.bookings.unshift(newB);

    // Record Driver Bata in payroll if assigned
    if (driverAssigned) {
        const p = appState.payroll.find(item => driverAssigned.includes(item.driverName));
        if (p) {
            p.totalTrips++;
            p.earnedBata += appState.rateCard.driverDa;
            p.pendingPayout += appState.rateCard.driverDa;
        }
    }

    saveDatabases();
    syncBookingToGoogleSheets(newB);
    closeWalkInBookingDialog();

    if (appState.currentUser.role === 'reception') renderReceptionPortal();
    else if (appState.currentUser.role === 'admin') renderAdminDashboard();

    showToast(`Booking ${newB.id} created!`, 'success');
    openInvoiceModal(newB);
};

// =========================================================
// 7. GOOGLE SHEETS SYNC ENGINE
// =========================================================
window.openGSheetConfigModal = function() {
    document.getElementById('cfgGSheetWebhook').value = appState.gsheetConfig.webhookUrl || '';
    document.getElementById('cfgAutoSync').value = appState.gsheetConfig.autoSync ? 'enabled' : 'manual';
    document.getElementById('gsheetModal').style.display = 'flex';
};
window.closeGSheetConfigModal = function() { document.getElementById('gsheetModal').style.display = 'none'; };
window.saveGSheetConfig = function() {
    appState.gsheetConfig.webhookUrl = document.getElementById('cfgGSheetWebhook').value.trim();
    appState.gsheetConfig.autoSync = document.getElementById('cfgAutoSync').value === 'enabled';
    saveDatabases();
    closeGSheetConfigModal();
    showToast('Google Sheets settings saved!', 'success');
};

async function syncBookingToGoogleSheets(data) {
    if (!appState.gsheetConfig.webhookUrl) return;
    try {
        await fetch(appState.gsheetConfig.webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        showToast('Auto-synced to Google Sheet!', 'success');
    } catch (e) {
        console.warn('Google Sheets sync notice:', e);
    }
}

window.exportBookingsCSV = function() {
    let csv = 'Slip ID,Date,Customer Name,Phone,Category,Pickup,Drop,Pickup Time,Vehicle,Driver,Total Fare,Advance,Balance Due,Status\n';
    appState.bookings.forEach(b => {
        csv += `"${b.id}","${b.createdAt}","${b.custName}","${b.custPhone}","${b.serviceType}","${b.pickupLocation}","${b.dropLocation}","${b.pickupDateTime}","${b.vehicleType}","${b.driverAssigned || ''}",${b.totalFare},${b.advancePaid},${b.balanceDue},"${b.bookingStatus}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Apna_Travels_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('CSV Exported for Google Sheets!', 'info');
};

window.exportBookingsJSON = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.bookings, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `Apna_Travels_Master_DB_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('JSON Master Backup Exported!', 'info');
};

// =========================================================
// 8. SHARED MODALS (INVOICE, PAYMENT, TOAST)
// =========================================================
function setupCoreListeners() {
    const userForm = document.getElementById('userBookingForm');
    if (userForm) {
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const total = parseFloat(document.getElementById('userFareEstimated').value) || 0;
            const advance = parseFloat(document.getElementById('userAdvanceAmount').value) || 0;
            const balance = Math.max(0, total - advance);

            const newBooking = {
                id: `TT-2026-${String(appState.bookings.length + 1).padStart(4, '0')}`,
                createdAt: new Date().toISOString(),
                custName: appState.currentUser.name,
                custPhone: appState.currentUser.phone,
                custEmail: appState.currentUser.email,
                serviceType: document.getElementById('userTripType').value,
                vehicleType: document.getElementById('userVehicleType').value,
                pickupLocation: document.getElementById('userPickupLoc').value.trim(),
                dropLocation: document.getElementById('userDropLoc').value.trim(),
                pickupDateTime: document.getElementById('userPickupTime').value,
                returnDateTime: document.getElementById('userReturnTime').value,
                passengerCount: parseInt(document.getElementById('userPax').value, 10) || 2,
                driverAssigned: 'To be assigned by reception',
                totalFare: total,
                advancePaid: advance,
                balanceDue: balance,
                paymentMode: document.getElementById('userPayMode').value,
                bookingStatus: 'Confirmed'
            };

            appState.bookings.unshift(newBooking);
            saveDatabases();
            syncBookingToGoogleSheets(newBooking);

            userSwitchTab('user-trips');
            showToast(`Booking ${newBooking.id} confirmed!`, 'success');
            openInvoiceModal(newBooking);
        });
    }

    document.getElementById('btnCloseInvoice').addEventListener('click', () => {
        document.getElementById('invoiceModal').style.display = 'none';
    });
    document.getElementById('btnClosePaymentModal').addEventListener('click', () => {
        document.getElementById('paymentModal').style.display = 'none';
    });
    document.getElementById('btnCancelPayment').addEventListener('click', () => {
        document.getElementById('paymentModal').style.display = 'none';
    });
    document.getElementById('btnSubmitBalancePay').addEventListener('click', processBalanceCollection);

    // Global search input
    document.getElementById('globalSearchInput').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        document.getElementById('btnSearchClear').style.display = q ? 'block' : 'none';
        if (appState.currentUser.role === 'reception') {
            appState.searchQuery = q;
            renderReceptionQueue();
        }
    });

    document.getElementById('btnSearchClear').addEventListener('click', () => {
        document.getElementById('globalSearchInput').value = '';
        document.getElementById('btnSearchClear').style.display = 'none';
        if (appState.currentUser.role === 'reception') {
            appState.searchQuery = '';
            renderReceptionQueue();
        }
    });

    // Default dates
    const userPickup = document.getElementById('userPickupTime');
    if (userPickup) {
        const now = new Date();
        now.setHours(now.getHours() + 2, 0, 0, 0);
        userPickup.value = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    }
}

window.openInvoiceModalById = function(bookingId) {
    const b = appState.bookings.find(item => item.id === bookingId);
    if (b) openInvoiceModal(b);
};

function openInvoiceModal(b) {
    appState.activeBookingForInvoice = b;
    document.getElementById('invSlipId').textContent = b.id;
    document.getElementById('invBookedDate').textContent = new Date(b.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    document.getElementById('invCustName').textContent = b.custName;
    document.getElementById('invCustPhone').textContent = `+91 ${b.custPhone}`;
    document.getElementById('invServiceType').textContent = b.serviceType;
    document.getElementById('invVehicleType').textContent = b.vehicleType;
    document.getElementById('invDriverInfo').textContent = b.driverAssigned || 'Assigned prior to pickup';
    document.getElementById('invPickupLoc').textContent = b.pickupLocation;
    document.getElementById('invDropLoc').textContent = b.dropLocation;
    document.getElementById('invPickupTime').textContent = b.pickupDateTime ? new Date(b.pickupDateTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Immediate';
    document.getElementById('invReturnTime').textContent = b.returnDateTime ? `Return: ${new Date(b.returnDateTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}` : 'One-way drop';
    document.getElementById('invTotalAmount').textContent = `₹${b.totalFare.toLocaleString('en-IN')}`;
    document.getElementById('invAdvanceAmount').textContent = `- ₹${b.advancePaid.toLocaleString('en-IN')}`;
    document.getElementById('invPayModeBadge').textContent = b.paymentMode;
    document.getElementById('invBalanceAmount').textContent = `₹${b.balanceDue.toLocaleString('en-IN')}`;

    document.getElementById('invoiceModal').style.display = 'flex';
}

window.openCollectBalanceModal = function(bookingId) {
    const b = appState.bookings.find(item => item.id === bookingId);
    if (!b) return;

    appState.activeBookingForPayment = b;
    document.getElementById('paySlipId').textContent = b.id;
    document.getElementById('payCustomerName').textContent = b.custName;
    document.getElementById('payDueDisplay').textContent = `₹${b.balanceDue.toLocaleString('en-IN')}`;
    document.getElementById('collectAmount').value = b.balanceDue;
    document.getElementById('collectAmount').max = b.balanceDue;
    document.getElementById('paymentModal').style.display = 'flex';
};

function processBalanceCollection() {
    if (!appState.activeBookingForPayment) return;
    const b = appState.activeBookingForPayment;
    const amount = parseFloat(document.getElementById('collectAmount').value) || 0;

    if (amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }

    b.advancePaid += amount;
    b.balanceDue = Math.max(0, b.totalFare - b.advancePaid);

    saveDatabases();
    syncBookingToGoogleSheets(b);
    document.getElementById('paymentModal').style.display = 'none';
    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} received for ${b.id}!`, 'success');

    if (appState.currentUser.role === 'reception') renderReceptionQueue();
    else if (appState.currentUser.role === 'admin') renderAdminDashboard();
}

window.sendWhatsAppSlip = function(bookingId) {
    const b = appState.bookings.find(item => item.id === bookingId);
    if (!b) return;

    const text = 
`🚖 *Apna Tour & Travels* - Booking Voucher
━━━━━━━━━━━━━━━━━━━━
Dear *${b.custName}*,
Your booking *${b.id}* is confirmed!

🚗 *Service:* ${b.serviceType}
🚘 *Vehicle:* ${b.vehicleType}
📍 *Pickup:* ${b.pickupLocation}
🏁 *Destination:* ${b.dropLocation}
⏰ *Time:* ${b.pickupDateTime ? new Date(b.pickupDateTime).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Flexible'}
👤 *Chauffeur:* ${b.driverAssigned || 'Will be shared 2 hrs prior'}

💰 *COMMERCIALS:*
• Total: ₹${b.totalFare.toLocaleString('en-IN')}
• Advance: ₹${b.advancePaid.toLocaleString('en-IN')}
• *Balance Due:* ₹${b.balanceDue.toLocaleString('en-IN')}
━━━━━━━━━━━━━━━━━━━━
📞 Helpline: +91 9876543210
Have a safe & comfortable journey!`;

    const cleanPhone = b.custPhone.replace(/[^0-9]/g, '');
    const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
};

function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${escapeHtml(msg)}</span>`;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
