import type { Exercise, Plan } from "../types";

// Revision of the "legs" plan after the 2026-07-31 session with Catie.
//
// Two sources are merged here:
//   1. The v2 plan download (`.local/source-v2.html`) — Standing glute stretch
//      removed, Half frog moved ahead of Pancake, plus written "Personal
//      modification" lines.
//   2. Verbal coaching from the meeting itself, which is NOT in any download.
//      Those are marked `// VERBAL:` below so they survive the next plan export.
//
// Three points were ambiguous in the meeting notes and are encoded as a best
// guess — marked `// ASSUMPTION:`. Correct these after the next check-in.

export const exercises: Exercise[] = [
  {
    id: 1,
    section: "Warm-up",
    name: "Nerve glides",
    targetSummary: "10x per side — before anything else",
    instruction:
      "Fully straighten the leg each rep, then pull the knee the whole way to the chest when you bend. Full range at both ends.",
    detail:
      "Personal modification (v2): Do these nerve glides (10x per side) before starting. Focus on fully straightening the leg each time, and pulling the knee the whole way to the chest when bending.",
    // ASSUMPTION: this is one glide pattern used everywhere. If Catie gave a
    // different glide for the lunge (front thigh / hip flexor — likely femoral)
    // than for half frog (inner knee), split this into two entries.
    focus:
      "New in v2. This clears nerve tension before you load anything — it's why the lunge and half frog stopped feeling 'stuck'. Don't rush the ends of the range.",
    phases: [
      {
        label: "Left — 10 glides",
        seconds: 40,
        cues: [
          {
            at: 0,
            say: "Nerve glides, left. Ten reps. Fully straighten the leg, then pull the knee the whole way to your chest.",
          },
          { at: 12, say: "All the way straight. All the way to the chest. Don't cut the range short." },
          { at: 25, say: "Five done. Slow and full." },
          { at: 35, say: "Last two." },
        ],
      },
      {
        label: "Right — 10 glides",
        seconds: 40,
        cues: [
          { at: 0, say: "Switch. Right leg. Ten glides. Full straighten, knee all the way to the chest." },
          { at: 12, say: "Full range both ends." },
          { at: 25, say: "Five done." },
          { at: 35, say: "Last two." },
        ],
      },
    ],
  },
  {
    id: 2,
    section: "Warm-up",
    name: "Knee straighteners",
    targetSummary: "10x each leg, 10x together, holding 3 seconds each — on blocks",
    instruction:
      "Yoga blocks under the middle of your hamstrings. Hold the blocks to pull your chest up and stick your butt out. Engage the quad to fully straighten, hold 3 seconds, relax. Toes pointed.",
    detail:
      "Start sitting with your legs straight out in front of you, and stick your butt out slightly to be right on top of your sitz bones. Staying tall through your spine, slowly engage your quads to fully straighten the leg, then let it relax. If you have a bit of hyperextension your heel will come off the floor. If you have no hyperextension, the heel will stay on the floor. Either way, the back of your knee should not lift off the ground when straightening the leg. Keep toes pointed the entire time.\n\nPersonal modification (v2): Add yoga blocks underneath the middle of the hamstrings, hold onto blocks to pull chest up and stick butt out.",
    // VERBAL: the flat-floor version was too easy — the blocks are the progression.
    focus:
      "The flat version got too easy, so the blocks are the point now — they give the leg room to fully straighten. Quads are still the activation that's been lacking.",
    phases: [
      {
        label: "Left leg — 10x, hold 3s each",
        seconds: 50,
        cues: [
          {
            at: 0,
            say: "Left leg. Ten reps. Blocks under the middle of the hamstring. Hold the blocks, pull your chest up, stick your butt out. Engage the quad to fully straighten, hold three seconds.",
          },
          { at: 16, say: "Back of the knee stays down. Toes pointed." },
          { at: 27, say: "Five down. Halfway." },
          { at: 38, say: "Quads — that's the activation that's been lacking. Three more." },
          { at: 45, say: "Last one." },
        ],
      },
      {
        label: "Right leg — 10x, hold 3s each",
        seconds: 50,
        cues: [
          { at: 0, say: "Switch. Right leg. Ten reps. Chest up off the blocks, butt out. Engage the quad." },
          { at: 16, say: "Stay tall through your spine. Toes pointed." },
          { at: 27, say: "Five down. Halfway." },
          { at: 38, say: "Fully straight on every rep. Three more." },
          { at: 45, say: "Last one." },
        ],
      },
      {
        label: "Both legs together — 10x, hold 3s each",
        seconds: 50,
        cues: [
          { at: 0, say: "Both legs together. Ten reps. Both quads on, hold three seconds." },
          { at: 16, say: "Knees fully straight. Chest lifted, butt out." },
          { at: 27, say: "Five down. Halfway." },
          { at: 38, say: "Quads on every rep. Three more." },
          { at: 45, say: "Last one." },
        ],
      },
    ],
  },
  {
    id: 3,
    section: "Warm-up",
    name: "Warm-up kicks — front and side",
    targetSummary: "8 pointed, 8 flexed each side — quick",
    instruction:
      "Quick and controlled. Front: knee straight, kick toward same-side shoulder. Side: hips stacked, knee turns to face shoulder during the kick.",
    detail:
      'Front kick: Focus on keeping the knee straight and kicking toward your same side shoulder. To make it harder, kick toward opposite side shoulder.\n\nSide kick: Start with the knees facing forward, legs actively straight, and butt squeezed. As you start the kick, turn the leg out (into external rotation) so the knee faces your shoulder, and turn the knee forward again as you close the leg. Focus on keeping hips stacked, your top hip may go back a bit when you kick, but stack it again between kicks. Aim for the kick to go behind the shoulder.',
    // VERBAL + ASSUMPTION: Catie said kicks should be QUICK now. The written
    // plan still says "slow and controlled" for both front and side — the
    // verbal instruction is newer, so it wins here. Confirm it applies to side
    // kicks too, not just front.
    focus:
      "Kicks are quick now — that's the change. (The written plan still says 'slow and controlled'; Catie updated it verbally.) Speed comes from the kick, not from losing the knee or the stacked hip.",
    phases: [
      {
        label: "Front kicks — Left (8 pointed, 8 flexed)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Front kicks, left. Eight pointed first. Quick. Knee straight, kick toward your same-side shoulder.",
          },
          { at: 12, say: "Four pointed done. Keep the pace up — knee stays straight." },
          { at: 22, say: "Pointed done. Now eight flexed. Still quick." },
          { at: 35, say: "Four flexed done. Last few." },
        ],
      },
      {
        label: "Front kicks — Right (8 pointed, 8 flexed)",
        seconds: 45,
        cues: [
          { at: 0, say: "Switch. Front kicks, right. Eight pointed. Quick." },
          { at: 12, say: "Four pointed. Knee straight." },
          { at: 22, say: "Pointed done. Now eight flexed." },
          { at: 35, say: "Four flexed. Last few." },
        ],
      },
      {
        label: "Side kicks — Left (8 pointed, 8 flexed)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Side kicks, left. Eight pointed. Quick. Knees forward, legs actively straight, butt squeezed.",
          },
          { at: 10, say: "Externally rotate as you kick — knee faces your shoulder. Re-stack the top hip between reps." },
          { at: 22, say: "Pointed done. Now eight flexed." },
          { at: 35, say: "Four flexed. Aim behind the shoulder." },
        ],
      },
      {
        label: "Side kicks — Right (8 pointed, 8 flexed)",
        seconds: 45,
        cues: [
          { at: 0, say: "Switch. Side kicks, right. Eight pointed. Quick." },
          { at: 12, say: "Stack the top hip between every rep." },
          { at: 22, say: "Pointed done. Now eight flexed." },
          { at: 35, say: "Last few. Fast, but keep the leg straight." },
        ],
      },
    ],
  },
  {
    id: 4,
    section: "Warm-up",
    name: "Back leg lifts",
    targetSummary: "10x each leg — really slow",
    instruction:
      "On elbows and knees. Tuck the pelvis FIRST, then very slowly lift the leg back. Rotate same-side hip down to square. Lift from hamstring and underbutt.",
    detail:
      'Start on your elbows and knees with elbows directly under shoulders, and knees directly under hips. From here, tuck your low abs in first, then very slowly start to lift the leg back. As you lift the leg, rotate the same side hip down to square the hip. Focus on keeping your low abs engaged, and using the hamstring and "underbutt" to lift the leg. Exaggerate tucking your pelvis at the beginning and end of each lift. Keep the hips back as you lift the leg to avoid cheating with your low back.',
    // VERBAL: contrast with the kicks — these are the SLOW ones, and the tuck
    // has to happen before the leg moves, not during.
    focus:
      "Opposite tempo to the kicks — these are really slow. The single most important thing: tuck BEFORE the leg starts moving, not while it's lifting. Don't open the hip to get higher.",
    phases: [
      {
        label: "Left leg — 10 slow lifts",
        seconds: 50,
        cues: [
          {
            at: 0,
            say: "Left leg back. Ten lifts, really slow. Tuck the pelvis first — then start the lift.",
          },
          { at: 12, say: "Rotate the same-side hip down to square it. Don't open the hip to go higher." },
          { at: 25, say: "Five done. Hamstring and underbutt do the lifting, not the low back." },
          { at: 38, say: "Three more. Hips stay back. Slower than feels necessary." },
          { at: 45, say: "Tuck first. Last lift." },
        ],
      },
      {
        label: "Right leg — 10 slow lifts",
        seconds: 50,
        cues: [
          { at: 0, say: "Switch. Right leg. Ten slow lifts. Tuck first, then lift." },
          { at: 12, say: "Square the hip down. Don't open it for a higher leg." },
          { at: 25, say: "Five down. Underbutt is the lifter." },
          { at: 38, say: "Three more. Slow. Hips back." },
          { at: 45, say: "Tuck. Last lift." },
        ],
      },
    ],
  },
  {
    id: 5,
    section: "Prep Stretches",
    name: "PNF hamstring stretch",
    targetSummary: "Resist 10s, release 10s — 4 cycles per side",
    instruction:
      "Non-stretchy strap on the ball of the foot. Leg actively straight, pull to a light stretch. RESIST hard for 10 seconds, then relax and pull closer for 10 seconds.",
    detail:
      "Lie on your back with a yoga strap (or something similar) placed around the ball of your foot. Keeping your leg actively straight, pull your leg toward your chest until you feel a light hamstring stretch, then engage your hamstring to resist against the strap as if you're trying to push your leg down to meet the other — but don't let it move too much! Hold this resistance for 10 seconds, then relax the hamstring and pull the leg closer toward your chest and hold for 10 seconds. Repeat this movement 3-5x.",
    // VERBAL: two corrections from the meeting.
    focus:
      "Use a real yoga strap, NOT the elastic one — an elastic band stretches, so there's nothing to push against and the whole exercise stops working. And actually resist: push the leg down into the strap hard. That resist phase is the exercise; you'd been skipping it.",
    phases: [
      {
        label: "Left — 4 cycles (resist 10s / release 10s)",
        seconds: 85,
        cues: [
          {
            at: 0,
            say: "Left leg up. Non-stretchy strap on the ball of the foot. Quad on, leg actively straight. Pull to a light stretch. Cycle one — resist for ten seconds.",
          },
          { at: 10, say: "Release. Pull the leg closer toward your chest." },
          { at: 20, say: "Cycle two. Resist — really push down into the strap." },
          { at: 30, say: "Release. Closer." },
          { at: 40, say: "Halfway. Two cycles left. Resist." },
          { at: 50, say: "Release. Even closer." },
          { at: 60, say: "Last cycle. Resist hard." },
          { at: 70, say: "Release. Hold the deepest position for ten seconds." },
        ],
      },
      {
        label: "Right — 4 cycles (resist 10s / release 10s)",
        seconds: 85,
        cues: [
          { at: 0, say: "Switch. Right leg. Quad on, actively straight. Cycle one — resist." },
          { at: 10, say: "Release. Pull closer." },
          { at: 20, say: "Cycle two. Push down into the strap." },
          { at: 30, say: "Release. Closer." },
          { at: 40, say: "Halfway. Resist." },
          { at: 50, say: "Release. Closer." },
          { at: 60, say: "Last cycle. Resist hard." },
          { at: 70, say: "Release. Hold." },
        ],
      },
    ],
  },
  {
    id: 6,
    section: "Prep Stretches",
    name: "Lunge — 2 positions",
    targetSummary: "Nerve glides · Position 1: 1 min · Position 2: ~45s movement + 15s foot pull",
    instruction:
      "Nerve glides first to clear the tension. Then: legs hip-width, hips in one line, pelvis tucked (low abs + underbutt), shoulders over hips. Front foot placed a little further forward, so the knee sits BEHIND the ankle — knee bent to about 90°. P1 sink hips. P2 bend back leg 5–8x, then grab the back foot 15s.",
    detail:
      "Legs hip width, hips in one line, pelvis tucked (meaning low abs engaged + under butt squeezed), shoulders on top of hips.\n\nPosition 1: Focus on sinking the hips down and feeling the stretch in your hip flexor, hold 1-minute.\n\nPosition 2: Keep your hips low and engage your hamstring to bend the back leg, then lower the foot back down to the floor sinking the hips a little deeper. Do this movement for about 45 seconds (5-8x), then grab the back foot pulling it closer to your butt for 15 seconds.",
    // VERBAL: Rika reported feeling this in the front of the thigh AND the hip
    // flexor; Catie added nerve glides here to release that tension first.
    // ASSUMPTION: same glide as exercise 1, and "a few" = 5-8x. The front-thigh
    // location suggests a femoral glide rather than the sciatic one — confirm.
    // VERBAL: front shin is neither vertical nor flat — the foot is placed a
    // little further forward, so the knee sits BEHIND the ankle and the knee
    // angle is roughly 90°. Longer stance than a knee-over-ankle lunge.
    focus:
      "Front foot goes a little further forward than feels natural — the knee ends up behind the ankle, not stacked over it, at about a 90° bend. You feel this in the front of the thigh and the hip flexor, and that's tension rather than tightness: glide it out first, then stretch. Hip flexor is a big limiter for you, so really tuck the pelvis.",
    phases: [
      {
        label: "Left — nerve glides (5–8x)",
        seconds: 20,
        cues: [
          {
            at: 0,
            say: "Left leg forward. Nerve glides first — five to eight. Full straighten, then knee all the way in.",
          },
          { at: 12, say: "Let the front of the thigh and hip flexor release. A few more." },
        ],
      },
      {
        label: "Left — Position 1: sink hips (1 minute)",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Position one. Legs hip-width, hips in one line. Pelvis tucked — low abs and underbutt squeezed.",
          },
          {
            at: 8,
            say: "Front foot a little further forward — your knee sits behind the ankle, not over it. About ninety degrees at the knee.",
          },
          { at: 18, say: "Sink the hips down. Feel the hip flexor — that's a big limiter for you." },
          { at: 30, say: "Halfway. Pelvis still tucked." },
          { at: 45, say: "Fifteen seconds. Sink more." },
        ],
      },
      {
        label: "Left — Position 2: bend back leg 5–8x, then foot pull (60s)",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Position two. Hips stay low. Bend the back leg with your hamstring, then lower the foot back down — sink deeper each time. Five to eight bends.",
          },
          { at: 20, say: "Hips down. Three bends in." },
          { at: 40, say: "Last bend." },
          { at: 45, say: "Now grab the back foot. Pull it closer to your butt. Hold fifteen seconds." },
          { at: 55, say: "Five seconds left." },
        ],
      },
      {
        label: "Right — nerve glides (5–8x)",
        seconds: 20,
        cues: [
          { at: 0, say: "Switch. Right leg forward. Nerve glides — five to eight. Full range both ends." },
          { at: 12, say: "Release the front of the thigh. A few more." },
        ],
      },
      {
        label: "Right — Position 1: sink hips (1 minute)",
        seconds: 60,
        cues: [
          { at: 0, say: "Position one. Pelvis tucked — low abs and underbutt." },
          { at: 8, say: "Front foot further forward, knee behind the ankle. About ninety degrees." },
          { at: 18, say: "Sink. Feel the hip flexor." },
          { at: 30, say: "Halfway. Pelvis stays tucked." },
          { at: 45, say: "Fifteen seconds." },
        ],
      },
      {
        label: "Right — Position 2: bend back leg 5–8x, then foot pull (60s)",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Position two. Bend the back leg with your hamstring, lower it back. Sink hips deeper each time.",
          },
          { at: 20, say: "Three bends in. Hips low." },
          { at: 40, say: "Last bend." },
          { at: 45, say: "Now grab the back foot. Pull closer to your butt. Hold fifteen seconds." },
          { at: 55, say: "Five seconds." },
        ],
      },
    ],
  },
  {
    id: 7,
    section: "Prep Stretches",
    name: "Half frog",
    targetSummary: "Nerve glides 5–8x, then hold 30 seconds per side",
    instruction:
      "Hands and knees, straighten one leg to the side. Ankle of straight leg lines up with knee of bent leg. Down to elbows, slide the leg out, hips slightly back. Nerve glides first, then hold.",
    detail:
      "Start on hands and knees and straighten one leg out to the side. The ankle of the straight leg should be lined up with the knee of the opposite leg. Lower down to your elbows, then slowly slide the leg straight out to the side keeping the hips back just a bit. You're aiming for the front of your legs to be in a straight line. Focus on keeping the leg actively straight, and squeezing your side butt.\n\nPersonal modification (v2): Do these nerve glides 5-8x, then hold for 30 seconds.",
    // Moved ahead of Pancake in v2. The "against a mat or couch" fallback was
    // removed from the plan.
    // VERBAL: the glides are here because of tension on the inner knee.
    focus:
      "The glides are here because of the tension you get on the inner knee — glide it out first, then hold. Tuck and Twerk once you're in: pelvis out, then tuck, super slow.",
    phases: [
      {
        label: "Left straight — nerve glides (5–8x)",
        seconds: 20,
        cues: [
          {
            at: 0,
            say: "Half frog left. Left leg straight to the side, ankle in line with the right knee. Down to elbows. Nerve glides — five to eight.",
          },
          { at: 12, say: "Let the inner knee release. Full range." },
        ],
      },
      {
        label: "Left straight — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Now hold. Slide the leg out, hips slightly back. Front of legs in a line." },
          { at: 8, say: "Quad on, side butt squeezed." },
          { at: 16, say: "Tuck and Twerk — pelvis out, then tuck. Super slow, five to ten times." },
          { at: 28, say: "Hold the deepest version. Five seconds." },
        ],
      },
      {
        label: "Right straight — nerve glides (5–8x)",
        seconds: 20,
        cues: [
          { at: 0, say: "Switch. Right leg out, ankle in line with the left knee. Nerve glides — five to eight." },
          { at: 12, say: "Release the inner knee. A few more." },
        ],
      },
      {
        label: "Right straight — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Now hold. Front of legs in a line, hips slightly back." },
          { at: 8, say: "Quad engaged, side butt squeezed." },
          { at: 16, say: "Tuck and Twerk. Slow, five to ten times." },
          { at: 28, say: "Hold. Five seconds." },
        ],
      },
    ],
  },
  {
    id: 8,
    section: "Prep Stretches",
    name: "Pancake",
    targetSummary: "hold 1 minute",
    instruction:
      "Widest straddle, knees pointing up, quads fully engaged. Squeeze side butt (legs open wider), keep that activation, reach forward.",
    detail:
      "Start sitting in your widest straddle with your knees pointing upward, and fully engage your quads. Before reaching forward, try to squeeze the side of your butt (which should make your legs open a bit wider). Keep that strong glute activation as you reach forward with your arms. If you have a hard time activating your legs in this position, press the legs down into the floor and, at the same time, think of lifting your butt up off the floor.",
    // v2 removed the "may also be done sitting on a yoga block" option.
    focus:
      "The yoga-block version is gone in v2 — sit on the floor. Quads engaged, side butt squeezed. If activation feels off: press the legs into the floor while imagining lifting your butt up off it.",
    phases: [
      {
        label: "Pancake — hold 1 minute",
        seconds: 60,
        cues: [
          { at: 0, say: "Pancake. Widest straddle, knees pointing up. Quads fully engaged." },
          { at: 10, say: "Squeeze the side of your butt — the legs should open a bit wider." },
          { at: 20, say: "Keep that activation. Reach forward with your arms." },
          { at: 35, say: "Halfway. Quads still on, glutes still squeezed." },
          { at: 50, say: "Ten seconds left." },
        ],
      },
    ],
  },
  {
    id: 9,
    section: "Prep Stretches",
    name: "Standing hamstring stretch",
    targetSummary: "1 minute per side — up on the balls of both feet",
    instruction:
      "Both heels lifted, weight on the balls of both feet. Fold forward, hands to floor or blocks, weight onto the front leg. Drive the BACK hip higher than the front hip.",
    detail:
      "Start with feet hip width apart, with one leg back. Bend forward to place hands on the floor (or yoga blocks), then shift the weight onto the front leg. Keep the front leg actively straight, hips in line, and lengthen your back to try to get your stomach flat on leg. Let the head hang down and keep arms relaxed.\n\nPersonal modification (v2): Focus on lifting the back leg hip higher than the front leg hip to force glutes to kick in.",
    // v2 removed the "Barbie foot" (front heel on a block) regression.
    // VERBAL + ASSUMPTION: Catie said the floor version was too easy and put
    // Rika up on tiptoe. Encoded as: heels lifted on BOTH feet (relevé). The
    // dictated note ("yoga mat on the heel") was unclear — confirm whether
    // anything goes under the foot.
    focus:
      "Too easy on flat feet, so you're up on the balls of both feet now — heels off the floor. Then the real work: drive the back hip HIGHER than the front hip. That's what forces the glutes to kick in.",
    phases: [
      {
        label: "Left front — hold 1 minute",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Left foot forward. Rise up onto the balls of both feet — heels off the floor. Fold over, hands to floor or blocks.",
          },
          { at: 15, say: "Shift the weight onto the front leg. Front leg actively straight — quad on." },
          { at: 30, say: "Now lift the back hip higher than the front hip. That's what turns the glutes on." },
          { at: 45, say: "Fifteen seconds. Head hangs, arms relaxed. Back hip stays high." },
        ],
      },
      {
        label: "Right front — hold 1 minute",
        seconds: 60,
        cues: [
          { at: 0, say: "Switch. Right foot forward. Up onto the balls of both feet." },
          { at: 15, say: "Weight forward. Front leg actively straight. Quad on." },
          { at: 30, say: "Back hip higher than the front hip." },
          { at: 45, say: "Fifteen seconds. Keep that hip lifted." },
        ],
      },
    ],
  },
  {
    id: 10,
    section: "Splits",
    name: "Square splits",
    targetSummary: "1 minute each side · 3 sets · sets 2 & 3 over-split on 2 blocks",
    instruction:
      "Hip bones level and lined up, front knee up, back knee down, shoulders over hips. Set 1 on the floor — find square. Sets 2 & 3: front foot on 2 blocks.",
    detail:
      "Hips bones level and lined up, front knee facing up, back knee facing down, shoulders on top of hips. Low abs and front leg quad engaged. Try to sink a little deeper into the square position every 10 seconds.\n\nSet 1 — Mainly focus on squaring the hips by pulling the front hip back, then slightly sitting the weight onto the front leg. But don't focus much on trying to sink down, just find square.\n\nSets 2 & 3 — Put front foot on 2 blocks. Still focus on squaring hips, but now try to sink deeper into the square position.",
    // VERBAL: the blocks are an over-split, and the goal is more front-hamstring
    // stretch. The mechanism only works while the hips stay square — if they
    // open, the elevation does nothing.
    focus:
      "Sets 2 and 3 are an over-split — front foot up on 2 blocks to get more front-hamstring stretch. It only works if the hips stay square; if they open, you're just sinking, not stretching. Start higher, pull the front hip back until the hip bones line up, then sit onto the front leg.",
    phases: [
      {
        label: "Set 1 — Left front — find square, on the floor (1 min)",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Square splits set one, on the floor. Left front. Start higher than usual — your hips have been opening.",
          },
          { at: 10, say: "Pull the front hip back. Hip bones perfectly lined up." },
          { at: 25, say: "Slightly sit the weight onto the front leg." },
          { at: 40, say: "Find square. Don't try to sink yet. Twenty seconds." },
          { at: 55, say: "Five seconds left." },
        ],
      },
      {
        label: "Set 1 — Right front — find square, on the floor (1 min)",
        seconds: 60,
        cues: [
          { at: 0, say: "Switch. Set one. Right front. Square the hips first." },
          { at: 10, say: "Front hip back. Hip bones lined up." },
          { at: 25, say: "Sit weight onto the front leg." },
          { at: 40, say: "Find square. Don't sink. Twenty seconds." },
          { at: 55, say: "Five seconds left." },
        ],
      },
      {
        label: "Set 2 — Left front — front foot on 2 blocks (1 min)",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Set two. Front foot up on two blocks. Left front. This is the over-split — it's for the front hamstring.",
          },
          { at: 15, say: "Square first, then sink. Pull that front hip back." },
          { at: 30, say: "Halfway. If the hips open, the blocks stop doing anything." },
          { at: 45, say: "Fifteen seconds. Squared, then deeper." },
        ],
      },
      {
        label: "Set 2 — Right front — front foot on 2 blocks (1 min)",
        seconds: 60,
        cues: [
          { at: 0, say: "Set two. Right front, foot on two blocks." },
          { at: 15, say: "Front hip back. Then sink." },
          { at: 30, say: "Halfway. Hip bones stay lined up." },
          { at: 45, say: "Fifteen seconds." },
        ],
      },
      {
        label: "Set 3 — Left front — front foot on 2 blocks (1 min)",
        seconds: 60,
        cues: [
          { at: 0, say: "Final set. Left front, still on two blocks. Deepest square version." },
          { at: 15, say: "Feel it through the middle of the front hamstring — that's the right place." },
          { at: 30, say: "Halfway. Squared hips, then deeper." },
          { at: 45, say: "Fifteen seconds left." },
        ],
      },
      {
        label: "Set 3 — Right front — front foot on 2 blocks (1 min)",
        seconds: 60,
        cues: [
          { at: 0, say: "Final set. Right front, on two blocks. Deepest version." },
          { at: 15, say: "Square, sink, square, sink." },
          { at: 30, say: "Halfway. Middle of the hamstring." },
          { at: 45, say: "Fifteen seconds." },
        ],
      },
    ],
  },
  {
    id: 11,
    section: "Splits",
    name: "Middle splits",
    targetSummary: "30 seconds · 2 sets",
    instruction:
      "Sitz bones against wall, feet a few inches out. Hands on floor, lower slowly. Legs strong and straight, quads on, side butt active. Come out by sitting onto your butt.",
    detail:
      "Start standing with your sitz bones pressed against a wall, and feet a few inches away from the wall. Place your hands on the floor and slowly lower down as much as you can while keeping your legs strong and straight. Keep quads engaged and side butt active!\n\nPersonal modification (v2): Come out by sitting onto your butt.",
    // VERBAL: Rika flagged this as the position that blocks her most. Catie's
    // answer was engagement, not depth — plus a safer exit.
    focus:
      "You told her this one blocks you most, and her answer was engagement, not depth. Quads on, side butt active — that's what unblocks it, not sinking harder. Come out by sitting down onto your butt.",
    phases: [
      {
        label: "Set 1 — hold 30s",
        seconds: 35,
        cues: [
          {
            at: 0,
            say: "Middle splits set one. Sitz bones to the wall, feet a few inches out. Hands on the floor. Lower slowly.",
          },
          { at: 8, say: "Quads engaged. Side butt active. This is the one that blocks you — engage, don't force." },
          { at: 16, say: "Tuck and Twerk — pelvis out, then tuck. Super slow, five to ten times." },
          { at: 28, say: "Hold. Five seconds. Come out by sitting onto your butt." },
        ],
      },
      {
        label: "Set 2 — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Set two. Lower again, deeper than set one." },
          { at: 8, say: "Quads on, side butt active." },
          { at: 16, say: "Tuck and Twerk again." },
          { at: 28, say: "Hold. Five seconds, then sit onto your butt to come out." },
        ],
      },
    ],
  },
  {
    id: 12,
    section: "Active Flex",
    name: "Seated leg lifts",
    targetSummary: "15x per side — with a knee straightener on each lift",
    instruction:
      "Bend one leg, heel in line with opposite knee. Hug the bent knee, chest up, butt out. Fully straighten the leg, THEN lift. Coming down, put the knee down before the heel.",
    detail:
      "Start sitting with legs straight out in front of you. Bend one leg and place the heel in line with the knee of the opposite leg. Hug the knee of the bent leg, lift chest up, and try to rotate your pelvis to stick your butt out. From here, lift the straight leg, then slowly lower it back down. Don't slouch and round back to lift your leg! Keep your chest lifted throughout, and reach forward and out with your toes.\n\nPersonal modification (v2): Do Knee Straighteners with the lift. Fully straighten the leg, lift, then try to put your knee down before your heel on the descent.",
    // VERBAL: Catie framed this as an added challenge on top of the plain lift.
    focus:
      "Upgraded: it's a knee straightener plus a lift now. Sequence per rep — fully straighten, lift, lower, and land the knee before the heel. Chest stays lifted; don't round back to go higher.",
    phases: [
      {
        label: "Left straight — 15 reps",
        seconds: 55,
        cues: [
          {
            at: 0,
            say: "Seated leg lifts. Left leg straight, right leg bent with the heel in line with the left knee. Hug the bent knee. Chest lifted, butt out. Fifteen reps.",
          },
          { at: 12, say: "Fully straighten the knee first, then lift. Straighten, then lift." },
          { at: 27, say: "Halfway. On the way down — knee touches before the heel." },
          { at: 42, say: "Three more. Chest up, toes reaching forward and out." },
          { at: 50, say: "Last rep." },
        ],
      },
      {
        label: "Right straight — 15 reps",
        seconds: 55,
        cues: [
          { at: 0, say: "Switch. Right leg straight. Hug the left knee. Fifteen reps." },
          { at: 12, say: "Straighten fully, then lift." },
          { at: 27, say: "Halfway. Knee down before the heel." },
          { at: 42, say: "Three more. Don't round the back to lift." },
          { at: 50, say: "Last rep." },
        ],
      },
    ],
  },
  {
    id: 13,
    section: "Active Flex",
    name: "Lunge rotations",
    targetSummary: "5–10x per side",
    instruction:
      "Kneel on one leg, butt to heel, hips square, opposite leg straight back. Press knee into floor to lift hips, actively straighten back leg, rotate so knee faces up, both sitz bones to floor. Reverse.",
    detail:
      "Start kneeling on one leg with your butt on your heel, hips square, and opposite leg straight behind you. From here, press your bent leg knee into the floor to lift the hips slightly, engage your low abs, and actively straighten your back leg (without leaning forward!). From here, rotate your back leg so your knee is facing up, level your hips while you rotate, then sit both sitz bones onto the ground at the same time. Keeping your straight leg strong and straight, press both legs into the floor to lift hips up and rotate back to the starting position. Focus on your straight leg staying actively straight, keeping your shoulders stacked over hips and low abs engaged. You may lift as high as you need to be able to rotate to and from the starting position, but don't rely on your arms too much (make your legs do the work!)",
    focus:
      "Straight leg stays actively straight throughout. Shoulders stacked over hips. Don't lean forward when you lift the hips.",
    phases: [
      {
        label: "Left back — 7 reps (in the 5–10 range)",
        seconds: 55,
        cues: [
          {
            at: 0,
            say: "Lunge rotations. Kneel on the right. Left leg straight back. Hips square. Press the right knee down to lift the hips.",
          },
          { at: 12, say: "Actively straighten the back leg — don't lean forward." },
          { at: 22, say: "Rotate so the back knee faces up. Level the hips. Both sitz bones to the floor." },
          { at: 32, say: "Three done. Press both legs into the floor to lift and rotate back." },
          { at: 45, say: "Last few. Straight leg stays actively straight." },
        ],
      },
      {
        label: "Right back — 7 reps",
        seconds: 55,
        cues: [
          { at: 0, say: "Switch. Kneel on the left. Right leg straight back. Seven reps." },
          { at: 18, say: "Straight leg actively straight through the whole rotation." },
          { at: 32, say: "Three done. Make the legs do the work, not the arms." },
          { at: 48, say: "Last rep." },
        ],
      },
    ],
  },
  {
    id: 14,
    section: "Active Flex",
    name: "Kneeling tilt",
    targetSummary: "hold 30 seconds per side",
    instruction:
      "Table top, ARMS STRAIGHT — don't bend the elbows. Top leg up to the side. Don't chase height: prioritize alignment, and push the hips forward and down to the side.",
    detail:
      "Start in a table top position with the hands, knees, and feet aligned. From here, bring one leg straight up to the side to be in a frog-looking position. You want your top leg to look like a mirror image of the bottom leg, and you can use a mirror to keep an eye on the alignment. Focus on keeping the top knee rotated back, hips forward, and bottom foot in line with the knee (it's going to want to slide backward). Low abs, obliques and side butt should all be working.\n\nYour leg won't lift nearly as high as the photos at first. The top leg may only be able to lift to be parallel to the floor, and that's fine!",
    // VERBAL: none of this is in the v2 download — the written text for this
    // exercise is unchanged from v1. All three points came from the meeting.
    focus:
      "Three things she called out, none of them in the written plan: (1) arms completely straight — do not bend the elbows; (2) don't try to straighten the top leg yet, that's not the goal right now; (3) hips push forward AND down to the side, not just forward. Alignment over height.",
    phases: [
      {
        label: "Left side up — hold 30s",
        seconds: 35,
        cues: [
          {
            at: 0,
            say: "Kneeling tilt. Table top, arms completely straight — don't bend the elbows. Bring the left leg up to the side.",
          },
          { at: 10, say: "Don't chase height. Mirror the bottom leg, top knee rotated back." },
          { at: 20, say: "Push the hips forward, and down to the side. Bottom foot in line with the knee." },
          { at: 30, say: "Elbows straight. Five seconds left." },
        ],
      },
      {
        label: "Right side up — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Switch. Right leg up. Arms straight, elbows locked out." },
          { at: 10, say: "Alignment over height. Top knee rotates back." },
          { at: 20, say: "Hips forward and down to the side. Low abs, obliques, side butt." },
          { at: 30, say: "Five seconds." },
        ],
      },
    ],
  },
  {
    id: 15,
    section: "Active Flex",
    name: "Gazelle",
    targetSummary: "hold 1 minute per side",
    instruction:
      "Standing on one leg, knee to chest. Standing leg actively straight. Press through the heel to drive the hips forward. Pelvis tucked, standing-leg quad fully engaged.",
    detail:
      "Standing on one leg, bring your knee up to your chest while focusing on keeping the standing leg actively straight. Then press through your heel to drive your hips forward. You may feel a light hip flexor stretch, but the main goals are to keep the pelvis tucked and the standing leg quad fully engaged. Once 1 yoga block becomes easy, do on 2 yoga blocks.",
    focus: "Standing leg actively straight, quad fully engaged. Pelvis tucked.",
    phases: [
      {
        label: "Standing on right — hold 1 minute",
        seconds: 60,
        cues: [
          {
            at: 0,
            say: "Gazelle. Stand on the right. Left knee to chest. Standing leg actively straight — quad fully engaged.",
          },
          { at: 15, say: "Press through the heel. Drive the hips forward." },
          { at: 30, say: "Halfway. Pelvis tucked. Standing quad still on." },
          { at: 45, say: "Fifteen seconds." },
        ],
      },
      {
        label: "Standing on left — hold 1 minute",
        seconds: 60,
        cues: [
          { at: 0, say: "Switch. Stand on the left. Right knee to chest. Quad on." },
          { at: 15, say: "Heel press. Hips forward." },
          { at: 30, say: "Halfway. Pelvis tucked." },
          { at: 45, say: "Fifteen seconds." },
        ],
      },
    ],
  },
  {
    id: 16,
    section: "Active Flex",
    name: "Standing leg lifts — front, side, back",
    targetSummary: "Each direction × each side: 10 lifts · hold up 10s · 10 pulses up",
    instruction:
      "Front: legs parallel, hips level, standing butt squeezed. Side: standing leg slightly turned out, working knee straight up. Back: leg directly behind same-side hip, knee STRAIGHT, chest leans forward a bit.",
    detail:
      "Front: Legs parallel and actively straight, hips level, standing butt squeezed. Lift the leg as high as you can while keeping a straight standing leg. You can lean your chest back slightly and shift the hips forward (like in Gazelle) as you lift the leg.\n\nSide: Standing leg slightly turned out, working leg knee straight up (externally rotated), chest stacked over standing leg. The lifting leg can be slightly diagonally forward to focus on the external rotation of the working leg. Don't allow the hips to twist toward the lifting leg, keep hip bones facing forward. Really focus on the glute activation of the bottom leg, and don't let any weight shift onto the working leg when you lower it down.\n\nBack: Leg directly behind same side hip, arms reaching back to work upper back muscles, extra focus on back knee being straight (it has a tendency to feel straight when it isn't). Shift your weight back to your heel and lean the chest a little forward (but still lifting and opening the chest!) while lifting the leg. Keep shoulders and hips squared off throughout.",
    focus:
      "Back lifts especially — REALLY square the hips. Don't open the hip to get the leg higher. Only use hamstring and low-glute strength. It won't go as high but it builds what you actually need.",
    phases: [
      {
        label: "Front — Left (10 lifts · 10s hold · 10 pulses)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Standing leg lifts front, left. Ten lifts first. Legs parallel, hips level, standing butt squeezed.",
          },
          { at: 10, say: "Five lifts done. Lean the chest back slightly, shift hips forward like Gazelle." },
          { at: 20, say: "Ten lifts done. Now hold up at the highest point — ten seconds." },
          { at: 30, say: "Now ten pulses up. Quick." },
          { at: 40, say: "Last three pulses." },
        ],
      },
      {
        label: "Front — Right (10 · 10s · 10)",
        seconds: 45,
        cues: [
          { at: 0, say: "Switch. Front, right. Ten lifts." },
          { at: 10, say: "Five done. Standing leg actively straight." },
          { at: 20, say: "Lifts done. Hold up ten seconds." },
          { at: 30, say: "Ten pulses up." },
          { at: 40, say: "Last few pulses." },
        ],
      },
      {
        label: "Side — Left (10 · 10s · 10)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Side, left. Ten lifts. Standing leg slightly turned out. Working knee straight up, externally rotated.",
          },
          { at: 10, say: "Five done. Don't twist the hips toward the lifting leg — hip bones face forward." },
          { at: 20, say: "Lifts done. Hold up ten seconds. Glute of the bottom leg." },
          { at: 30, say: "Ten pulses up." },
          { at: 40, say: "Last three pulses." },
        ],
      },
      {
        label: "Side — Right (10 · 10s · 10)",
        seconds: 45,
        cues: [
          { at: 0, say: "Switch. Side, right. Ten lifts." },
          { at: 10, say: "Five done. Hip bones face forward. Glute of the bottom leg working." },
          { at: 20, say: "Lifts done. Hold up ten seconds." },
          { at: 30, say: "Ten pulses." },
          { at: 40, say: "Last few." },
        ],
      },
      {
        label: "Back — Left (10 · 10s · 10)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Back, left. Ten lifts. Leg directly behind the same-side hip. Knee really straight — it likes to feel straight when it isn't.",
          },
          { at: 10, say: "Five done. Hips squared — don't open the hip to go higher. Hamstring and low glute do the work." },
          { at: 20, say: "Lifts done. Hold up ten seconds. Shift weight to the heel, chest leans forward." },
          { at: 30, say: "Ten pulses up." },
          { at: 40, say: "Last three pulses." },
        ],
      },
      {
        label: "Back — Right (10 · 10s · 10)",
        seconds: 45,
        cues: [
          {
            at: 0,
            say: "Switch. Back, right. Ten lifts. Knee really straight — check it; it likes to feel straight when it isn't.",
          },
          { at: 10, say: "Five done. Hips squared. Hamstring and underbutt lift, not the low back." },
          { at: 20, say: "Lifts done. Hold up ten seconds." },
          { at: 30, say: "Ten pulses." },
          { at: 40, say: "Last few." },
        ],
      },
    ],
  },
  {
    id: 17,
    section: "Active Flex",
    name: "Toe point exercise",
    targetSummary: "hold 30 seconds per side",
    instruction:
      "Standing leg straight, working leg bent, top of toes on the ground. Squeeze bottom of toes and arch. Move hips forward and back. Then rise to ball of foot on standing leg while straightening the working knee. Don't sickle.",
    detail:
      "Starting with the standing leg straight, working leg bent, place the top of your toes on the ground squeezing the bottom of your toes and arch of your foot. From here, move your hips forward and back to feel the stretch in different places (top of toes, foot, front of ankle), then raise to the ball of your foot on the standing leg, while straightening the working leg knee, this will help work on knee straightening strength while also getting a new stretch. Be sure not to sickle the foot — meaning having your foot turned in from the ankle.",
    focus: "Don't sickle — keep the ankle straight, not turned in.",
    phases: [
      {
        label: "Left foot down — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Toe point. Left toes on the ground. Squeeze the bottom of your toes and the arch." },
          { at: 10, say: "Move the hips forward and back — find the stretch in different places." },
          { at: 18, say: "Now rise to the ball of the foot on the standing leg. Straighten the working knee." },
          { at: 28, say: "Don't sickle — ankle stays in line. Five seconds left." },
        ],
      },
      {
        label: "Right foot down — hold 30s",
        seconds: 35,
        cues: [
          { at: 0, say: "Switch. Right toes down. Squeeze the bottom of your toes and the arch." },
          { at: 10, say: "Move the hips forward and back." },
          { at: 18, say: "Rise up. Working knee straightens." },
          { at: 28, say: "Don't sickle. Five seconds." },
        ],
      },
    ],
  },
];

