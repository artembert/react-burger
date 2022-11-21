import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { BurgerParts } from "../../types/burger-parts";
import { ConstructorIngredient } from "../../types/constructor-ingredient";
import { MenuIngredient } from "../../types/menu-ingredient";

export type ConstructorSliceState = {
  bun: null | ConstructorIngredient;
  ingredients: ConstructorIngredient[];
};

type DndConstructorIngredient = {
  dragIndex: number;
  hoverIndex: number;
};

const initialState: ConstructorSliceState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burger-constructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<BurgerIngredient | MenuIngredient>) {
      const ingredient: ConstructorIngredient = { ...action.payload, pieceId: uuidv4() };
      if ("amount" in ingredient) {
        delete (ingredient as MenuIngredient).amount;
      }

      if (action.payload.type === BurgerParts.BUN) {
        state.bun = ingredient;
      } else {
        state.ingredients.push({ ...ingredient });
      }
    },
    deleteIngredientFromConstructor(state, action: PayloadAction<ConstructorIngredient>) {
      if (action.payload.type === BurgerParts.BUN) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter((item) => item.pieceId !== action.payload.pieceId);
      }
    },
    reorderConstructorIngredients(state, action: PayloadAction<DndConstructorIngredient>) {
      const newListIngredients = [...state.ingredients];
      const dragIngredient = newListIngredients.splice(action.payload.dragIndex, 1)[0];
      newListIngredients.splice(action.payload.hoverIndex, 0, dragIngredient);
      state.ingredients = newListIngredients;
    },
    clearConstructor() {
      return initialState;
    },
  },
});

export const { addIngredient, reorderConstructorIngredients, deleteIngredientFromConstructor, clearConstructor } =
  burgerConstructorSlice.actions;
export const burgerConstructor = burgerConstructorSlice.reducer;
