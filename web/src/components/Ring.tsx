interface Props {
  /** 0..1 */
  progress: number;
  children?: React.ReactNode;
}

const RADIUS = 46;
const C = 2 * Math.PI * RADIUS;

export function Ring({ progress, children }: Props) {
  const offset = C * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <div
      className="relative mx-auto"
      style={{
        width: "clamp(180px, 32vh, 280px)",
        aspectRatio: "1",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--rule)"
          strokeWidth={7}
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={C.toFixed(2)}
          strokeDashoffset={offset.toFixed(2)}
          style={{ transition: "stroke-dashoffset 0.25s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
