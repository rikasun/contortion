export interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  PASSWORD: string;
  TOKEN_SIGNING_KEY: string;
}

interface SessionPayload {
  planId: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  plannedSec: number;
  completedExerciseIds: number[];
  skippedExerciseIds: number[];
}

const TOKEN_TTL_SEC = 30 * 24 * 60 * 60;
const WRITE_LIMIT = { max: 10, windowSec: 60 };
const UNLOCK_LIMIT = { max: 5, windowSec: 60 };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cors = corsHeaders(request.headers.get("Origin"), env.ALLOWED_ORIGINS);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === "/api/sessions" && request.method === "POST") {
        return json(await postSession(request, env), 200, cors);
      }
      if (url.pathname === "/api/sessions" && request.method === "GET") {
        return json(await getSessions(request, env), 200, cors);
      }
      if (url.pathname === "/api/unlock" && request.method === "POST") {
        return json(await postUnlock(request, env), 200, cors);
      }
      if (url.pathname === "/api/sessions" && request.method === "DELETE") {
        return json(await deleteAllSessions(request, env), 200, cors);
      }
      const deleteOne = url.pathname.match(/^\/api\/sessions\/(\d+)$/);
      if (deleteOne && request.method === "DELETE") {
        return json(
          await deleteSession(request, env, Number(deleteOne[1])),
          200,
          cors,
        );
      }
      return json({ error: "not_found" }, 404, cors);
    } catch (err) {
      if (err instanceof HttpError) {
        return json({ error: err.code }, err.status, cors);
      }
      console.error(err);
      return json({ error: "internal_error" }, 500, cors);
    }
  },
} satisfies ExportedHandler<Env>;

// --- handlers ---

