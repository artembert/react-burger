import { ValueOf } from "../types";

export const BurgerParts = {
  BUN: "bun",
  SAUCE: "sauce",
  MAIN: "main",
};

export type BurgerPart = ValueOf<typeof BurgerParts>;
