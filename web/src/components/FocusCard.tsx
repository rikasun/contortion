interface Props {
  instruction: string;
  detail?: string;
  focus?: string;
}

export function FocusCard({ instruction, detail, focus }: Props) {
  return (
    <div className="grid gap-2.5 mt-2 flex-1 min-h-0 grid-cols-1 sm:grid-cols-[1.2fr_0.8fr]">
      <div
        className="rounded-xl p-3 overflow-auto"
        style={{
          background: "#fff",
          border: "1px solid var(--rule)",
          minHeight: 0,
        }}
      >
        <h3
          className="m-0 mb-1.5 font-bold uppercase"
          style={{
            color: "var(--accent)",
            fontSize: 12,
            letterSpacing: "0.6px",
          }}
        >
          How to do it
        </h3>
        <div className="text-[15px] leading-[1.45]">{instruction}</div>
        {detail ? (
          <div
            className="text-[13px] leading-[1.5] mt-1.5"
            style={{ color: "var(--ink-soft)" }}
          >
            {detail}
          </div>
        ) : null}
      </div>
      <div
        className="rounded-xl p-3 overflow-auto"
        style={{
          background:
            "linear-gradient(180deg, var(--accent-soft), #fff)",
          border: "1px solid var(--accent-soft)",
          minHeight: 0,
        }}
      >
        <h3
          className="m-0 mb-1 font-bold uppercase"
          style={{
            color: "var(--accent)",
            fontSize: 12,
            letterSpacing: "0.6px",
          }}
        >
          Your focus
        </h3>
        <div className="text-[14px] leading-[1.5]">
          {focus ? (
            <>
              <strong style={{ color: "var(--accent)" }}>Focus:</strong>{" "}
              {focus}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
