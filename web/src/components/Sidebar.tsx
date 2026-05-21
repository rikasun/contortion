import { useEffect, useMemo, useRef } from "react";
import type { SessionStep } from "../hooks/useSession";
import { fmtSec } from "../lib/format";

interface Props {
  sequence: SessionStep[];
  cursor: number;
  totalSec: number;
  sessionElapsedSec: number;
  sessionRemainingSec: number;
  onJump: (idx: number) => void;
  open: boolean;
  onClose: () => void;
}

interface SectionGroup {
  name: string;
  exes: Map<number, { steps: SessionStep[] }>;
}

export function Sidebar({
  sequence,
  cursor,
  totalSec,
  sessionElapsedSec,
  sessionRemainingSec,
  onJump,
  open,
  onClose,
}: Props) {
  const sections = useMemo<SectionGroup[]>(() => {
    const out: SectionGroup[] = [];
    const map = new Map<string, SectionGroup>();
    for (const s of sequence) {
      let group = map.get(s.ex.section);
      if (!group) {
        group = { name: s.ex.section, exes: new Map() };
        map.set(s.ex.section, group);
        out.push(group);
      }
      let entry = group.exes.get(s.ex.id);
      if (!entry) {
        entry = { steps: [] };
        group.exes.set(s.ex.id, entry);
      }
      entry.steps.push(s);
    }
    return out;
  }, [sequence]);

  const currentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [cursor]);

  const pct = totalSec ? Math.min(100, (sessionElapsedSec / totalSec) * 100) : 0;

  return (
    <aside
      className={`sb md:static md:translate-y-0 ${open ? "open" : ""}`}
      style={{
        background: "var(--card)",
        border: "1px solid var(--rule)",
      }}
    >
      <button
        className="sb-close md:hidden"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          padding: "6px 10px",
          fontSize: 12,
          border: "1px solid var(--rule)",
          background: "#fff",
          borderRadius: 10,
        }}
      >
        Close
      </button>

      <div
        className="grid grid-cols-2 gap-2 mb-2.5 rounded-lg p-2.5"
        style={{ background: "#fff", border: "1px solid var(--rule)" }}
      >
        <div>
          <div
            className="uppercase font-bold"
            style={{
              fontSize: 10,
              color: "var(--ink-soft)",
              letterSpacing: "0.6px",
            }}
          >
            Elapsed
          </div>
          <div className="text-lg font-bold tabular-nums">
            {fmtSec(sessionElapsedSec)}
          </div>
        </div>
        <div>
          <div
            className="uppercase font-bold"
            style={{
              fontSize: 10,
              color: "var(--ink-soft)",
              letterSpacing: "0.6px",
            }}
          >
            Remaining
          </div>
          <div className="text-lg font-bold tabular-nums">
            {fmtSec(sessionRemainingSec)}
          </div>
        </div>
        <div
          className="col-span-2 mt-1 rounded-full overflow-hidden"
          style={{ height: 6, background: "var(--rule)" }}
        >
          <div
            style={{
              height: "100%",
              background: "var(--accent)",
              width: `${pct.toFixed(1)}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      <div className="overflow-y-auto min-h-0 flex-1 pr-1">
        {sections.map((sec) => (
          <div key={sec.name} className="mt-2 first:mt-0">
            <div
              className="font-bold uppercase py-1"
              style={{
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: "0.7px",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              {sec.name}
            </div>
            {[...sec.exes.entries()].map(([exId, { steps }]) => {
              const isCurrent = steps.some((s) => s.globalIdx === cursor);
              const allDone = steps.every((s) => s.globalIdx < cursor);
              const cls = isCurrent ? "current" : allDone ? "done" : "upcoming";
              const glyph = isCurrent ? "▶" : allDone ? "✓" : "·";
              const ex = steps[0].ex;
              return (
                <div
                  key={exId}
                  ref={isCurrent ? currentRef : undefined}
                  onClick={() => onJump(steps[0].globalIdx)}
                  className={`py-2 px-1 cursor-pointer ${cls}`}
                  style={{ borderBottom: "1px dashed var(--rule)" }}
                >
                  <div
                    className="flex gap-1.5 items-center text-[13px] font-semibold"
                    style={{
                      color: isCurrent
                        ? "var(--accent)"
                        : allDone
                          ? "var(--ink)"
                          : "var(--ink-soft)",
                    }}
                  >
                    <span
                      className="inline-flex justify-center w-4 font-bold"
                      style={{
                        color: isCurrent
                          ? "var(--accent)"
                          : allDone
                            ? "var(--ok)"
                            : "var(--ink-faint)",
                      }}
                    >
                      {glyph}
                    </span>
                    {ex.name}
                  </div>
                  {ex.targetSummary ? (
                    <div
                      className="ml-[22px] mt-0.5"
                      style={{ fontSize: 11, color: "var(--ink-faint)" }}
                    >
                      {ex.targetSummary}
                    </div>
                  ) : null}
                  {isCurrent ? (
                    <div className="mt-1.5 ml-[22px]">
                      {steps.map((st) => {
                        const phDone = st.globalIdx < cursor;
                        const phCur = st.globalIdx === cursor;
                        const phGlyph = phCur ? "▶" : phDone ? "✓" : "·";
                        return (
                          <div
                            key={st.globalIdx}
                            className="flex gap-1.5 py-0.5 text-[12px]"
                            style={{
                              color: phCur
                                ? "var(--accent)"
                                : "var(--ink-soft)",
                              fontWeight: phCur ? 600 : 400,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onJump(st.globalIdx);
                            }}
                          >
                            <span
                              className="inline-flex w-3.5"
                              style={{
                                color: phCur
                                  ? "var(--accent)"
                                  : phDone
                                    ? "var(--ok)"
                                    : "var(--ink-faint)",
                              }}
                            >
                              {phGlyph}
                            </span>
                            <span>{st.phase.label}</span>
                            <span
                              className="ml-auto tabular-nums"
                              style={{ color: "var(--ink-faint)" }}
                            >
                              {fmtSec(st.phase.seconds)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
