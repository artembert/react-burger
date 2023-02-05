import { BurgerIngredient } from "../../types/BurgerIngredient";

const findIngredientById = (id: string, ingredients: BurgerIngredient[]) =>
  ingredients.find((item) => item._id === id) ?? null;

export const getOrderPrice = (ingredientsIds: string[], ingredients: BurgerIngredient[]): number =>
  ingredientsIds.reduce((acc, current) => acc + (findIngredientById(current, ingredients)?.price ?? 0), 0);
