import { useCallback } from "react";
import { useSelector } from "react-redux";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { selectIngredients, selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { useAppDispatch } from "../services/store";
import { openIngredientDetailsPopup } from "../services/ingredients";
import { BurgerIngredient } from "../types/BurgerIngredient";

export const BurgerIngredientsContainer = () => {
  const dispatch = useAppDispatch();
  const loadingState = useSelector(selectIngredientsLoadingSate);
  const ingredients = useSelector(selectIngredients);
  const handleIngredientClick = useCallback(
    (ingredient: BurgerIngredient) => {
      dispatch(openIngredientDetailsPopup(ingredient));
    },
    [dispatch]
  );

  return (
    <BurgerIngredients
      loadingState={loadingState}
      ingredients={ingredients}
      onClickIngredient={handleIngredientClick}
    />
  );
};
