interface Props {
  text: string;
}

export function CueDisplay({ text }: Props) {
  return (
    <div
      className="text-center font-bold mt-1 mb-1"
      style={{
        color: "var(--accent)",
        minHeight: 22,
        fontSize: "clamp(14px, 1.6vh + 10px, 17px)",
      }}
    >
      {text}
    </div>
  );
}
