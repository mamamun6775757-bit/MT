import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('student_mgmt.db');
db.pragma('foreign_keys = ON');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT,
    email TEXT,
    mobile TEXT,
    dob TEXT,
    profile_pic TEXT,
    logo_url TEXT,
    coaching_name TEXT,
    language TEXT DEFAULT 'en',
    theme TEXT DEFAULT 'light'
  );

  CREATE TABLE IF NOT EXISTS batches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    start_date TEXT,
    status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    batch_id INTEGER,
    name TEXT,
    start_date TEXT,
    phone TEXT,
    monthly_fee REAL,
    notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS routines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    batch_id INTEGER,
    day TEXT,
    time TEXT,
    notes TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    student_id INTEGER,
    batch_id INTEGER,
    date TEXT,
    status TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    student_id INTEGER,
    month TEXT,
    amount REAL,
    status TEXT,
    payment_date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
  );
`);

// Migration to ensure Foreign Key Constraints with CASCADE are applied to existing tables
const tablesToMigrate = ['batches', 'students', 'routines', 'attendance', 'payments'];
for (const table of tablesToMigrate) {
  try {
    const tableInfo = db.prepare(`PRAGMA foreign_key_list(${table})`).all() as any[];
    if (tableInfo.length > 0) {
      const hasCascade = tableInfo.some(fk => fk.on_delete === 'CASCADE');
      if (!hasCascade) {
        console.log(`Migrating table ${table} to add ON DELETE CASCADE...`);
        const schema = db.prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name='${table}'`).get() as any;
        const createSql = schema.sql;
        
        db.transaction(() => {
          db.exec(`ALTER TABLE ${table} RENAME TO ${table}_old`);
          // Re-create the table with the new schema (explicitly defined with CASCADE)
          // We extract the base definition from the top db.exec or just use the ones we want
          if (table === 'batches') {
            db.exec(`CREATE TABLE batches (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, name TEXT, start_date TEXT, status TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`);
          } else if (table === 'students') {
            db.exec(`CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, batch_id INTEGER, name TEXT, start_date TEXT, phone TEXT, monthly_fee REAL, notes TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE)`);
          } else if (table === 'routines') {
            db.exec(`CREATE TABLE routines (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, batch_id INTEGER, day TEXT, time TEXT, notes TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE)`);
          } else if (table === 'attendance') {
            db.exec(`CREATE TABLE attendance (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, student_id INTEGER, batch_id INTEGER, date TEXT, status TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE, FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE)`);
          } else if (table === 'payments') {
            db.exec(`CREATE TABLE payments (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, student_id INTEGER, month TEXT, amount REAL, status TEXT, payment_date TEXT, FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE)`);
          }
          
          // Copy data
          const columns = db.prepare(`PRAGMA table_info(${table}_old)`).all() as any[];
          const colNames = columns.map(c => c.name).join(', ');
          db.exec(`INSERT INTO ${table} (${colNames}) SELECT ${colNames} FROM ${table}_old`);
          db.exec(`DROP TABLE ${table}_old`);
        })();
      }
    }
  } catch (err) {
    console.error(`Migration error for ${table}:`, err);
  }
}

// Migrations: Add columns if missing (for existing databases)
const columns = [
  { name: 'name', type: 'TEXT' },
  { name: 'email', type: 'TEXT' },
  { name: 'mobile', type: 'TEXT' },
  { name: 'dob', type: 'TEXT' },
  { name: 'profile_pic', type: 'TEXT' },
  { name: 'logo_url', type: 'TEXT' },
  { name: 'coaching_name', type: 'TEXT' },
  { name: 'language', type: 'TEXT DEFAULT "en"' },
  { name: 'theme', type: 'TEXT DEFAULT "light"' }
];

