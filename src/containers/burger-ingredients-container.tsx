import { useCallback } from "react";
import { useSelector } from "react-redux";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { useAppDispatch } from "../services/store";
import { openIngredientDetailsPopup } from "../services/ingredients";
import { BurgerIngredient } from "../types/BurgerIngredient";
import { selectMenuIngredients } from "../services/selectors";

export const BurgerIngredientsContainer = () => {
  const dispatch = useAppDispatch();
  const loadingState = useSelector(selectIngredientsLoadingSate);
  const menuIngredients = useSelector(selectMenuIngredients);
  const handleIngredientClick = useCallback(
    (ingredient: BurgerIngredient) => {
      dispatch(openIngredientDetailsPopup(ingredient));
    },
    [dispatch]
  );

  return (
    <BurgerIngredients
      loadingState={loadingState}
      ingredients={menuIngredients}
      onClickIngredient={handleIngredientClick}
    />
  );
};
