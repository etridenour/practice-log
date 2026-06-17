import db from './db.js';

// Row shape coming from SQLite (snake_case columns)
interface SessionRow {
  id: number;
  instrument: string;
  duration: number;
  tempo: string | null;  // stored as JSON string in SQLite
  notes: string | null;
  created_at: string;
}

// Map snake_case DB columns to camelCase GraphQL fields
function toSession(row: SessionRow) {
  return {
    id: String(row.id),
    instrument: row.instrument,
    duration: row.duration,
    tempo: row.tempo ? JSON.parse(row.tempo) : null,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

export const resolvers = {
  Query: {
    sessions: () => {
      const rows = db.prepare('SELECT * FROM sessions ORDER BY created_at DESC').all() as SessionRow[];
      return rows.map(toSession);
    },
    session: (_: unknown, args: { id: string }) => {
      const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(args.id) as SessionRow | undefined;
      return row ? toSession(row) : null;
    },
  },

  Mutation: {
    createSession: (_: unknown, args: { input: { instrument: string; duration: number; tempo?: number[]; notes?: string } }) => {
      const { instrument, duration, tempo, notes } = args.input;
      const result = db.prepare(
        'INSERT INTO sessions (instrument, duration, tempo, notes) VALUES (?, ?, ?, ?)'
      ).run(instrument, duration, tempo ? JSON.stringify(tempo) : null, notes ?? null);

      const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(result.lastInsertRowid) as SessionRow;
      return toSession(row);
    },
    deleteSession: (_: unknown, args: { id: string }) => {
      const result = db.prepare('DELETE FROM sessions WHERE id = ?').run(args.id);
      return result.changes > 0;
    },
  },
};
