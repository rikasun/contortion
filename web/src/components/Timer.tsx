import { fmtSecCeil } from "../lib/format";

interface Props {
  remainingSec: number;
  subLabel?: string;
}

export function Timer({ remainingSec, subLabel }: Props) {
  return (
    <>
      <div
        className="font-bold tabular-nums leading-none tracking-tight"
        style={{ fontSize: "clamp(56px, 11vh, 100px)", letterSpacing: "-2px" }}
      >
        {fmtSecCeil(remainingSec)}
      </div>
      {subLabel ? (
        <div
          className="text-center mt-1 max-w-[80%]"
          style={{ color: "var(--ink-soft)", fontSize: 12 }}
        >
          {subLabel}
        </div>
      ) : null}
    </>
  );
}
