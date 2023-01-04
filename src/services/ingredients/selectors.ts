import { RootState } from "../store";
import { IngredientsSliceState } from "./index";

export const selectIngredientsLoadingSate = (store: RootState): IngredientsSliceState["loadingState"] =>
  store.ingredients.loadingState;

export const selectIngredients = (store: RootState) => store.ingredients.ingredients;