for (const col of columns) {
  try {
    db.prepare(`SELECT ${col.name} FROM users LIMIT 1`).get();
  } catch (e) {
    db.exec(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Auth: Register (includes Login behavior as requested)
  app.post('/api/auth/register', (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
      if (existingUser) {
        if (existingUser.password === password) {
          return res.json({ success: true, user: existingUser });
        }
        return res.status(400).json({ success: false, message: 'Username exists with different password.' });
      }
      const info = db.prepare('INSERT INTO users (username, password, coaching_name) VALUES (?, ?, ?)').run(username, password, '');
      const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
      res.json({ success: true, user: newUser });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Profile Update
  app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, dob, profile_pic, logo_url, coaching_name, language, theme } = req.body;
    try {
      db.prepare(`
        UPDATE users SET 
          name = ?, email = ?, mobile = ?, dob = ?, profile_pic = ?, logo_url = ?, coaching_name = ?, language = ?, theme = ?
        WHERE id = ?
      `).run(name, email, mobile, dob, profile_pic, logo_url, coaching_name, language, theme, id);
      const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
      res.json({ success: true, user: updatedUser });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Batches
  app.get('/api/batches', (req, res) => {
    try {
      const { userId } = req.query;
      const batches = db.prepare('SELECT * FROM batches WHERE user_id = ?').all(userId);
      res.json(batches);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/batches', (req, res) => {
    try {
      const { user_id, name, start_date, status } = req.body;
      const info = db.prepare('INSERT INTO batches (user_id, name, start_date, status) VALUES (?, ?, ?, ?)').run(user_id, name, start_date, status);
      res.json({ id: Number(info.lastInsertRowid) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/batches/:id', (req, res) => {
    try {
      const { name, start_date, status } = req.body;
      const info = db.prepare('UPDATE batches SET name = ?, start_date = ?, status = ? WHERE id = ?').run(name, start_date, status, req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/batches/:id', (req, res) => {
    try {
      const info = db.prepare('DELETE FROM batches WHERE id = ?').run(req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Students
  app.get('/api/students', (req, res) => {
    try {
      const { userId } = req.query;
      const students = db.prepare(`
        SELECT students.*, batches.name as batch_name 
        FROM students 
        LEFT JOIN batches ON students.batch_id = batches.id 
        WHERE students.user_id = ?
      `).all(userId);
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/students', (req, res) => {
    try {
      const { user_id, batch_id, name, start_date, phone, monthly_fee, notes } = req.body;
      const info = db.prepare('INSERT INTO students (user_id, batch_id, name, start_date, phone, monthly_fee, notes) VALUES (?, ?, ?, ?, ?, ?, ?)').run(user_id, batch_id, name, start_date, phone, monthly_fee, notes);
      res.json({ id: Number(info.lastInsertRowid) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/students/:id', (req, res) => {
    try {
      const { batch_id, name, start_date, phone, monthly_fee, notes } = req.body;
      const info = db.prepare('UPDATE students SET batch_id = ?, name = ?, start_date = ?, phone = ?, monthly_fee = ?, notes = ? WHERE id = ?')
        .run(batch_id, name, start_date, phone, monthly_fee, notes, req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/students/:id', (req, res) => {
    try {
      const info = db.prepare('DELETE FROM students WHERE id = ?').run(req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Attendance
  app.get('/api/attendance', (req, res) => {
    try {
      const { userId, date, batchId } = req.query;
      let query = 'SELECT * FROM attendance WHERE user_id = ?';
      const params = [userId];
      if (date) { query += ' AND date = ?'; params.push(date); }
      if (batchId) { query += ' AND batch_id = ?'; params.push(batchId); }
      const attendance = db.prepare(query).all(...params);
      res.json(attendance);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/attendance', (req, res) => {
    try {
      const { user_id, student_id, batch_id, date, status } = req.body;
      const existing = db.prepare('SELECT id FROM attendance WHERE user_id = ? AND student_id = ? AND date = ?').get(user_id, student_id, date) as any;
      if (existing) {
        db.prepare('UPDATE attendance SET status = ? WHERE id = ?').run(status, existing.id);
      } else {
        db.prepare('INSERT INTO attendance (user_id, student_id, batch_id, date, status) VALUES (?, ?, ?, ?, ?)').run(user_id, student_id, batch_id, date, status);
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/attendance', (req, res) => {
    try {
      const { userId, studentId, date } = req.query;
      db.prepare('DELETE FROM attendance WHERE user_id = ? AND student_id = ? AND date = ?').run(userId, studentId, date);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Routine
  app.get('/api/routines', (req, res) => {
    try {
      const { userId } = req.query;
      const routines = db.prepare(`
        SELECT routines.*, batches.name as batch_name 
        FROM routines 
        LEFT JOIN batches ON routines.batch_id = batches.id 
        WHERE routines.user_id = ?
      `).all(userId);
      res.json(routines);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/routines', (req, res) => {
    try {
      const { user_id, batch_id, day, time, notes } = req.body;
      const info = db.prepare('INSERT INTO routines (user_id, batch_id, day, time, notes) VALUES (?, ?, ?, ?, ?)').run(user_id, batch_id, day, time, notes);
      res.json({ success: true, id: Number(info.lastInsertRowid) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/routines/:id', (req, res) => {
    try {
      const { batch_id, day, time, notes } = req.body;
      const info = db.prepare('UPDATE routines SET batch_id = ?, day = ?, time = ?, notes = ? WHERE id = ?')
        .run(batch_id, day, time, notes, req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/routines/:id', (req, res) => {
    try {
      const info = db.prepare('DELETE FROM routines WHERE id = ?').run(req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Payments
  app.get('/api/payments', (req, res) => {
    try {
      const { userId } = req.query;
      const payments = db.prepare(`
        SELECT payments.*, students.name as student_name 
        FROM payments 
        LEFT JOIN students ON payments.student_id = students.id 
        WHERE payments.user_id = ?
      `).all(userId);
      res.json(payments);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/payments/student/:studentId', (req, res) => {
    try {
      const { studentId } = req.params;
      const { userId } = req.query;
      const payments = db.prepare(`
        SELECT payments.*, students.name as student_name 
        FROM payments 
        LEFT JOIN students ON payments.student_id = students.id 
        WHERE payments.student_id = ? AND payments.user_id = ?
        ORDER BY payment_date DESC, id DESC
      `).all(studentId, userId);
      res.json(payments);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/payments', (req, res) => {
    try {
      const { user_id, student_id, month, amount, status, payment_date } = req.body;
      const info = db.prepare('INSERT INTO payments (user_id, student_id, month, amount, status, payment_date) VALUES (?, ?, ?, ?, ?, ?)').run(user_id, student_id, month, amount, status, payment_date);
      res.json({ success: true, id: Number(info.lastInsertRowid) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/payments/:id', (req, res) => {
    try {
      const { student_id, month, amount, status, payment_date } = req.body;
      const info = db.prepare('UPDATE payments SET student_id = ?, month = ?, amount = ?, status = ?, payment_date = ? WHERE id = ?')
        .run(student_id, month, amount, status, payment_date, req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/payments/:id', (req, res) => {
    try {
      const info = db.prepare('DELETE FROM payments WHERE id = ?').run(req.params.id);
      res.json({ success: info.changes > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Dashboard Stats
  app.get('/api/dashboard/stats', (req, res) => {
    const { userId } = req.query;
    const totalStudents = (db.prepare('SELECT COUNT(*) as count FROM students WHERE user_id = ?').get(userId) as any).count;
    const activeBatches = (db.prepare("SELECT COUNT(*) as count FROM batches WHERE user_id = ? AND status = 'Active'").get(userId) as any).count;
    
    // Today's classes
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];
    const todayClasses = db.prepare(`
      SELECT routines.*, batches.name as batch_name 
      FROM routines 
      JOIN batches ON routines.batch_id = batches.id 
      WHERE routines.user_id = ? AND routines.day = ?
    `).all(userId, today);

    // Monthly Summary (Current Month)
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const collected = (db.prepare("SELECT SUM(amount) as total FROM payments WHERE user_id = ? AND month = ? AND status = 'Paid'").get(userId, currentMonth) as any).total || 0;
    const pending = (db.prepare("SELECT SUM(amount) as total FROM payments WHERE user_id = ? AND month = ? AND status = 'Pending'").get(userId, currentMonth) as any).total || 0;

    res.json({
      totalStudents,
      activeBatches,
      todayClasses,
      summary: { collected, pending }
    });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
