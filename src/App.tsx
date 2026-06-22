import React, { useState, useMemo, useEffect } from 'react';

const IconProps = { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" } as const;
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

const INITIAL_MEMBERS = [
  { id: 'm1', unit: '101', name: 'Rahul Sharma', phone: '9876543210' },
  { id: 'm2', unit: '102', name: 'Priya Patel', phone: '8765432109' },
];

const INITIAL_MAINTENANCE = [
  { id: '1', unit: '101', amount: 1500, month: 'June 2026', date: '2026-06-05', receiptNo: 'REC-001' },
];

const INITIAL_EXPENSES = [
  { id: '1', category: 'Lift Maintenance', amount: 2500, description: 'Monthly AMC', date: '2026-06-08' },
];

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

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export default function ShriSaiSquareApp() {
  // Auth & View States
  const [currentUserRole, setCurrentUserRole] = useState(null); // 'admin' or 'member'
  const [currentMember, setCurrentMember] = useState(null); 
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States (Using local memory arrays instead of Firebase for preview)
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [maintenanceRecords, setMaintenanceRecords] = useState(INITIAL_MAINTENANCE);
  const [expenseRecords, setExpenseRecords] = useState(INITIAL_EXPENSES);
  
  // UI States
  const [showAddMaintenance, setShowAddMaintenance] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [mForm, setMForm] = useState({ unit: '', amount: '1500', month: 'June 2026', date: new Date().toISOString().split('T')[0] });
  const [eForm, setEForm] = useState({ category: EXPENSE_CATEGORIES[0], amount: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [memberForm, setMemberForm] = useState({ unit: '', name: '', phone: '' });
  const [paymentForm, setPaymentForm] = useState({ month: 'June 2026', amount: '1500' });

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = maintenanceRecords.reduce((sum, record) => sum + Number(record.amount), 0);
    const expenses = expenseRecords.reduce((sum, record) => sum + Number(record.amount), 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    };
  }, [maintenanceRecords, expenseRecords]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddMaintenance = (e) => {
    e.preventDefault();
    if (!mForm.unit || !mForm.amount) return;
    
    const receiptNo = `REC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const newRecord = { ...mForm, id: Date.now().toString(), amount: Number(mForm.amount), receiptNo };
    
    // Pure React state update
    setMaintenanceRecords([newRecord, ...maintenanceRecords]);
    
    setShowAddMaintenance(false);
    setMForm({ unit: '', amount: '1500', month: 'June 2026', date: new Date().toISOString().split('T')[0] });
    showToast(`Maintenance added successfully! Receipt: ${receiptNo}`);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!eForm.amount || !eForm.category) return;

    const newRecord = { ...eForm, id: Date.now().toString(), amount: Number(eForm.amount) };
    
    setExpenseRecords([newRecord, ...expenseRecords]);
    
    setShowAddExpense(false);
    setEForm({ category: EXPENSE_CATEGORIES[0], amount: '', description: '', date: new Date().toISOString().split('T')[0] });
    showToast('Expense recorded successfully!');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!memberForm.unit || !memberForm.name) return;

    const newMember = { ...memberForm, id: `m${Date.now()}` };
    setMembers([...members, newMember]); 
    
    setShowAddMember(false);
    setMemberForm({ unit: '', name: '', phone: '' });
    showToast('Member added successfully!');
  };

  const deleteMaintenance = (id) => {
    setMaintenanceRecords(maintenanceRecords.filter(r => r.id !== id));
    showToast('Record deleted.');
  };

  const deleteExpense = (id) => {
    setExpenseRecords(expenseRecords.filter(r => r.id !== id));
    showToast('Expense deleted.');
  };

  const deleteMember = (id) => {
    setMembers(members.filter(r => r.id !== id));
    showToast('Member removed.');
  };

  const handleProcessPayment = () => {
    setTimeout(() => {
      const receiptNo = `REC-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      const newRecord = {
        id: Date.now().toString(),
        unit: currentMember.unit,
        amount: Number(paymentForm.amount),
        month: paymentForm.month,
        date: new Date().toISOString().split('T')[0],
        receiptNo: receiptNo
      };
      
      setMaintenanceRecords([newRecord, ...maintenanceRecords]);
      setShowPaymentGateway(false);
      
      showToast(
        <div>
          <strong>Payment Successful!</strong><br/>
          SMS sent to {currentMember.phone.slice(-4).padStart(10, '*')}: 
          "Received ₹{paymentForm.amount} for {paymentForm.month}. Receipt: {receiptNo}"
        </div>
      );
    }, 1500);
  };

  const renderLoginScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 animate-in zoom-in-95 duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-teal-50 text-center">
        <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building size={40} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Shri Sai Square</h2>
        <p className="text-gray-500 text-sm mb-8">Please select your role to continue</p>

        <div className="space-y-4">
          <button 
            onClick={() => { setCurrentUserRole('admin'); setActiveTab('dashboard'); }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-3 shadow-md"
          >
            <User size={20} /> Login as Admin
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or resident login</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {members.length > 0 ? (
              members.map(member => (
                <button
                  key={member.id}
                  onClick={() => { 
                    setCurrentUserRole('member'); 
                    setCurrentMember(member);
                    setActiveTab('member-home');
                  }}
                  className="bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 p-3 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  Flat {member.unit}
                </button>
              ))
            ) : (
              <div className="col-span-2 text-sm text-gray-400 py-2">
                No residents found. Please login as Admin to add flats.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Building size={100} /></div>
        <h3 className="text-teal-100 font-medium text-sm uppercase tracking-wider mb-1">Society Balance</h3>
        <div className="text-4xl font-bold mb-4">{formatCurrency(balance)}</div>
        
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-teal-400/30">
          <div>
            <div className="text-teal-100 text-xs uppercase mb-1">Total Received</div>
            <div className="font-semibold text-lg">{formatCurrency(totalIncome)}</div>
          </div>
          <div>
            <div className="text-teal-100 text-xs uppercase mb-1">Total Expenses</div>
            <div className="font-semibold text-lg">{formatCurrency(totalExpenses)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setActiveTab('maintenance')} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-full"><Wallet size={20} /></div>
          <span className="text-xs font-medium text-gray-700">Income</span>
        </button>
        <button onClick={() => setActiveTab('expenses')} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-full"><Receipt size={20} /></div>
          <span className="text-xs font-medium text-gray-700">Expenses</span>
        </button>
        <button onClick={() => setActiveTab('members')} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-full"><Users size={20} /></div>
          <span className="text-xs font-medium text-gray-700">Members</span>
        </button>
      </div>
    </div>
  );

  const renderMembersAdmin = () => (
    <div className="animate-in slide-in-from-right-4 duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Members Directory</h2>
        <button 
          onClick={() => setShowAddMember(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
        >
          <PlusCircle size={16} /> Add Member
        </button>
      </div>

      <div className="space-y-3">
        {members.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No members added yet.</div>
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
                    <Smartphone size={12} /> +91 {member.phone}
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

  const renderMemberHome = () => {
    const myPayments = maintenanceRecords.filter(r => r.unit === currentMember.unit);
    const paidMonths = myPayments.map(r => r.month);
    const nextDueMonth = MONTHS.find(m => !paidMonths.includes(m)) || MONTHS[0];

    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Hello, {currentMember.name}</h2>
              <p className="text-gray-500 text-sm">Flat {currentMember.unit}</p>
            </div>
            <div className="h-10 w-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
              {currentMember.unit}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-20"><CreditCard size={120} className="translate-x-4 translate-y-4"/></div>
          <h3 className="text-blue-100 font-medium text-sm mb-1">Next Maintenance Due</h3>
          <div className="text-3xl font-bold mb-1">₹1,500</div>
          <div className="text-blue-100 text-sm mb-6">For {nextDueMonth}</div>
          
          <button 
            onClick={() => {
              setPaymentForm({ month: nextDueMonth, amount: '1500' });
              setShowPaymentGateway(true);
            }}
            className="bg-white text-indigo-700 px-6 py-2.5 rounded-full font-bold text-sm w-full shadow-md active:scale-95 transition-transform"
          >
            Pay Now via HDFC Gateway
          </button>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} className="text-teal-600"/> Payment History
          </h3>
          <div className="space-y-3">
            {myPayments.length === 0 ? (
              <p className="text-center text-gray-400 py-4 text-sm">No payment history found.</p>
            ) : (
              myPayments.map(record => (
                <div key={record.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{record.month}</div>
                    <div className="text-xs text-gray-500 mt-1">Paid on {formatDate(record.date)}</div>
                    <div className="text-[10px] text-teal-600 font-mono mt-0.5 bg-teal-50 inline-block px-1 rounded">
                      {record.receiptNo}
                    </div>
                  </div>
                  <div className="font-bold text-emerald-600 text-sm">
                    {formatCurrency(record.amount)}
                  </div>
                </div>
              ))
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
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Record Offline Payment</h3>
            <form onSubmit={handleAddMaintenance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Flat</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.unit} onChange={e => setMForm({...mForm, unit: e.target.value})} required
                >
                  <option value="">Select a flat...</option>
                  {members.map(m => <option key={m.id} value={m.unit}>{m.unit} - {m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  type="number" required placeholder="1500" min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.amount} onChange={e => setMForm({...mForm, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">For Month</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.month} onChange={e => setMForm({...mForm, month: e.target.value})}
                >
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                <input 
                  type="date" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none"
                  value={mForm.date} onChange={e => setMForm({...mForm, date: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddMaintenance(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddExpense && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Record New Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.category} onChange={e => setEForm({...eForm, category: e.target.value})} required
                >
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  type="number" required placeholder="0" min="0"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.amount} onChange={e => setEForm({...eForm, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input 
                  type="text" placeholder="e.g. Lobby lights replaced"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={eForm.description} onChange={e => setEForm({...eForm, description: e.target.value})}
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
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Add New Member</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flat / Unit Number</label>
                <input 
                  type="text" required placeholder="e.g. 301"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.unit} onChange={e => setMemberForm({...memberForm, unit: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                <input 
                  type="text" required placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (for SMS)</label>
                <input 
                  type="tel" required placeholder="10-digit number" pattern="[0-9]{10}"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={memberForm.phone} onChange={e => setMemberForm({...memberForm, phone: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddMember(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="bg-[#004C8F] p-4 text-white flex items-center justify-between">
              <div className="font-bold text-lg tracking-wider">HDFC BANK</div>
              <div className="text-xs opacity-80 border border-white/30 px-2 py-1 rounded">SECURE PAYMENT</div>
            </div>
            
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500">Paying to</p>
                <p className="font-bold text-lg text-gray-800">Shri Sai Square Society</p>
              </div>
              <div className="flex justify-between items-center py-3 border-y border-gray-200 border-dashed">
                <span className="text-gray-600">{paymentForm.month} Dues</span>
                <span className="font-bold text-xl">₹{paymentForm.amount}</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-center text-gray-500 font-medium mb-2">CHOOSE PAYMENT METHOD</p>
              
              <button onClick={handleProcessPayment} className="w-full border border-gray-300 rounded-xl p-3 flex items-center justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded text-blue-700"><CreditCard size={20}/></div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800 group-hover:text-blue-700">Credit / Debit Card</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                  </div>
                </div>
              </button>

              <button onClick={handleProcessPayment} className="w-full border border-gray-300 rounded-xl p-3 flex items-center justify-between hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded text-green-700 font-bold">UPI</div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800 group-hover:text-blue-700">UPI ID / QR Code</div>
                    <div className="text-xs text-gray-500">GPay, PhonePe, Paytm</div>
                  </div>
                </div>
              </button>

              <button type="button" onClick={() => setShowPaymentGateway(false)} className="w-full py-3 mt-4 text-gray-500 text-sm font-medium hover:text-gray-800">
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (!currentUserRole) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center font-sans">
        <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
          {renderLoginScreen()}
        </div>
      </div>
    );
  }

  const AppHeader = () => (
    <header className={`${currentUserRole === 'admin' ? 'bg-teal-700' : 'bg-indigo-700'} text-white pt-10 pb-6 px-6 rounded-b-3xl shadow-md z-10 relative`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Building size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-tight">Shri Sai Square</h1>
            <p className="text-white/80 text-xs flex items-center gap-1">
              {currentUserRole === 'admin' ? 'Admin Portal' : `Flat ${currentMember.unit}`}
            </p>
          </div>
        </div>
        <button 
          onClick={() => { setCurrentUserRole(null); setCurrentMember(null); setActiveTab('dashboard'); }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl flex flex-col overflow-hidden pb-16">
        
        <AppHeader />

        <main className="flex-1 overflow-y-auto p-5 pb-24">
          {currentUserRole === 'admin' && (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              
              {activeTab === 'maintenance' && (
                <div className="animate-in slide-in-from-right-4 duration-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Maintenance</h2>
                    <button 
                      onClick={() => setShowAddMaintenance(true)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <PlusCircle size={16} /> Record Payment
                    </button>
                  </div>
                  <div className="space-y-3">
                    {maintenanceRecords.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No records found.</div>
                    ) : (
                      maintenanceRecords.map((record) => (
                        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 font-bold border border-teal-100">
                              {record.unit}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{record.month}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Calendar size={12} /> {formatDate(record.date)}
                              </div>
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
                  </div>
                </div>
              )}

              {activeTab === 'expenses' && (
                <div className="animate-in slide-in-from-right-4 duration-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Expenses</h2>
                    <button 
                      onClick={() => setShowAddExpense(true)}
                      className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 active:bg-rose-700 transition-colors"
                    >
                      <PlusCircle size={16} /> Add Expense
                    </button>
                  </div>

                  <div className="space-y-3">
                    {expenseRecords.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No expenses recorded.</div>
                    ) : (
                      expenseRecords.map((record) => (
                        <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 border border-rose-100">
                              <Receipt size={20} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{record.category}</div>
                              <div className="text-xs text-gray-500 max-w-[120px] truncate" title={record.description}>
                                {record.description || 'No description'}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                 {formatDate(record.date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-bold text-rose-600">-{formatCurrency(record.amount)}</div>
                            </div>
                            <button onClick={() => deleteExpense(record.id)} className="text-gray-300 hover:text-red-500 p-1">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'members' && renderMembersAdmin()}
            </>
          )}

          {currentUserRole === 'member' && renderMemberHome()}
        </main>

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