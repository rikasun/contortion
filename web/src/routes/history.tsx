import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ApiError,
  clearStoredToken,
  deleteAllSessions,
  deleteSession,
  getSessions,
  hasValidToken,
  unlock,
} from "../lib/api";
import { fmtSec } from "../lib/format";
import { getPlan } from "../data/plans";

export const Route = createFileRoute("/history")({
  component: HistoryScreen,
});

function HistoryScreen() {
  const queryClient = useQueryClient();
  const [unlocked, setUnlocked] = useState(hasValidToken);

  if (!unlocked) {
    return (
      <UnlockGate
        onUnlocked={() => {
          setUnlocked(true);
          queryClient.invalidateQueries({ queryKey: ["sessions"] });
        }}
      />
    );
  }

  return <HistoryList onLocked={() => setUnlocked(false)} />;
}

function UnlockGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mut = useMutation({
    mutationFn: (pw: string) => unlock(pw),
    onSuccess: () => {
      setError(null);
      onUnlocked();
    },
    onError: (err) => {
      if (err instanceof ApiError) {
        if (err.code === "invalid_password") setError("Wrong password.");
        else if (err.code === "rate_limited")
          setError("Too many attempts. Try again in a minute.");
        else setError(`Error: ${err.code}`);
      } else {
        setError("Network error. Is the API reachable?");
      }
    },
  });

  return (
    <div className="max-w-[460px] mx-auto p-4">
      <header className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-bold m-0">History — locked</h1>
        <Link to="/">
          <Button size="1" variant="surface">
            Back
          </Button>
        </Link>
      </header>
      <section
        className="rounded-2xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--rule)" }}
      >
        <p
          className="m-0 mb-3 text-[14px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Enter the history password to see your past sessions.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password && !mut.isPending) mut.mutate(password);
          }}
        >
          <TextField.Root
            type="password"
            value={password}
            placeholder="Password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-3 flex gap-2 items-center">
            <Button type="submit" disabled={mut.isPending || !password}>
              {mut.isPending ? "Unlocking…" : "Unlock"}
            </Button>
            {error ? (
              <span style={{ color: "#c2410c", fontSize: 13 }}>{error}</span>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}

function HistoryList({ onLocked }: { onLocked: () => void }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => getSessions(),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["sessions"] });

  const deleteOne = useMutation({
    mutationFn: (id: number) => deleteSession(id),
    onSuccess: invalidate,
  });
  const deleteAll = useMutation({
    mutationFn: () => deleteAllSessions(),
    onSuccess: invalidate,
  });

  if (isLoading) {
    return (
      <Frame>
        <p style={{ color: "var(--ink-soft)" }}>Loading…</p>
      </Frame>
    );
  }
  if (error) {
    if (error instanceof ApiError && error.status === 401) {
      clearStoredToken();
      onLocked();
      return null;
    }
    return (
      <Frame>
        <p style={{ color: "#c2410c" }}>
          Couldn't load sessions: {String(error)}
        </p>
      </Frame>
    );
  }

  const sessions = data?.sessions ?? [];

  return (
    <Frame
      right={
        <Button
          size="1"
          variant="ghost"
          color="gray"
          onClick={() => {
            clearStoredToken();
            onLocked();
          }}
        >
          Lock
        </Button>
      }
    >
      {sessions.length === 0 ? (
        <p style={{ color: "var(--ink-soft)" }}>
          No sessions yet. Finish a class to start tracking.
        </p>
      ) : (
        <>
          <table className="w-full text-[14px]">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--rule)" }}>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Plan</th>
                <th className="text-right py-2">Duration</th>
                <th className="text-right py-2">Done</th>
                <th className="text-right py-2">Skipped</th>
                <th className="text-right py-2">Notes</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {sessions.flatMap((s) => {
                const plan = getPlan(s.planId);
                const d = new Date(s.finishedAt);
                const rows = [(
                  <tr
                    key={s.id}
                    style={{ borderBottom: s.notes.length > 0 ? "none" : "1px dashed var(--rule)" }}
                  >
                    <td className="py-2">
                      {d.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      <span style={{ color: "var(--ink-faint)" }}>
                        {d.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="py-2">{plan?.title ?? s.planId}</td>
                    <td className="py-2 text-right tabular-nums">
                      {fmtSec(s.durationSec)}
                    </td>
                    <td
                      className="py-2 text-right tabular-nums"
                      style={{ color: "var(--ok)" }}
                    >
                      {s.completedExerciseIds.length}
                    </td>
                    <td
                      className="py-2 text-right tabular-nums"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {s.skippedExerciseIds.length}
                    </td>
                    <td
                      className="py-2 text-right tabular-nums"
                      style={{ color: s.notes.length > 0 ? "var(--accent)" : "var(--ink-faint)" }}
                    >
                      {s.notes.length}
                    </td>
                    <td className="py-2 pl-2 text-right">
                      <Button
                        size="1"
                        variant="ghost"
                        color="gray"
                        disabled={deleteOne.isPending || deleteAll.isPending}
                        onClick={() => {
                          if (confirm("Delete this session?")) {
                            deleteOne.mutate(s.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )];
                if (s.notes.length > 0) {
                  rows.push(
                    <tr
                      key={`${s.id}-notes`}
                      style={{ borderBottom: "1px dashed var(--rule)" }}
                    >
                      <td colSpan={7} className="pb-3" style={{ paddingLeft: 4 }}>
                        <ul className="m-0 pl-0" style={{ listStyle: "none" }}>
                          {s.notes.map((n, i) => (
                            <li
                              key={i}
                              className="text-[13px] py-1"
                              style={{ color: "var(--ink-soft)" }}
                            >
                              <span
                                style={{
                                  color: "var(--accent)",
                                  fontWeight: 600,
                                  marginRight: 6,
                                }}
                              >
                                {n.exerciseName}
                              </span>
                              <span style={{ color: "var(--ink-faint)" }}>
                                {fmtSec(n.atSec)}
                              </span>
                              <span style={{ marginLeft: 8 }}>{n.transcript}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>,
                  );
                }
                return rows;
              })}
            </tbody>
          </table>
          <div className="mt-3 flex justify-end">
            <Button
              size="1"
              variant="ghost"
              color="gray"
              disabled={deleteAll.isPending}
              onClick={() => {
                if (confirm(`Clear all ${sessions.length} sessions?`)) {
                  deleteAll.mutate();
                }
              }}
            >
              Clear all
            </Button>
          </div>
        </>
      )}
    </Frame>
  );
}

function Frame({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="max-w-[920px] mx-auto p-4">
      <header className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-bold m-0">Session history</h1>
        <div className="flex gap-2">
          {right}
          <Link to="/">
            <Button size="1" variant="surface">
              Back
            </Button>
          </Link>
        </div>
      </header>
      <section
        className="rounded-2xl p-4"
        style={{ background: "var(--card)", border: "1px solid var(--rule)" }}
      >
        {children}
      </section>
    </div>
  );
}
