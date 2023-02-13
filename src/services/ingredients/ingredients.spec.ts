import { fetchIngredients, ingredients, IngredientsSliceState } from "./index";
import { LoadingState } from "../../types/loading-state";
import { ingredientsMock } from "./requests/__fixtures__/mock";

describe("ingredients reducer", () => {
  it("should return initial state", () => {
    expect(ingredients(undefined, { type: undefined })).toEqual({
      ingredients: [],
      loadingState: LoadingState.IDLE,
    });
  });

  it("should handle fetching.pending", () => {
    expect(ingredients(undefined, fetchIngredients.pending)).toEqual({
      ingredients: [],
      loadingState: LoadingState.LOADING,
    });
  });

  it("should handle fetching.fulfilled", () => {
    const previousState: IngredientsSliceState = {
      ingredients: [],
      loadingState: LoadingState.LOADING,
    };
    expect(
      ingredients(previousState, { type: fetchIngredients.fulfilled.type, payload: ingredientsMock.data })
    ).toEqual({
      ingredients: ingredientsMock.data,
      loadingState: LoadingState.SUCCESSFUL,
    });
  });

  it("should handle fetching.rejected", () => {
    const previousState: IngredientsSliceState = {
      ingredients: [],
      loadingState: LoadingState.LOADING,
    };
    expect(ingredients(previousState, fetchIngredients.rejected)).toEqual({
      ingredients: [],
      loadingState: LoadingState.ERROR,
    });
  });
});
