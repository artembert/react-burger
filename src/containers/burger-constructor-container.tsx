import { useSelector } from "react-redux";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { LoadingState } from "../types/loading-state";
import { selectConstructorIngredients } from "../services/constructor/selectors";

export const BurgerConstructorContainer = () => {
  const ingredients = useSelector(selectConstructorIngredients);

  return <BurgerConstructor loadingState={LoadingState.SUCCESSFUL} ingredients={ingredients} />;
};
