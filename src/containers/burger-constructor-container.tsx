import { useCallback } from "react";
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
import { makeOrder } from "../services/order-details";
import { addIngredient, reorderConstructorIngredients } from "../services/burger-constructor";
import { selectIngredients } from "../services/ingredients/selectors";

export const BurgerConstructorContainer = () => {
  const dispatch = useAppDispatch();
  const bun = useSelector(selectConstructorBun);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const allIngredients = useSelector(selectIngredients);
  const totalPrice = useSelector(selectConstructorTotalPrice);
  const ingredientsIds = useSelector(selectConstructorIngredientsIds);
  const handleNewOrder = useCallback(() => {
    dispatch(makeOrder({ ingredients: ingredientsIds }));
  }, [dispatch, ingredientsIds]);
  const handleAddIngredient = useCallback(
    (id: string) => {
      const ingredient = allIngredients.find((item) => item._id === id);
      if (ingredient) {
        dispatch(addIngredient(ingredient));
      }
    },
    [dispatch, allIngredients]
  );
  const handleMoveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        reorderConstructorIngredients({
          dragIndex,
          hoverIndex,
        })
      );
    },
    [dispatch]
  );

  return (
    <BurgerConstructor
      loadingState={LoadingState.SUCCESSFUL}
      ingredients={constructorIngredients}
      bun={bun}
      totalPrice={totalPrice}
      onMakeOrder={handleNewOrder}
      onAddIngredient={handleAddIngredient}
      onMoveItem={handleMoveItem}
    />
  );
};
