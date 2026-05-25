import { useEffect } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

interface Props {
  /** Pause the timer + cancel speech the moment the press begins. */
  onPressStart: () => void;
  /** Called with the final transcript when the press is released. Empty string = ignore. */
  onRelease: (transcript: string) => void;
}

export function RecordNote({ onPressStart, onRelease }: Props) {
  const { supported, recording, interim, start, stop } = useSpeechRecognition();

  // Defensive: if the component unmounts while recording (e.g., user
  // navigates away), make sure the engine is stopped.
  useEffect(() => {
    return () => {
      if (recording) {
        stop().catch(() => {});
      }
    };
  }, [recording, stop]);

  if (!supported) return null;

  const handleDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* some pointers can't be captured; that's fine */
    }
    onPressStart();
    start();
  };

  const handleUp = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const transcript = await stop();
    onRelease(transcript);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        // touch-action: none stops mobile browsers from scrolling/zooming
        // while the user is holding the button down.
        style={{
          touchAction: "none",
          width: "100%",
          background: recording ? "#dc2626" : "var(--accent-soft)",
          color: recording ? "#fff" : "var(--accent)",
          border: `1px solid ${recording ? "#dc2626" : "var(--accent-soft)"}`,
          borderRadius: 12,
          padding: "10px 14px",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {recording ? "● Recording — release to save" : "🎙 Hold to record a note"}
      </button>
      {recording && interim ? (
        <div
          className="mt-2 px-3 py-2 rounded-lg text-sm italic"
          style={{
            background: "#fff",
            border: "1px solid var(--rule)",
            color: "var(--ink-soft)",
            minHeight: 28,
          }}
        >
          {interim}
        </div>
      ) : null}
    </div>
  );
}
