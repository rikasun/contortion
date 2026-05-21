import { useState } from "react";

interface Props {
  src?: string;
  alt: string;
}

export function PhotoCard({ src, alt }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className="rounded-xl flex items-center justify-center text-center"
        style={{
          background: "#fff",
          border: "1px dashed var(--rule)",
          color: "var(--ink-faint)",
          fontSize: 12,
          minHeight: 120,
          padding: 12,
        }}
      >
        Photo not available
      </div>
    );
  }
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--rule)",
      }}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="block w-full h-auto"
        style={{ maxHeight: "min(40vh, 360px)", objectFit: "contain", background: "#fff" }}
      />
    </div>
  );
}