// Reuses the v1 illustrations — the exercises are the same, only renumbered.
// Nerve glides (id 1) has no photo; standing glute (04) is unused in v2.
const ILLUSTRATION_BY_ID: Record<number, string> = {
  2: "01-knee-straighteners.png",
  3: "02-warmup-kicks.png",
  4: "03-back-leg-lifts.png",
  5: "05-pnf-hamstring.png",
  6: "06-lunge.png",
  7: "08-half-frog.png",
  8: "07-pancake.png",
  9: "09-standing-hamstring.png",
  10: "10-square-splits.png",
  11: "11-middle-splits.png",
  12: "12-seated-leg-lifts.png",
  13: "13-lunge-rotations.png",
  14: "14-kneeling-tilt.png",
  15: "15-gazelle.png",
  16: "16-standing-leg-lifts.png",
  17: "17-toe-point.png",
};

const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
const TRANSITION_BY_SECTION: Record<string, number> = {
  "Warm-up": 5,
  "Prep Stretches": 10,
  "Splits": 10,
  "Active Flex": 8,
};
for (const ex of exercises) {
  const f = ILLUSTRATION_BY_ID[ex.id];
  if (f) ex.photo = `${BASE}/illustrations/${f}`;
  if (ex.transitionSec == null) {
    ex.transitionSec = TRANSITION_BY_SECTION[ex.section] ?? 5;
  }
}

export const legsV2Plan: Plan = {
  id: "legs-v2",
  title: "Leg Flexibility v2",
  author: "Catie Brier",
  date: "2026-07-31",
  intro:
    "Revised after the July check-in. Nerve glides now come first and repeat inside the lunge and half frog. Square splits go to an over-split on 2 blocks for sets 2 and 3, standing hamstring is up on the balls of both feet, and kicks are quick while back leg lifts are slow.",
  exercises,
};
