const API_BASE: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8787";

const TOKEN_KEY = "contortion:unlockToken";
const TOKEN_EXP_KEY = "contortion:unlockTokenExp";

export interface ApiSession {
  id: number;
  planId: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  plannedSec: number;
  completedExerciseIds: number[];
  skippedExerciseIds: number[];
  createdAt: string;
}

export interface SessionInput {
  planId: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  plannedSec: number;
  completedExerciseIds: number[];
  skippedExerciseIds: number[];
}

export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string) {
    super(`${status} ${code}`);
    this.status = status;
    this.code = code;
  }
}

async function call<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth, headers, ...rest } = init;
  const h: Record<string, string> = { ...(headers as Record<string, string>) };
  if (init.body && !h["Content-Type"]) h["Content-Type"] = "application/json";
  if (auth) {
    const token = getStoredToken();
    if (token) h["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers: h });
  if (!res.ok) {
    let code = `http_${res.status}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) code = body.error;
    } catch {
      /* ignore */
    }
    if (res.status === 401) clearStoredToken();
    throw new ApiError(res.status, code);
  }
  return (await res.json()) as T;
}

export async function postSession(input: SessionInput): Promise<{ id: number }> {
  return call("/api/sessions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getSessions(): Promise<{ sessions: ApiSession[] }> {
  return call("/api/sessions", { method: "GET", auth: true });
}

export async function deleteSession(id: number): Promise<{ deleted: number }> {
  return call(`/api/sessions/${id}`, { method: "DELETE", auth: true });
}

export async function deleteAllSessions(): Promise<{ deleted: number }> {
  return call("/api/sessions", { method: "DELETE", auth: true });
}

export async function unlock(password: string): Promise<void> {
  const { token, expiresAt } = await call<{ token: string; expiresAt: string }>(
    "/api/unlock",
    { method: "POST", body: JSON.stringify({ password }) },
  );
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXP_KEY, expiresAt);
}

export function hasValidToken(): boolean {
  const token = getStoredToken();
  return token !== null;
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
}

function getStoredToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const exp = localStorage.getItem(TOKEN_EXP_KEY);
  if (!token || !exp) return null;
  if (Date.parse(exp) <= Date.now()) {
    clearStoredToken();
    return null;
  }
  return token;
}
