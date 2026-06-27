export type Language = 'en' | 'mr';

export const translations = {
  en: {
    // App
    app_name: 'Shri Sai Square',
    app_tagline: 'Apartment Maintenance',

    // Auth - Login
    sign_in: 'Sign In',
    sign_in_subtitle: 'Sign in to your account',
    email_address: 'Email Address',
    email_placeholder: 'you@example.com',
    password: 'Password',
    password_placeholder: 'Enter your password',
    forgot_password: 'Forgot Password?',
    no_account: "Don't have an account?",
    create_account: 'Create Account',
    admin_login: 'Admin login',

    // Auth - Signup
    create_resident_account: 'Create your resident account',
    full_name: 'Full Name',
    full_name_placeholder: 'e.g. Rahul Sharma',
    flat_unit: 'Flat / Unit Number',
    flat_unit_placeholder: 'e.g. 101',
    password_min: 'Min. 6 characters',
    already_account: 'Already have an account? Sign In',

    // Auth - Reset
    reset_password: 'Reset Password',
    reset_subtitle: 'Enter your email to receive a password reset link',
    send_reset_email: 'Send Reset Email',
    back_to_sign_in: 'Back to Sign In',

    // Header
    admin_portal: 'Admin Portal',
    flat_label: 'Flat',

    // Bottom Nav
    dashboard: 'Dashboard',
    income: 'Income',
    expenses: 'Expenses',
    reports: 'Reports',
    members: 'Members',
    my_home: 'My Home',

    // Dashboard
    society_balance: 'Society Balance',
    total_received: 'Total Received',
    total_expenses: 'Total Expenses',
    residents: 'residents',
    tap_to_manage: 'tap to manage',
    net_balance: 'net balance',
    payments_count: 'payments',
    entries_count: 'entries',

    // Member Home - Profile Card
    welcome_back: 'Welcome back',
    total_paid_stat: 'Total Paid',
    this_year: 'This Year',
    pending_stat: 'Pending',
    awaiting_stat: 'Awaiting',

    // Member Home - Payment Due
    next_maintenance_due: 'Next Maintenance Due',
    for_month: 'For',
    pay_now_btn: 'Pay Now — Scan QR Code',

    // Member Home - History
    payment_history: 'Payment History',
    total_label: 'Total',
    no_payments_yet: 'No payments recorded yet.',
    payments_appear_here: 'Payments made or recorded by admin will appear here.',
    paid_on: 'Paid on',
    submitted_on: 'Submitted on',
    approved_badge: 'Approved',
    pending_approval_badge: 'Pending Approval',
    view_btn: 'View',
    download_pdf: 'Download PDF',
    utr_label: 'UTR',
    admin_verifying: 'Admin is verifying your UTR. Receipt will appear here once approved.',

    // Admin - Income
    record_payment: 'Record Payment',
    pending_approvals: 'Pending Approvals',
    approve_receipt_btn: 'Approve & Issue Receipt',
    reject_btn: 'Reject',
    all_months: 'All Months',
    no_records: 'No approved records found.',
    utr_number: 'UTR Number',

    // Admin - Expenses
    add_expense: 'Add Expense',
    no_expenses: 'No expenses found',
    total_expenses_label: 'Total Expenses',

    // Admin - Reports
    monthly_report: 'Monthly Report',
    no_data: 'No data available yet.',
    credit_entries: 'Credit Entries',
    expense_entries: 'Expense Entries',
    net_balance_label: 'Net Balance',
    hide_label: 'hide',
    details_label: 'details',

    // Admin - Members
    members_directory: 'Members Directory',
    add_member: 'Add Member',
    no_members: 'No members added yet.',

    // Modals - Record Offline Payment
    record_offline_payment: 'Record Offline Payment',
    select_flat: 'Select Flat',
    select_flat_placeholder: 'Select a flat...',
    amount_field: 'Amount (₹)',
    for_month_field: 'For Month',
    payment_date: 'Payment Date',
    save_record: 'Save Record',
    cancel_btn: 'Cancel',

    // Modals - Add Expense
    record_new_expense: 'Record New Expense',
    category_field: 'Category',
    notes_field: 'Notes',
    notes_placeholder: 'e.g. Replaced lobby lights, 4 bulbs at ₹200 each',

    // Modals - Add Member
    add_new_member: 'Add New Member',
    member_name_field: 'Resident Name',
    member_unit_field: 'Flat / Unit',
    member_email_field: 'Email Address',

    // QR Payment Modal
    maintenance_payment: 'Maintenance Payment',
    upi_secure: 'UPI',
    scan_instruction: "Open GPay / PhonePe / Paytm → Scan QR → Pay ₹",
    scan_instruction_suffix: '',
    upi_id_label: 'UPI ID',
    ive_paid_btn: "I've Paid — Enter UTR Number",
    enter_utr_title: 'Enter UTR Number',
    utr_instruction: 'After paying via UPI, open your app (GPay / PhonePe) → transaction details → copy the UTR / Transaction ID (12 characters).',
    amount_paid_label: 'Amount Paid',
    utr_input_placeholder: 'e.g. 509812345678',
    admin_verify_note: 'Admin will verify this UTR and approve your payment.',
    submit_payment_btn: 'Submit Payment',
    back_btn: 'Back',
    cancel_payment_btn: 'Cancel',

    // Receipt Modal
    payment_receipt_title: 'Payment Receipt',
    apartment_full_name: 'Shri Sai Square Apartment',
    receipt_no_label: 'Receipt No.',
    date_label: 'Date',
    received_from_label: 'Received From',
    unit_label: 'Flat / Unit',
    for_month_receipt: 'For Month',
    total_paid_receipt: 'Total Paid',
    close_btn: 'Close',

    // Toasts / messages
    logged_in_admin: 'Logged in as Admin',
    record_deleted: 'Record deleted.',
    expense_deleted: 'Expense deleted.',
    member_removed: 'Member removed.',
    expense_saved: 'Expense recorded successfully!',
    member_added: 'Member added successfully!',

    // Complaints
    complaints: 'Complaints',
    my_complaints: 'My Complaints',
    add_complaint: 'Add Complaint',
    complaint_title: 'Subject',
    complaint_desc: 'Description',
    complaint_title_ph: 'e.g. Water leakage in corridor',
    complaint_desc_ph: 'Describe the issue in detail...',
    submit_complaint: 'Submit Complaint',
    no_complaints: 'No complaints yet.',
    complaint_open: 'Open',
    complaint_inprogress: 'In Progress',
    complaint_resolved: 'Resolved',
    complaint_submitted: 'Complaint submitted successfully!',
    completion_date: 'Completion Date',

    // Notices
    notices: 'Notices',
    add_notice: 'Post Notice',
    notice_text: 'Notice / Announcement',
    notice_ph: 'Type announcement here...',
    save_notice: 'Post Notice',
    no_notices: 'No notices posted yet.',
    notice_deleted: 'Notice deleted.',
    notice_added: 'Notice posted!',

    // Months (display only — data stored in English)
    month_jan: 'January',
    month_feb: 'February',
    month_mar: 'March',
    month_apr: 'April',
    month_may: 'May',
    month_jun: 'June',
    month_jul: 'July',
    month_aug: 'August',
    month_sep: 'September',
    month_oct: 'October',
    month_nov: 'November',
    month_dec: 'December',

    // Expense Categories (display only)
    cat_electricity: 'Electricity',
    cat_water: 'Water Bill',
    cat_lift: 'Lift Maintenance',
    cat_cleaning: 'Cleaning/Sweeper',
    cat_security: 'Security',
    cat_repairs: 'Repairs & Plumbing',
    cat_misc: 'Miscellaneous',
  },

  mr: {
    // App
    app_name: 'श्री साई स्क्वेअर',
    app_tagline: 'अपार्टमेंट देखभाल',

    // Auth - Login
    sign_in: 'साइन इन',
    sign_in_subtitle: 'तुमच्या खात्यात साइन इन करा',
    email_address: 'ईमेल पत्ता',
    email_placeholder: 'tumcha@email.com',
    password: 'पासवर्ड',
    password_placeholder: 'पासवर्ड टाका',
    forgot_password: 'पासवर्ड विसरलात?',
    no_account: 'खाते नाही?',
    create_account: 'खाते तयार करा',
    admin_login: 'प्रशासक लॉगिन',

    // Auth - Signup
    create_resident_account: 'तुमचे रहिवासी खाते तयार करा',
    full_name: 'पूर्ण नाव',
    full_name_placeholder: 'उदा. राहुल शर्मा',
    flat_unit: 'सदनिका / युनिट नंबर',
    flat_unit_placeholder: 'उदा. 101',
    password_min: 'किमान ६ अक्षरे',
    already_account: 'आधीच खाते आहे? साइन इन करा',

    // Auth - Reset
    reset_password: 'पासवर्ड रीसेट करा',
    reset_subtitle: 'पासवर्ड रीसेट लिंक मिळवण्यासाठी ईमेल टाका',
    send_reset_email: 'रीसेट ईमेल पाठवा',
    back_to_sign_in: 'साइन इनकडे परत',

    // Header
    admin_portal: 'प्रशासक पोर्टल',
    flat_label: 'सदनिका',

    // Bottom Nav
    dashboard: 'डॅशबोर्ड',
    income: 'उत्पन्न',
    expenses: 'खर्च',
    reports: 'अहवाल',
    members: 'सदस्य',
    my_home: 'माझे घर',

    // Dashboard
    society_balance: 'सोसायटी शिल्लक',
    total_received: 'एकूण जमा',
    total_expenses: 'एकूण खर्च',
    residents: 'रहिवासी',
    tap_to_manage: 'व्यवस्थापित करा',
    net_balance: 'निव्वळ शिल्लक',
    payments_count: 'पेमेंट',
    entries_count: 'नोंदी',

    // Member Home - Profile Card
    welcome_back: 'परत स्वागत',
    total_paid_stat: 'एकूण भरले',
    this_year: 'या वर्षी',
    pending_stat: 'बाकी',
    awaiting_stat: 'प्रतीक्षेत',

    // Member Home - Payment Due
    next_maintenance_due: 'पुढील देखभाल बाकी',
    for_month: 'साठी',
    pay_now_btn: 'आत्ता पेमेंट करा — QR कोड स्कॅन करा',

    // Member Home - History
    payment_history: 'पेमेंट इतिहास',
    total_label: 'एकूण',
    no_payments_yet: 'अद्याप कोणतेही पेमेंट नोंदवले नाही.',
    payments_appear_here: 'प्रशासकाने नोंदवलेले पेमेंट येथे दिसतील.',
    paid_on: 'भरले',
    submitted_on: 'सबमिट केले',
    approved_badge: 'मंजूर',
    pending_approval_badge: 'मंजुरी प्रतीक्षेत',
    view_btn: 'पहा',
    download_pdf: 'PDF डाउनलोड',
    utr_label: 'UTR',
    admin_verifying: 'प्रशासक UTR तपासत आहे. मंजूर झाल्यावर पावती येथे दिसेल.',

    // Admin - Income
    record_payment: 'पेमेंट नोंद करा',
    pending_approvals: 'प्रतीक्षेत मंजुरी',
    approve_receipt_btn: 'मंजूर करा व पावती द्या',
    reject_btn: 'नाकारा',
    all_months: 'सर्व महिने',
    no_records: 'कोणतेही मंजूर रेकॉर्ड नाही.',
    utr_number: 'UTR नंबर',

    // Admin - Expenses
    add_expense: 'खर्च जोडा',
    no_expenses: 'कोणताही खर्च सापडला नाही',
    total_expenses_label: 'एकूण खर्च',

    // Admin - Reports
    monthly_report: 'मासिक अहवाल',
    no_data: 'अद्याप कोणताही डेटा नाही.',
    credit_entries: 'जमा नोंदी',
    expense_entries: 'खर्च नोंदी',
    net_balance_label: 'निव्वळ शिल्लक',
    hide_label: 'लपवा',
    details_label: 'तपशील',

    // Admin - Members
    members_directory: 'सदस्य यादी',
    add_member: 'सदस्य जोडा',
    no_members: 'अद्याप कोणतेही सदस्य नाही.',

    // Modals - Record Offline Payment
    record_offline_payment: 'ऑफलाइन पेमेंट नोंद करा',
    select_flat: 'सदनिका निवडा',
    select_flat_placeholder: 'सदनिका निवडा...',
    amount_field: 'रक्कम (₹)',
    for_month_field: 'महिन्यासाठी',
    payment_date: 'पेमेंट तारीख',
    save_record: 'नोंद जतन करा',
    cancel_btn: 'रद्द करा',

    // Modals - Add Expense
    record_new_expense: 'नवीन खर्च नोंद करा',
    category_field: 'श्रेणी',
    notes_field: 'टिपा',
    notes_placeholder: 'उदा. लॉबीचे दिवे बदलले, ४ बल्ब ₹२०० प्रत्येक',

    // Modals - Add Member
    add_new_member: 'नवीन सदस्य जोडा',
    member_name_field: 'रहिवाशाचे नाव',
    member_unit_field: 'सदनिका / युनिट',
    member_email_field: 'ईमेल पत्ता',

    // QR Payment Modal
    maintenance_payment: 'देखभाल पेमेंट',
    upi_secure: 'UPI',
    scan_instruction: 'GPay / PhonePe / Paytm उघडा → QR स्कॅन करा → ₹',
    scan_instruction_suffix: ' भरा',
    upi_id_label: 'UPI ID',
    ive_paid_btn: 'मी पेमेंट केले — UTR नंबर टाका',
    enter_utr_title: 'UTR नंबर टाका',
    utr_instruction: 'UPI द्वारे पेमेंट केल्यानंतर, तुमचे अ‍ॅप उघडा (GPay / PhonePe) → व्यवहार तपशील → UTR / Transaction ID कॉपी करा (१२ अक्षरे).',
    amount_paid_label: 'भरलेली रक्कम',
    utr_input_placeholder: 'उदा. 509812345678',
    admin_verify_note: 'प्रशासक हे UTR तपासेल आणि पेमेंट मंजूर करेल.',
    submit_payment_btn: 'पेमेंट सबमिट करा',
    back_btn: 'मागे',
    cancel_payment_btn: 'रद्द करा',

    // Receipt Modal
    payment_receipt_title: 'पेमेंट पावती',
    apartment_full_name: 'श्री साई स्क्वेअर अपार्टमेंट',
    receipt_no_label: 'पावती क्र.',
    date_label: 'तारीख',
    received_from_label: 'कडून जमा',
    unit_label: 'सदनिका / युनिट',
    for_month_receipt: 'महिन्यासाठी',
    total_paid_receipt: 'एकूण भरले',
    close_btn: 'बंद करा',

    // Toasts / messages
    logged_in_admin: 'प्रशासक म्हणून साइन इन',
    record_deleted: 'नोंद हटवली.',
    expense_deleted: 'खर्च हटवला.',
    member_removed: 'सदस्य काढला.',
    expense_saved: 'खर्च यशस्वीरित्या नोंदवला!',
    member_added: 'सदस्य यशस्वीरित्या जोडला!',

    // Complaints
    complaints: 'तक्रारी',
    my_complaints: 'माझ्या तक्रारी',
    add_complaint: 'तक्रार नोंदवा',
    complaint_title: 'विषय',
    complaint_desc: 'वर्णन',
    complaint_title_ph: 'उदा. कॉरिडॉरमध्ये पाण्याची गळती',
    complaint_desc_ph: 'समस्येचे तपशीलवार वर्णन करा...',
    submit_complaint: 'तक्रार सादर करा',
    no_complaints: 'अद्याप कोणतीही तक्रार नाही.',
    complaint_open: 'उघडी',
    complaint_inprogress: 'प्रगतीत',
    complaint_resolved: 'निराकरण झाले',
    complaint_submitted: 'तक्रार यशस्वीरित्या सादर केली!',
    completion_date: 'पूर्णता तारीख',

    // Notices
    notices: 'सूचना',
    add_notice: 'सूचना पोस्ट करा',
    notice_text: 'सूचना / घोषणा',
    notice_ph: 'येथे घोषणा लिहा...',
    save_notice: 'सूचना पोस्ट करा',
    no_notices: 'अद्याप कोणत्याही सूचना नाहीत.',
    notice_deleted: 'सूचना हटवली.',
    notice_added: 'सूचना पोस्ट केली!',

    // Months (display only)
    month_jan: 'जानेवारी',
    month_feb: 'फेब्रुवारी',
    month_mar: 'मार्च',
    month_apr: 'एप्रिल',
    month_may: 'मे',
    month_jun: 'जून',
    month_jul: 'जुलै',
    month_aug: 'ऑगस्ट',
    month_sep: 'सप्टेंबर',
    month_oct: 'ऑक्टोबर',
    month_nov: 'नोव्हेंबर',
    month_dec: 'डिसेंबर',

    // Expense Categories (display only)
    cat_electricity: 'वीज',
    cat_water: 'पाणी बिल',
    cat_lift: 'लिफ्ट देखभाल',
    cat_cleaning: 'स्वच्छता',
    cat_security: 'सुरक्षा',
    cat_repairs: 'दुरुस्ती',
    cat_misc: 'इतर',
  },
} as const;

