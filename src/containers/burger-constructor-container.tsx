import { useSelector } from "react-redux";
import { selectIngredients, selectIngredientsLoadingSate } from "../services/ingredients/selectors";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";

export const BurgerConstructorContainer = () => {
  const loadingState = useSelector(selectIngredientsLoadingSate);
  const ingredients = useSelector(selectIngredients);

  return <BurgerConstructor loadingState={loadingState} ingredients={ingredients} />;
};
