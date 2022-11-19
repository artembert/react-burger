import { useSelector } from "react-redux";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { LoadingState } from "../types/loading-state";
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectConstructorIngredientsIds,
  selectConstructorTotalPrice,
} from "../services/burger-constructor/selectors";
import { useAppDispatch } from "../services/store";
import { useCallback } from "react";
import { makeOrder } from "../services/order-details";

export const BurgerConstructorContainer = () => {
  const dispatch = useAppDispatch();
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const totalPrice = useSelector(selectConstructorTotalPrice);
  const ingredientsIds = useSelector(selectConstructorIngredientsIds);
  const handleNewOrder = useCallback(() => {
    dispatch(makeOrder({ ingredients: ingredientsIds }));
  }, [dispatch, ingredientsIds]);

  return (
    <BurgerConstructor
      loadingState={LoadingState.SUCCESSFUL}
      ingredients={ingredients}
      bun={bun}
      totalPrice={totalPrice}
      onMakeOrder={handleNewOrder}
    />
  );
};
