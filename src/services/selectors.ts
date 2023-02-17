import { createSelector } from "reselect";
import { selectConstructorBun, selectConstructorIngredients } from "./burger-constructor/selectors";
import { selectIngredients } from "./ingredients/selectors";
import { BurgerParts } from "../types/burger-parts";
import { MenuIngredient } from "../types/menu-ingredient";

export const selectMenuIngredients = createSelector(
  selectIngredients,
  selectConstructorIngredients,
  selectConstructorBun,
  (menuIngredients, constructorIngredients, bun) => {
    return menuIngredients.map((ingredient) => {
      if (ingredient.type === BurgerParts.BUN) {
        if (ingredient._id === bun?._id) {
          return { ...ingredient, amount: 2 };
        }
        return { ...ingredient, amount: 0 };
      }
      const amount = constructorIngredients.filter((item) => item._id === ingredient._id).length;
      if (amount) {
        return { ...ingredient, amount };
      }
      return ingredient;
    }) as MenuIngredient[];
  }
);
