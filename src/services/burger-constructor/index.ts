import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { BurgerParts } from "../../types/burger-parts";

export type ConstructorSliceState = {
  bun: null | BurgerIngredient;
  ingredients: BurgerIngredient[];
};

const initialState: ConstructorSliceState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<BurgerIngredient>) {
      if (action.payload.type === BurgerParts.BUN) {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
  },
});

export const { addIngredient } = burgerConstructorSlice.actions;
export const burgerConstructor = burgerConstructorSlice.reducer;
