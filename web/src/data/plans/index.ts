import type { Plan } from "../types";
import { legsPlan } from "./legs";
import { contortionPlan } from "./contortion";

export const plans: Record<string, Plan> = {
  legs: legsPlan,
  contortion: contortionPlan,
};

export function getPlan(id: string): Plan | undefined {
  return plans[id];
}

export const planList: Plan[] = Object.values(plans);