// Translate a "Month Year" string like "January 2026" for display
const monthKeys: Record<string, string> = {
  January: 'month_jan', February: 'month_feb', March: 'month_mar',
  April: 'month_apr', May: 'month_may', June: 'month_jun',
  July: 'month_jul', August: 'month_aug', September: 'month_sep',
  October: 'month_oct', November: 'month_nov', December: 'month_dec',
};

export const displayMonth = (month: string, lang: Language): string => {
  if (lang === 'en') return month;
  const parts = month.split(' ');
  if (parts.length === 2) {
    const key = monthKeys[parts[0]];
    if (key) return `${translations.mr[key as keyof typeof translations.mr]} ${parts[1]}`;
  }
  return month;
};

// Translate an expense category for display
const categoryMap: Record<string, string> = {
  'Electricity': 'cat_electricity',
  'Water Bill': 'cat_water',
  'Lift Maintenance': 'cat_lift',
  'Cleaning/Sweeper': 'cat_cleaning',
  'Security': 'cat_security',
  'Repairs & Plumbing': 'cat_repairs',
  'Miscellaneous': 'cat_misc',
};

export const displayCategory = (cat: string, lang: Language): string => {
  if (lang === 'en') return cat;
  const key = categoryMap[cat];
  return key ? (translations.mr[key as keyof typeof translations.mr] as string) : cat;
};
