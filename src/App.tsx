import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Calendar, 
  CheckSquare, 
  CreditCard, 
  UserCircle, 
  Plus, 
  LogOut,
  Facebook,
  Menu,
  X,
  Trash2,
  ChevronRight,
  Filter,
  Check,
  Clock,
  MapPin,
  Edit,
  CalendarCheck,
  Phone,
  History,
  Moon,
  Sun,
  Globe,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { User, Batch, Student, Routine as TRoutine, Attendance, Payment, DashboardStats } from './types';

// --- TRANSLATIONS ---

const translations = {
  en: {
    dashboard: "Dashboard",
    batches: "Batches",
    students: "Students",
    routine: "Routine",
    attendance: "Attendance",
    payments: "Payment",
    profile: "Profile",
    home: "Home",
    enroll_student: "Enroll Student",
    add_batch: "Add New Batch",
    batch_name: "Batch Name",
    save: "Save",
    sign_out: "Sign Out",
    account_settings: "Account Settings",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    bangla: "Bangla",
    english: "English",
    full_name: "Full Name",
    email: "Email Address",
    mobile: "Mobile Number",
    dob: "Date of Birth",
    coaching_name: "Coaching Center Name",
    save_changes: "Save Changes",
    description: "is a simple and powerful tool designed for teachers and coaching centers to manage students, batches, attendance, routines, and monthly payments in one place. It helps you stay organized, track progress, and monitor income easily with a clean and user-friendly system.",
    updating: "Updating...",
    edit_profile_pic: "Edit Profile Picture",
    enter_url: "Enter image URL",
    username: "Username",
    current_org: "Current Organization",
    today_date: "Today's Date",
    total_students: "Total Students",
    active_batches: "Active Batches",
    collected: "Collected",
    outstanding: "Outstanding",
    live_schedule: "Live Schedule",
    revenue: "Revenue",
    monthly_goal: "Monthly Goal",
    on_track: "On Track 🚀",
    estimates: "Current Estimates",
    paid: "Paid",
    due: "Due",
    download_report: "Download Report",
    active_students: "Active Students",
    student_directory: "Student Directory",
    everywhere: "Everywhere",
    register_student: "Register Student",
    record_payment: "Record Payment",
    sessions: "sessions",
    class: "Class",
    started_on: "Started on",
    no_active: "No active enrollments",
    payment_history: "Payment History",
    total_paid: "Total Paid",
    total_pending: "Total Pending",
    no_records: "No payment records found.",
    month: "Month",
    amount: "Amount",
    date: "Date",
    status: "Status",
    welcome: "Welcome!",
    auth_desc: "Elevate your teaching management",
    create_account: "Create Account",
    follow_dev: "Follow Developer",
    log_system: "Log System",
    daily_roll: "Daily Roll",
    target_batch: "Target Batch",
    present: "Present",
    absent: "Absent",
    ready_roll: "Ready for Roll Call",
    select_target: "Select a batch to begin attendance",
    request_payment: "Record Payment",
    monthly_fee: "Monthly Fee",
    paid_status: "Paid",
    pending_status: "Pending",
    no_classes_today: "The schedule is clear for today. Enjoy your break!",
    no_batches: "You haven't added any batches yet.",
    no_students: "No students registered yet.",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    batches: "ব্যাচ সমূহ",
    students: "শিক্ষার্থী",
    routine: "রুটিন",
    attendance: "উপস্থিতি",
    payments: "পেমেন্ট",
    profile: "প্রোফাইল",
    home: "হোম",
    enroll_student: "ভর্তি করুন",
    add_batch: "নতুন ব্যাচ",
    batch_name: "ব্যাচের নাম",
    save: "সংরক্ষণ করুন",
    sign_out: "সাইন আউট",
    account_settings: "অ্যাকাউন্ট সেটিংস",
    theme: "থিম",
    language: "ভাষা",
    light: "লাইট মোড",
    dark: "ডার্ক মোড",
    bangla: "বাংলা",
    english: "ইংরেজি",
    full_name: "পুরো নাম",
    email: "ইমেইল ঠিকানা",
    mobile: "মোবাইল নম্বর",
    dob: "জন্ম তারিখ",
    coaching_name: "কোচিং সেন্টারের নাম",
    save_changes: "পরিবর্তন সংরক্ষণ করুন",
    description: "একটি সহজ এবং শক্তিশালী টুল যা শিক্ষক এবং কোচিং সেন্টারগুলোর শিক্ষার্থীদের পরিচালনা, ব্যাচ, উপস্থিতি, রুটিন এবং মাসিক পেমেন্ট এক জায়গায় ম্যানেজ করার জন্য ডিজাইন করা হয়েছে। এটি আপনাকে পরিচ্ছন্ন এবং ব্যবহারকারী-বান্ধব সিস্টেমের মাধ্যমে সঙ্গতিপূর্ণ থাকতে, উন্নতি ট্র্যাক করতে এবং আয় সহজে পর্যবেক্ষণ করতে সাহায্য করে।",
    updating: "আপডেট হচ্ছে...",
    edit_profile_pic: "প্রোফাইল ছবি পরিবর্তন করুন",
    enter_url: "ছবির URL লিখুন",
    username: "ইউজার নেম",
    current_org: "বর্তমান প্রতিষ্ঠান",
    today_date: "আজকের তারিখ",
    total_students: "মোট শিক্ষার্থী",
    active_batches: "সক্রিয় ব্যাচ",
    collected: "সংগৃহীত",
    outstanding: "বকেয়া",
    live_schedule: "লাইভ রুটিন",
    revenue: "রাজস্ব",
    monthly_goal: "মাসিক লক্ষ্য",
    on_track: "সঠিক পথে 🚀",
    estimates: "বর্তমান প্রাক্কলন",
    paid: "পরিশোধিত",
    due: "বকেয়া",
    download_report: "রিপোর্ট নামান",
    active_students: "সক্রিয় শিক্ষার্থী",
    student_directory: "শিক্ষার্থী তালিকা",
    everywhere: "সবগুলো",
    register_student: "শিক্ষার্থী নিবন্ধন",
    record_payment: "পেমেন্ট রেকর্ড",
    sessions: "টি ক্লাস",
    class: "ক্লাস",
    started_on: "শুরু হয়েছে",
    no_active: "কোন সক্রিয় ভর্তি নেই",
    payment_history: "পেমেন্ট ইতিহাস",
    total_paid: "মোট পরিশোধিত",
    total_pending: "মোট বকেয়া",
    no_records: "কোন পেমেন্ট রেকর্ড খুঁজে পাওয়া যায়নি।",
    month: "মাস",
    amount: "পরিমাণ",
    date: "তারিখ",
    status: "অবস্থা",
    welcome: "স্বাগতম!",
    auth_desc: "আপনার শিক্ষকতা পরিচালনাকে সহজতর করুন",
    create_account: "অ্যাকাউন্ট তৈরী করুন",
    follow_dev: "ডেভলপারকে ফলো করুন",
    present: "উপস্থিত",
    absent: "অনুপস্থিত",
    log_system: "লগ সিস্টেম",
    daily_roll: "দৈনিক হাজিরা",
    target_batch: "ব্যাচ নির্বাচন করুন",
    ready_roll: "হাজিরা নিতে তৈরি?",
    select_target: "টার্গেট ব্যাচ নির্বাচন করুন",
    request_payment: "পেমেন্ট রেকর্ড",
    monthly_fee: "মাসিক ফি",
    paid_status: "পরিশোধিত",
    pending_status: "বকেয়া",
    no_classes_today: "আজকের রুটিন খালি। একটু বিশ্রাম নিন!",
    no_batches: "আপনি এখনো কোনো ব্যাচ যোগ করেননি।",
    no_students: "কোনো শিক্ষার্থী নিবন্ধিত নেই।",
  }
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('student_mgmt_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      setActiveTab(e.detail);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('student_mgmt_user', JSON.stringify(user));
      // Apply theme to document element
      if (user.theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
    } else {
      localStorage.removeItem('student_mgmt_user');
      document.documentElement.classList.remove('dark');
    }
  }, [user]);

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const tabs = [
    { id: 'dashboard', label: t.home, icon: LayoutDashboard },
    { id: 'batches', label: t.batches, icon: Layers },
    { id: 'students', label: t.students, icon: Users },
    { id: 'routine', label: t.routine, icon: Calendar },
    { id: 'attendance', label: t.attendance, icon: CheckSquare },
    { id: 'payments', label: t.payments, icon: CreditCard },
    { id: 'profile', label: t.profile, icon: UserCircle },
  ];

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('student_mgmt_user');
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col md:flex-row transition-colors duration-500",
      isDark ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-800"
    )}>
      {/* Mobile Header */}
      <div className={cn(
        "md:hidden p-4 flex justify-between items-center sticky top-0 z-50 border-b shadow-sm",
        isDark ? "bg-slate-900/80 backdrop-blur-md border-slate-800 text-white" : "bg-white p-4 flex justify-between items-center text-slate-800 shadow-sm border-slate-100"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6A11CB] to-[#2575FC] flex items-center justify-center text-white shadow-md overflow-hidden ring-2 ring-indigo-500/20">
            {user.logo_url ? <img src={user.logo_url} alt="Logo" className="w-full h-full object-cover" /> : <Layers size={20} />}
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black leading-tight tracking-tight">{user.coaching_name || 'Student Mgmt'}</h1>
            <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{activeTab === 'dashboard' ? t.home : t[activeTab as keyof typeof t]}</span>
          </div>
        </div>
        <button onClick={handleLogout} className={cn("p-2 rounded-lg", isDark ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")}>
          <LogOut size={20} />
        </button>
      </div>

      {/* Sidebar / Navigation (Desktop) */}
      <nav 
        className={cn(
          "sticky top-0 left-0 h-screen w-72 shadow-2xl z-40 flex flex-col pt-6 pb-2 border-r hidden md:flex transition-colors duration-500",
          isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        )}
      >
        <div className="px-6 mb-8">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6A11CB] to-[#2575FC] flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-indigo-500/10 overflow-hidden">
               {user.logo_url ? <img src={user.logo_url} alt="Logo" className="w-full h-full object-cover" /> : <Layers size={24} />}
             </div>
             <div>
                <h1 className={cn("text-lg font-black leading-tight uppercase", isDark ? "text-white" : "text-slate-800")}>{user.coaching_name || 'STUDENT'}</h1>
                <p className="text-[10px] font-bold text-indigo-500 tracking-[0.2em]">{user.coaching_name ? (user.language === 'bn' ? 'সেন্টার' : 'CENTER') : (user.language === 'bn' ? 'ম্যানেজমেন্ট' : 'MANAGEMENT')}</p>
             </div>
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1 mt-4">{t.current_org}</p>
           <p className={cn("text-sm font-black px-1 truncate", isDark ? "text-slate-300" : "text-slate-700")}>{user.coaching_name}</p>
        </div>

        <div className="flex-1 px-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                activeTab === tab.id 
                ? "bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white shadow-lg shadow-indigo-500/20 translate-x-1" 
                : isDark ? "text-slate-500 hover:bg-slate-800 hover:text-indigo-400" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              )}
            >
              <tab.icon size={20} className={cn(
                "transition-transform",
                activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className={cn("font-bold text-[15px]", activeTab === tab.id ? "" : "")}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={cn("px-4 py-4 mt-auto border-t", isDark ? "border-slate-800" : "border-slate-100")}>
           <div className={cn("flex items-center gap-3 p-3 rounded-2xl mb-3 border transition-colors", isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100")}>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white/10 shrink-0">
                {user.profile_pic ? <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" /> : <UserCircle size={40} className="text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-black truncate", isDark ? "text-white" : "text-slate-800")}>{user.name || user.username}</p>
                <p className="text-[10px] text-slate-500 truncate font-bold">{user.email || 'No email set'}</p>
              </div>
           </div>
           <button 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all",
              isDark ? "border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20" : "border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100"
            )}
           >
             <LogOut size={18} />
             {t.sign_out}
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 p-4 md:p-10 pb-24 md:pb-10 max-h-screen overflow-y-auto transition-colors duration-500",
        isDark ? "bg-slate-950" : "bg-[#F8FAFC]"
      )}>
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'batches' && <Batches user={user} />}
          {activeTab === 'students' && <Students user={user} />}
          {activeTab === 'routine' && <RoutineView user={user} />}
          {activeTab === 'attendance' && <AttendanceView user={user} />}
          {activeTab === 'payments' && <Payments user={user} />}
          {activeTab === 'profile' && <Profile user={user} onUpdate={setUser} />}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 border-t px-2 py-3 flex justify-around items-center z-50 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.15)] transition-colors duration-500",
        "bg-blue-600 border-blue-500"
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[3.5rem] transition-all",
              activeTab === tab.id ? "text-white" : "text-white/60"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              activeTab === tab.id ? "bg-white/20" : ""
            )}>
              <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            </div>
            <span className={cn("text-[8px] font-black uppercase tracking-widest", activeTab === tab.id ? "opacity-100" : "opacity-60")}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- AUTH COMPONENT ---

