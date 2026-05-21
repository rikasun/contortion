import { fmtSecCeil } from "../lib/format";

interface Props {
  remainingSec: number;
  progress: number;
}

export function CompactTimer({ remainingSec, progress }: Props) {
  const pct = Math.min(100, Math.max(0, progress * 100));
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-center gap-3">
        <div
          className="font-bold tabular-nums leading-none tracking-tight"
          style={{ fontSize: "clamp(44px, 9vw, 64px)", letterSpacing: "-1.5px" }}
        >
          {fmtSecCeil(remainingSec)}
        </div>
      </div>
      <div
        className="mt-2 w-full rounded-full overflow-hidden"
        style={{ background: "var(--rule)", height: 6 }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "var(--accent)",
            width: `${pct}%`,
            transition: "width 0.25s linear",
          }}
        />
      </div>
    </div>
  );
}
