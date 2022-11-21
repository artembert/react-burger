import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFetchResponse } from "../../../app/helpers/handle-fetch-response";
import { BurgerIngredient } from "../../../types/BurgerIngredient";
import { API_ENDPOINT } from "../../../app/constants";

type IngredientsRes = {
  data: BurgerIngredient[];
  success: boolean;
};

const ingredientsEndpoint = `${API_ENDPOINT}/ingredients`;

export const fetchIngredients = createAsyncThunk("ingredients/fetch", async () => {
  const response = await fetch(ingredientsEndpoint);
  const payload = await handleFetchResponse<IngredientsRes>(response);
  if (payload.success) {
    return payload.data;
  }
  return Promise.reject("Failed to detch burger ingredients");
});
