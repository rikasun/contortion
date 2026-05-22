import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useSession } from "./useSession";
import type { Plan } from "../data/types";

function makeTwoPhasePlan(): Plan {
  return {
    id: "test",
    title: "Test",
    author: "Test",
    date: "2026-01-01",
    exercises: [
      {
        id: 1,
        section: "Test",
        name: "Test Exercise",
        instruction: "Do the thing",
        transitionSec: 0,
        phases: [
          {
            label: "Right leg",
            seconds: 5,
            cues: [
              { at: 0, say: "Switch. Right leg. Ten reps." },
              { at: 2, say: "Stay tall through your spine." },
            ],
          },
          {
            label: "Both legs together",
            seconds: 5,
            cues: [
              { at: 0, say: "Both legs together. Ten reps." },
              { at: 2, say: "Quads on every rep." },
            ],
          },
        ],
      },
    ],
  };
}

describe("useSession phase transitions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires the new phase's at=0 cue when transitioning, not the old phase's", () => {
    const onCue = vi.fn();
    const onPhaseStart = vi.fn();
    const plan = makeTwoPhasePlan();
    const { result } = renderHook(() =>
      useSession({
        plan,
        onCue,
        onPhaseStart,
      }),
    );

    act(() => {
      result.current.start();
    });

    // Phase 1 (Right leg) at=0 cue should fire.
    expect(onCue).toHaveBeenCalledWith("Switch. Right leg. Ten reps.");
    const cueCallsAfterStart = onCue.mock.calls.length;

    // Advance to end of phase 1 (5s) + transition pad (350ms).
    act(() => {
      vi.advanceTimersByTime(5000 + 350);
    });

    // Phase 2 (Both legs) at=0 cue must fire — not the old phase's again.
    const newCalls = onCue.mock.calls.slice(cueCallsAfterStart);
    const newCallStrings = newCalls.map((c) => c[0]);

    expect(newCallStrings).toContain("Both legs together. Ten reps.");
    expect(newCallStrings).not.toContain("Switch. Right leg. Ten reps.");
  });

  it("calls onPhaseStart with the correct step for the new phase", () => {
    const onPhaseStart = vi.fn();
    const plan = makeTwoPhasePlan();
    const { result } = renderHook(() =>
      useSession({
        plan,
        onPhaseStart,
      }),
    );

    act(() => {
      result.current.start();
    });

    expect(onPhaseStart).toHaveBeenLastCalledWith(
      expect.objectContaining({
        phase: expect.objectContaining({ label: "Right leg" }),
      }),
    );

    act(() => {
      vi.advanceTimersByTime(5000 + 350);
    });

    expect(onPhaseStart).toHaveBeenLastCalledWith(
      expect.objectContaining({
        phase: expect.objectContaining({ label: "Both legs together" }),
      }),
    );
  });
});
