import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smoothly clamp a number to [min, max]. */
export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, n));

/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Inverse lerp — t for value v in [a,b]. */
export const inverseLerp = (a: number, b: number, v: number) =>
  a === b ? 0 : clamp((v - a) / (b - a));

/** Smoothstep easing. */
export const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Map t in [a,b] to a smoothstep [0,1] window. */
export const window01 = (t: number, a: number, b: number) =>
  smoothstep(inverseLerp(a, b, t));
