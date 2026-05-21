import { useMutation } from "@tanstack/react-query";
import { postSession, type SessionInput } from "../lib/api";

const MIN_DURATION_SEC = 60;
const MIN_COMPLETION_RATIO = 0.6;

export interface RecordOptions {
  totalExercises: number;
  completedAll: boolean;
}

/**
 * Returns whether this session is "real" enough to persist.
 * Save if the session reached the natural end OR completed >=60% of exercises,
 * AND ran for more than 60 seconds. Anything shorter is treated as exploration.
 */
export function isSessionRecordable(
  input: SessionInput,
  opts: RecordOptions,
): boolean {
  if (input.durationSec < MIN_DURATION_SEC) return false;
  if (opts.completedAll) return true;
  if (opts.totalExercises <= 0) return false;
  const ratio = input.completedExerciseIds.length / opts.totalExercises;
  return ratio >= MIN_COMPLETION_RATIO;
}

export function useRecordSession() {
  return useMutation({
    mutationFn: (input: SessionInput) => postSession(input),
  });
}
