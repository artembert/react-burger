import { BurgerIngredient } from "./BurgerIngredient";

export type ConstructorIngredient = BurgerIngredient & {
  pieceId: string;
};

export type DraggableConstructorIngredient = ConstructorIngredient & {
  orderIndex: number;
};
