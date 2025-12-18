-- ==============================
-- Table: students
-- ==============================
DROP TABLE IF EXISTS students;
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fio TEXT NOT NULL,
  fingerID TEXT UNIQUE,
  RFID TEXT UNIQUE,
  faceID TEXT NOT NULL
);

-- ==============================
-- Table: attendance
-- ==============================
DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lessonId INTEGER NOT NULL,
  studentId INTEGER NOT NULL,
  lessonDate TEXT NOT NULL,
  FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
);

-- ==============================
-- Table: app_logs
-- ==============================
DROP TABLE IF EXISTS app_logs;
CREATE TABLE app_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER NOT NULL,
  operation TEXT NOT NULL,
  studentId INTEGER,
  status INTEGER NOT NULL,
  FOREIGN KEY (studentId) REFERENCES students(id) ON DELETE CASCADE
);