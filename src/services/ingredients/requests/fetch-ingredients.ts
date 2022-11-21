import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../app/helpers/request";
import { BurgerIngredient } from "../../../types/BurgerIngredient";
import { API_ENDPOINT } from "../../../app/constants";

type IngredientsRes = {
  data: BurgerIngredient[];
  success: boolean;
};

const ingredientsEndpoint = `${API_ENDPOINT}/ingredients`;

export const fetchIngredients = createAsyncThunk("ingredients/fetch", async () => {
  const response = await request<IngredientsRes>(ingredientsEndpoint);
  if (response.success) {
    return response.data;
  }
  return Promise.reject("Failed to fetch burger ingredients");
});