function Auth({ onLogin }: { onLogin: (u: User) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Account Created Successfully');
        setTimeout(() => onLogin(data.user), 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#6A11CB] via-[#4842e3] to-[#2575FC] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/40 ring-4 ring-white/10">
             <Layers className="text-white" size={40} />
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Welcome!</h2>
          <p className="text-white/80 font-medium">Elevate your teaching management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-white/70 uppercase tracking-widest ml-1">Username</label>
            <input 
              type="text" 
              placeholder="e.g. yahya19"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all font-medium"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-white/70 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all font-medium"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-[#6A11CB] font-black rounded-2xl py-4 flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#6A11CB] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Create Account
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {message && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className={cn("text-center font-bold px-4 py-2 rounded-xl border", message.includes('Successfully') ? "bg-green-400/20 border-green-400/40 text-green-100" : "bg-red-400/20 border-red-400/40 text-red-100")}
            >
              {message}
            </motion.p>
          )}
        </form>

        <div className="mt-12 flex flex-col items-center">
          <a 
            href="https://www.facebook.com/yahyaalmamun19" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all group mb-4"
          >
            <div className="p-2 bg-white rounded-full">
              <Facebook className="text-[#1877F2]" size={20} />
            </div>
            <span className="text-white font-bold">Follow Developer</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS (DASHBOARD, BATCHES, ETC) ---

function Dashboard({ user }: { user: User }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  useEffect(() => {
    fetch(`/api/dashboard/stats?userId=${user.id}`)
      .then(r => r.json())
      .then(setStats);
  }, [user.id]);

  if (!stats) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10 pt-4">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div>
          <h2 className={cn("text-4xl font-black tracking-tight leading-tight uppercase", isDark ? "text-indigo-400" : "text-[#2575FC]")}>
            {t.dashboard}
          </h2>
          <p className={cn("font-bold text-[13px] md:text-sm mt-3 max-w-2xl leading-relaxed text-justify", isDark ? "text-slate-400" : "text-slate-500")}>
            <span className="text-indigo-600 uppercase">{user.coaching_name || (user.language === 'bn' ? 'স্টুডেন্ট ম্যানেজমেন্ট' : 'STUDENT’S MANAGEMENT')}</span> {t.description}
          </p>
        </div>
        <div className={cn("p-4 rounded-3xl shadow-xl border flex items-center gap-4 transition-colors duration-500", isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-50 shadow-slate-200/50")}>
           <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calendar size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.today_date}</p>
              <p className={cn("font-black", isDark ? "text-white" : "text-slate-800")}>{new Date().toLocaleDateString(user.language === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
           </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label={t.total_students} value={stats.totalStudents} icon={Users} gradient="from-violet-600 to-indigo-700" isDark={isDark} language={user.language} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'students' }))} />
        <StatCard label={t.active_batches} value={stats.activeBatches} icon={Layers} gradient="from-blue-600 to-indigo-600" isDark={isDark} language={user.language} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'batches' }))} />
        <StatCard label={t.collected} value={`৳${stats.summary.collected}`} icon={CheckSquare} gradient="from-emerald-500 to-teal-700" isDark={isDark} language={user.language} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'payments' }))} />
        <StatCard label={t.outstanding} value={`৳${stats.summary.pending}`} icon={CreditCard} gradient="from-rose-500 to-pink-700" isDark={isDark} language={user.language} onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'payments' }))} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Today's Classes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={cn("text-2xl font-black flex items-center gap-3", isDark ? "text-white" : "text-slate-800")}>
               <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
               {t.live_schedule}
            </h3>
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              {stats.todayClasses.length} {t.sessions}
            </span>
          </div>
          
          <div className="grid gap-4">
            {stats.todayClasses.length > 0 ? (
              stats.todayClasses.map((item: TRoutine) => (
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  key={item.id} 
                  className={cn(
                    "p-6 rounded-[2.5rem] border shadow-sm grow-effect flex items-center justify-between group cursor-pointer transition-all",
                    isDark ? "bg-slate-900 border-slate-800 hover:bg-slate-800" : "bg-white border-slate-100 hover:shadow-md"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-16 h-16 rounded-3xl flex flex-col items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner",
                      isDark ? "bg-slate-800 text-indigo-400" : "bg-slate-50 text-indigo-600"
                    )}>
                       <Clock size={24} />
                       <span className="text-[8px] font-black uppercase mt-1">{t.class}</span>
                    </div>
                    <div>
                      <h4 className={cn("text-xl font-black group-hover:text-indigo-600 transition-colors", isDark ? "text-slate-200" : "text-slate-800")}>{item.batch_name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-slate-400 text-sm font-bold flex items-center gap-1.5">
                           <Clock size={14} className="opacity-50" />
                           {item.time}
                        </p>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <p className="text-slate-400 text-sm font-bold flex items-center gap-1.5">
                           <Layers size={14} className="opacity-50" />
                           {item.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", isDark ? "bg-slate-800 text-slate-600 group-hover:bg-indigo-900/50 group-hover:text-indigo-400" : "bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600")}>
                    <ChevronRight size={24} />
                  </div>
                </motion.div>
              ))
            ) : (
              <EmptyState message={t.no_classes_today} isDark={isDark} />
            )}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="space-y-6">
           <h3 className={cn("text-2xl font-black flex items-center gap-3", isDark ? "text-white" : "text-slate-800")}>
              <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
              {t.revenue}
           </h3>
           <div className={cn(
             "p-10 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(30,41,59,0.3)] text-white relative overflow-hidden group",
             isDark ? "bg-slate-900 border border-slate-800" : "bg-gradient-to-br from-[#1E293B] to-[#0F172A]"
           )}>
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <CreditCard size={28} className="text-indigo-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 font-bold uppercase text-[10px] tracking-widest">{t.monthly_goal}</p>
                    <p className="text-xs font-black text-emerald-400">{t.on_track}</p>
                  </div>
                </div>

                <p className="text-white/50 font-bold uppercase text-[10px] tracking-[0.2em] mb-2 text-center">{t.estimates}</p>
                <p className="text-6xl font-black mb-1 text-center tracking-tighter">
                  ৳{stats.summary.collected + stats.summary.pending}
                </p>
                
                <div className="space-y-6 mt-10">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                       <span className="text-emerald-400">{t.collected}</span>
                       <span className="text-white/40">{Math.round((stats.summary.collected / (stats.summary.collected + stats.summary.pending || 1)) * 100)}%</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5" title="Progress of payments collected vs pending for current month">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.summary.collected / (stats.summary.collected + stats.summary.pending || 1)) * 100}%` }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                      <p className="text-white/30 text-[9px] font-black uppercase mb-1">{t.paid}</p>
                      <p className="text-xl font-black text-emerald-400">৳{stats.summary.collected}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                      <p className="text-white/30 text-[9px] font-black uppercase mb-1">{t.due}</p>
                      <p className="text-xl font-black text-rose-400">৳{stats.summary.pending}</p>
                    </div>
                  </div>
                </div>
             </div>
           </div>

           <button 
             onClick={async () => {
               const res = await fetch(`/api/dashboard/stats?userId=${user.id}`);
               const data = await res.json();
               const csvContent = "data:text/csv;charset=utf-8," 
                + "Category,Value\n"
                + `Total Students,${data.totalStudents}\n`
                + `Active Batches,${data.activeBatches}\n`
                + `Collected,${data.summary.collected}\n`
                + `Pending,${data.summary.pending}\n`;
               const encodedUri = encodeURI(csvContent);
               const link = document.createElement("a");
               link.setAttribute("href", encodedUri);
               link.setAttribute("download", "report.csv");
               document.body.appendChild(link);
               link.click();
             }}
             className="w-full py-5 rounded-[2rem] bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center gap-3 hover:bg-indigo-100 transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-indigo-400 dark:hover:bg-slate-800"
           >
              {t.download_report}
              <ChevronRight size={18} />
           </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon: Icon, gradient, isDark, language, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className={cn(
        "p-8 rounded-[2.5rem] border shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-500",
        isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-50 shadow-slate-200/40"
      )}
    >
       <div className={cn("absolute -top-10 -right-10 w-40 h-40 opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-1000 rounded-full bg-slate-900")}>
          <Icon size={160} />
       </div>
       
       <div className={cn("w-14 h-14 rounded-[1.5rem] mb-6 bg-gradient-to-br flex items-center justify-center text-white shadow-2xl transition-all group-hover:rotate-12 group-hover:scale-110", gradient)}>
          <Icon size={28} />
       </div>
       
       <div>
         <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-indigo-600 transition-colors uppercase">{label}</p>
         <div className="flex items-baseline gap-1">
            <p className={cn("text-4xl font-black tracking-tight group-hover:translate-x-1 transition-transform", isDark ? "text-white" : "text-slate-800")}>{value}</p>
         </div>
       </div>
       
       <div className="mt-8 flex items-center justify-between">
          <div className="flex -space-x-2">
             {[1,2,3].map(i => (
                <div key={i} className={cn("w-6 h-6 rounded-full border-2 bg-slate-100 flex items-center justify-center overflow-hidden transition-colors", isDark ? "border-slate-800" : "border-white")}>
                   <div className="w-full h-full bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-300">
                      U{i}
                   </div>
                 </div>
              ))}
           </div>
           <span className="text-[10px] text-indigo-500 font-black tracking-tighter bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900/40">{language === 'bn' ? 'সদস্য' : 'Members'}</span>
        </div>
     </motion.div>
  );
}


