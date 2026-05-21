import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Slider, Switch, Text } from "@radix-ui/themes";
import { planList } from "../data/plans";
import { useSettings } from "../hooks/useSettings";

export const Route = createFileRoute("/")({
  component: StartScreen,
});

function StartScreen() {
  const { settings, update } = useSettings();

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <header className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-bold m-0">Rika's Flex Class</h1>
        <Text size="2" color="gray">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </header>

      <section
        className="rounded-2xl p-6"
        style={{ background: "var(--card)", border: "1px solid var(--rule)" }}
      >
        <div
          className="text-[11px] font-bold uppercase mb-1"
          style={{ color: "var(--accent)", letterSpacing: "0.6px" }}
        >
          Designed by Catie Brier
        </div>
        <h2 className="text-2xl font-bold m-0 mb-1.5">Ready when you are.</h2>
        <p
          className="m-0 mb-4 leading-[1.5]"
          style={{ color: "var(--ink-soft)" }}
        >
          I'll walk you through the plan — timer, voice cues, and your personal
          focus points. About 40 minutes of work; an hour with rests once
          you've done it a few times.
        </p>

        <div
          className="grid gap-2 mb-5"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {planList.map((p) => (
            <div
              key={p.id}
              className="rounded-xl p-3"
              style={{ background: "#fff", border: "1px solid var(--rule)" }}
            >
              <div
                className="text-[11px] font-bold uppercase"
                style={{ color: "var(--accent)", letterSpacing: "0.6px" }}
              >
                {p.author}
              </div>
              <div className="font-bold text-base mt-0.5">{p.title}</div>
              <div className="text-[12px] mt-1" style={{ color: "var(--ink-soft)" }}>
                {p.exercises.length} exercises
                {p.intro ? ` · ${p.intro.split('.')[0]}.` : ""}
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.exercises.length > 0 ? (
                  <>
                    <Link to="/class/$planId" params={{ planId: p.id }}>
                      <Button size="2">Start</Button>
                    </Link>
                    {p.exercises.some((e) => e.section === "Warm-up") ? (
                      <Link
                        to="/class/$planId"
                        params={{ planId: p.id }}
                        search={{ section: "Warm-up" }}
                      >
                        <Button size="2" variant="surface">
                          Warm-up only
                        </Button>
                      </Link>
                    ) : null}
                    {p.exercises.some((e) => e.section === "Splits") ? (
                      <Link
                        to="/class/$planId"
                        params={{ planId: p.id }}
                        search={{
                          from: p.exercises.findIndex((e) => e.section === "Splits"),
                        }}
                      >
                        <Button size="2" variant="surface">
                          Jump to Splits
                        </Button>
                      </Link>
                    ) : null}
                  </>
                ) : (
                  <Button size="2" disabled>
                    Coming soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex gap-4 flex-wrap items-center mb-3.5"
          style={{ color: "var(--ink-soft)", fontSize: 13 }}
        >
          <label className="flex items-center gap-1.5">
            <Switch
              checked={settings.voice}
              onCheckedChange={(v) => update({ voice: v })}
            />
            Voice cues
          </label>
          <label className="flex items-center gap-2">
            Volume
            <Slider
              size="1"
              min={0}
              max={1}
              step={0.1}
              defaultValue={[settings.volume]}
              onValueChange={(v) => update({ volume: v[0] })}
              style={{ width: 110 }}
            />
          </label>
          <label className="flex items-center gap-2">
            Pace
            <Slider
              size="1"
              min={0.7}
              max={1.3}
              step={0.05}
              defaultValue={[settings.rate]}
              onValueChange={(v) => update({ rate: v[0] })}
              style={{ width: 110 }}
            />
          </label>
          <Link to="/history">
            <Button size="1" variant="ghost">
              History
            </Button>
          </Link>
        </div>

        <p className="text-[12px] mt-4" style={{ color: "var(--ink-soft)" }}>
          Tip: open this on a phone or tablet near your mat. Voice works in
          Chrome and Safari. Press space to pause, ←/→ to back/skip.
        </p>

        <p
          className="text-[11px] mt-4 leading-[1.5]"
          style={{ color: "var(--ink-faint)" }}
        >
          Personal training tool — not medical advice. Stop if anything hurts.
          Plan and cues adapted from materials by Catie Brier.
        </p>
      </section>
    </div>
  );
}
