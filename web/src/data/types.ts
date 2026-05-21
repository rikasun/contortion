export interface Cue {
  /** Seconds from the start of the phase when the cue should be spoken. */
  at: number;
  say: string;
}

export interface Phase {
  label: string;
  seconds: number;
  cues: Cue[];
}

export interface Exercise {
  id: number;
  section: string;
  name: string;
  /** Short coachy summary of the target (e.g. "10x each side"). */
  targetSummary?: string;
  /** Short instruction shown prominently and spoken at phase start. */
  instruction: string;
  /** Verbatim long-form description from the source plan. */
  detail?: string;
  /** Personal focus note from the coach. */
  focus?: string;
  /** Public-path URL of the demonstration photo, if available. */
  photo?: string;
  /** Rest/setup seconds inserted before this exercise (skipped for the first exercise in a session). */
  transitionSec?: number;
  phases: Phase[];
}

export interface Plan {
  id: string;
  title: string;
  author: string;
  /** ISO date string when the plan was created/assigned. */
  date: string;
  /** Optional intro paragraph shown on the start screen. */
  intro?: string;
  exercises: Exercise[];
}

/** A completed session, persisted to localStorage. */
export interface SessionLog {
  /** ISO datetime when the session finished. */
  finishedAt: string;
  planId: string;
  /** Wall-clock seconds spent in the class (excluding pauses). */
  durationSec: number;
  /** Total seconds the plan would have taken if every phase ran fully. */
  plannedSec: number;
  /** IDs of exercises completed (every phase ran to zero). */
  completedExerciseIds: number[];
  /** IDs of exercises where at least one phase was skipped. */
  skippedExerciseIds: number[];
  /** Optional one-line note. */
  note?: string;
}