async function postSession(request: Request, env: Env) {
  const ipHash = await hashIp(clientIp(request), env.TOKEN_SIGNING_KEY);
  await enforceRateLimit(env.DB, ipHash, "write", WRITE_LIMIT);

  const body = (await request.json()) as Partial<SessionPayload>;
  const session = validateSession(body);

  const result = await env.DB.prepare(
    `INSERT INTO sessions
       (plan_id, started_at, finished_at, duration_sec, planned_sec,
        completed_exercise_ids, skipped_exercise_ids, ip_hash, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      session.planId,
      session.startedAt,
      session.finishedAt,
      session.durationSec,
      session.plannedSec,
      JSON.stringify(session.completedExerciseIds),
      JSON.stringify(session.skippedExerciseIds),
      ipHash,
      request.headers.get("User-Agent") ?? null,
    )
    .run();

  return { ok: true, id: result.meta.last_row_id };
}

async function getSessions(request: Request, env: Env) {
  await requireUnlock(request, env);

  const rows = await env.DB.prepare(
    `SELECT id, plan_id, started_at, finished_at, duration_sec, planned_sec,
            completed_exercise_ids, skipped_exercise_ids, created_at
     FROM sessions
     ORDER BY finished_at DESC
     LIMIT 200`,
  ).all<{
    id: number;
    plan_id: string;
    started_at: string;
    finished_at: string;
    duration_sec: number;
    planned_sec: number;
    completed_exercise_ids: string;
    skipped_exercise_ids: string;
    created_at: string;
  }>();

  return {
    sessions: rows.results.map((r) => ({
      id: r.id,
      planId: r.plan_id,
      startedAt: r.started_at,
      finishedAt: r.finished_at,
      durationSec: r.duration_sec,
      plannedSec: r.planned_sec,
      completedExerciseIds: safeParseIds(r.completed_exercise_ids),
      skippedExerciseIds: safeParseIds(r.skipped_exercise_ids),
      createdAt: r.created_at,
    })),
  };
}

async function deleteSession(request: Request, env: Env, id: number) {
  await requireUnlock(request, env);
  const result = await env.DB.prepare(`DELETE FROM sessions WHERE id = ?`)
    .bind(id)
    .run();
  return { ok: true, deleted: result.meta.changes ?? 0 };
}

async function deleteAllSessions(request: Request, env: Env) {
  await requireUnlock(request, env);
  const result = await env.DB.prepare(`DELETE FROM sessions`).run();
  return { ok: true, deleted: result.meta.changes ?? 0 };
}

async function postUnlock(request: Request, env: Env) {
  const ipHash = await hashIp(clientIp(request), env.TOKEN_SIGNING_KEY);
  await enforceRateLimit(env.DB, ipHash, "unlock", UNLOCK_LIMIT);

  const body = (await request.json()) as { password?: unknown };
  const submitted = typeof body.password === "string" ? body.password : "";
  if (!constantTimeEqual(submitted, env.PASSWORD)) {
    throw new HttpError(401, "invalid_password");
  }

  const expSec = Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC;
  const token = await signToken({ exp: expSec }, env.TOKEN_SIGNING_KEY);
  return { token, expiresAt: new Date(expSec * 1000).toISOString() };
}

// --- helpers ---

class HttpError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(code);
  }
}

function validateSession(body: Partial<SessionPayload>): SessionPayload {
  const errors: string[] = [];
  if (typeof body.planId !== "string" || body.planId.length === 0)
    errors.push("planId");
  if (typeof body.startedAt !== "string" || !isIsoDate(body.startedAt))
    errors.push("startedAt");
  if (typeof body.finishedAt !== "string" || !isIsoDate(body.finishedAt))
    errors.push("finishedAt");
  if (typeof body.durationSec !== "number" || body.durationSec < 0)
    errors.push("durationSec");
  if (typeof body.plannedSec !== "number" || body.plannedSec < 0)
    errors.push("plannedSec");
  if (
    !Array.isArray(body.completedExerciseIds) ||
    !body.completedExerciseIds.every((n) => Number.isInteger(n))
  )
    errors.push("completedExerciseIds");
  if (
    !Array.isArray(body.skippedExerciseIds) ||
    !body.skippedExerciseIds.every((n) => Number.isInteger(n))
  )
    errors.push("skippedExerciseIds");
  if (errors.length > 0) {
    throw new HttpError(400, `invalid:${errors.join(",")}`);
  }
  return body as SessionPayload;
}

function isIsoDate(s: string): boolean {
  return !Number.isNaN(Date.parse(s));
}

function safeParseIds(json: string): number[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((n) => Number.isInteger(n)) : [];
  } catch {
    return [];
  }
}

async function requireUnlock(request: Request, env: Env) {
  const auth = request.headers.get("Authorization") ?? "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new HttpError(401, "missing_token");
  const ok = await verifyToken(match[1], env.TOKEN_SIGNING_KEY);
  if (!ok) throw new HttpError(401, "invalid_token");
}

async function enforceRateLimit(
  db: D1Database,
  ipHash: string,
  kind: string,
  limit: { max: number; windowSec: number },
) {
  const cutoff = new Date(Date.now() - limit.windowSec * 1000).toISOString();
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n FROM rate_limit
       WHERE ip_hash = ? AND kind = ? AND at > ?`,
    )
    .bind(ipHash, kind, cutoff)
    .first<{ n: number }>();
  if ((row?.n ?? 0) >= limit.max) {
    throw new HttpError(429, "rate_limited");
  }
  await db
    .prepare(`INSERT INTO rate_limit (ip_hash, kind, at) VALUES (?, ?, ?)`)
    .bind(ipHash, kind, new Date().toISOString())
    .run();
  // Best-effort prune of stale rate-limit rows.
  await db
    .prepare(`DELETE FROM rate_limit WHERE at < ?`)
    .bind(new Date(Date.now() - 60 * 60 * 1000).toISOString())
    .run();
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ??
    "0.0.0.0"
  );
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(ip + "::" + salt);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return bufToHex(hash);
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function signToken(
  payload: Record<string, unknown>,
  secret: string,
): Promise<string> {
  const body = b64urlEncode(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(body),
  );
  return `${body}.${b64urlEncodeBytes(new Uint8Array(sig))}`;
}

async function verifyToken(
  token: string,
  secret: string,
): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [body, sig] = parts;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  let sigBytes: Uint8Array;
  try {
    sigBytes = b64urlDecodeBytes(sig);
  } catch {
    return false;
  }
  const ok = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    new TextEncoder().encode(body),
  );
  if (!ok) return false;
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecodeBytes(body)));
    if (typeof payload?.exp !== "number") return false;
    if (payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

function b64urlEncode(s: string): string {
  return b64urlEncodeBytes(new TextEncoder().encode(s));
}
function b64urlEncodeBytes(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecodeBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function corsHeaders(
  origin: string | null,
  allowedCsv: string,
): Record<string, string> {
  const allowed = allowedCsv.split(",").map((s) => s.trim());
  if (origin && allowed.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
  }
  return {};
}

function json(
  body: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...cors,
    },
  });
}
