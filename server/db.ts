import Database from 'better-sqlite3';
import path from 'path';

// Create a SQLite database file in the server directory
const db = new Database(path.join(import.meta.dirname, 'practice-log.db'));

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

// Create the sessions table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    instrument TEXT NOT NULL,
    duration INTEGER NOT NULL,
    tempo INTEGER,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

export default db;
