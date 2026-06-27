import React, { useState, useMemo, useEffect } from 'react';

// --------------------------------------------------------------------------
// 🔥 FIREBASE INTEGRATION
// Make sure you ran `npm install firebase` in your terminal to clear errors!
// --------------------------------------------------------------------------
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, onSnapshot, collection, updateDoc } from 'firebase/firestore';
import QRCode from 'react-qr-code';
import { translations, displayMonth, displayCategory, type Language } from './i18n';

const firebaseConfig = {
  apiKey: "AIzaSyBX532itRFaHlLigG1d6K1Sn7uQJkRpTwc",
  authDomain: "shri-sai-square-apartment.firebaseapp.com",
  projectId: "shri-sai-square-apartment",
  storageBucket: "shri-sai-square-apartment.firebasestorage.app",
  messagingSenderId: "140360781215",
  appId: "1:140360781215:web:dc55d5e77160d2fd5601aa",
  measurementId: "G-1JSKKJCP3Q"
};

let app, auth, db;
try {
  // It will initialize real Firebase only after you replace the placeholder keys
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch(e) {
  console.warn("Firebase not configured yet.");
}
// --------------------------------------------------------------------------

const IconProps = { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
const Building = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M3 21h18M9 8h1m-1 4h1m-1 4h1m-1 4h1m4-12h1m-1 4h1m-1 4h1m-1 4h1m4-16v18a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const User = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
const Wallet = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>;
const Receipt = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
const Users = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;
const PlusCircle = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const Smartphone = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>;
const Trash2 = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>;
const CreditCard = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>;
const FileText = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>;
const Calendar = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const CheckCircle2 = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const LogOut = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>;
const BarChart2 = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>;
const Home = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const Filter = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const Bell = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const MessageSquare = ({size=24, className=""}) => <svg width={size} height={size} className={className} {...IconProps}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

const ADMIN_EMAIL = 'admin@shrisaisquare.com';
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const getCurrentMonthYear = () => {
  const now = new Date();
  return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
};
const APARTMENT_UPI_ID = 'shrisaisquareapartme.62811508@hdfcbank';
const APARTMENT_NAME = 'Shri+Sai+Square';

const EXPENSE_CATEGORIES = [
  'Electricity', 'Water Bill', 'Lift Maintenance', 'Cleaning/Sweeper', 
  'Security', 'Repairs & Plumbing', 'Miscellaneous'
];

const MONTHS = [
  'January 2026', 'February 2026', 'March 2026', 'April 2026', 
  'May 2026', 'June 2026', 'July 2026', 'August 2026', 
  'September 2026', 'October 2026', 'November 2026', 'December 2026'
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export default function ShriSaiSquareApp() {
  // Language
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('sss_lang') as Language) || 'en');
  const t = (key: keyof typeof translations.en): string => (translations[lang] as any)[key] ?? key;
  const dm = (month: string) => displayMonth(month, lang);
  const dc = (cat: string) => displayCategory(cat, lang);
  const changeLang = (l: Language) => { setLang(l); localStorage.setItem('sss_lang', l); };

  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login / Auth Flow States
  const [loginStep, setLoginStep] = useState<'login' | 'signup' | 'reset-password'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupUnit, setSignupUnit] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Data States (In-Memory for zero-dependency execution)
  const [members, setMembers] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  
  // UI States
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const [mForm, setMForm] = useState({ unit: '', amount: '500', month: getCurrentMonthYear(), date: new Date().toISOString().split('T')[0] });
  const [eForm, setEForm] = useState({ category: EXPENSE_CATEGORIES[0], amount: '', notes: '', date: new Date().toISOString().split('T')[0] });
  const [memberForm, setMemberForm] = useState({ unit: '', name: '', email: '' });
  const [paymentForm, setPaymentForm] = useState({ month: getCurrentMonthYear(), amount: '500' });
  const [utrInput, setUtrInput] = useState('');
  const [paymentStep, setPaymentStep] = useState<'qr' | 'utr'>('qr');
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintForm, setComplaintForm] = useState({ title: '', description: '' });
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ text: '' });

  // Log Firebase initialization status on mount
  useEffect(() => {
    console.log('[Auth] Firebase auth initialized:', !!auth);
    console.log('[Auth] Firebase db initialized:', !!db);
  }, []);

  // Load and sync maintenance records from Firestore
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(collection(db, 'maintenance'), (snapshot) => {
      const records = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      records.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMaintenanceRecords(records);
    }, (err) => console.error('Maintenance sync error:', err));
    return () => unsubscribe();
  }, []);

  // Load and sync expenses from Firestore
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(collection(db, 'expenses'), (snapshot) => {
      const records = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      records.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setExpenseRecords(records);
    }, (err) => console.error('Expenses sync error:', err));
    return () => unsubscribe();
  }, []);

  // Load and sync members (non-admin users) from Firestore
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() } as any))
        .filter(u => u.role !== 'admin')
        .sort((a, b) => (a.unit || '').localeCompare(b.unit || ''));
      setMembers(users);
    }, (err) => console.error('Members sync error:', err));
    return () => unsubscribe();
  }, []);

  // Load and sync complaints from Firestore
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(collection(db, 'complaints'), (snapshot) => {
      const records = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      records.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setComplaints(records);
    }, (err) => console.error('Complaints sync error:', err));
    return () => unsubscribe();
  }, []);

  // Load and sync notices from Firestore
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(collection(db, 'notices'), (snapshot) => {
      const records = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      records.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotices(records);
    }, (err) => console.error('Notices sync error:', err));
    return () => unsubscribe();
  }, []);

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = maintenanceRecords.reduce((sum, record) =>
      sum + ((!record.status || record.status === 'approved') ? Number(record.amount) : 0), 0);
    const expenses = expenseRecords.reduce((sum, record) => sum + Number(record.amount), 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    };
  }, [maintenanceRecords, expenseRecords]);

  const showToast = (msg, duration = 4000) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), duration);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoadingAuth(true);

    if (auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        const uid = userCredential.user.uid;

        if (db) {
          const userDoc = await getDoc(doc(db, 'users', uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'admin' || loginEmail === ADMIN_EMAIL) {
              setCurrentUserRole('admin');
              setActiveTab('dashboard');
              showToast("Logged in as Admin");
            } else {
              const member = { id: uid, unit: userData.unit, name: userData.name, email: userData.email, phone: userData.phone || '' };
              setMembers(prev => prev.some(m => m.id === uid) ? prev : [...prev, member].sort((a, b) => a.unit.localeCompare(b.unit)));
              setCurrentUserRole('member');
              setCurrentMember(member);
              setActiveTab('member-home');
              showToast(`Welcome back, ${userData.name}`);
            }
          } else if (loginEmail === ADMIN_EMAIL) {
            setCurrentUserRole('admin');
            setActiveTab('dashboard');
            showToast("Logged in as Admin");
          } else {
            setAuthError("User profile not found. Please sign up first.");
          }
        } else {
          if (loginEmail === ADMIN_EMAIL) {
            setCurrentUserRole('admin');
            setActiveTab('dashboard');
            showToast("Logged in as Admin");
          } else {
            const existingMember = members.find(m => m.email === loginEmail);
            if (existingMember) {
              setCurrentUserRole('member');
              setCurrentMember(existingMember);
              setActiveTab('member-home');
              showToast(`Welcome back, ${existingMember.name}`);
            } else {
              setAuthError("No profile found for this account. Please sign up.");
            }
          }
        }
        setLoginEmail(''); setLoginPassword('');
      } catch (error: any) {
        const errMsg = ['auth/invalid-credential', 'auth/wrong-password'].includes(error.code)
          ? 'Invalid email or password.'
          : error.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : error.message;
        setAuthError(errMsg);
      } finally {
        setIsLoadingAuth(false);
      }
    } else {
      // Simulated fallback
      setTimeout(() => {
        if (loginEmail === ADMIN_EMAIL && loginPassword === 'admin123') {
          setCurrentUserRole('admin');
          setActiveTab('dashboard');
          showToast("Logged in as Admin (Demo)");
          setLoginEmail(''); setLoginPassword('');
        } else {
          const existingMember = members.find(m => m.email === loginEmail);
          if (existingMember) {
            setCurrentUserRole('member');
            setCurrentMember(existingMember);
            setActiveTab('member-home');
            showToast(`Welcome back, ${existingMember.name}`);
            setLoginEmail(''); setLoginPassword('');
          } else {
            setAuthError("Invalid credentials. Please try again.");
          }
        }
        setIsLoadingAuth(false);
      }, 1000);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!signupName || !signupUnit || !signupEmail || !signupPassword) return;
    setIsLoadingAuth(true);

    if (auth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
        const uid = userCredential.user.uid;
        const role = signupEmail === ADMIN_EMAIL ? 'admin' : 'member';
        const newMember = { id: uid, unit: signupUnit, name: signupName, email: signupEmail, phone: '', role };

        if (db) {
          await setDoc(doc(db, 'users', uid), { unit: signupUnit, name: signupName, email: signupEmail, phone: '', role });
        }

        setMembers(prev => [...prev, newMember].sort((a, b) => a.unit.localeCompare(b.unit)));

        if (role === 'admin') {
          setCurrentUserRole('admin');
          setActiveTab('dashboard');
          showToast("Admin account created. Welcome!");
        } else {
          setCurrentUserRole('member');
          setCurrentMember(newMember);
          setActiveTab('member-home');
          showToast("Registration successful! Welcome to Shri Sai Square.");
        }
        setSignupEmail(''); setSignupPassword(''); setSignupName(''); setSignupUnit('');
      } catch (error: any) {
        const errMsg = error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : error.code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : error.message;
        setAuthError(errMsg);
      } finally {
        setIsLoadingAuth(false);
      }
    } else {
      // Simulated fallback
      setTimeout(() => {
        const newMember = { id: `m${Date.now()}`, unit: signupUnit, name: signupName, email: signupEmail, phone: '', role: 'member' };
        setMembers(prev => [...prev, newMember].sort((a, b) => a.unit.localeCompare(b.unit)));
        setCurrentUserRole('member');
        setCurrentMember(newMember);
        setActiveTab('member-home');
        showToast("Registration successful! Welcome to Shri Sai Square.");
        setSignupEmail(''); setSignupPassword(''); setSignupName(''); setSignupUnit('');
        setIsLoadingAuth(false);
      }, 1000);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoadingAuth(true);

    if (auth) {
      try {
        await sendPasswordResetEmail(auth, loginEmail);
        showToast(`Password reset email sent to ${loginEmail}. Please check your inbox.`);
        setLoginStep('login');
      } catch (error: any) {
        const errMsg = error.code === 'auth/user-not-found'
          ? 'No account found with this email.'
          : error.message;
        setAuthError(errMsg);
      } finally {
        setIsLoadingAuth(false);
      }
    } else {
      setTimeout(() => {
        showToast(`Password reset email simulated for ${loginEmail}.`);
        setLoginStep('login');
        setIsLoadingAuth(false);
      }, 1000);
    }
  };

  const handleLogout = () => {
    if (auth) { try { signOut(auth); } catch (_) {} }
    setCurrentUserRole(null);
    setCurrentMember(null);
    setActiveTab('dashboard');
    setLoginStep('login');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleAddMaintenance = async (e) => {
    e.preventDefault();
    if (!mForm.unit || !mForm.amount) return;

    const receiptNo = `REC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const newId = Date.now().toString();
    const memberName = members.find((m: any) => m.unit === mForm.unit)?.name || '';
    const newRecord = { id: newId, unit: mForm.unit, amount: Number(mForm.amount), month: mForm.month, date: mForm.date, receiptNo, memberName, status: 'approved' };

    if (db) {
      try {
        await setDoc(doc(db, 'maintenance', newId), newRecord);
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error saving maintenance record:', err);
        showToast('Failed to save record. Please try again.');
        return;
      }
    } else {
      setMaintenanceRecords((prev: any) => [newRecord, ...prev].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    setShowAddMaintenance(false);
    setMForm({ unit: '', amount: '500', month: getCurrentMonthYear(), date: new Date().toISOString().split('T')[0] });
    showToast(`Payment recorded! Receipt: ${receiptNo}`);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!eForm.amount || !eForm.category) return;

    const newId = Date.now().toString();
    const newRecord = { id: newId, category: eForm.category, amount: Number(eForm.amount), notes: eForm.notes, date: eForm.date };

    if (db) {
      try {
        await setDoc(doc(db, 'expenses', newId), newRecord);
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error saving expense:', err);
        showToast('Failed to save expense. Please try again.');
        return;
      }
    } else {
      setExpenseRecords(prev => [newRecord, ...prev].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }

    setShowAddExpense(false);
    setEForm({ category: EXPENSE_CATEGORIES[0], amount: '', notes: '', date: new Date().toISOString().split('T')[0] });
    showToast('Expense recorded successfully!');
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberForm.unit || !memberForm.name) return;

    const newId = `m${Date.now()}`;
    const newMember = { id: newId, unit: memberForm.unit, name: memberForm.name, email: memberForm.email, phone: '', role: 'member' };

    if (db) {
      try {
        await setDoc(doc(db, 'users', newId), newMember);
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error adding member:', err);
        showToast('Failed to add member. Please try again.');
        return;
      }
    } else {
      setMembers((prev: any) => [...prev, newMember].sort((a: any, b: any) => a.unit.localeCompare(b.unit)));
    }

    setShowAddMember(false);
    setMemberForm({ unit: '', name: '', email: '' });
    showToast('Member added successfully!');
  };

  const deleteMaintenance = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'maintenance', id));
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error deleting maintenance record:', err);
        showToast('Failed to delete record.');
        return;
      }
    } else {
      setMaintenanceRecords((prev: any) => prev.filter((r: any) => r.id !== id));
    }
    showToast('Record deleted.');
  };

  const deleteExpense = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'expenses', id));
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error deleting expense:', err);
        showToast('Failed to delete expense.');
        return;
      }
    } else {
      setExpenseRecords(prev => prev.filter(r => r.id !== id));
    }
    showToast('Expense deleted.');
  };

  const deleteMember = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'users', id));
        // onSnapshot updates local state automatically
      } catch (err) {
        console.error('Error deleting member:', err);
        showToast('Failed to remove member.');
        return;
      }
    } else {
      setMembers((prev: any) => prev.filter((m: any) => m.id !== id));
    }
    showToast('Member removed.');
  };

  const handleSubmitUTR = async () => {
    const utr = utrInput.trim().toUpperCase();
    if (!utr) return;
    const newId = Date.now().toString();
    const newRecord = {
      id: newId,
      unit: currentMember.unit,
      memberName: currentMember.name,
      amount: Number(paymentForm.amount),
      month: paymentForm.month,
      date: new Date().toISOString().split('T')[0],
      utrNo: utr,
      status: 'pending',
      receiptNo: ''
    };

    if (db) {
      try {
        await setDoc(doc(db, 'maintenance', newId), newRecord);
      } catch (err) {
        console.error('Error saving payment:', err);
        showToast('Failed to submit payment. Please try again.');
        return;
      }
    } else {
      setMaintenanceRecords((prev: any) => [newRecord, ...prev]);
    }

    setShowPaymentGateway(false);
    setUtrInput('');
    setPaymentStep('qr');
    showToast(
      <div className="text-sm">
        <strong>Payment Submitted!</strong><br/>
        <span className="text-xs opacity-80 block mt-1">UTR: {utr}</span>
        <span className="text-xs opacity-70 block mt-0.5">Awaiting admin verification. Receipt will be issued once approved.</span>
      </div>,
      8000
    );
  };

  const handleApprovePayment = async (id) => {
    const record = (maintenanceRecords as any[]).find(r => r.id === id);
    if (!record) return;
    const receiptNo = `REC-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    if (db) {
      try {
        await updateDoc(doc(db, 'maintenance', id), { status: 'approved', receiptNo });
      } catch (err) {
        console.error('Error approving payment:', err);
        showToast('Failed to approve. Please try again.');
        return;
      }
    } else {
      setMaintenanceRecords((prev: any) => prev.map((r: any) => r.id === id ? { ...r, status: 'approved', receiptNo } : r));
    }
    showToast(`Approved! Receipt ${receiptNo} issued to Flat ${record.unit}.`);
  };

  const handleRejectPayment = async (id) => {
    const record = (maintenanceRecords as any[]).find(r => r.id === id);
    if (!record) return;
    if (db) {
      try {
        await deleteDoc(doc(db, 'maintenance', id));
      } catch (err) {
        console.error('Error rejecting payment:', err);
        showToast('Failed to reject. Please try again.');
        return;
      }
    } else {
      setMaintenanceRecords((prev: any) => prev.filter((r: any) => r.id !== id));
    }
    showToast(`Payment from Flat ${record.unit} rejected and removed.`);
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    if (!complaintForm.title || !complaintForm.description) return;
    const newId = Date.now().toString();
    const newComplaint = {
      id: newId,
      unit: currentMember.unit,
      memberName: currentMember.name,
      title: complaintForm.title,
      description: complaintForm.description,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      completionDate: '',
    };
    if (db) {
      try {
        await setDoc(doc(db, 'complaints', newId), newComplaint);
      } catch (err) {
        console.error('Error saving complaint:', err);
        showToast('Failed to submit complaint. Please try again.');
        return;
      }
    } else {
      setComplaints((prev: any) => [newComplaint, ...prev]);
    }
    setShowComplaintModal(false);
    setComplaintForm({ title: '', description: '' });
    showToast(t('complaint_submitted'));
  };

  const handleUpdateComplaint = async (id, updates) => {
    if (db) {
      try {
        await updateDoc(doc(db, 'complaints', id), updates);
      } catch (err) {
        console.error('Error updating complaint:', err);
        showToast('Failed to update complaint.');
      }
    } else {
      setComplaints((prev: any) => prev.map((c: any) => c.id === id ? { ...c, ...updates } : c));
    }
  };

  const deleteComplaint = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'complaints', id));
      } catch (err) {
        console.error('Error deleting complaint:', err);
        showToast('Failed to delete complaint.');
        return;
      }
    } else {
      setComplaints((prev: any) => prev.filter((c: any) => c.id !== id));
    }
    showToast('Complaint deleted.');
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!noticeForm.text.trim()) return;
    const newId = Date.now().toString();
    const newNotice = { id: newId, text: noticeForm.text.trim(), createdAt: new Date().toISOString().split('T')[0] };
    if (db) {
      try {
        await setDoc(doc(db, 'notices', newId), newNotice);
      } catch (err) {
        console.error('Error posting notice:', err);
        showToast('Failed to post notice.');
        return;
      }
    } else {
      setNotices((prev: any) => [newNotice, ...prev]);
    }
    setShowNoticeModal(false);
    setNoticeForm({ text: '' });
    showToast(t('notice_added'));
  };

  const deleteNotice = async (id) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'notices', id));
      } catch (err) {
        console.error('Error deleting notice:', err);
        showToast('Failed to delete notice.');
        return;
      }
    } else {
      setNotices((prev: any) => prev.filter((n: any) => n.id !== id));
    }
    showToast(t('notice_deleted'));
  };

  const downloadReceipt = (record: any) => {
    const name = record.memberName || `Flat ${record.unit}`;
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Receipt ${record.receiptNo}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; }
    .card { background: white; width: 360px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.12); }
    .header { background: #0d9488; color: white; padding: 24px 24px 16px; text-align: center; }
    .header h1 { font-size: 20px; font-weight: 700; }
    .header p { font-size: 12px; opacity: 0.85; margin-top: 4px; }
    .badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.2); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 600; margin-top: 10px; }
    .body { padding: 24px; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed #e5e7eb; }
    .row:last-of-type { border-bottom: none; }
    .label { color: #6b7280; font-size: 13px; }
    .value { font-size: 13px; font-weight: 600; color: #111827; text-align: right; }
    .total-row { background: #f0fdf4; border-radius: 8px; padding: 12px 16px; margin-top: 16px; display: flex; justify-content: space-between; align-items: center; }
    .total-label { font-weight: 700; color: #374151; font-size: 14px; }
    .total-value { font-weight: 800; color: #059669; font-size: 22px; }
    .footer { background: #f9fafb; border-top: 1px solid #f3f4f6; padding: 14px 24px; text-align: center; }
    .footer p { font-size: 11px; color: #9ca3af; }
    @media print { body { padding: 0; background: white; } .card { box-shadow: none; border-radius: 0; width: 100%; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Shri Sai Square</h1>
      <p>Apartment Maintenance Receipt</p>
      <div class="badge">✓ PAYMENT CONFIRMED</div>
    </div>
    <div class="body">
      <div class="row"><span class="label">Receipt No.</span><span class="value" style="font-family:monospace">${record.receiptNo}</span></div>
      <div class="row"><span class="label">Date</span><span class="value">${new Date(record.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
      <div class="row"><span class="label">Received From</span><span class="value">${name}</span></div>
      <div class="row"><span class="label">Flat / Unit</span><span class="value">${record.unit}</span></div>
      <div class="row"><span class="label">For Month</span><span class="value">${record.month}</span></div>
      <div class="total-row">
        <span class="total-label">Amount Paid</span>
        <span class="total-value">₹${Number(record.amount).toLocaleString('en-IN')}</span>
      </div>
    </div>
    <div class="footer"><p>Thank you for your payment. Please keep this receipt for your records.</p></div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;
    const win = window.open('', '_blank', 'width=480,height=640');
    if (win) { win.document.write(html); win.document.close(); }
  };

  const renderLoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 animate-in zoom-in-95 duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-teal-50 text-center">

        {/* Language Toggle */}
        <div className="flex justify-end mb-2">
          <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
            <button
              onClick={() => changeLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'en' ? 'bg-teal-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >EN</button>
            <button
              onClick={() => changeLang('mr')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${lang === 'mr' ? 'bg-teal-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
            >मराठी</button>
          </div>
        </div>

        <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building size={40} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('app_name')}</h2>

        {authError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-left">
            {authError}
          </div>
        )}

        {loginStep === 'login' && (
          <div className="space-y-4 mt-6">
            <p className="text-gray-500 text-sm mb-4">{t('sign_in_subtitle')}</p>
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('email_address')}</label>
                <input
                  type="email"
                  required
                  placeholder={t('email_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('password')}</label>
                <input
                  type="password"
                  required
                  placeholder={t('password_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white p-3.5 rounded-xl font-medium transition-colors shadow-md flex justify-center items-center h-[52px]"
              >
                {isLoadingAuth ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t('sign_in')}
              </button>
            </form>
            <button
              onClick={() => { setLoginStep('reset-password'); setAuthError(null); }}
              className="text-sm text-teal-600 font-medium hover:underline"
            >
              {t('forgot_password')}
            </button>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-500 text-sm">{t('no_account')}</p>
              <button
                onClick={() => { setLoginStep('signup'); setAuthError(null); }}
                className="text-teal-600 font-semibold text-sm hover:underline mt-1"
              >
                {t('create_account')}
              </button>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500 border border-gray-100 text-left">
              <strong>{t('admin_login')}:</strong> <code className="bg-gray-200 px-1 rounded">{ADMIN_EMAIL}</code>
            </div>
          </div>
        )}

        {loginStep === 'signup' && (
          <div className="space-y-4 mt-6 animate-in slide-in-from-right-4">
            <p className="text-gray-500 text-sm mb-4">{t('create_resident_account')}</p>
            <form onSubmit={handleSignup} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('full_name')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('full_name_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('flat_unit')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('flat_unit_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={signupUnit}
                  onChange={e => setSignupUnit(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('email_address')}</label>
                <input
                  type="email"
                  required
                  placeholder={t('email_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('password')}</label>
                <input
                  type="password"
                  required
                  placeholder={t('password_min')}
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white p-3.5 rounded-xl font-medium transition-colors shadow-md flex justify-center items-center h-[52px]"
              >
                {isLoadingAuth ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t('create_account')}
              </button>
            </form>
            <button
              onClick={() => { setLoginStep('login'); setAuthError(null); }}
              className="text-sm text-teal-600 font-medium hover:underline"
            >
              {t('already_account')}
            </button>
          </div>
        )}

        {loginStep === 'reset-password' && (
          <div className="space-y-4 mt-6 animate-in slide-in-from-right-4">
            <p className="text-gray-500 text-sm mb-4">{t('reset_subtitle')}</p>
            <form onSubmit={handleResetPassword} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-gray-500 ml-1 mb-1">{t('email_address')}</label>
                <input
                  type="email"
                  required
                  placeholder={t('email_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white p-3.5 rounded-xl font-medium transition-colors shadow-md flex justify-center items-center h-[52px]"
              >
                {isLoadingAuth ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : t('send_reset_email')}
              </button>
            </form>
            <button
              onClick={() => { setLoginStep('login'); setAuthError(null); }}
              className="text-sm text-teal-600 font-medium hover:underline"
            >
              {t('back_to_sign_in')}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Building size={100} /></div>
        <h3 className="text-teal-100 font-medium text-sm uppercase tracking-wider mb-1">{t('society_balance')}</h3>
        <div className="text-4xl font-bold mb-4">{formatCurrency(balance)}</div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-teal-400/30">
          <div>
            <div className="text-teal-100 text-xs uppercase mb-1">{t('total_received')}</div>
            <div className="font-semibold text-lg">{formatCurrency(totalIncome)}</div>
          </div>
          <div>
            <div className="text-teal-100 text-xs uppercase mb-1">{t('total_expenses')}</div>
            <div className="font-semibold text-lg">{formatCurrency(totalExpenses)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setActiveTab('maintenance')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-95 transition-transform">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl shrink-0"><Wallet size={20} /></div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-700">{t('income')}</div>
            <div className="text-sm font-bold text-teal-600 truncate">{formatCurrency(totalIncome)}</div>
            <div className="text-[10px] text-gray-400">{maintenanceRecords.length} {t('payments_count')}</div>
          </div>
        </button>
        <button onClick={() => setActiveTab('expenses')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-95 transition-transform">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0"><Receipt size={20} /></div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-700">{t('expenses')}</div>
            <div className="text-sm font-bold text-rose-600 truncate">{formatCurrency(totalExpenses)}</div>
            <div className="text-[10px] text-gray-400">{expenseRecords.length} {t('entries_count')}</div>
          </div>
        </button>
        <button onClick={() => setActiveTab('members')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-95 transition-transform">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0"><Users size={20} /></div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-700">{t('members')}</div>
            <div className="text-sm font-bold text-indigo-600">{members.length} {t('residents')}</div>
            <div className="text-[10px] text-gray-400">{t('tap_to_manage')}</div>
          </div>
        </button>
        <button onClick={() => setActiveTab('reports')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 text-left active:scale-95 transition-transform">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0"><BarChart2 size={20} /></div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-700">{t('reports')}</div>
            <div className="text-sm font-bold text-amber-600">{formatCurrency(balance)}</div>
            <div className="text-[10px] text-gray-400">{t('net_balance')}</div>
          </div>
        </button>
      </div>

      {/* Notices Board */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Bell size={18} className="text-amber-500" /> {t('notices')}
          </h3>
          <button
            onClick={() => setShowNoticeModal(true)}
            className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 active:bg-amber-600 transition-colors"
          >
            <PlusCircle size={14} /> {t('add_notice')}
          </button>
        </div>
        {(notices as any[]).length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-sm bg-white rounded-xl border border-dashed border-gray-200">{t('no_notices')}</div>
        ) : (
          <div className="space-y-2">
            {(notices as any[]).map((n: any) => (
              <div key={n.id} className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-amber-900 font-medium leading-relaxed">{n.text}</p>
                  <p className="text-[10px] text-amber-500 mt-1">{formatDate(n.createdAt)}</p>
                </div>
                <button onClick={() => deleteNotice(n.id)} className="text-amber-300 hover:text-red-500 p-1 shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMonthlyReport = () => {
    // Build a map of month → { income, expenses, expenseItems, incomeItems }
    const monthMap: Record<string, { income: number; expenses: number; incomeItems: any[]; expenseItems: any[] }> = {};

    maintenanceRecords.forEach((r: any) => {
      if (!monthMap[r.month]) monthMap[r.month] = { income: 0, expenses: 0, incomeItems: [], expenseItems: [] };
      monthMap[r.month].income += Number(r.amount);
      monthMap[r.month].incomeItems.push(r);
    });

    expenseRecords.forEach((r: any) => {
      // derive month string from date e.g. "2026-06-15" → "June 2026"
      const d = new Date(r.date + 'T00:00:00');
      const label = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      if (!monthMap[label]) monthMap[label] = { income: 0, expenses: 0, incomeItems: [], expenseItems: [] };
      monthMap[label].expenses += Number(r.amount);
      monthMap[label].expenseItems.push(r);
    });

    // Sort months chronologically using MONTHS order first, then fallback to date parse
    const sorted = Object.entries(monthMap).sort(([a], [b]) => {
      const ai = MONTHS.indexOf(a), bi = MONTHS.indexOf(b);
      if (ai !== -1 && bi !== -1) return bi - ai;
      return new Date(b).getTime() - new Date(a).getTime();
    });

    return (
      <div className="animate-in slide-in-from-right-4 duration-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('monthly_report')}</h2>

        {sorted.length === 0 ? (
          <div className="text-center py-10 text-gray-400">{t('no_data')}</div>
        ) : (
          <div className="space-y-3">
            {sorted.map(([month, data]) => {
              const net = data.income - data.expenses;
              const isExpanded = expandedMonth === month;
              return (
                <div key={month} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full p-4 text-left"
                    onClick={() => setExpandedMonth(isExpanded ? null : month)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-800">{month}</div>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-emerald-600 font-medium">↑ {formatCurrency(data.income)}</span>
                          <span className="text-xs text-rose-600 font-medium">↓ {formatCurrency(data.expenses)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {net >= 0 ? '+' : ''}{formatCurrency(net)}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{isExpanded ? `▲ ${t('hide_label')}` : `▼ ${t('details_label')}`}</div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 px-4 pb-4">
                      {data.incomeItems.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">{t('credit_entries')} ({data.incomeItems.length})</div>
                          <div className="space-y-1.5">
                            {data.incomeItems.map((r: any) => (
                              <div key={r.id} className="flex justify-between items-center bg-emerald-50 rounded-lg px-3 py-2">
                                <div>
                                  <div className="text-xs font-medium text-gray-700">Flat {r.unit}</div>
                                  <div className="text-[10px] text-gray-400">{formatDate(r.date)}</div>
                                </div>
                                <div className="text-xs font-bold text-emerald-600">+{formatCurrency(r.amount)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {data.expenseItems.length > 0 && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">{t('expense_entries')} ({data.expenseItems.length})</div>
                          <div className="space-y-1.5">
                            {data.expenseItems.map((r: any) => (
                              <div key={r.id} className="flex justify-between items-start bg-rose-50 rounded-lg px-3 py-2">
                                <div className="flex-1 min-w-0 mr-2">
                                  <div className="text-xs font-medium text-gray-700">{r.category}</div>
                                  <div className="text-[10px] text-gray-400">{formatDate(r.date)}</div>
                                  {r.notes && <div className="text-[10px] text-gray-500 mt-0.5 truncate">{r.notes}</div>}
                                </div>
                                <div className="text-xs font-bold text-rose-600 shrink-0">-{formatCurrency(r.amount)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                        <span className="text-sm font-semibold text-gray-700">{t('net_balance_label')}</span>
                        <span className={`text-sm font-bold ${net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {net >= 0 ? '+' : ''}{formatCurrency(net)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderMembersAdmin = () => (
    <div className="animate-in slide-in-from-right-4 duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{t('members_directory')}</h2>
        <button
          onClick={() => setShowAddMember(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
        >
          <PlusCircle size={16} /> {t('add_member')}
        </button>
      </div>

      <div className="space-y-3">
        {members.length === 0 ? (
          <div className="text-center py-10 text-gray-400">{t('no_members')}</div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                  {member.unit}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{member.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <User size={12} /> {member.email || member.phone}
                  </div>
                </div>
              </div>
              <button onClick={() => deleteMember(member.id)} className="text-gray-300 hover:text-red-500 p-2">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderComplaintsAdmin = () => (
    <div className="animate-in slide-in-from-right-4 duration-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{t('complaints')}</h2>
      {(complaints as any[]).length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <MessageSquare size={36} className="mx-auto mb-2 text-gray-300" />
          <p>{t('no_complaints')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(complaints as any[]).map((c: any) => {
            const borderColor = c.status === 'resolved' ? 'border-emerald-100' : c.status === 'in-progress' ? 'border-amber-100' : 'border-red-100';
            const statusColor = c.status === 'resolved'
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : c.status === 'in-progress'
              ? 'text-amber-700 bg-amber-50 border-amber-200'
              : 'text-red-700 bg-red-50 border-red-200';
            return (
              <div key={c.id} className={`bg-white rounded-xl p-4 shadow-sm border ${borderColor}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-700 font-bold text-sm border border-orange-100 shrink-0">
                      {c.unit}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm leading-tight">{c.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{c.memberName} · {formatDate(c.date)}</div>
                    </div>
                  </div>
                  <button onClick={() => deleteComplaint(c.id)} className="text-gray-300 hover:text-red-500 p-1 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3 border border-gray-100">
                  {c.description}
                </div>
                <div className="flex gap-2 items-center">
                  <select
                    className={`flex-1 px-3 py-2 rounded-lg border text-xs font-semibold focus:ring-2 focus:ring-teal-500 outline-none ${statusColor}`}
                    value={c.status}
                    onChange={e => handleUpdateComplaint(c.id, { status: e.target.value })}
                  >
                    <option value="open">{t('complaint_open')}</option>
                    <option value="in-progress">{t('complaint_inprogress')}</option>
                    <option value="resolved">{t('complaint_resolved')}</option>
                  </select>
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    value={c.completionDate || ''}
                    onChange={e => handleUpdateComplaint(c.id, { completionDate: e.target.value })}
                    title={t('completion_date')}
                  />
                </div>
                {c.completionDate && (
                  <div className="mt-1.5 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <Calendar size={11} /> {t('completion_date')}: {formatDate(c.completionDate)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderMemberComplaints = () => {
    const myComplaints = (complaints as any[]).filter(c => c.unit === currentMember?.unit)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (
      <div className="space-y-5 animate-in fade-in duration-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">{t('my_complaints')}</h3>
          <button
            onClick={() => setShowComplaintModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 active:bg-orange-700 transition-colors"
          >
            <PlusCircle size={16} /> {t('add_complaint')}
          </button>
        </div>
        {myComplaints.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <MessageSquare size={36} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm">{t('no_complaints')}</p>
            <p className="text-xs mt-1 text-gray-300">Tap "Add Complaint" to raise a new issue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myComplaints.map((c: any) => {
              const statusBadge = c.status === 'resolved'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : c.status === 'in-progress'
                ? 'bg-amber-50 text-amber-700 border-amber-100'
                : 'bg-red-50 text-red-700 border-red-100';
              const statusLabel = c.status === 'resolved'
                ? t('complaint_resolved')
                : c.status === 'in-progress'
                ? t('complaint_inprogress')
                : t('complaint_open');
              return (
                <div key={c.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-1.5">
                    <div className="font-semibold text-sm text-gray-800 flex-1 mr-2 leading-tight">{c.title}</div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${statusBadge}`}>{statusLabel}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{formatDate(c.date)}</div>
                  <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                    {c.description}
                  </div>
                  {c.completionDate && (
                    <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Calendar size={11} /> {t('completion_date')}: {formatDate(c.completionDate)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderMemberHome = () => {
    const myPayments = (maintenanceRecords as any[]).filter(r => r.unit === currentMember.unit)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const approvedPayments = myPayments.filter((r: any) => !r.status || r.status === 'approved');
    const paidMonths = approvedPayments.map((r: any) => r.month);
    const totalPaid = approvedPayments.reduce((s: number, r: any) => s + Number(r.amount), 0);

    const currentMonthStr = getCurrentMonthYear();
    const startIdx = Math.max(0, MONTHS.indexOf(currentMonthStr));
    let nextDueMonth = MONTHS[startIdx] || currentMonthStr;
    for (let i = startIdx; i < MONTHS.length; i++) {
      if (!paidMonths.includes(MONTHS[i])) { nextDueMonth = MONTHS[i]; break; }
    }

    const currentYear = new Date().getFullYear().toString();
    const thisYearMonths = MONTHS.filter(m => m.includes(currentYear));
    const paidThisYear = thisYearMonths.filter(m => paidMonths.includes(m)).length;
    const pendingThisYear = thisYearMonths.length - paidThisYear;
    const awaitingApproval = myPayments.filter((r: any) => r.status === 'pending').length;

    return (
      <div className="space-y-5 animate-in fade-in duration-200">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-100 text-xs font-medium uppercase tracking-wide">{t('welcome_back')}</p>
              <h2 className="text-xl font-bold mt-0.5">{currentMember.name}</h2>
              <p className="text-teal-200 text-sm mt-0.5">{t('flat_label')} {currentMember.unit}</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg border border-white/30">
              {currentMember.unit}
            </div>
          </div>
          {/* Payment status summary */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-xl font-bold">{approvedPayments.length}</div>
              <div className="text-teal-200 text-[10px] mt-0.5">{t('total_paid_stat')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{paidThisYear}</div>
              <div className="text-teal-200 text-[10px] mt-0.5">{t('this_year')}</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${awaitingApproval > 0 ? 'text-amber-300' : pendingThisYear > 0 ? 'text-yellow-300' : 'text-white'}`}>
                {awaitingApproval > 0 ? awaitingApproval : pendingThisYear}
              </div>
              <div className="text-teal-200 text-[10px] mt-0.5">{awaitingApproval > 0 ? t('awaiting_stat') : t('pending_stat')}</div>
            </div>
          </div>
        </div>

        {/* Next Due */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-20"><CreditCard size={100} className="translate-x-4 translate-y-4"/></div>
          <h3 className="text-blue-100 font-medium text-sm mb-1">{t('next_maintenance_due')}</h3>
          <div className="text-3xl font-bold mb-0.5">₹500</div>
          <div className="text-blue-200 text-sm mb-4">{t('for_month')} {dm(nextDueMonth)}</div>
          <button
            onClick={() => { setPaymentForm({ month: nextDueMonth, amount: '500' }); setPaymentStep('qr'); setUtrInput(''); setShowPaymentGateway(true); }}
            className="bg-white text-indigo-700 px-6 py-2.5 rounded-full font-bold text-sm w-full shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {t('pay_now_btn')} <Wallet size={16}/>
          </button>
        </div>

        {/* Payment History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText size={18} className="text-teal-600"/> {t('payment_history')}
            </h3>
            {myPayments.length > 0 && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                {t('total_label')}: {formatCurrency(totalPaid)}
              </span>
            )}
          </div>
          <div className="space-y-3">
            {myPayments.length === 0 ? (
              <p className="text-center text-gray-400 py-6 text-sm bg-white rounded-xl border border-gray-100 border-dashed">
                {t('no_payments_yet')}<br/>
                <span className="text-xs">{t('payments_appear_here')}</span>
              </p>
            ) : (
              myPayments.map((record: any) => {
                const isPending = record.status === 'pending';
                return (
                  <div key={record.id} className={`bg-white p-4 rounded-xl shadow-sm ${isPending ? 'border border-amber-200' : 'border border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-sm text-gray-800">{dm(record.month)}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{isPending ? t('submitted_on') : t('paid_on')} {formatDate(record.date)}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-base ${isPending ? 'text-amber-600' : 'text-emerald-600'}`}>{formatCurrency(record.amount)}</div>
                        {isPending ? (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{t('pending_approval_badge')}</span>
                        ) : (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">{t('approved_badge')}</span>
                        )}
                      </div>
                    </div>
                    {record.utrNo && (
                      <div className="text-[11px] text-indigo-600 font-mono bg-indigo-50 px-2 py-1 rounded border border-indigo-100 mb-2">
                        UTR: {record.utrNo}
                      </div>
                    )}
                    {!isPending && (
                      <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                        <div className="text-[10px] text-teal-700 font-mono bg-teal-50 px-2 py-1 rounded border border-teal-100">
                          {record.receiptNo}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setSelectedReceipt(record); setShowReceiptModal(true); }}
                            className="text-xs text-indigo-600 font-medium hover:underline"
                          >
                            {t('view_btn')}
                          </button>
                          <span className="text-gray-200">|</span>
                          <button
                            onClick={() => downloadReceipt(record)}
                            className="text-xs text-teal-600 font-medium hover:underline"
                          >
                            {t('download_pdf')}
                          </button>
                        </div>
                      </div>
                    )}
                    {isPending && (
                      <div className="border-t border-amber-100 pt-2.5 text-[11px] text-amber-600">
                        {t('admin_verifying')}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderModals = () => (
    <>
      {showAddMaintenance && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{t('record_offline_payment')}</h3>
            <form onSubmit={handleAddMaintenance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('select_flat')}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.unit} onChange={e => setMForm({...mForm, unit: e.target.value})} required
                >
                  <option value="">{t('select_flat_placeholder')}</option>
                  {members.map(m => <option key={m.id} value={m.unit}>{m.unit} - {m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('amount_field')}</label>
                <input
                  type="number" required placeholder="500" min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.amount} onChange={e => setMForm({...mForm, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('for_month_field')}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.month} onChange={e => setMForm({...mForm, month: e.target.value})}
                >
                  {MONTHS.map(m => <option key={m} value={m}>{dm(m)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment_date')}</label>
                <input
                  type="date" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.date} onChange={e => setMForm({...mForm, date: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddMaintenance(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">{t('cancel_btn')}</button>
                <button type="submit" className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium">{t('save_record')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddExpense && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{t('record_new_expense')}</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('category_field')}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.category} onChange={e => setEForm({...eForm, category: e.target.value})} required
                >
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{dc(c)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('amount_field')}</label>
                <input
                  type="number" required placeholder="0" min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.amount} onChange={e => setEForm({...eForm, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes_field')}</label>
                <textarea
                  rows={3}
                  placeholder={t('notes_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                  value={eForm.notes} onChange={e => setEForm({...eForm, notes: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.date} onChange={e => setEForm({...eForm, date: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddExpense(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-medium">Add Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{t('add_new_member')}</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('member_unit_field')}</label>
                <input
                  type="text" required placeholder={t('flat_unit_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.unit} onChange={e => setMemberForm({...memberForm, unit: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('member_name_field')}</label>
                <input
                  type="text" required placeholder={t('full_name_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('member_email_field')}</label>
                <input
                  type="email" required placeholder={t('email_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.email} onChange={e => setMemberForm({...memberForm, email: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddMember(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">{t('cancel_btn')}</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium">{t('add_member')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">

            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white flex items-center justify-between">
              <div>
                <div className="font-bold text-base">{t('app_name')}</div>
                <div className="text-xs text-teal-100">{t('maintenance_payment')}</div>
              </div>
              <div className="text-xs border border-white/30 px-2 py-1 rounded flex items-center gap-1">
                <CheckCircle2 size={12}/> {t('upi_secure')}
              </div>
            </div>

            {paymentStep === 'qr' && (
              <>
                {/* Payment Summary */}
                <div className="px-5 pt-4 pb-2 bg-gray-50 border-b border-gray-100">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{t('flat_label')}</span>
                    <span className="font-semibold text-gray-800">{currentMember?.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">{t('for_month_field')}</span>
                    <span className="font-semibold text-gray-800">{dm(paymentForm.month)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200 mt-1">
                    <span className="text-gray-700 font-medium">Amount</span>
                    <span className="font-bold text-xl text-teal-700">₹{paymentForm.amount}</span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center py-5 px-5">
                  <p className="text-xs text-gray-500 mb-4 text-center">
                    {t('scan_instruction')}{paymentForm.amount}{t('scan_instruction_suffix')}
                  </p>
                  <div className="p-3 bg-white border-2 border-teal-500 rounded-2xl shadow-md">
                    <QRCode
                      value={`upi://pay?pa=${APARTMENT_UPI_ID}&pn=${APARTMENT_NAME}&am=${paymentForm.amount}&cu=INR&tn=Flat-${currentMember?.unit}-${encodeURIComponent(paymentForm.month)}`}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#0f766e"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-[11px] text-gray-400">{t('upi_id_label')}</p>
                    <p className="text-xs font-mono font-semibold text-gray-700 mt-0.5 select-all">{APARTMENT_UPI_ID}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 space-y-2">
                  <button
                    onClick={() => setPaymentStep('utr')}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm transition-colors"
                  >
                    {t('ive_paid_btn')}
                  </button>
                  <button
                    onClick={() => setShowPaymentGateway(false)}
                    className="w-full py-2.5 text-gray-500 text-sm font-medium hover:text-gray-800"
                  >
                    {t('cancel_payment_btn')}
                  </button>
                </div>
              </>
            )}

            {paymentStep === 'utr' && (
              <>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 text-base mb-1">{t('enter_utr_title')}</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {t('utr_instruction')}
                  </p>
                  <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-2.5 flex justify-between items-center mb-4">
                    <span className="text-sm text-teal-700">{t('amount_paid_label')}</span>
                    <span className="font-bold text-teal-700">₹{paymentForm.amount} · {paymentForm.month}</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t('utr_input_placeholder')}
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none font-mono text-sm uppercase tracking-widest"
                    value={utrInput}
                    onChange={e => setUtrInput(e.target.value.toUpperCase())}
                    autoFocus
                  />
                  <p className="text-[11px] text-gray-400 mt-1.5">{t('admin_verify_note')}</p>
                </div>
                <div className="px-5 pb-5 flex gap-3">
                  <button
                    onClick={() => setPaymentStep('qr')}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm"
                  >
                    {t('back_btn')}
                  </button>
                  <button
                    onClick={handleSubmitUTR}
                    disabled={!utrInput.trim()}
                    className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-200 disabled:text-teal-400 text-white rounded-xl font-bold text-sm transition-colors"
                  >
                    {t('submit_payment_btn')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Complaint Submission Modal (member) */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{t('add_complaint')}</h3>
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('complaint_title')}</label>
                <input
                  type="text" required
                  placeholder={t('complaint_title_ph')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={complaintForm.title}
                  onChange={e => setComplaintForm({ ...complaintForm, title: e.target.value })}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('complaint_desc')}</label>
                <textarea
                  rows={4} required
                  placeholder={t('complaint_desc_ph')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                  value={complaintForm.description}
                  onChange={e => setComplaintForm({ ...complaintForm, description: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button"
                  onClick={() => { setShowComplaintModal(false); setComplaintForm({ title: '', description: '' }); }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                >{t('cancel_btn')}</button>
                <button type="submit" className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-medium">{t('submit_complaint')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Post Modal (admin) */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{t('add_notice')}</h3>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('notice_text')}</label>
                <textarea
                  rows={4} required
                  placeholder={t('notice_ph')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  value={noticeForm.text}
                  onChange={e => setNoticeForm({ text: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button"
                  onClick={() => { setShowNoticeModal(false); setNoticeForm({ text: '' }); }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                >{t('cancel_btn')}</button>
                <button type="submit" className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium">{t('save_notice')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Downloadable Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95">
             <div className="p-6 border-b border-gray-100 text-center bg-gray-50">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24}/>
               </div>
               <h3 className="font-bold text-lg text-gray-800">{t('payment_receipt_title')}</h3>
               <p className="text-xs text-gray-500 mt-1">{t('apartment_full_name')}</p>
             </div>
             
             <div className="p-6 space-y-3">
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-3">
                   <span className="text-gray-500 text-sm">{t('receipt_no_label')}</span>
                   <span className="font-mono text-sm font-medium text-gray-800">{selectedReceipt.receiptNo}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-3">
                   <span className="text-gray-500 text-sm">Date</span>
                   <span className="text-sm font-medium text-gray-800">{formatDate(selectedReceipt.date)}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-3">
                   <span className="text-gray-500 text-sm">{t('received_from_label')}</span>
                   <span className="text-sm font-medium text-gray-800">{selectedReceipt.memberName || `${t('flat_label')} ${selectedReceipt.unit}`}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-3">
                   <span className="text-gray-500 text-sm">Flat / Unit</span>
                   <span className="text-sm font-medium text-gray-800">{selectedReceipt.unit}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-3">
                   <span className="text-gray-500 text-sm">{t('for_month_receipt')}</span>
                   <span className="text-sm font-medium text-gray-800">{dm(selectedReceipt.month)}</span>
                </div>
                <div className="flex justify-between pt-1">
                   <span className="text-gray-800 font-bold">{t('total_paid_receipt')}</span>
                   <span className="font-bold text-emerald-600 text-lg">{formatCurrency(selectedReceipt.amount)}</span>
                </div>
             </div>

             <div className="p-4 bg-gray-50 flex gap-3">
                <button 
                  onClick={() => setShowReceiptModal(false)} 
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {t('close_btn')}
                </button>
                <button 
                  onClick={() => downloadReceipt(selectedReceipt)} 
                  className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 hover:bg-teal-700"
                >
                  Download PDF
                </button>
             </div>
           </div>
        </div>
      )}
    </>
  );

  if (!currentUserRole) {
    return (
      <div className="bg-gray-200 h-screen flex justify-center font-sans overflow-hidden">
        <div className="w-full max-w-md bg-gray-50 h-full shadow-2xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
          {renderLoginScreen()}
          
          </div>
          {/* Global Toast */}
          {toastMessage && (
            <div className="absolute top-4 left-4 right-4 z-50 bg-gray-800 text-white px-4 py-3 rounded-xl shadow-lg flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-5">
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>{toastMessage}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const AppHeader = () => (
    <header className={`${currentUserRole === 'admin' ? 'bg-teal-700' : 'bg-indigo-700'} text-white pt-6 pb-5 px-5 rounded-b-3xl shadow-lg z-10 shrink-0`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Building size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-tight">{t('app_name')}</h1>
            <p className="text-white/80 text-xs flex items-center gap-1">
              {currentUserRole === 'admin' ? t('admin_portal') : `${t('flat_label')} ${currentMember.unit}`}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );

  return (
    <div className="bg-gray-200 h-screen flex justify-center font-sans overflow-hidden">
      <div className="w-full max-w-md bg-gray-50 h-full shadow-2xl flex flex-col overflow-hidden">

        <AppHeader />

        <main className="flex-1 overflow-y-auto p-5 pb-4">
          {currentUserRole === 'admin' && (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              
              {activeTab === 'maintenance' && (
                <div className="animate-in slide-in-from-right-4 duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{t('income')}</h2>
                    <button
                      onClick={() => setShowAddMaintenance(true)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <PlusCircle size={16} /> {t('record_payment')}
                    </button>
                  </div>

                  {/* Pending Approvals */}
                  {(() => {
                    const pending = (maintenanceRecords as any[]).filter(r => r.status === 'pending');
                    if (pending.length === 0) return null;
                    return (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-bold text-amber-700">{t('pending_approvals')} ({pending.length})</span>
                        </div>
                        <div className="space-y-2">
                          {pending.map((record: any) => (
                            <div key={record.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm border border-amber-200">
                                    {record.unit}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-800 text-sm">{record.memberName || `${t('flat_label')} ${record.unit}`}</div>
                                    <div className="text-xs text-gray-500">{dm(record.month)} · {formatDate(record.date)}</div>
                                  </div>
                                </div>
                                <div className="font-bold text-amber-700">₹{Number(record.amount).toLocaleString('en-IN')}</div>
                              </div>
                              <div className="bg-white border border-amber-100 rounded-lg px-3 py-2 mb-3 flex items-center justify-between">
                                <span className="text-xs text-gray-500">{t('utr_number')}</span>
                                <span className="text-xs font-mono font-semibold text-gray-800 select-all">{record.utrNo}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleRejectPayment(record.id)}
                                  className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
                                >
                                  {t('reject_btn')}
                                </button>
                                <button
                                  onClick={() => handleApprovePayment(record.id)}
                                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                                >
                                  {t('approve_receipt_btn')}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Month filter */}
                  <div className="flex items-center gap-2 mb-4">
                    <Filter size={14} className="text-gray-400 shrink-0" />
                    <select
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                      value={selectedMonth}
                      onChange={e => setSelectedMonth(e.target.value)}
                    >
                      <option value="all">{t('all_months')}</option>
                      {MONTHS.map(m => <option key={m} value={m}>{dm(m)}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    {(() => {
                      const approved = (maintenanceRecords as any[]).filter(r => !r.status || r.status === 'approved');
                      const filtered = selectedMonth === 'all' ? approved : approved.filter((r: any) => r.month === selectedMonth);
                      const filteredTotal = filtered.reduce((s: number, r: any) => s + Number(r.amount), 0);
                      return <>
                        {selectedMonth !== 'all' && filtered.length > 0 && (
                          <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-2.5 flex justify-between items-center mb-2">
                            <span className="text-sm text-teal-700 font-medium">{selectedMonth} — {filtered.length} payment{filtered.length !== 1 ? 's' : ''}</span>
                            <span className="font-bold text-teal-700">{formatCurrency(filteredTotal)}</span>
                          </div>
                        )}
                        {filtered.length === 0 ? (
                          <div className="text-center py-10 text-gray-400">{t('no_records')}</div>
                        ) : (
                          filtered.map((record: any) => (
                        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 font-bold border border-teal-100">
                              {record.unit}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{dm(record.month)}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Calendar size={12} /> {formatDate(record.date)}
                              </div>
                              {record.utrNo && <div className="text-[10px] text-indigo-500 font-mono mt-0.5">UTR: {record.utrNo}</div>}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-emerald-600">+{formatCurrency(record.amount)}</div>
                              <div className="text-[10px] text-gray-400 font-mono mt-0.5">{record.receiptNo}</div>
                            </div>
                            <button onClick={() => deleteMaintenance(record.id)} className="text-gray-300 hover:text-red-500 p-1">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                        )}
                      </>;
                    })()}
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (() => {
                const filteredExp = selectedMonth === 'all'
                  ? expenseRecords
                  : expenseRecords.filter((r: any) => {
                      const d = new Date(r.date + 'T00:00:00');
                      const label = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
                      return label === selectedMonth;
                    });
                const filteredExpTotal = filteredExp.reduce((s: number, r: any) => s + Number(r.amount), 0);
                return (
                <div className="animate-in slide-in-from-right-4 duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{t('expenses')}</h2>
                    <button
                      onClick={() => setShowAddExpense(true)}
                      className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 active:bg-rose-700 transition-colors"
                    >
                      <PlusCircle size={16} /> {t('add_expense')}
                    </button>
                  </div>

                  {/* Month filter */}
                  <div className="flex items-center gap-2 mb-4">
                    <Filter size={14} className="text-gray-400 shrink-0" />
                    <select
                      className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                      value={selectedMonth}
                      onChange={e => setSelectedMonth(e.target.value)}
                    >
                      <option value="all">{t('all_months')}</option>
                      {MONTHS.map(m => <option key={m} value={m}>{dm(m)}</option>)}
                    </select>
                  </div>

                  {/* Totals Summary Card */}
                  <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg mb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-rose-100 text-sm font-medium uppercase tracking-wide">
                          {selectedMonth === 'all' ? 'Total Expenses' : `${selectedMonth} Expenses`}
                        </p>
                        <p className="text-3xl font-bold mt-1">{formatCurrency(filteredExpTotal)}</p>
                        <p className="text-rose-200 text-xs mt-1">{filteredExp.length} {filteredExp.length === 1 ? 'entry' : 'entries'}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                        <Receipt size={28} />
                      </div>
                    </div>
                    {filteredExp.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-2">
                        {EXPENSE_CATEGORIES.filter(cat => filteredExp.some((r: any) => r.category === cat)).map(cat => {
                          const catTotal = filteredExp.filter((r: any) => r.category === cat).reduce((s: number, r: any) => s + Number(r.amount), 0);
                          return (
                            <div key={cat} className="flex justify-between items-center bg-white/10 rounded-lg px-2 py-1.5">
                              <span className="text-xs text-rose-100 truncate mr-1">{cat}</span>
                              <span className="text-xs font-bold text-white shrink-0">{formatCurrency(catTotal)}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {filteredExp.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No expenses found{selectedMonth !== 'all' ? ` for ${selectedMonth}` : ''}.</div>
                    ) : (
                      filteredExp.map((record: any) => (
                        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="h-10 w-10 shrink-0 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 border border-rose-100">
                                <Receipt size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-800">{record.category}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{formatDate(record.date)}</div>
                                {record.notes && (
                                  <div className="mt-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100 whitespace-pre-wrap">
                                    {record.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-start gap-2 shrink-0">
                              <div className="font-bold text-rose-600 text-sm">-{formatCurrency(record.amount)}</div>
                              <button onClick={() => deleteExpense(record.id)} className="text-gray-300 hover:text-red-500 p-1">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                );
              })()}
              {activeTab === 'members' && renderMembersAdmin()}
              {activeTab === 'reports' && renderMonthlyReport()}
              {activeTab === 'complaints' && renderComplaintsAdmin()}
            </>
          )}

          {currentUserRole === 'member' && (
            <>
              {activeTab === 'member-home' && renderMemberHome()}
              {activeTab === 'member-complaints' && renderMemberComplaints()}
            </>
          )}
        </main>

        {/* Notice Ticker — members only */}
        {currentUserRole === 'member' && (notices as any[]).length > 0 && (
          <div className="shrink-0 bg-amber-50 border-y border-amber-200 overflow-hidden h-8 flex items-center">
            <style>{`@keyframes sss-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
            <div
              className="flex whitespace-nowrap text-xs font-medium text-amber-900"
              style={{ animation: 'sss-ticker 22s linear infinite' }}
            >
              <span className="px-8">{(notices as any[]).map((n: any) => n.text).join('   \u25C6   ')}</span>
              <span className="px-8">{(notices as any[]).map((n: any) => n.text).join('   \u25C6   ')}</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        {currentUserRole === 'admin' && (
          <nav className="shrink-0 bg-white border-t border-gray-200 flex safe-area-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            {([
              { tab: 'dashboard',   label: t('dashboard'), icon: <Home size={20} /> },
              { tab: 'maintenance', label: t('income'),    icon: <Wallet size={20} /> },
              { tab: 'expenses',    label: t('expenses'),  icon: <Receipt size={20} /> },
              { tab: 'reports',     label: t('reports'),   icon: <BarChart2 size={20} /> },
              { tab: 'members',     label: t('members'),   icon: <Users size={20} /> },
              { tab: 'complaints',  label: t('complaints'), icon: <MessageSquare size={20} /> },
            ] as { tab: string; label: string; icon: React.ReactNode }[]).map(({ tab, label, icon }) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 flex flex-col items-center justify-center pt-2 pb-3 gap-0.5 min-h-[56px] relative transition-colors"
                >
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-600 rounded-full" />
                  )}
                  <span className={active ? 'text-teal-600' : 'text-gray-400'}>{icon}</span>
                  <span className={`text-[10px] font-semibold ${active ? 'text-teal-600' : 'text-gray-400'}`}>{label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {currentUserRole === 'member' && (
          <nav className="shrink-0 bg-white border-t border-gray-200 flex safe-area-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            {([
              { tab: 'member-home',       label: t('my_home'),    icon: <Home size={22} /> },
              { tab: 'member-complaints', label: t('complaints'), icon: <MessageSquare size={22} /> },
            ] as { tab: string; label: string; icon: React.ReactNode }[]).map(({ tab, label, icon }) => {
              const active = activeTab === tab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="flex-1 flex flex-col items-center justify-center pt-2 pb-3 gap-0.5 min-h-[56px] relative">
                  {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full" />}
                  <span className={active ? 'text-indigo-600' : 'text-gray-400'}>{icon}</span>
                  <span className={`text-[10px] font-semibold ${active ? 'text-indigo-600' : 'text-gray-400'}`}>{label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {toastMessage && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-gray-800 text-white px-4 py-3 rounded-xl shadow-lg flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-5">
            <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>{toastMessage}</div>
          </div>
        )}

        {renderModals()}
      </div>
    </div>
  );
}