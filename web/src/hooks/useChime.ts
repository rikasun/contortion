import { useCallback, useRef } from "react";

type Osc = "sine" | "square" | "triangle" | "sawtooth";

export function useChime(volumeRef: { current: number }) {
  const ctxRef = useRef<AudioContext | null>(null);

  const tone = useCallback(
    (freq: number, dur: number, type: Osc = "sine") => {
      if (typeof window === "undefined") return;
      try {
        if (!ctxRef.current) {
          const AC =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          ctxRef.current = new AC();
        }
        const ctx = ctxRef.current!;
        const t0 = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(
          0.3 * (volumeRef.current ?? 0.9),
          t0 + 0.02,
        );
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + dur + 0.02);
      } catch {
        /* ignore */
      }
    },
    [volumeRef],
  );

  const start = useCallback(() => {
    tone(880, 0.15);
    setTimeout(() => tone(1175, 0.15), 130);
  }, [tone]);
  const end = useCallback(() => {
    tone(660, 0.18);
    setTimeout(() => tone(440, 0.22), 130);
  }, [tone]);
  const tick = useCallback(() => tone(1000, 0.06, "square"), [tone]);

  return { start, end, tick };
}
