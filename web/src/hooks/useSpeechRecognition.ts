import { useCallback, useEffect, useRef, useState } from "react";

// Web Speech Recognition API isn't in the default TS lib. Minimal local types.
interface SpeechRecResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecEvent extends Event {
  resultIndex: number;
  results: ArrayLike<SpeechRecResult>;
}
type RecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: SpeechRecEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
};

function getCtor(): { new (): RecognitionLike } | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: { new (): RecognitionLike };
    webkitSpeechRecognition?: { new (): RecognitionLike };
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export interface UseSpeechRecognitionResult {
  supported: boolean;
  recording: boolean;
  /** Live preview of the current utterance (not yet final). */
  interim: string;
  start: () => void;
  /** Stops recording and resolves with the final transcript. */
  stop: () => Promise<string>;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const Ctor = getCtor();
  const supported = !!Ctor;
  const [recording, setRecording] = useState(false);
  const [interim, setInterim] = useState("");
  const recRef = useRef<RecognitionLike | null>(null);
  const finalRef = useRef("");
  const interimRef = useRef("");
  const resolverRef = useRef<((s: string) => void) | null>(null);

  useEffect(() => {
    return () => {
      try {
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const start = useCallback(() => {
    if (!Ctor) return;
    finalRef.current = "";
    interimRef.current = "";
    setInterim("");
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e: SpeechRecEvent) => {
      let finalChunk = "";
      let interimChunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0].transcript;
        if (r.isFinal) finalChunk += t;
        else interimChunk += t;
      }
      if (finalChunk) finalRef.current += finalChunk;
      interimRef.current = interimChunk;
      setInterim(interimChunk);
    };
    rec.onerror = () => {
      /* swallow; release of the button will resolve via stop() */
    };
    rec.onend = () => {
      const transcript = (finalRef.current + " " + interimRef.current)
        .replace(/\s+/g, " ")
        .trim();
      resolverRef.current?.(transcript);
      resolverRef.current = null;
      setRecording(false);
      setInterim("");
    };
    recRef.current = rec;
    try {
      rec.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  }, [Ctor]);

  const stop = useCallback((): Promise<string> => {
    if (!recRef.current || !recording) return Promise.resolve("");
    return new Promise<string>((resolve) => {
      resolverRef.current = resolve;
      try {
        recRef.current?.stop();
      } catch {
        resolve("");
      }
    });
  }, [recording]);

  return { supported, recording, interim, start, stop };
}
