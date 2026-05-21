import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "@radix-ui/themes";
import { getPlan } from "../data/plans";
import { useSession } from "../hooks/useSession";
import { useSpeech } from "../hooks/useSpeech";
import { useChime } from "../hooks/useChime";
import { useRecordSession, isSessionRecordable } from "../hooks/useSessionLog";
import { useSettings } from "../hooks/useSettings";
import { CompactTimer } from "../components/CompactTimer";
import { ControlBar } from "../components/ControlBar";
import { CueDisplay } from "../components/CueDisplay";
import { FocusCard } from "../components/FocusCard";
import { Sidebar } from "../components/Sidebar";
import { PhotoCard } from "../components/PhotoCard";

const searchSchema = z.object({
  from: z.number().optional(),
  section: z.string().optional(),
});

export const Route = createFileRoute("/class/$planId")({
  validateSearch: searchSchema,
  component: ClassScreen,
});

function ClassScreen() {
  const { planId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const plan = getPlan(planId);
  const { settings } = useSettings();

  // Pass LIVE settings so toggling voice/volume mid-session takes effect.
  const speechSettings = {
    enabled: settings.voice,
    volume: settings.volume,
    rate: settings.rate,
  };
  const volumeRef = useRef(settings.volume);
  volumeRef.current = settings.volume;
  const { say, cancel } = useSpeech(speechSettings);
  const chime = useChime(volumeRef);
  const recordSession = useRecordSession();

  const [cueText, setCueText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasBegun, setHasBegun] = useState(false);

  const cueTimerRef = useRef<number>(0);

  const session = useSession({
    plan: plan!,
    startExerciseIdx: search.from ?? 0,
    sectionLimit: search.section ?? null,
    onCue: (text) => {
      setCueText(text);
      say(text);
      window.clearTimeout(cueTimerRef.current);
      cueTimerRef.current = window.setTimeout(() => {
        setCueText((cur) => (cur === text ? "" : cur));
      }, 4500);
    },
    onPhaseStart: (step) => {
      chime.start();
      // The at=0 cue in each phase already covers the spoken intro.
      // Speaking here in addition would race with the cue and one gets
      // cancelled by Chrome's quirky engine. Only speak the phase label if
      // the phase has no at=0 cue.
      const hasOpeningCue = step.phase.cues.some((c) => c.at === 0);
      if (!hasOpeningCue) {
        const bits: string[] = [];
        if (step.phaseIdx === 0) bits.push(`${step.ex.name}.`);
        bits.push(step.phase.label.replace(/\(.*?\)/g, "").trim());
        say(bits.join(" "));
      }
    },
    onPhaseEnd: () => {
      chime.end();
    },
    onTick: () => chime.tick(),
    onFinish: (result) => {
      cancel();
      const input = {
        planId,
        startedAt: result.startedAt,
        finishedAt: result.finishedAt,
        durationSec: result.durationSec,
        plannedSec: result.plannedSec,
        completedExerciseIds: result.completedExerciseIds,
        skippedExerciseIds: result.skippedExerciseIds,
      };
      const eligible = isSessionRecordable(input, {
        totalExercises: plan!.exercises.length,
        completedAll: result.completedAll,
      });
      if (eligible) recordSession.mutate(input);
    },
  });

  // Add/remove the in-class body class
  useEffect(() => {
    document.body.classList.add("in-class");
    return () => {
      cancel();
      document.body.classList.remove("in-class");
    };
  }, [cancel]);

  // Keyboard shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!hasBegun) return;
        if (session.status === "running") session.pause();
        else if (session.status === "paused") session.resume();
      } else if (e.code === "ArrowRight") session.next();
      else if (e.code === "ArrowLeft") session.back();
      else if (e.code === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [session, hasBegun]);

  if (!plan) {
    return (
      <div className="p-6">
        <p>Plan not found.</p>
        <Button onClick={() => navigate({ to: "/" })}>Home</Button>
      </div>
    );
  }
  if (plan.exercises.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
        <p style={{ color: "var(--ink-soft)" }}>{plan.intro}</p>
        <Button onClick={() => navigate({ to: "/" })}>Back</Button>
      </div>
    );
  }

  if (session.status === "done") {
    return (
      <DoneScreen
        onAgain={() => {
          setHasBegun(true);
          session.start();
        }}
        onHome={() => navigate({ to: "/" })}
      />
    );
  }

  // BEGIN GATE — show preview + a Begin button until the user clicks,
  // so audio + speech are initialized from a fresh user gesture (browser autoplay rules).
  if (!hasBegun) {
    const first = plan.exercises[search.from ?? 0];
    return (
      <div className="max-w-[920px] mx-auto p-6">
        <section
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--card)", border: "1px solid var(--rule)" }}
        >
          <div
            className="font-bold uppercase tracking-[1px]"
            style={{ fontSize: 11, color: "var(--accent)" }}
          >
            {first.section}
          </div>
          <h2 className="text-2xl font-bold m-0 mt-1 mb-1">
            Ready: {plan.title}
          </h2>
          <p
            className="m-0 mb-4"
            style={{ color: "var(--ink-soft)", fontSize: 14 }}
          >
            First exercise: {first.name}
            {first.targetSummary ? ` — ${first.targetSummary}` : ""}
          </p>
          {first.photo ? (
            <div className="mb-4 max-w-md mx-auto">
              <PhotoCard src={first.photo} alt={first.name} />
            </div>
          ) : null}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              size="3"
              onClick={() => {
                // The Begin click IS the user gesture that unlocks audio + speech.
                // The exercise intro spoken inside session.start() serves as the primer.
                setHasBegun(true);
                session.start();
              }}
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Begin
            </Button>
            <Button
              size="3"
              variant="surface"
              onClick={() => navigate({ to: "/" })}
            >
              Back
            </Button>
          </div>
          <p
            className="text-[12px] mt-4"
            style={{ color: "var(--ink-soft)" }}
          >
            Tap Begin to start the timer and voice cues.
          </p>
        </section>
      </div>
    );
  }

  const step = session.step;
  const isRunning = session.status === "running";

  const progress = session.phaseSeconds
    ? session.phaseElapsedSec / session.phaseSeconds
    : 0;

  return (
    <div className="max-w-[1280px] mx-auto p-3 min-h-screen flex flex-col">
      <header className="flex items-center justify-between mb-2 gap-2">
        <h1 className="text-base font-bold m-0">Flex Class</h1>
        <div className="flex items-center gap-2">
          <Button
            size="1"
            variant="ghost"
            onClick={() => session.endNow()}
          >
            End
          </Button>
          <Button
            size="1"
            variant="surface"
            onClick={() => setSidebarOpen((s) => !s)}
            className="md:!hidden"
          >
            Plan ▾
          </Button>
        </div>
      </header>

      <div className="md:grid md:grid-cols-[minmax(0,1fr)_320px] md:gap-3.5 flex-1 min-h-0">
        <section
          className="rounded-2xl px-4 py-3 flex flex-col"
          style={{
            background: "var(--card)",
            border: "1px solid var(--rule)",
          }}
        >
          <div
            className="font-bold uppercase tracking-[1px]"
            style={{ fontSize: 11, color: "var(--accent)" }}
          >
            {step?.ex.section} · Ex {step?.ex.id}/{plan.exercises.length}
          </div>
          <h2
            className="m-0 mt-0.5 font-bold leading-[1.15]"
            style={{ fontSize: "clamp(20px, 4.5vw, 28px)" }}
          >
            {step?.ex.name}
          </h2>
          <div
            className="mt-0.5"
            style={{
              color: "var(--ink-soft)",
              fontSize: "clamp(13px, 1.6vw, 15px)",
            }}
          >
            {step?.phase.label}
          </div>

          {step?.ex.photo ? (
            <div className="mt-3">
              <PhotoCard src={step.ex.photo} alt={step.ex.name} />
            </div>
          ) : null}

          <div className="mt-3">
            <CompactTimer
              remainingSec={session.phaseRemainingSec}
              progress={progress}
            />
          </div>

          <CueDisplay text={cueText} />

          <ControlBar
            isRunning={isRunning}
            onBack={session.back}
            onNext={session.next}
            onPlayPause={() =>
              isRunning ? session.pause() : session.resume()
            }
          />

          {step ? (
            <FocusCard
              instruction={step.ex.instruction}
              detail={step.ex.detail}
              focus={step.ex.focus}
            />
          ) : null}
        </section>

        <Sidebar
          sequence={session.sequence}
          cursor={session.cursor}
          totalSec={session.totalSec}
          sessionElapsedSec={session.sessionElapsedSec}
          sessionRemainingSec={session.sessionRemainingSec}
          onJump={session.jumpTo}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

function DoneScreen({
  onAgain,
  onHome,
}: {
  onAgain: () => void;
  onHome: () => void;
}) {
  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <section
        className="text-center rounded-2xl p-10"
        style={{ background: "var(--card)", border: "1px solid var(--rule)" }}
      >
        <h2 className="text-3xl font-bold m-0 mb-1.5">Done.</h2>
        <p className="m-0 mb-4" style={{ color: "var(--ink-soft)" }}>
          Nice work. Hydrate, breathe, and notice what's changed since last
          session.
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={onAgain}>Run it again</Button>
          <Button variant="surface" onClick={onHome}>
            Home
          </Button>
        </div>
      </section>
    </div>
  );
}
