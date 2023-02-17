import { ValueOf } from "../types";

export const BurgerParts = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
} as const;

export type BurgerPart = ValueOf<typeof BurgerParts>;

export const isBurgerPart = (value: string): value is BurgerPart =>
  value === BurgerParts.BUN || value === BurgerParts.MAIN || value === BurgerParts.SAUCE;
