import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../app/helpers/request";
import { BurgerIngredient } from "../../../types/BurgerIngredient";
import { API_ENDPOINT } from "../../../app/constants";
import { INGREDIENTS } from "./constants";

type IngredientsRes = {
  data: BurgerIngredient[];
  success: boolean;
};

const endpoint = `${API_ENDPOINT}${INGREDIENTS}`;

export const fetchIngredients = createAsyncThunk("ingredients/fetch", async () => {
  const response = await request<IngredientsRes>(endpoint);
  if (response.success) {
    return response.data;
  }
  return Promise.reject("Failed to fetch burger ingredients");
});
