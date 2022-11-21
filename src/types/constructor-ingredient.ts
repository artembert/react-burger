import { BurgerIngredient } from "./BurgerIngredient";

export type ConstructorIngredient = BurgerIngredient & {
  pieceId: string;
};
