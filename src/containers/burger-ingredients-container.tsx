import { useSelector } from "react-redux";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { selectMenuIngredients } from "../services/selectors";

export const BurgerIngredientsContainer = () => {
  const loadingState = useSelector(selectIngredientsLoadingSate);
  const menuIngredients = useSelector(selectMenuIngredients);

  return <BurgerIngredients loadingState={loadingState} ingredients={menuIngredients} />;
};
