import type { Plan } from "../types";
import { legsPlan } from "./legs";
import { legsV2Plan } from "./legs-v2";
import { contortionPlan } from "./contortion";

export const plans: Record<string, Plan> = {
  "legs-v2": legsV2Plan,
  legs: legsPlan,
  contortion: contortionPlan,
};

/**
 * Superseded plans. Kept registered so `getPlan` still resolves their titles for
 * old sessions in history, but hidden from the home screen. A direct
 * /class/<id> URL still works, so old bookmarks don't break.
 */
const ARCHIVED_PLAN_IDS = new Set(["legs"]);

export function getPlan(id: string): Plan | undefined {
  return plans[id];
}

export function isArchived(id: string): boolean {
  return ARCHIVED_PLAN_IDS.has(id);
}

export const planList: Plan[] = Object.values(plans).filter(
  (p) => !ARCHIVED_PLAN_IDS.has(p.id),
);