// --- MODULE: BATCHES ---

function Batches({ user }: { user: User }) {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState({ name: '', start_date: '', status: 'Active' });

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const fetchBatches = () => {
    fetch(`/api/batches?userId=${user.id}`).then(r => r.json()).then(setBatches);
  };

  useEffect(fetchBatches, [user.id]);

  useEffect(() => {
    if (editingBatch) {
      setFormData({ 
        name: editingBatch.name || '', 
        start_date: editingBatch.start_date ? new Date(editingBatch.start_date).toISOString().split('T')[0] : '', 
        status: editingBatch.status || 'Active' 
      });
      setIsModalOpen(true);
    } else {
      setFormData({ name: '', start_date: '', status: 'Active' });
    }
  }, [editingBatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingBatch ? `/api/batches/${editingBatch.id}` : '/api/batches';
    const method = editingBatch ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Failed to save batch');
      setFormData({ name: '', start_date: '', status: 'Active' });
      setIsModalOpen(false);
      setEditingBatch(null);
      fetchBatches();
    } catch (err) {
      alert(user.language === 'bn' ? 'সংরক্ষণ করতে সমস্যা হয়েছে' : 'Failed to save batch');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(user.language === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Are you sure?')) return;
    try {
      const res = await fetch(`/api/batches/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchBatches();
    } catch (err) {
      alert(user.language === 'bn' ? 'ডিলেট করতে সমস্যা হয়েছে' : 'Failed to delete');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-3xl font-black", isDark ? "text-white" : "text-slate-800")}>{t.batches}</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg hover:bg-indigo-700 transition-all shadow-indigo-200"
        >
          <Plus size={20} />
          <span className="hidden md:inline">{t.add_batch}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className={cn(
            "p-6 rounded-[2.5rem] border shadow-sm hover:shadow-md transition-all relative group",
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          )}>
            <div className="flex justify-between items-start mb-6">
               <div className={cn(
                 "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                 batch.status === 'Active' ? "bg-green-100 text-green-600" :
                 batch.status === 'Upcoming' ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"
               )}>
                 {batch.status}
               </div>
               <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingBatch(batch)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                     <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(batch.id)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors">
                     <Trash2 size={18} />
                  </button>
               </div>
            </div>
            <h3 className={cn("text-2xl font-black leading-tight mb-2 tracking-tight", isDark ? "text-white" : "text-slate-800")}>{batch.name}</h3>
            <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
              <Calendar size={14} />
              {t.started_on}: {new Date(batch.start_date).toLocaleDateString(user.language === 'bn' ? 'bn-BD' : 'en-US')}
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => { setIsModalOpen(false); setEditingBatch(null); }} title={editingBatch ? (user.language === 'bn' ? 'ব্যাচ এডিট করুন' : 'Edit Batch') : t.add_batch}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.batch_name}</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                  placeholder="e.g. Science Batch A"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.dob}</label>
                <input 
                  type="date" 
                  value={formData.start_date} 
                  onChange={e => setFormData({...formData, start_date: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.status}</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                >
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">
                {t.save}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- MODULE: STUDENTS ---

function Students({ user }: { user: User }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [viewHistoryStudent, setViewHistoryStudent] = useState<Student | null>(null);
  const [filterBatch, setFilterBatch] = useState<number | 'all'>('all');
  const [formData, setFormData] = useState({ name: '', batch_id: 0, start_date: '', phone: '', monthly_fee: 0, notes: '' });

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const fetchData = () => {
    fetch(`/api/students?userId=${user.id}`).then(r => r.json()).then(setStudents);
    fetch(`/api/batches?userId=${user.id}`).then(r => r.json()).then(setBatches);
  };

  useEffect(fetchData, [user.id]);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        batch_id: editingStudent.batch_id || 0,
        start_date: editingStudent.start_date || '',
        phone: editingStudent.phone || '',
        monthly_fee: editingStudent.monthly_fee || 0,
        notes: editingStudent.notes || ''
      });
      setIsModalOpen(true);
    } else {
      setFormData({ name: '', batch_id: 0, start_date: '', phone: '', monthly_fee: 0, notes: '' });
    }
  }, [editingStudent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batch_id) return alert(user.language === 'bn' ? 'দয়া করে একটি ব্যাচ নির্বাচন করুন' : 'Please select a batch');
    
    const url = editingStudent ? `/api/students/${editingStudent.id}` : '/api/students';
    const method = editingStudent ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Failed to save student');
      setFormData({ name: '', batch_id: 0, start_date: '', phone: '', monthly_fee: 0, notes: '' });
      setIsModalOpen(false);
      setEditingStudent(null);
      fetchData();
    } catch (err) {
      alert(user.language === 'bn' ? 'সংরক্ষণ করতে সমস্যা হয়েছে' : 'Failed to save student');
    }
  };

  const filtered = filterBatch === 'all' ? students : students.filter(s => s.batch_id === filterBatch);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <div className="w-8 h-1 bg-indigo-600 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.student_directory}</span>
           </div>
           <h2 className={cn("text-4xl font-black tracking-tight", isDark ? "text-white" : "text-slate-800")}>{t.active_students}</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <select 
              value={filterBatch} 
              onChange={e => setFilterBatch(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className={cn(
                "pl-12 pr-10 py-4 rounded-2xl border shadow-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-indigo-100 transition-all min-w-[200px]",
                isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-100 text-slate-600"
              )}
            >
              <option value="all">{t.everywhere}</option>
              {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
               <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
          
          <button 
            onClick={() => setIsBatchModalOpen(true)}
            className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all group dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white"
            title="Quick Add Batch"
          >
            <Layers size={22} className="group-hover:rotate-12 transition-transform" />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="h-14 px-6 bg-slate-800 text-white rounded-2xl shadow-xl shadow-slate-200 flex items-center gap-2 font-black tracking-tight hover:bg-slate-700 transition-all dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            <Plus size={22} />
            <span className="hidden sm:inline">{t.enroll_student}</span>
          </button>
        </div>
      </div>

      <div className={cn(
        "rounded-[3rem] border shadow-2xl overflow-hidden relative group transition-colors duration-500",
        isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-50 shadow-slate-200/50"
      )}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={isDark ? "bg-slate-800/50" : "bg-slate-50/50"}>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.full_name}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.batches}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.mobile}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.payments}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
              {filtered.map((s) => (
                <tr key={s.id} className={cn("transition-all duration-300 group/row", isDark ? "hover:bg-slate-800/40" : "hover:bg-indigo-50/20")}>
                  <td className="px-10 py-6">
                     <div className="flex items-center gap-4">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-inner", isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400")}>
                           {s.name.charAt(0)}
                        </div>
                        <p className={cn("font-black tracking-tight", isDark ? "text-slate-200" : "text-slate-800")}>{s.name}</p>
                     </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-400">
                      {s.batch_name}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-slate-500 font-bold text-sm">{s.phone}</td>
                  <td className="px-10 py-6">
                    <span className={cn("font-black", isDark ? "text-slate-300" : "text-slate-800")}>৳{s.monthly_fee}</span>
                  </td>
                   <td className="px-10 py-6">
                        <div className="flex items-center justify-center gap-2 transition-all">
                           <button 
                              onClick={() => setViewHistoryStudent(s)}
                              className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm dark:bg-slate-800 dark:text-indigo-400"
                              title="Payment History"
                           >
                              <History size={16} />
                           </button>
                           <button onClick={() => setEditingStudent(s)} className={cn("p-3 rounded-2xl transition-all", isDark ? "bg-slate-800 text-slate-500 hover:bg-slate-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200")}><Edit size={16} /></button>
                           <button 
                              onClick={async () => {
                                if (!window.confirm(user.language === 'bn' ? 'শিক্ষার্থী ডিলেট করবেন?' : 'Delete student?')) return;
                                try {
                                  const res = await fetch(`/api/students/${s.id}`, { method: 'DELETE' });
                                  if (!res.ok) throw new Error('Delete failed');
                                  fetchData();
                                } catch (err) {
                                  alert(user.language === 'bn' ? 'ডিলেট করতে সমস্যা হয়েছে' : 'Failed to delete');
                                }
                              }}
                              className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-4">
               <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", isDark ? "bg-slate-900" : "bg-slate-50")}>
                  <Users size={40} className="opacity-20" />
               </div>
               <p className="font-black text-sm uppercase tracking-widest">{t.no_active}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => { setIsModalOpen(false); setEditingStudent(null); }} title={editingStudent ? (user.language === 'bn' ? 'শিক্ষার্থী এডিট করুন' : 'Edit Student') : t.register_student}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.full_name}</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="field-input py-4 rounded-[1.5rem]" placeholder="e.g. John Doe" />
                 </div>
                 <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.batches}</label>
                    <select required value={formData.batch_id} onChange={e => setFormData({...formData, batch_id: Number(e.target.value)})} className="field-input py-4 rounded-[1.5rem]">
                       <option value={0}>{t.batches}</option>
                       {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.mobile}</label>
                    <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="field-input py-4 rounded-[1.5rem]" placeholder="+880 1234..." />
                 </div>
                 <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.payments} (Monthly)</label>
                    <input type="number" step="0.01" value={formData.monthly_fee} onChange={e => setFormData({...formData, monthly_fee: Number(e.target.value)})} className="field-input py-4 rounded-[1.5rem]" />
                 </div>
                 <div className="space-y-2 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.dob}</label>
                    <input type="date" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="field-input py-4 rounded-[1.5rem]" />
                 </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100">
                {t.save}
              </button>
            </form>
          </Modal>
        )}

        {isBatchModalOpen && (
          <Modal onClose={() => setIsBatchModalOpen(false)} title={t.add_batch}>
             <BatchForm 
               user={user} 
               onSuccess={() => {
                 fetchData();
                 setIsBatchModalOpen(false);
               }} 
             />
          </Modal>
        )}

        {viewHistoryStudent && (
          <Modal onClose={() => setViewHistoryStudent(null)} title={`${t.payment_history} - ${viewHistoryStudent.name}`}>
             <StudentPaymentHistory user={user} student={viewHistoryStudent} />
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Add a helper component for Batch creation to reuse 
function BatchForm({ user, onSuccess }: { user: User, onSuccess: () => void }) {
  const [formData, setFormData] = useState({ name: '', start_date: new Date().toISOString().split('T')[0], status: 'Active' });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Failed to add batch');
      onSuccess();
    } catch (err) {
      alert(user.language === 'bn' ? 'ব্যাচ যোগ করতে সমস্যা হয়েছে' : 'Failed to add batch');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Batch Identity</label>
        <input 
          type="text" 
          required 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
          placeholder="e.g. Advanced Mathematics"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Official Commencement</label>
        <input 
          type="date" 
          value={formData.start_date} 
          onChange={e => setFormData({...formData, start_date: e.target.value})}
          className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
        />
      </div>
      <button type="submit" className="w-full bg-slate-800 text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-slate-900 transition-all">Enable Batch</button>
    </form>
  );
}

function StudentPaymentHistory({ user, student }: { user: User, student: Student }) {
  const [history, setHistory] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({ student_id: student.id, month: '', amount: 0, status: 'Pending' as 'Paid' | 'Pending', payment_date: '' });

  const fetchData = () => {
    fetch(`/api/payments/student/${student.id}?userId=${user.id}`)
      .then(r => r.json())
      .then(data => {
        setHistory(data);
        setIsLoading(false);
      });
  };

  useEffect(fetchData, [student.id, user.id]);

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        student_id: student.id,
        month: editingPayment.month || '',
        amount: editingPayment.amount || 0,
        status: editingPayment.status || 'Pending',
        payment_date: editingPayment.payment_date || ''
      });
    }
  }, [editingPayment, student.id]);

  const handleDelete = async (id: number) => {
    if (!window.confirm(user.language === 'bn' ? 'ডিলিট করবেন?' : 'Delete payment?')) return;
    try {
      const res = await fetch(`/api/payments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchData();
    } catch (err) {
      alert(user.language === 'bn' ? 'ডিলেট করতে সমস্যা হয়েছে' : 'Failed to delete');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPayment) return;
    try {
      const res = await fetch(`/api/payments/${editingPayment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Update failed');
      setEditingPayment(null);
      fetchData();
    } catch (err) {
      alert(user.language === 'bn' ? 'আপডেট করতে সমস্যা হয়েছে' : 'Failed to update');
    }
  };

  if (isLoading) return <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/40">
             <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 dark:text-emerald-400">Total Paid</p>
             <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300">৳{history.filter(h => h.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0)}</p>
          </div>
          <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 dark:bg-rose-950/30 dark:border-rose-900/40">
             <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1 dark:text-rose-400">Total Pending</p>
             <p className="text-3xl font-black text-rose-700 dark:text-rose-300">৳{history.filter(h => h.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0)}</p>
          </div>
       </div>

       {editingPayment && (
         <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 dark:bg-slate-800 dark:border-slate-700">
            <h4 className="font-black mb-4 text-indigo-600">Update Record</h4>
            <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-3">
               <input type="text" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="field-input text-xs" placeholder="Month" />
               <input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} className="field-input text-xs" placeholder="Amount" />
               <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="field-input text-xs col-span-2">
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
               </select>
               <div className="col-span-2 flex gap-2">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white font-black py-2 rounded-xl text-xs">Save</button>
                  <button type="button" onClick={() => setEditingPayment(null)} className="flex-1 bg-slate-200 text-slate-600 font-black py-2 rounded-xl text-xs">Cancel</button>
               </div>
            </form>
         </div>
       )}

       <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
          <table className="w-full text-left font-sans">
             <thead>
                <tr className="bg-slate-100/50 dark:bg-slate-800/50">
                   <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Month</th>
                   <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                   <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                   <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map(p => (
                   <tr key={p.id} className="hover:bg-white dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-sm">{p.month}</td>
                      <td className="px-6 py-4 font-black text-slate-800 dark:text-slate-200 text-sm">৳{p.amount}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                           "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                           p.status === 'Paid' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                           {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex justify-center gap-1">
                            <button onClick={() => setEditingPayment(p)} className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                               <Edit size={12} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                               <Trash2 size={12} />
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
          {history.length === 0 && <div className="py-12 text-center text-slate-400 font-bold italic">No payment records found.</div>}
       </div>
    </div>
  );
}

// --- MODULE: ATTENDANCE ---

function AttendanceView({ user }: { user: User }) {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const fetchBatches = () => {
    fetch(`/api/batches?userId=${user.id}`).then(r => r.json()).then(setBatches);
  };

  useEffect(fetchBatches, [user.id]);

  useEffect(() => {
    if (selectedBatch) {
      fetch(`/api/students?userId=${user.id}`).then(r => r.json()).then(res => {
        setStudents(res.filter((s: Student) => s.batch_id === selectedBatch));
      });
      fetch(`/api/attendance?userId=${user.id}&date=${date}&batchId=${selectedBatch}`)
        .then(r => r.json())
        .then(setAttendance);
    } else {
      setStudents([]);
    }
  }, [selectedBatch, date, user.id]);

  const markAttendance = async (studentId: number, status: 'Present' | 'Absent') => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, student_id: studentId, batch_id: selectedBatch, date, status })
      });
      if (!res.ok) throw new Error('Failed to mark attendance');
      // Optimistic update
      setAttendance(prev => {
        const filtered = prev.filter(a => a.student_id !== studentId);
        return [...filtered, { student_id: studentId, status } as any];
      });
    } catch (err) {
      alert(user.language === 'bn' ? 'উপস্থিতি সংরক্ষণে ত্রুটি' : 'Failed to mark attendance');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <div className="w-8 h-1 bg-indigo-600 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.log_system}</span>
           </div>
           <h2 className={cn("text-4xl font-black tracking-tight", isDark ? "text-white" : "text-slate-800")}>{t.daily_roll}</h2>
        </div>
        
        <div className="flex gap-4">
           <div className={cn("p-2 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center gap-1", isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-slate-100/50")}>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={cn("bg-transparent px-4 py-2 font-bold outline-none", isDark ? "text-slate-300" : "text-slate-600")} />
              <div className={cn("w-[1px] h-6 hidden sm:block mx-1", isDark ? "bg-slate-800" : "bg-slate-100")}></div>
              <div className="flex items-center gap-2">
                 <select 
                  value={selectedBatch} 
                  onChange={e => setSelectedBatch(Number(e.target.value))}
                  className={cn("bg-transparent px-4 py-2 font-black outline-none appearance-none min-w-[150px]", isDark ? "text-indigo-400" : "text-indigo-600")}
                 >
                    <option value={0}>{t.target_batch}</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                 </select>
                 <button 
                  onClick={() => setIsBatchModalOpen(true)}
                  className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all mr-2 dark:bg-indigo-950/30 dark:border-indigo-900/40 dark:text-indigo-400"
                 >
                    <Plus size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map(s => {
          const status = attendance.find(a => a.student_id === s.id)?.status;
          return (
            <motion.div 
              whileHover={{ y: -5 }}
              key={s.id} 
              className={cn(
                "p-8 rounded-[3rem] border shadow-xl flex flex-col items-center text-center group transition-colors duration-500",
                isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-50 shadow-slate-200/40"
              )}
            >
              <div className={cn(
                "w-20 h-20 rounded-3xl mb-4 flex items-center justify-center font-black text-2xl transition-all duration-500",
                isDark ? "bg-slate-800 text-slate-500 group-hover:bg-indigo-900/40 group-hover:text-indigo-400" : "bg-slate-50 text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              )}>
                 {s.name.charAt(0)}
              </div>
              <p className={cn("text-xl font-black leading-tight mb-1", isDark ? "text-slate-200" : "text-slate-800")}>{s.name}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">{s.phone || (user.language === 'bn' ? 'কোন নম্বর নেই' : 'No Contact')}</p>
              
              <div className="flex gap-4 w-full">
                 <button 
                  onClick={() => markAttendance(s.id, 'Present')}
                  className={cn(
                    "flex-1 py-4 rounded-2xl flex flex-col items-center font-black text-[10px] uppercase tracking-widest gap-2 transition-all border-2",
                    status === 'Present' ? "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-200" : isDark ? "bg-slate-800 border-slate-700 text-slate-500 hover:border-emerald-500 hover:text-emerald-500" : "bg-white border-slate-50 text-slate-300 hover:border-emerald-200 hover:text-emerald-500"
                  )}
                 >
                   <Check size={20} />
                   {t.present}
                 </button>
                 <button 
                  onClick={() => markAttendance(s.id, 'Absent')}
                  className={cn(
                    "flex-1 py-4 rounded-2xl flex flex-col items-center font-black text-[10px] uppercase tracking-widest gap-2 transition-all border-2",
                    status === 'Absent' ? "bg-rose-500 border-rose-500 text-white shadow-xl shadow-rose-200" : isDark ? "bg-slate-800 border-slate-700 text-slate-500 hover:border-rose-500 hover:text-rose-500" : "bg-white border-slate-50 text-slate-300 hover:border-rose-200 hover:text-rose-500"
                  )}
                 >
                   <X size={20} />
                   {t.absent}
                 </button>
              </div>
            </motion.div>
          );
        })}
        {selectedBatch === 0 && (
          <div className={cn(
            "col-span-full py-40 text-center flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed text-slate-300 gap-6 transition-colors duration-500",
            isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          )}>
             <div className={cn("w-24 h-24 rounded-full flex items-center justify-center", isDark ? "bg-slate-800" : "bg-white")}>
                <CheckSquare size={44} className="opacity-10" />
             </div>
             <div>
                <p className={cn("text-xl font-black mb-1 tracking-tight", isDark ? "text-slate-200" : "text-slate-800")}>{t.ready_roll}</p>
                <p className="font-bold text-slate-400">{t.select_target}</p>
             </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isBatchModalOpen && (
           <Modal onClose={() => setIsBatchModalOpen(false)} title={t.add_batch}>
             <BatchForm 
               user={user} 
               onSuccess={() => {
                 fetchBatches();
                 setIsBatchModalOpen(false);
               }} 
             />
           </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


// --- MODULE: ROUTINE ---

function RoutineView({ user }: { user: User }) {
  const [routines, setRoutines] = useState<TRoutine[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<TRoutine | null>(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [formData, setFormData] = useState({ batch_id: 0, day: 'Sun', time: '', notes: '' });

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const fetchData = () => {
    fetch(`/api/routines?userId=${user.id}`).then(r => r.json()).then(setRoutines);
    fetch(`/api/batches?userId=${user.id}`).then(r => r.json()).then(setBatches);
  };

  useEffect(fetchData, [user.id]);

  useEffect(() => {
    if (editingRoutine) {
      setFormData({
        batch_id: editingRoutine.batch_id || 0,
        day: editingRoutine.day || 'Sun',
        time: editingRoutine.time || '',
        notes: editingRoutine.notes || ''
      });
      setIsModalOpen(true);
    } else {
      setFormData({ batch_id: 0, day: 'Sun', time: '', notes: '' });
    }
  }, [editingRoutine]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingRoutine ? `/api/routines/${editingRoutine.id}` : '/api/routines';
    const method = editingRoutine ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Failed to save routine');
      setFormData({ batch_id: 0, day: 'Sun', time: '', notes: '' });
      setIsModalOpen(false);
      setEditingRoutine(null);
      fetchData();
    } catch (err) {
      alert(user.language === 'bn' ? 'রুটিন সংরক্ষণ করতে সমস্যা হয়েছে' : 'Failed to save routine');
    }
  };

  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const bnDays = ['শনিবার', 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-3xl font-black", isDark ? "text-white" : "text-slate-800")}>{t.routine}</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-black shadow-lg shadow-indigo-100">
           <Plus size={20} />
           <span className="hidden md:inline">{user.language === 'bn' ? 'সাপ্তাহিক রুটিন যোগ করুন' : 'Schedule Class'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day, idx) => {
          const dayClasses = routines.filter(r => r.day === day);
          return (
            <div key={day} className={cn(
              "p-6 rounded-[2.5rem] border shadow-sm transition-colors duration-500",
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
            )}>
              <div className="flex items-center justify-between mb-6">
                 <h3 className={cn("text-xl font-black", isDark ? "text-indigo-400" : "text-indigo-600")}>
                   {user.language === 'bn' ? bnDays[idx] : day}
                 </h3>
                 <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs", isDark ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-400")}>
                   {dayClasses.length}
                 </div>
              </div>
              <div className="space-y-3">
                 {dayClasses.map(c => (
                   <div key={c.id} className={cn(
                     "p-4 rounded-2xl border flex items-center justify-between group transition-all",
                     isDark ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800" : "bg-slate-50 border-white hover:bg-white hover:shadow-sm"
                   )}>
                      <div className="flex-1 min-w-0 mr-4">
                         <p className={cn("text-sm font-black truncate", isDark ? "text-slate-200" : "text-slate-800")}>{c.batch_name}</p>
                         <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                            <Clock size={10} />
                            {c.time}
                         </div>
                      </div>
                       <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setEditingRoutine(c)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all shadow-sm"
                          >
                             <Edit size={14} />
                          </button>
                          <button 
                            onClick={async () => {
                              if (window.confirm(user.language === 'bn' ? 'ডিলিট করবেন?' : 'Delete?')) {
                                try {
                                  const res = await fetch(`/api/routines/${c.id}`, { method: 'DELETE' });
                                  if (!res.ok) throw new Error('Delete failed');
                                  fetchData();
                                } catch (err) {
                                  alert(user.language === 'bn' ? 'ডিলেট করতে সমস্যা হয়েছে' : 'Failed to delete');
                                }
                              }
                            }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shadow-sm"
                          >
                             <Trash2 size={14} />
                          </button>
                       </div>
                   </div>
                 ))}
                 {dayClasses.length === 0 && <p className="p-4 text-slate-300 font-bold italic text-sm">{user.language === 'bn' ? 'কোন ক্লাস নেই' : 'No classes scheduled.'}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => { setIsModalOpen(false); setEditingRoutine(null); }} title={editingRoutine ? (user.language === 'bn' ? 'রুটিন এডিট করুন' : 'Edit Routine') : (user.language === 'bn' ? 'নতুন রুটিন' : 'Add to Routine')}>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.batches}</label>
                    <button 
                      type="button"
                      onClick={() => setIsBatchModalOpen(true)}
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                    >
                      + {t.add_batch}
                    </button>
                  </div>
                  <select required value={formData.batch_id} onChange={e => setFormData({...formData, batch_id: Number(e.target.value)})} className="field-input">
                     <option value={0}>{user.language === 'bn' ? 'নির্বাচন করুন' : 'Select...'}</option>
                     {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'দিন' : 'Day'}</label>
                    <select value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})} className="field-input">
                       {days.map((d, i) => <option key={d} value={d}>{user.language === 'bn' ? bnDays[i] : d}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'সময়' : 'Time'}</label>
                    <input type="text" placeholder="e.g. 10:00 AM" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="field-input" required />
                 </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'বিষয়' : 'Subject/Notes'}</label>
                  <input type="text" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="field-input" />
               </div>
               <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 mt-4">{t.save}</button>
            </form>
          </Modal>
        )}

        {isBatchModalOpen && (
           <Modal onClose={() => setIsBatchModalOpen(false)} title={t.add_batch}>
             <BatchForm 
               user={user} 
               onSuccess={() => {
                 fetchData();
                 setIsBatchModalOpen(false);
               }} 
             />
           </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- MODULE: PAYMENTS ---

function Payments({ user }: { user: User }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({ student_id: 0, month: '', amount: 0, status: 'Pending', payment_date: '' });

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const fetchData = () => {
    fetch(`/api/payments?userId=${user.id}`).then(r => r.json()).then(setPayments);
    fetch(`/api/students?userId=${user.id}`).then(r => r.json()).then(setStudents);
  };

  useEffect(fetchData, [user.id]);

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        student_id: editingPayment.student_id || 0,
        month: editingPayment.month || '',
        amount: editingPayment.amount || 0,
        status: editingPayment.status || 'Pending',
        payment_date: editingPayment.payment_date || ''
      });
      setIsModalOpen(true);
    } else {
      const now = new Date();
      const currentMonth = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      setFormData({ student_id: 0, month: currentMonth, amount: 0, status: 'Pending', payment_date: now.toISOString().split('T')[0] });
    }
  }, [editingPayment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingPayment ? `/api/payments/${editingPayment.id}` : '/api/payments';
    const method = editingPayment ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (!res.ok) throw new Error('Failed to save payment');
      setFormData({ student_id: 0, month: '', amount: 0, status: 'Pending', payment_date: '' });
      setIsModalOpen(false);
      setEditingPayment(null);
      fetchData();
    } catch (err) {
      alert(user.language === 'bn' ? 'পেমেন্ট সংরক্ষণ করতে সমস্যা হয়েছে' : 'Failed to save payment');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={cn("text-3xl font-black", isDark ? "text-white" : "text-slate-800")}>{t.payments}</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 font-black shadow-lg">
           <Plus size={20} />
           <span className="hidden md:inline">{t.request_payment}</span>
        </button>
      </div>

      <div className={cn(
        "rounded-[2.5rem] border shadow-xl overflow-hidden transition-colors duration-500",
        isDark ? "bg-slate-900 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
      )}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={cn("border-b", isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50 border-slate-100")}>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.students}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.language === 'bn' ? 'মাস' : 'Month'}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{user.language === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{user.language === 'bn' ? 'অবস্থা' : 'Status'}</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className={cn("divide-y", isDark ? "divide-slate-800" : "divide-slate-50")}>
              {payments.map((p) => (
                <tr key={p.id} className={cn("transition-colors group", isDark ? "hover:bg-slate-800/40 border-slate-800" : "hover:bg-slate-50 border-slate-50")}>
                  <td className={cn("px-8 py-5 font-bold", isDark ? "text-slate-200" : "text-slate-800")}>{p.student_name}</td>
                  <td className="px-8 py-5 text-slate-500 font-bold">{p.month}</td>
                  <td className={cn("px-8 py-5 text-right font-black", isDark ? "text-slate-200" : "text-slate-800")}>৳{p.amount}</td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <span className={cn(
                        "flex items-center gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-4",
                        p.status === 'Paid' ? "bg-green-50 text-green-600 ring-green-100/50 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-900/20" : "bg-red-50 text-red-600 ring-red-100/50 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-900/20"
                      )}>
                        {p.status === 'Paid' ? <Check size={12}/> : <Clock size={12}/>}
                        {p.status === 'Paid' ? (translations[user.language as keyof typeof translations]?.paid_status || 'Paid') : (translations[user.language as keyof typeof translations]?.pending_status || 'Pending')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                        <div className="flex items-center justify-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                           <button onClick={() => setEditingPayment(p)} className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                              <Edit size={16} />
                           </button>
                           <button 
                             onClick={async () => { 
                               if(confirm(user.language === 'bn' ? 'ডিলিট করবেন?' : 'Delete?')){ 
                                 try {
                                   const res = await fetch(`/api/payments/${p.id}`, {method: 'DELETE'});
                                   if (!res.ok) throw new Error('Delete failed');
                                   fetchData();
                                 } catch (err) {
                                   alert(user.language === 'bn' ? 'ডিলেট করতে সমস্যা হয়েছে' : 'Failed to delete');
                                 }
                               }
                             }}
                             className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                           >
                             <Trash2 size={18} />
                           </button>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && <div className="p-20 text-center text-slate-400 font-bold">{user.language === 'bn' ? 'কোন পেমেন্ট তথ্য নেই' : 'No payment history.'}</div>}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => { setIsModalOpen(false); setEditingPayment(null); }} title={editingPayment ? (user.language === 'bn' ? 'পেমেন্ট এডিট করুন' : 'Edit Payment') : (user.language === 'bn' ? 'পেমেন্ট রেকর্ড' : 'Record Payment')}>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.students}</label>
                  <select required value={formData.student_id} onChange={e => setFormData({...formData, student_id: Number(e.target.value)})} className="field-input py-4 rounded-2xl dark:bg-slate-800 dark:border-slate-700">
                     <option value={0}>{user.language === 'bn' ? 'শিক্ষার্থী নির্বাচন করুন' : 'Select Student'}</option>
                     {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.batch_name})</option>)}
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'মাস' : 'Month'}</label>
                    <input type="text" placeholder="e.g. May 2026" required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="field-input py-4 rounded-2xl dark:bg-slate-800 dark:border-slate-700" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.payments}</label>
                    <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} className="field-input py-4 rounded-2xl dark:bg-slate-800 dark:border-slate-700" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'অবস্থা' : 'Status'}</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="field-input py-4 rounded-2xl dark:bg-slate-800 dark:border-slate-700">
                       <option value="Pending">{translations[user.language as keyof typeof translations]?.pending_status || 'Pending'}</option>
                       <option value="Paid">{translations[user.language as keyof typeof translations]?.paid_status || 'Paid'}</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.language === 'bn' ? 'তারিখ' : 'Payment Date'}</label>
                     <input type="date" value={formData.payment_date} onChange={e => setFormData({...formData, payment_date: e.target.value})} className="field-input py-4 rounded-2xl dark:bg-slate-800 dark:border-slate-700" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 mt-4">{t.save}</button>
             </form>
           </Modal>
         )}
       </AnimatePresence>
    </motion.div>
  );
}

// --- MODULE: PROFILE ---

function Profile({ user, onUpdate }: { user: User, onUpdate: (u: User) => void }) {
  const [formData, setFormData] = useState({...user});
  const [isSaving, setIsSaving] = useState(false);
  const [editImage, setEditImage] = useState<'profile' | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  // Sync formData if user prop changes externally
  useEffect(() => {
    setFormData({...user});
  }, [user]);

  const t = translations[user.language || 'en'];
  const isDark = user.theme === 'dark';

  const updatePreference = async (updates: Partial<User>) => {
    const updatedUser = { ...user, ...updates };
    // Immediately update parent state for instant UI reaction
    onUpdate(updatedUser);
    
    // Add logic to apply/remove .dark class for full-app dark mode
    if (updates.theme) {
      if (updates.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const data = await res.json();
      if (!data.success) {
        // Rollback if failed
        onUpdate(user);
        console.error("Update failed", data.message);
      }
    } catch (err) {
      onUpdate(user);
      console.error("Failed to update preference", err);
    }
  };

  const handleImageUpdate = () => {
    if (editImage === 'profile') {
      const newUpdates = { ...formData, profile_pic: imageUrl };
      setFormData(newUpdates);
      updatePreference({ profile_pic: imageUrl });
    }
    setEditImage(null);
    setImageUrl('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(formData.language === 'bn' ? 'ফাইল সাইজ ২এমবি এর নিচে হতে হবে' : 'File size must be under 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        onUpdate(data.user);
        alert(formData.language === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Profile updated successfully!');
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (err) {
      console.error("Failed to save profile", err);
      alert(formData.language === 'bn' ? 'সংরক্ষণ করতে সমস্যা হয়েছে' : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
      <h2 className={cn("text-4xl font-black tracking-tight", isDark ? "text-white" : "text-slate-800")}>{t.account_settings}</h2>
      
      <div className={cn("rounded-[2.5rem] border shadow-xl p-8 md:p-12 relative overflow-hidden transition-colors duration-500", isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100")}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-24 -mt-24"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
             <div 
               onClick={() => { setEditImage('profile'); setImageUrl(formData.profile_pic || ''); }}
               className="relative group cursor-pointer"
             >
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden ring-8 ring-slate-50 dark:ring-slate-900 transition-all group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900/50">
                   {formData.profile_pic ? (
                     <img src={formData.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <UserCircle className="w-full h-full text-slate-300 dark:text-slate-700" />
                   )}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2.5rem]">
                   <Camera className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 border-4 border-white dark:border-slate-900">
                   <Plus size={16} />
                </div>
             </div>

             <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.username}</p>
                <p className="text-2xl font-black text-indigo-600">@{user.username}</p>
                <p className={cn("text-xs font-bold mt-1", isDark ? "text-slate-500" : "text-slate-400")}>
                  {formData.language === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করতে এখানে ক্লিক করুন' : 'Click on image to update profile picture'}
                </p>
             </div>
          </div>

          {/* Preferences Section */}
          <div className={cn("p-6 rounded-3xl border grid grid-cols-1 md:grid-cols-2 gap-6", isDark ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-100")}>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.language}</label>
                <div className="flex bg-white/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                   <button 
                    type="button"
                    onClick={() => updatePreference({ language: 'en' })}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2",
                      user.language === 'en' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none" : isDark ? "text-slate-500" : "text-slate-400"
                    )}
                   >
                     <Globe size={16} />
                     {t.english}
                   </button>
                   <button 
                    type="button"
                    onClick={() => updatePreference({ language: 'bn' })}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2",
                      user.language === 'bn' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none" : isDark ? "text-slate-500" : "text-slate-400"
                    )}
                   >
                     <Globe size={16} />
                     {t.bangla}
                   </button>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.theme}</label>
                <div className="flex bg-white/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                   <button 
                    type="button"
                    onClick={() => updatePreference({ theme: 'light' })}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2",
                      user.theme === 'light' ? "bg-white text-slate-800 shadow-lg shadow-slate-200" : isDark ? "text-slate-500" : "text-slate-400"
                    )}
                   >
                     <Sun size={16} />
                     {t.light}
                   </button>
                   <button 
                    type="button"
                    onClick={() => updatePreference({ theme: 'dark' })}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2",
                      user.theme === 'dark' ? "bg-slate-900 text-white shadow-lg" : isDark ? "text-slate-500" : "text-slate-400"
                    )}
                   >
                     <Moon size={16} />
                     {t.dark}
                   </button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label={t.full_name} value={formData.name || ''} onChange={(v:any) => setFormData({...formData, name: v})} placeholder="e.g. Yahya Al Mamun" />
            <InputField label={t.email} type="email" value={formData.email || ''} onChange={(v:any) => setFormData({...formData, email: v})} placeholder="yahya@example.com" />
            <InputField label={t.mobile} value={formData.mobile || ''} onChange={(v:any) => setFormData({...formData, mobile: v})} placeholder="+880 1234 567 890" />
            <InputField label={t.dob} type="date" value={formData.dob || ''} onChange={(v:any) => setFormData({...formData, dob: v})} />
            <InputField label={t.coaching_name} value={formData.coaching_name || ''} onChange={(v:any) => setFormData({...formData, coaching_name: v})} placeholder="e.g. Mamun's Coaching" spanFull />
          </div>

          <button 
            type="submit" 
            disabled={isSaving}
            className="w-full bg-[#6A11CB] text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-indigo-100 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isSaving ? t.updating : t.save_changes}
          </button>
        </form>

        <AnimatePresence>
           {editImage && (
             <Modal onClose={() => setEditImage(null)} title={t.edit_profile_pic}>
                <div className="space-y-6">
                   <div 
                     onClick={() => document.getElementById('profile-upload')?.click()}
                     className={cn(
                       "w-full aspect-square md:aspect-video rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed cursor-pointer group relative transition-colors",
                       isDark ? "bg-slate-800 border-slate-700 hover:border-indigo-500" : "bg-slate-50 border-slate-200 hover:border-indigo-400"
                     )}
                   >
                      {imageUrl ? (
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center gap-2">
                           <Upload size={48} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                           <p className="text-xs font-bold uppercase tracking-widest">{formData.language === 'bn' ? 'গ্যালারি থেকে ফটো' : 'Select from Gallery'}</p>
                        </div>
                      )}
                      <input 
                        id="profile-upload"
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                   </div>
                   <button 
                    onClick={handleImageUpdate}
                    disabled={!imageUrl}
                    className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                   >
                     {t.save}
                   </button>
                </div>
             </Modal>
           )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- SHARED UI ---

function InputField({ label, value, onChange, type = 'text', placeholder, spanFull, disabled }: any) {
  return (
    <div className={cn("space-y-2", spanFull && "md:col-span-2")}>
      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full rounded-2xl px-6 py-4 outline-none font-bold placeholder:text-slate-300 transition-all border",
          "dark:bg-slate-800/50 dark:border-slate-800 dark:text-white dark:focus:ring-4 dark:focus:ring-indigo-900/40",
          "bg-slate-50 border-slate-100 text-slate-800 focus:ring-4 focus:ring-indigo-50"
        )}
      />
    </div>
  );
}

function Modal({ children, onClose, title }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={cn(
          "w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border",
          "dark:bg-slate-900 dark:border-slate-800",
          "bg-white"
        )}
      >
        <div className={cn(
          "px-8 py-6 border-b flex justify-between items-center",
          "dark:bg-slate-900 dark:border-slate-800",
          "bg-slate-50/50 border-slate-50"
        )}>
           <h3 className={cn("text-xl font-black tracking-tight", "dark:text-white", "text-slate-800")}>{title}</h3>
           <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <X size={20} className="text-slate-400" />
           </button>
        </div>
        <div className="p-8 max-h-[80vh] overflow-y-auto">
           {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EmptyState({ message, isDark }: { message: string, isDark?: boolean }) {
  return (
    <div className={cn(
      "p-12 text-center rounded-[2.5rem] border border-dashed shadow-sm transition-colors duration-500",
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    )}>
       <Layers className={cn("mx-auto mb-4", isDark ? "text-slate-700" : "text-slate-200")} size={48} />
       <p className={cn("font-bold italic", isDark ? "text-slate-500" : "text-slate-400")}>{message}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-xl"></div>
    </div>
  );
}
