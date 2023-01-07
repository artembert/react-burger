import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { useAppSelector } from "../services/store";
import { selectMenuIngredients } from "../services/selectors";

export const BurgerIngredientsContainer = () => {
  const loadingState = useAppSelector(selectIngredientsLoadingSate);
  const menuIngredients = useAppSelector(selectMenuIngredients);

  return <BurgerIngredients loadingState={loadingState} ingredients={menuIngredients} />;
};
