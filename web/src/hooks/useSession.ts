import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Exercise, Phase, Plan } from "../data/types";

export interface SessionStep {
  globalIdx: number;
  exIdx: number;
  phaseIdx: number;
  ex: Exercise;
  phase: Phase;
  /** Cumulative seconds of phases before this one (start of phase in session time). */
  cumBefore: number;
}

export type SessionStatus =
  | "idle"
  | "running"
  | "paused"
  | "transitioning"
  | "done";

interface UseSessionOptions {
  plan: Plan;
  /** Start at this exercise index (0-based). */
  startExerciseIdx?: number;
  /** Only run while ex.section === this. Stops the class when it changes. */
  sectionLimit?: string | null;
  /** Called when a cue should be spoken. */
  onCue?: (text: string) => void;
  /** Called when a phase starts (a single tick is also called at start). */
  onPhaseStart?: (step: SessionStep) => void;
  /** Called when a phase finishes naturally (timer reached 0). */
  onPhaseEnd?: (step: SessionStep) => void;
  /** Called at start of last 3 seconds (3, 2, 1). */
  onTick?: () => void;
  /** Called when the entire session finishes. */
  onFinish?: (result: SessionResult) => void;
}

export interface SessionResult {
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  plannedSec: number;
  completedExerciseIds: number[];
  skippedExerciseIds: number[];
  /** True if the timer reached the natural end; false if the user ended early. */
  completedAll: boolean;
}

const TICK_MS = 250;

