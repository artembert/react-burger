import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { BurgerParts } from "../../types/burger-parts";
import { ConstructorIngredient, DraggableConstructorIngredient } from "../../types/constructor-ingredient";

export type ConstructorSliceState = {
  bun: null | ConstructorIngredient;
  ingredients: DraggableConstructorIngredient[];
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
      const ingredient: ConstructorIngredient = { ...action.payload, pieceId: uuidv4() };
      if (action.payload.type === BurgerParts.BUN) {
        state.bun = ingredient;
      } else {
        const orderIndex = state.ingredients.length;
        state.ingredients.push({ ...ingredient, orderIndex });
      }
    },
  },
});

export const { addIngredient } = burgerConstructorSlice.actions;
export const burgerConstructor = burgerConstructorSlice.reducer;
