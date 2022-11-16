import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { selectIngredients, selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { useSelector } from "react-redux";

export const BurgerIngredientsContainer = () => {
  const loadingState = useSelector(selectIngredientsLoadingSate);
  const ingredients = useSelector(selectIngredients);

  return <BurgerIngredients loadingState={loadingState} ingredients={ingredients} />;
};