export function useSession({
  plan,
  startExerciseIdx = 0,
  sectionLimit = null,
  onCue,
  onPhaseStart,
  onPhaseEnd,
  onTick,
  onFinish,
}: UseSessionOptions) {
  // Build the flat sequence of phases.
  const sequence = useMemo<SessionStep[]>(() => {
    const out: SessionStep[] = [];
    let cum = 0;
    for (let i = startExerciseIdx; i < plan.exercises.length; i++) {
      const ex = plan.exercises[i];
      if (sectionLimit && ex.section !== sectionLimit) {
        if (out.length > 0) break;
        continue;
      }
      const tSec = ex.transitionSec ?? 0;
      // Inject a "get ready" transition before this exercise (skipped for the very first).
      // phaseIdx -1 marks a synthetic transition so completion logic skips it.
      if (out.length > 0 && tSec > 0) {
        const transitionPhase: Phase = {
          label: `Get ready — ${ex.name}`,
          seconds: tSec,
          cues: [
            { at: 0, say: `Next up: ${ex.name}. ${tSec} seconds to set up.` },
          ],
        };
        out.push({
          globalIdx: out.length,
          exIdx: i,
          phaseIdx: -1,
          ex,
          phase: transitionPhase,
          cumBefore: cum,
        });
        cum += tSec;
      }
      ex.phases.forEach((phase, pi) => {
        out.push({
          globalIdx: out.length,
          exIdx: i,
          phaseIdx: pi,
          ex,
          phase,
          cumBefore: cum,
        });
        cum += phase.seconds;
      });
    }
    out.forEach((s, gi) => (s.globalIdx = gi));
    return out;
  }, [plan, startExerciseIdx, sectionLimit]);

  const totalSec = useMemo(
    () => sequence.reduce((a, s) => a + s.phase.seconds, 0),
    [sequence],
  );

  // Status + current step + current phase's elapsed seconds (real-elapsed minus paused time).
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [cursor, setCursor] = useState(0);
  const [phaseElapsedSec, setPhaseElapsedSec] = useState(0);

  // Internal refs for the timer engine.
  const phaseStartAtRef = useRef<number>(0); // performance.now() when this run started
  const accumulatedMsRef = useRef<number>(0); // ms accumulated before the current run (pauses)
  const lastCueSecRef = useRef<number>(-1);
  const intervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const completedRef = useRef<Set<number>>(new Set());
  const skippedRef = useRef<Set<number>>(new Set());
  const totalRunMsRef = useRef<number>(0); // total active (running) ms across the session
  const sessionStartedAtRef = useRef<string>(""); // ISO datetime when start() was called

  // Latest callbacks — refs so engine doesn't restart when callbacks change.
  const cbRef = useRef({ onCue, onPhaseStart, onPhaseEnd, onTick, onFinish });
  cbRef.current = { onCue, onPhaseStart, onPhaseEnd, onTick, onFinish };

  const clearInterval_ = () => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const clearTransition_ = () => {
    if (transitionTimeoutRef.current != null) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  };

  const startPhase = useCallback(
    (newCursor: number) => {
      clearInterval_();
      clearTransition_();
      const step = sequence[newCursor];
      if (!step) {
        setStatus("done");
        const result: SessionResult = {
          startedAt: sessionStartedAtRef.current,
          finishedAt: new Date().toISOString(),
          durationSec: Math.round(totalRunMsRef.current / 1000),
          plannedSec: totalSec,
          completedExerciseIds: Array.from(completedRef.current),
          skippedExerciseIds: Array.from(skippedRef.current),
          completedAll: true,
        };
        cbRef.current.onFinish?.(result);
        return;
      }
      accumulatedMsRef.current = 0;
      phaseStartAtRef.current = performance.now();
      lastCueSecRef.current = -1;
      // Update cursorRef synchronously — tickEngine() runs before React
      // re-renders, so without this it would read the previous phase's
      // step and fire the OLD phase's at=0 cue on every phase transition.
      cursorRef.current = newCursor;
      setPhaseElapsedSec(0);
      setCursor(newCursor);
      setStatus("running");
      cbRef.current.onPhaseStart?.(step);
      // Fire the engine immediately so cue at=0 + 0s tick happen now.
      tickEngine();
      intervalRef.current = window.setInterval(tickEngine, TICK_MS);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sequence, totalSec],
  );

  const tickEngine = useCallback(() => {
    // Read fresh state at engine tick time.
    const step = sequence[cursorRef.current];
    if (!step) return;
    const now = performance.now();
    const elapsedMs =
      accumulatedMsRef.current + (now - phaseStartAtRef.current);
    const elapsedSec = elapsedMs / 1000;
    const remaining = Math.max(0, step.phase.seconds - elapsedSec);

    setPhaseElapsedSec(elapsedSec);

    // Cue dispatch — at integer seconds since phase start.
    const floor = Math.floor(elapsedSec);
    if (floor !== lastCueSecRef.current) {
      lastCueSecRef.current = floor;
      for (const c of step.phase.cues) {
        if (c.at === floor) cbRef.current.onCue?.(c.say);
      }
      // Final-3-second tick beeps.
      const remCeil = Math.ceil(remaining);
      if (remaining > 0 && remCeil <= 3) cbRef.current.onTick?.();
    }

    if (remaining <= 0) {
      // Phase finished naturally.
      clearInterval_();
      // Track exercise completion: when this is the last phase of the exercise and we didn't skip earlier.
      const ex = step.ex;
      const isLastPhaseOfEx = step.phaseIdx === ex.phases.length - 1;
      if (isLastPhaseOfEx && !skippedRef.current.has(ex.id)) {
        completedRef.current.add(ex.id);
      }
      totalRunMsRef.current += accumulatedMsRef.current + (now - phaseStartAtRef.current);
      cbRef.current.onPhaseEnd?.(step);
      setStatus("transitioning");
      transitionTimeoutRef.current = window.setTimeout(() => {
        startPhase(step.globalIdx + 1);
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

  // Keep a ref of cursor so the interval reads the latest value cheaply.
  const cursorRef = useRef(cursor);
  cursorRef.current = cursor;

  // Controls
  const start = useCallback(() => {
    completedRef.current = new Set();
    skippedRef.current = new Set();
    totalRunMsRef.current = 0;
    sessionStartedAtRef.current = new Date().toISOString();
    startPhase(0);
  }, [startPhase]);

  const endNow = useCallback(() => {
    clearInterval_();
    clearTransition_();
    if (status === "running") {
      totalRunMsRef.current +=
        accumulatedMsRef.current + (performance.now() - phaseStartAtRef.current);
    } else if (status === "paused") {
      totalRunMsRef.current += accumulatedMsRef.current;
    }
    const result: SessionResult = {
      startedAt: sessionStartedAtRef.current,
      finishedAt: new Date().toISOString(),
      durationSec: Math.round(totalRunMsRef.current / 1000),
      plannedSec: totalSec,
      completedExerciseIds: Array.from(completedRef.current),
      skippedExerciseIds: Array.from(skippedRef.current),
      completedAll: false,
    };
    setStatus("done");
    cbRef.current.onFinish?.(result);
  }, [status, totalSec]);

  const pause = useCallback(() => {
    if (status !== "running") return;
    clearInterval_();
    accumulatedMsRef.current += performance.now() - phaseStartAtRef.current;
    totalRunMsRef.current += performance.now() - phaseStartAtRef.current;
    setStatus("paused");
  }, [status]);

  const resume = useCallback(() => {
    if (status !== "paused") return;
    phaseStartAtRef.current = performance.now();
    setStatus("running");
    intervalRef.current = window.setInterval(tickEngine, TICK_MS);
  }, [status, tickEngine]);

  const next = useCallback(() => {
    const step = sequence[cursorRef.current];
    if (step) skippedRef.current.add(step.ex.id);
    // Account for the time spent in the skipped phase.
    if (status === "running") {
      totalRunMsRef.current +=
        accumulatedMsRef.current + (performance.now() - phaseStartAtRef.current);
    } else if (status === "paused") {
      totalRunMsRef.current += accumulatedMsRef.current;
    }
    startPhase(cursorRef.current + 1);
  }, [startPhase, sequence, status]);

  const back = useCallback(() => {
    startPhase(Math.max(0, cursorRef.current - 1));
  }, [startPhase]);

  const jumpTo = useCallback(
    (idx: number) => {
      startPhase(Math.max(0, Math.min(sequence.length - 1, idx)));
    },
    [startPhase, sequence],
  );

  const quit = useCallback(() => {
    clearInterval_();
    clearTransition_();
    setStatus("idle");
  }, []);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      clearInterval_();
      clearTransition_();
    };
  }, []);

  // Derived values for the UI.
  const step = sequence[cursor];
  const phaseSeconds = step?.phase.seconds ?? 0;
  const phaseRemainingSec = Math.max(0, phaseSeconds - phaseElapsedSec);
  const sessionElapsedSec = (step?.cumBefore ?? totalSec) + phaseElapsedSec;
  const sessionRemainingSec = Math.max(0, totalSec - sessionElapsedSec);

  return {
    // state
    status,
    cursor,
    sequence,
    step,
    totalSec,
    phaseElapsedSec,
    phaseRemainingSec,
    phaseSeconds,
    sessionElapsedSec,
    sessionRemainingSec,
    // controls
    start,
    pause,
    resume,
    next,
    back,
    jumpTo,
    quit,
    endNow,
  };
}
