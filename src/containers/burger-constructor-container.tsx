import { useSelector } from "react-redux";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { LoadingState } from "../types/loading-state";
import { selectConstructorBun, selectConstructorIngredients } from "../services/burger-constructor/selectors";

export const BurgerConstructorContainer = () => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);

  return <BurgerConstructor loadingState={LoadingState.SUCCESSFUL} ingredients={ingredients} bun={bun} />;
};
