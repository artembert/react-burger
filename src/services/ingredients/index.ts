import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { ValueOf } from "../../types";
import { LoadingState } from "../../types/loading-state";
import { fetchIngredients } from "./requests";

export type IngredientsSliceState = {
  ingredients: BurgerIngredient[];
  loadingState: ValueOf<typeof LoadingState>;
  ingredientPreview: null | BurgerIngredient;
};

const initialState: IngredientsSliceState = {
  ingredients: [],
  loadingState: LoadingState.IDLE,
  ingredientPreview: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    openIngredientDetailsPopup(state, action: PayloadAction<BurgerIngredient>) {
      state.ingredientPreview = action.payload;
    },
    closeIngredientDetailsPopup(state) {
      state.ingredientPreview = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => ({ ...state, loadingState: LoadingState.LOADING }));
    builder.addCase(fetchIngredients.fulfilled, (state, action) => ({
      ...state,
      loadingState: LoadingState.SUCCESSFUL,
      ingredients: action.payload,
    }));
    builder.addCase(fetchIngredients.rejected, (state) => ({
      ...state,
      loadingState: LoadingState.ERROR,
      ingredients: [],
    }));
  },
});

export const { openIngredientDetailsPopup, closeIngredientDetailsPopup } = ingredientsSlice.actions;
export const ingredients = ingredientsSlice.reducer;
export { fetchIngredients };
