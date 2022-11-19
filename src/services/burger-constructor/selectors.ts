import { RootState } from "../store";

export const selectConstructorIngredients = (store: RootState) => store.burgerConstructor.ingredients;
export const selectConstructorBun = (store: RootState) => store.burgerConstructor.bun;
