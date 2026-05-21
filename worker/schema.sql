CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id TEXT NOT NULL,
  started_at TEXT NOT NULL,
  finished_at TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  planned_sec INTEGER NOT NULL,
  completed_exercise_ids TEXT NOT NULL,
  skipped_exercise_ids TEXT NOT NULL,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS sessions_finished_idx ON sessions(finished_at DESC);

CREATE TABLE IF NOT EXISTS rate_limit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_hash TEXT NOT NULL,
  kind TEXT NOT NULL,
  at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS rate_limit_lookup_idx ON rate_limit(ip_hash, kind, at);
