import { BurgerIngredient } from "./BurgerIngredient";

export type MenuIngredient = BurgerIngredient & {
  amount?: number;
};
