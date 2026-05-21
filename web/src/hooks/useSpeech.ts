import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeechSettings {
  enabled: boolean;
  volume: number; // 0..1
  rate: number; // 0.7..1.3
}

const PREFERRED_VOICES = [
  "Samantha",
  "Karen",
  "Moira",
  "Allison",
  "Ava",
  "Victoria",
  "Google US English",
];

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  for (const name of PREFERRED_VOICES) {
    const v = voices.find((x) => x.name === name);
    if (v) return v;
  }
  return voices.find((v) => /en[-_]/i.test(v.lang)) ?? voices[0];
}

export function useSpeech(settings: SpeechSettings) {
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const update = () => setVoice(pickVoice());
    update();
    window.speechSynthesis.onvoiceschanged = update;

    // Workaround for a long-standing Chrome bug on macOS: the speech engine
    // goes dormant after ~10s of inactivity, and subsequent speak() calls
    // report speaking=true but never fire onstart. Periodically pulse
    // pause/resume so the engine stays awake. Harmless if nothing is queued.
    const keepalive = window.setInterval(() => {
      try {
        const ss = window.speechSynthesis;
        if (!ss) return;
        if (ss.speaking || ss.pending) {
          ss.pause();
          ss.resume();
        }
      } catch {
        /* ignore */
      }
    }, 5000);

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null;
      window.clearInterval(keepalive);
    };
  }, []);

  const say = useCallback(
    (text: string) => {
      const s = settingsRef.current;
      if (!s.enabled || !text) return;
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      // Canonical Chrome-on-macOS workaround: the speech engine goes dormant
      // after idle and speak() silently queues but never plays. cancel() wakes
      // the engine; a short setTimeout lets the cancel propagate before speak.
      // This means we don't queue utterances — each say() interrupts the prior —
      // which is fine because exercise cues are spaced seconds apart.
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        try {
          const u = new SpeechSynthesisUtterance(text);
          if (voice) u.voice = voice;
          u.volume = s.volume;
          u.rate = s.rate;
          u.pitch = 1.0;
          window.speechSynthesis.speak(u);
        } catch {
          /* ignore */
        }
      }, 80);
    },
    [voice],
  );

  const cancel = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { say, cancel };
}
