import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFetchResponse } from "../../../app/helpers/handle-fetch-response";
import { BurgerIngredient } from "../../../types/BurgerIngredient";

type IngredientsRes = {
  data: BurgerIngredient[];
  success: boolean;
};

const ingredientsEndpoint = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk("ingredients/fetch", async () => {
  const response = await fetch(ingredientsEndpoint);
  const payload = await handleFetchResponse<IngredientsRes>(response);
  if (payload.success) {
    return payload.data;
  }
  return Promise.reject("Failed to detch burger ingredients");
});
