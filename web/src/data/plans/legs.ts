import type { Exercise, Plan } from "../types";

export const exercises: Exercise[] = [
  {
    "id": 1,
    "section": "Warm-up",
    "name": "Knee straighteners",
    "targetSummary": "10x each leg, 10x together, holding 3 seconds each",
    "instruction": "Sit tall, butt on sitz bones. Engage your quads to fully straighten the leg, then let it relax. Hold 3 seconds. Toes pointed.",
    "detail": "Start sitting with your legs straight out in front of you, and stick your butt out slightly to be right on top of your sitz bones. Staying tall through your spine, slowly engage your quads to fully straighten the leg, then let it relax. If you have a bit of hyperextension your heel will come off the floor. If you have no hyperextension, the heel will stay on the floor. Either way, the back of your knee should not lift off the ground when straightening the leg. Keep toes pointed the entire time.",
    "focus": "Engaging your quads is the muscle activation that's been lacking — really pay attention to it here.",
    "phases": [
      {
        "label": "Left leg — 10x, hold 3s each",
        "seconds": 40,
        "cues": [
          {
            "at": 0,
            "say": "Left leg. Ten reps. Engage the quad, hold three seconds, then relax."
          },
          {
            "at": 12,
            "say": "Back of the knee stays down."
          },
          {
            "at": 28,
            "say": "Toes pointed the whole time."
          }
        ]
      },
      {
        "label": "Right leg — 10x, hold 3s each",
        "seconds": 40,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg. Ten reps."
          },
          {
            "at": 20,
            "say": "Stay tall through your spine."
          }
        ]
      },
      {
        "label": "Both legs together — 10x, hold 3s each",
        "seconds": 40,
        "cues": [
          {
            "at": 0,
            "say": "Both legs together. Ten reps. Hold three seconds."
          },
          {
            "at": 20,
            "say": "Quads on every rep."
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "section": "Warm-up",
    "name": "Warm-up kicks — front and side",
    "targetSummary": "8 pointed, 8 flexed each side",
    "instruction": "Front: knee straight, kick toward same-side shoulder. Side: hips stacked, knee turns to face shoulder during the kick.",
    "detail": "Front kick: Focus on keeping the knee straight and kicking toward your same side shoulder. Start slow and controlled, and increase the speed as they get easier. To make it harder, kick toward opposite side shoulder.\n\nSide kick: Start with the knees facing forward, legs actively straight, and butt squeezed. As you start the kick, turn the leg out (into external rotation) so the knee faces your shoulder, and turn the knee forward again as you close the leg. Focus on keeping hips stacked, your top hip may go back a bit when you kick, but stack it again between kicks. Aim for the kick to go behind the shoulder. Do these slow and controlled.",
    "focus": "Knee actively straight. For side kicks, re-stack the top hip between every rep.",
    "phases": [
      {
        "label": "Front kicks — Left (8 pointed, 8 flexed)",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Front kicks, left. Eight pointed first. Knee straight. Toward your same-side shoulder."
          },
          {
            "at": 18,
            "say": "Now eight flexed."
          }
        ]
      },
      {
        "label": "Front kicks — Right (8 pointed, 8 flexed)",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Front kicks, right. Eight pointed."
          },
          {
            "at": 18,
            "say": "Eight flexed."
          }
        ]
      },
      {
        "label": "Side kicks — Left (8 pointed, 8 flexed)",
        "seconds": 40,
        "cues": [
          {
            "at": 0,
            "say": "Side kicks, left. Knees forward, legs actively straight, butt squeezed."
          },
          {
            "at": 8,
            "say": "Externally rotate as you kick. Knee faces your shoulder."
          },
          {
            "at": 22,
            "say": "Switch to flexed. Re-stack the hip between reps."
          }
        ]
      },
      {
        "label": "Side kicks — Right (8 pointed, 8 flexed)",
        "seconds": 40,
        "cues": [
          {
            "at": 0,
            "say": "Side kicks, right."
          },
          {
            "at": 8,
            "say": "Slow and controlled. Aim behind the shoulder."
          },
          {
            "at": 22,
            "say": "Flexed."
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "section": "Warm-up",
    "name": "Back leg lifts",
    "targetSummary": "10x each leg",
    "instruction": "On elbows and knees. Tuck low abs, then very slowly lift the leg back. Rotate same-side hip down to square. Lift from hamstring and underbutt.",
    "detail": "Start on your elbows and knees with elbows directly under shoulders, and knees directly under hips. From here, tuck your low abs in first, then very slowly start to lift the leg back. As you lift the leg, rotate the same side hip down to square the hip. Focus on keeping your low abs engaged, and using the hamstring and \"underbutt\" to lift the leg. Exaggerate tucking your pelvis at the beginning and end of each lift. Keep the hips back as you lift the leg to avoid cheating with your low back.",
    "focus": "Don't open the hip to get the leg higher — square it down. Hamstring and underbutt do the work, not low back. Hips stay back, don't shift forward.",
    "phases": [
      {
        "label": "Left leg — 10 slow lifts",
        "seconds": 50,
        "cues": [
          {
            "at": 0,
            "say": "Left leg back. Ten slow lifts. Tuck low abs first."
          },
          {
            "at": 12,
            "say": "Rotate the same-side hip down to square."
          },
          {
            "at": 28,
            "say": "Hamstring and underbutt. Not low back."
          },
          {
            "at": 42,
            "say": "Exaggerate the pelvic tuck at the top and bottom."
          }
        ]
      },
      {
        "label": "Right leg — 10 slow lifts",
        "seconds": 50,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg. Ten slow lifts."
          },
          {
            "at": 18,
            "say": "Square the hip. Don't open it to go higher."
          },
          {
            "at": 38,
            "say": "Hips stay back."
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "section": "Prep Stretches",
    "name": "Standing glute stretch",
    "targetSummary": "hold 1–2 minutes per side",
    "instruction": "Leg on a hip-height surface, bent 90°, knee in front of same-side hip. Standing leg slightly behind hips. Stick butt out, lengthen spine, lean forward.",
    "detail": "Set up using a height that's roughly hip height (a dining room table or kitchen counter work well). Place one leg on the counter, and have the standing leg slightly further back than your hips. The leg on the counter should be bent to a 90 degree angle, and the knee should be directly in front of the same side hip. In the stretch, focus on trying to stick your butt out and lengthen your spine as you lean forward.",
    "focus": "Stick the butt out and lengthen as you lean forward — don't round.",
    "phases": [
      {
        "label": "Left leg up — hold 90s",
        "seconds": 90,
        "cues": [
          {
            "at": 0,
            "say": "Left leg on the counter. Stick your butt out and lengthen the spine as you lean forward."
          },
          {
            "at": 30,
            "say": "Breathe. Try to sink a little deeper."
          },
          {
            "at": 60,
            "say": "Thirty seconds left."
          }
        ]
      },
      {
        "label": "Right leg up — hold 90s",
        "seconds": 90,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg up."
          },
          {
            "at": 30,
            "say": "Lengthen, don't round."
          },
          {
            "at": 60,
            "say": "Thirty seconds."
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "section": "Prep Stretches",
    "name": "PNF hamstring stretch",
    "targetSummary": "Resist 10s, release 10s — 3–5x per side",
    "instruction": "Strap on ball of foot. Leg actively straight, pull toward chest to a light stretch. Resist for 10 seconds, then relax and pull closer for 10 seconds. 4 cycles.",
    "detail": "Lie on your back with a yoga strap (or something similar) placed around the ball of your foot. Keeping your leg actively straight, pull your leg toward your chest until you feel a light hamstring stretch, then engage your hamstring to resist against the strap as if you're trying to push your leg down to meet the other — but don't let it move too much! Hold this resistance for 10 seconds, then relax the hamstring and pull the leg closer toward your chest and hold for 10 seconds. Repeat this movement 3-5x.",
    "focus": "Leg actively straight — quad on the whole time.",
    "phases": [
      {
        "label": "Left — 4 cycles (resist 10s / release 10s)",
        "seconds": 85,
        "cues": [
          {
            "at": 0,
            "say": "Left leg up. Strap on the ball of the foot. Leg actively straight. Begin: resist."
          },
          {
            "at": 10,
            "say": "Release. Pull the leg closer."
          },
          {
            "at": 20,
            "say": "Resist."
          },
          {
            "at": 30,
            "say": "Release."
          },
          {
            "at": 40,
            "say": "Resist."
          },
          {
            "at": 50,
            "say": "Release."
          },
          {
            "at": 60,
            "say": "Last cycle. Resist."
          },
          {
            "at": 70,
            "say": "Release. Hold the deepest position."
          }
        ]
      },
      {
        "label": "Right — 4 cycles (resist 10s / release 10s)",
        "seconds": 85,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg. Resist."
          },
          {
            "at": 10,
            "say": "Release. Pull closer."
          },
          {
            "at": 20,
            "say": "Resist."
          },
          {
            "at": 30,
            "say": "Release."
          },
          {
            "at": 40,
            "say": "Resist."
          },
          {
            "at": 50,
            "say": "Release."
          },
          {
            "at": 60,
            "say": "Last cycle. Resist."
          },
          {
            "at": 70,
            "say": "Release. Hold."
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "section": "Prep Stretches",
    "name": "Lunge — 2 positions",
    "targetSummary": "Position 1: 1 minute · Position 2: ~45s movement + 15s foot pull",
    "instruction": "Legs hip-width, hips in one line, pelvis tucked (low abs + underbutt), shoulders over hips. P1: sink hips. P2: bend back leg 5–8x, then grab back foot 15s.",
    "detail": "Legs hip width, hips in one line, pelvis tucked (meaning low abs engaged + under butt squeezed), shoulders on top of hips.\n\nPosition 1: Focus on sinking the hips down and feeling the stretch in your hip flexor, hold 1-minute.\n\nPosition 2: Keep your hips low and engage your hamstring to bend the back leg, then lower the foot back down to the floor sinking the hips a little deeper. Do this movement for about 45 seconds (5-8x), then grab the back foot pulling it closer to your butt for 15 seconds.",
    "focus": "Hip flexor is a big limiter for you — really tuck the pelvis (low abs + underbutt squeezed) to feel the front of the back hip.",
    "phases": [
      {
        "label": "Left — Position 1: sink hips (1 minute)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Left leg forward. Hips hip-width. Pelvis tucked — low abs and underbutt."
          },
          {
            "at": 10,
            "say": "Sink the hips down. Feel the hip flexor stretch."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      },
      {
        "label": "Left — Position 2: bend back leg 5–8x, then foot pull (60s)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Hips stay low. Bend the back leg toward your butt, then lower back down. Sink a little deeper each time."
          },
          {
            "at": 45,
            "say": "Now grab the back foot. Pull it closer to your butt. Hold fifteen seconds."
          }
        ]
      },
      {
        "label": "Right — Position 1: sink hips (1 minute)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg forward. Pelvis tucked."
          },
          {
            "at": 10,
            "say": "Sink. Feel the hip flexor."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      },
      {
        "label": "Right — Position 2: bend back leg 5–8x, then foot pull (60s)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Bend the back leg, lower, sink deeper."
          },
          {
            "at": 45,
            "say": "Grab the back foot. Pull closer."
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "section": "Prep Stretches",
    "name": "Pancake",
    "targetSummary": "hold 1 minute",
    "instruction": "Widest straddle, knees pointing up, quads fully engaged. Squeeze side butt (legs open wider), keep that activation, reach forward.",
    "detail": "Start sitting in your widest straddle with your knees pointing upward, and fully engage your quads. Before reaching forward, try to squeeze the side of your butt (which should make your legs open a bit wider). Keep that strong glute activation as you reach forward with your arms. If you have a hard time activating your legs in this position, press the legs down into the floor and, at the same time, think of lifting your butt up off the floor. This may also be done sitting on a yoga block to help give you more leverage to reach further.",
    "focus": "Quads engaged, side-butt squeezed. If activation feels off: press legs into floor while imagining lifting your butt up off the floor.",
    "phases": [
      {
        "label": "Pancake — hold 1 minute",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Widest straddle. Knees up. Quads fully engaged."
          },
          {
            "at": 10,
            "say": "Squeeze the side of your butt — the legs should open a bit wider."
          },
          {
            "at": 20,
            "say": "Keep that activation. Reach forward with your arms."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "section": "Prep Stretches",
    "name": "Half frog",
    "targetSummary": "hold 30 seconds per side",
    "instruction": "Hands and knees, straighten one leg to the side. Ankle of straight leg lines up with knee of bent leg. Down to elbows, slide leg out, hips slightly back. Front of legs in a line.",
    "detail": "Start on hands and knees and straighten one leg out to the side. The ankle of the straight leg should be lined up with the knee of the opposite leg. Lower down to your elbows, then slowly slide the leg straight out to the side keeping the hips back just a bit. You're aiming for the front of your legs to be in a straight line. Focus on keeping the leg actively straight, and squeezing your side butt.\n\nIf you have a hard time finding the correct position, you can do it against a mat or couch. Have the bent leg around the side of the mat, and the straight leg running along the front. Keep a few inches of space between the back of your legs and the mat, and make sure your sitz bones are pushing into the mat evenly.",
    "focus": "Try the Tuck and Twerk while you're here — rotate pelvis to stick butt out, then tuck. Super slow, 5–10 times. Creates space to sink.",
    "phases": [
      {
        "label": "Left straight — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Left leg straight to the side. Down to elbows. Slide out, hips slightly back."
          },
          {
            "at": 8,
            "say": "Try the Tuck and Twerk — rotate the pelvis to stick the butt out, then tuck. Super slow."
          },
          {
            "at": 25,
            "say": "Hold the deepest version."
          }
        ]
      },
      {
        "label": "Right straight — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg out. Front of legs in a line."
          },
          {
            "at": 8,
            "say": "Tuck and Twerk. Slow."
          },
          {
            "at": 25,
            "say": "Hold."
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "section": "Prep Stretches",
    "name": "Standing hamstring stretch",
    "targetSummary": "1 minute per side",
    "instruction": "Feet hip-width, one leg back. Fold forward, hands to floor or blocks. Shift weight onto front leg. Lengthen back toward leg, head hangs.",
    "detail": "Start with feet hip width apart, with one leg back. Bend forward to place hands on the floor (or yoga blocks), then shift the weight onto the front leg. Keep the front leg actively straight, hips in line, and lengthen your back to try to get your stomach flat on leg. Let the head hang down and keep arms relaxed.\n\nIf you feel this primarily in your calves or like it's \"stuck\", do this with the front heel on a yoga block, and the ball of the foot on the floor (like a Barbie foot).",
    "focus": "Front leg actively straight — quad on.",
    "phases": [
      {
        "label": "Left front — hold 1 minute",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Left foot forward. Fold over. Hands to floor or blocks. Shift weight onto the front leg."
          },
          {
            "at": 15,
            "say": "Front leg actively straight. Lengthen the back toward the leg."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      },
      {
        "label": "Right front — hold 1 minute",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right foot forward."
          },
          {
            "at": 15,
            "say": "Head hangs. Arms relaxed."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "section": "Splits",
    "name": "Square splits",
    "targetSummary": "1 minute each side · 3 sets · alternating",
    "instruction": "Hip bones level and lined up, front knee up, back knee down, shoulders over hips. Low abs and front-leg quad engaged. Sink a little deeper every 10s.",
    "detail": "Hips bones level and lined up, front knee facing up, back knee facing down, shoulders on top of hips. Low abs and front leg quad engaged. Try to sink a little deeper into the square position every 10 seconds.\n\nSet 1 — Mainly focus on squaring the hips by pulling the front hip back, then slightly sitting the weight onto the front leg. But don't focus much on trying to sink down, just find square.\n\nSets 2 & 3 — Still focus on squaring hips, but now try to sink deeper into the square position.",
    "focus": "Your hips have been opening — start HIGHER. Pull the front hip back so hip bones line up perfectly, then sit the weight onto the front leg. You won't go as low when you correct it — that's expected. Squaring and strengthening is top priority.",
    "phases": [
      {
        "label": "Set 1 — Left front — find square (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Set one. Left front. Start higher than usual."
          },
          {
            "at": 5,
            "say": "Pull the front hip back. Line up the hip bones."
          },
          {
            "at": 15,
            "say": "Slightly sit the weight onto the front leg."
          },
          {
            "at": 35,
            "say": "Don't worry about sinking. Just find square."
          }
        ]
      },
      {
        "label": "Set 1 — Right front — find square (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Set one. Right front. Square the hips first."
          },
          {
            "at": 15,
            "say": "Hip bones perfectly lined up."
          },
          {
            "at": 35,
            "say": "Find square. Don't sink."
          }
        ]
      },
      {
        "label": "Set 2 — Left front — sink while square (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Set two. Left front. Stay square. Now try to sink."
          },
          {
            "at": 10,
            "say": "Deeper."
          },
          {
            "at": 20,
            "say": "Deeper."
          },
          {
            "at": 30,
            "say": "Deeper."
          },
          {
            "at": 40,
            "say": "Deeper."
          },
          {
            "at": 50,
            "say": "Deeper."
          }
        ]
      },
      {
        "label": "Set 2 — Right front — sink while square (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Set two. Right front. Stay square, then sink."
          },
          {
            "at": 10,
            "say": "Deeper."
          },
          {
            "at": 20,
            "say": "Deeper."
          },
          {
            "at": 30,
            "say": "Deeper."
          },
          {
            "at": 40,
            "say": "Deeper."
          },
          {
            "at": 50,
            "say": "Deeper."
          }
        ]
      },
      {
        "label": "Set 3 — Left front — deepest (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Final set. Left front. Deepest square version."
          },
          {
            "at": 20,
            "say": "Sink a little more every ten seconds."
          },
          {
            "at": 45,
            "say": "Fifteen seconds."
          }
        ]
      },
      {
        "label": "Set 3 — Right front — deepest (1 min)",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Final set. Right front."
          },
          {
            "at": 20,
            "say": "Deeper."
          },
          {
            "at": 40,
            "say": "Deeper."
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "section": "Splits",
    "name": "Middle splits",
    "targetSummary": "30 seconds · 2 sets",
    "instruction": "Sitz bones against wall, feet a few inches out. Hands on floor, lower slowly. Legs strong and straight. Quads on, side butt active.",
    "detail": "Start standing with your sitz bones pressed against a wall, and feet a few inches away from the wall. Place your hands on the floor and slowly lower down as much as you can while keeping your legs strong and straight. Keep quads engaged and side butt active! To come out, let your feet slide forward and slowly lower yourself to sitting.",
    "focus": "Tuck and Twerk here too — pelvis out, then tuck, super slow, 5–10 times. Creates space to sink.",
    "phases": [
      {
        "label": "Set 1 — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Sitz bones to the wall. Hands on the floor. Lower slowly."
          },
          {
            "at": 5,
            "say": "Tuck and Twerk — super slow, five to ten times."
          },
          {
            "at": 22,
            "say": "Quads on. Side butt active."
          }
        ]
      },
      {
        "label": "Set 2 — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Set two. Lower again."
          },
          {
            "at": 5,
            "say": "Tuck and Twerk."
          },
          {
            "at": 22,
            "say": "Hold."
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "section": "Active Flex",
    "name": "Seated leg lifts",
    "targetSummary": "15x per side",
    "instruction": "Bend one leg, heel in line with opposite knee. Hug bent knee, chest up, rotate pelvis to stick butt out. Lift the straight leg, slowly lower.",
    "detail": "Start sitting with legs straight out in front of you. Bend one leg and place the heel in line with the knee of the opposite leg. Hug the knee of the bent leg, lift chest up, and try to rotate your pelvis to stick your butt out. From here, lift the straight leg, then slowly lower it back down. Don't slouch and round back to lift your leg! Keep your chest lifted throughout, and reach forward and out with your toes.",
    "focus": "Don't slouch and round to lift higher. Chest stays lifted. Reach toes forward and out.",
    "phases": [
      {
        "label": "Left straight — 15 reps",
        "seconds": 50,
        "cues": [
          {
            "at": 0,
            "say": "Left leg straight. Right leg bent, heel in line with the left knee. Hug the bent knee. Pelvis rotated, butt out. Fifteen reps."
          },
          {
            "at": 20,
            "say": "Don't round. Chest up."
          },
          {
            "at": 38,
            "say": "Reach toes forward and out."
          }
        ]
      },
      {
        "label": "Right straight — 15 reps",
        "seconds": 50,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg straight."
          },
          {
            "at": 25,
            "say": "Chest stays lifted. Slowly lower each rep."
          }
        ]
      }
    ]
  },
  {
    "id": 13,
    "section": "Active Flex",
    "name": "Lunge rotations",
    "targetSummary": "5–10x per side",
    "instruction": "Kneel on one leg, butt to heel, hips square, opposite leg straight back. Press knee into floor to lift hips, actively straighten back leg, rotate so knee faces up, both sitz bones to floor. Reverse.",
    "detail": "Start kneeling on one leg with your butt on your heel, hips square, and opposite leg straight behind you. From here, press your bent leg knee into the floor to lift the hips slightly, engage your low abs, and actively straighten your back leg (without leaning forward!). From here, rotate your back leg so your knee is facing up, level your hips while you rotate, then sit both sitz bones onto the ground at the same time. Keeping your straight leg strong and straight, press both legs into the floor to lift hips up and rotate back to the starting position. Focus on your straight leg staying actively straight, keeping your shoulders stacked over hips and low abs engaged. You may lift as high as you need to be able to rotate to and from the starting position, but don't rely on your arms too much (make your legs do the work!)",
    "focus": "Straight leg stays actively straight throughout. Shoulders stacked over hips. Don't lean forward when you lift the hips.",
    "phases": [
      {
        "label": "Left back — 7 reps (in the 5–10 range)",
        "seconds": 55,
        "cues": [
          {
            "at": 0,
            "say": "Kneel on the right. Left leg straight back. Press the right knee down to lift the hips."
          },
          {
            "at": 12,
            "say": "Actively straighten the back leg — don't lean forward."
          },
          {
            "at": 25,
            "say": "Rotate so the back knee faces up. Both sitz bones to the floor."
          },
          {
            "at": 40,
            "say": "Reverse. Press both legs into the floor to lift."
          }
        ]
      },
      {
        "label": "Right back — 7 reps",
        "seconds": 55,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Kneel on the left. Right leg straight back."
          },
          {
            "at": 25,
            "say": "Straight leg actively straight through the whole rotation."
          }
        ]
      }
    ]
  },
  {
    "id": 14,
    "section": "Active Flex",
    "name": "Kneeling tilt",
    "targetSummary": "hold 30 seconds per side",
    "instruction": "Table top with hands, knees, and feet aligned. Top leg straight up to the side, mirroring the bottom leg. Top knee rotated back, hips forward, bottom foot in line with the knee.",
    "detail": "Start in a table top position with the hands, knees, and feet aligned. From here, bring one leg straight up to the side to be in a frog-looking position. You want your top leg to look like a mirror image of the bottom leg, and you can use a mirror to keep an eye on the alignment. Focus on keeping the top knee rotated back, hips forward, and bottom foot in line with the knee (it's going to want to slide backward). Low abs, obliques and side butt should all be working.\n\nYour leg won't lift nearly as high as the photos at first. The top leg may only be able to lift to be parallel to the floor, and that's fine! Just focus on the details above and trying to rotate your pelvis to face forward.",
    "focus": "Top knee rotated back, hips facing forward. Bottom foot wants to slide backward — keep it in line with the knee. Low abs, obliques, side butt all working.",
    "phases": [
      {
        "label": "Left side up — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Table top. Bring the left leg up to the side. Mirror the bottom leg."
          },
          {
            "at": 8,
            "say": "Top knee rotated back. Hips forward."
          },
          {
            "at": 18,
            "say": "Bottom foot in line with the knee — don't let it slide back."
          },
          {
            "at": 28,
            "say": "Hold."
          }
        ]
      },
      {
        "label": "Right side up — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right leg up."
          },
          {
            "at": 10,
            "say": "Pelvis rotates to face forward."
          },
          {
            "at": 28,
            "say": "Hold."
          }
        ]
      }
    ]
  },
  {
    "id": 15,
    "section": "Active Flex",
    "name": "Gazelle",
    "targetSummary": "hold 1 minute per side",
    "instruction": "Standing on one leg, knee to chest. Standing leg actively straight. Press through the heel to drive the hips forward. Pelvis tucked, standing-leg quad fully engaged.",
    "detail": "Standing on one leg, bring your knee up to your chest while focusing on keeping the standing leg actively straight. Then press through your heel to drive your hips forward. You may feel a light hip flexor stretch, but the main goals are to keep the pelvis tucked and the standing leg quad fully engaged. Once 1 yoga block becomes easy, do on 2 yoga blocks.",
    "focus": "Standing leg actively straight, quad fully engaged. Pelvis tucked.",
    "phases": [
      {
        "label": "Standing on right — hold 1 minute",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Stand on the right. Left knee to chest. Standing leg actively straight."
          },
          {
            "at": 12,
            "say": "Press through the heel. Drive the hips forward."
          },
          {
            "at": 30,
            "say": "Pelvis tucked. Standing quad fully engaged."
          },
          {
            "at": 50,
            "say": "Ten seconds."
          }
        ]
      },
      {
        "label": "Standing on left — hold 1 minute",
        "seconds": 60,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Stand on the left. Right knee to chest."
          },
          {
            "at": 20,
            "say": "Press the heel. Hips forward."
          },
          {
            "at": 50,
            "say": "Ten seconds."
          }
        ]
      }
    ]
  },
  {
    "id": 16,
    "section": "Active Flex",
    "name": "Standing leg lifts — front, side, back",
    "targetSummary": "Each direction × each side: 10 lifts · hold up 10s · 10 pulses up",
    "instruction": "Front: legs parallel, hips level, standing butt squeezed. Side: standing leg slightly turned out, working knee straight up. Back: leg directly behind same-side hip, knee STRAIGHT, chest leans forward a bit.",
    "detail": "Front: Legs parallel and actively straight, hips level, standing butt squeezed. Lift the leg as high as you can while keeping a straight standing leg. You can lean your chest back slightly and shift the hips forward (like in Gazelle) as you lift the leg.\n\nSide: Standing leg slightly turned out, working leg knee straight up (externally rotated), chest stacked over standing leg. The lifting leg can be slightly diagonally forward to focus on the external rotation of the working leg. Don't allow the hips to twist toward the lifting leg, keep hip bones facing forward. Really focus on the glute activation of the bottom leg, and don't let any weight shift onto the working leg when you lower it down.\n\nBack: Leg directly behind same side hip, arms reaching back to work upper back muscles, extra focus on back knee being straight (it has a tendency to feel straight when it isn't). Shift your weight back to your heel and lean the chest a little forward (but still lifting and opening the chest!) while lifting the leg. Keep shoulders and hips squared off throughout.",
    "focus": "Back lifts especially — REALLY square the hips. Don't open the hip to get the leg higher. Only use hamstring and low-glute strength. It won't go as high but it builds what you actually need.",
    "phases": [
      {
        "label": "Front — Left (10 lifts · 10s hold · 10 pulses)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Front, left. Legs parallel, hips level, standing butt squeezed. Ten lifts."
          },
          {
            "at": 8,
            "say": "Lean the chest back slightly, shift hips forward like Gazelle."
          },
          {
            "at": 22,
            "say": "Hold up, ten seconds."
          },
          {
            "at": 32,
            "say": "Ten pulses up."
          }
        ]
      },
      {
        "label": "Front — Right (10 · 10s · 10)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Front, right."
          },
          {
            "at": 22,
            "say": "Hold."
          },
          {
            "at": 32,
            "say": "Pulse."
          }
        ]
      },
      {
        "label": "Side — Left (10 · 10s · 10)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Side, left. Standing leg slightly turned out. Working knee straight up."
          },
          {
            "at": 12,
            "say": "Don't twist the hips toward the lifting leg."
          },
          {
            "at": 22,
            "say": "Hold."
          },
          {
            "at": 32,
            "say": "Pulse."
          }
        ]
      },
      {
        "label": "Side — Right (10 · 10s · 10)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Side, right."
          },
          {
            "at": 12,
            "say": "Hip bones face forward. Glute of the bottom leg."
          },
          {
            "at": 22,
            "say": "Hold."
          },
          {
            "at": 32,
            "say": "Pulse."
          }
        ]
      },
      {
        "label": "Back — Left (10 · 10s · 10)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Back, left. Leg directly behind the same-side hip. Knee straight."
          },
          {
            "at": 8,
            "say": "Hips squared. Don't open the hip to go higher."
          },
          {
            "at": 14,
            "say": "Shift weight to the heel. Chest leans forward slightly."
          },
          {
            "at": 22,
            "say": "Hold."
          },
          {
            "at": 32,
            "say": "Pulse."
          }
        ]
      },
      {
        "label": "Back — Right (10 · 10s · 10)",
        "seconds": 45,
        "cues": [
          {
            "at": 0,
            "say": "Back, right. Square the hips."
          },
          {
            "at": 14,
            "say": "Back knee straight — it likes to feel straight when it isn't. Really check it."
          },
          {
            "at": 22,
            "say": "Hold."
          },
          {
            "at": 32,
            "say": "Pulse."
          }
        ]
      }
    ]
  },
  {
    "id": 17,
    "section": "Active Flex",
    "name": "Toe point exercise",
    "targetSummary": "hold 30 seconds per side",
    "instruction": "Standing leg straight, working leg bent, top of toes on the ground. Squeeze bottom of toes and arch. Move hips forward and back. Then rise to ball of foot on standing leg while straightening the working knee. Don't sickle.",
    "detail": "Starting with the standing leg straight, working leg bent, place the top of your toes on the ground squeezing the bottom of your toes and arch of your foot. From here, move your hips forward and back to feel the stretch in different places (top of toes, foot, front of ankle), then raise to the ball of your foot on the standing leg, while straightening the working leg knee, this will help work on knee straightening strength while also getting a new stretch. Be sure not to sickle the foot — meaning having your foot turned in from the ankle.",
    "focus": "Don't sickle — keep the ankle straight, not turned in.",
    "phases": [
      {
        "label": "Left foot down — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Left toes on the ground. Squeeze the bottom of your toes and the arch."
          },
          {
            "at": 8,
            "say": "Move the hips forward and back — find the stretch in different places."
          },
          {
            "at": 18,
            "say": "Now rise to the ball of the foot on the standing leg. Straighten the working knee."
          },
          {
            "at": 28,
            "say": "Don't sickle — ankle stays in line."
          }
        ]
      },
      {
        "label": "Right foot down — hold 30s",
        "seconds": 35,
        "cues": [
          {
            "at": 0,
            "say": "Switch. Right toes down."
          },
          {
            "at": 18,
            "say": "Rise up. Working knee straightens."
          },
          {
            "at": 28,
            "say": "Don't sickle."
          }
        ]
      }
    ]
  }
];

const ILLUSTRATION_BY_ID: Record<number, string> = {
  1: "01-knee-straighteners.png",
  2: "02-warmup-kicks.png",
  3: "03-back-leg-lifts.png",
  4: "04-standing-glute.png",
  5: "05-pnf-hamstring.png",
  6: "06-lunge.png",
  7: "07-pancake.png",
  8: "08-half-frog.png",
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

export const legsPlan: Plan = {
  id: "legs",
  title: "Leg Flexibility",
  author: "Catie Brier",
  date: "2026-05-18",
  intro:
    "Personalized leg flexibility plan. Do the program in order — active work after passive stretching reduces soreness and helps retain flexibility. Breathe, focus on the muscle engagements, and be patient.",
  exercises,
};
