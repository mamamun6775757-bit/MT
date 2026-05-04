export interface User {
  id: number;
  username: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
  dob: string | null;
  profile_pic: string | null;
  logo_url: string | null;
  coaching_name: string | null;
  language: 'en' | 'bn';
  theme: 'light' | 'dark';
}

export interface Batch {
  id: number;
  user_id: number;
  name: string;
  start_date: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface Student {
  id: number;
  user_id: number;
  batch_id: number;
  name: string;
  start_date: string;
  phone: string;
  monthly_fee: number;
  notes: string;
  batch_name?: string;
}

export interface Routine {
  id: number;
  user_id: number;
  batch_id: number;
  day: string;
  time: string;
  notes: string;
  batch_name?: string;
}

export interface Attendance {
  id: number;
  user_id: number;
  student_id: number;
  batch_id: number;
  date: string;
  status: 'Present' | 'Absent';
}

export interface Payment {
  id: number;
  user_id: number;
  student_id: number;
  month: string;
  amount: number;
  status: 'Paid' | 'Pending';
  payment_date: string;
  student_name?: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeBatches: number;
  todayClasses: Routine[];
  summary: {
    collected: number;
    pending: number;
  };
}
