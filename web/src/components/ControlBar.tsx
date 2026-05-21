import { Button } from "@radix-ui/themes";

interface Props {
  isRunning: boolean;
  onBack: () => void;
  onPlayPause: () => void;
  onNext: () => void;
}

export function ControlBar({ isRunning, onBack, onPlayPause, onNext }: Props) {
  return (
    <div className="flex gap-2 justify-center my-2 flex-wrap">
      <Button size="3" variant="surface" onClick={onBack}>
        ◀︎ Back
      </Button>
      <Button
        size="3"
        onClick={onPlayPause}
        style={{ background: "var(--accent)", color: "#fff", minWidth: 120 }}
      >
        {isRunning ? "Pause" : "Resume"}
      </Button>
      <Button size="3" variant="surface" onClick={onNext}>
        Skip ▶︎
      </Button>
    </div>
  );
}
