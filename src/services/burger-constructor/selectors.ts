import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectConstructorIngredients = (store: RootState) => store.burgerConstructor.ingredients;

export const selectConstructorBun = (store: RootState) => store.burgerConstructor.bun;

export const selectConstructorTotalPrice = createSelector(
  selectConstructorBun,
  selectConstructorIngredients,
  (bun, ingredients) => {
    const bunsPrice = 2 * (bun?.price ?? 0);
    const ingredientsPrice = ingredients.reduce((subtotal, item) => subtotal + item.price, 0);
    return bunsPrice + ingredientsPrice;
  }
);

export const selectConstructorIngredientsIds = createSelector(
  selectConstructorBun,
  selectConstructorIngredients,
  (bun, ingredients) => {
    const bunIds = bun ? [bun._id, bun._id] : [];
    const ingredientsIds = ingredients.reduce((accum, item) => [...accum, item._id], [] as string[]);
    return [...ingredientsIds, ...bunIds];
  }
);
