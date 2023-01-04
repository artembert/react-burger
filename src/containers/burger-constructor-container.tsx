import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import {
  addIngredient,
  deleteIngredientFromConstructor,
  reorderConstructorIngredients,
} from "../services/burger-constructor";
import { selectIngredients } from "../services/ingredients/selectors";
import { ConstructorIngredient } from "../types/constructor-ingredient";
import { selectAuthIsAuthorized } from "../services/auth/selectors";
import { Routes } from "../app/routes/constants";

export const BurgerConstructorContainer = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const bun = useSelector(selectConstructorBun);
  const isAuthorized = useSelector(selectAuthIsAuthorized);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const allIngredients = useSelector(selectIngredients);
  const totalPrice = useSelector(selectConstructorTotalPrice);
  const ingredientsIds = useSelector(selectConstructorIngredientsIds);
  const handleNewOrder = useCallback(() => {
    if (isAuthorized) {
      dispatch(makeOrder({ ingredients: ingredientsIds }));
    } else {
      history.push(Routes.Login);
    }
  }, [dispatch, ingredientsIds, history, isAuthorized]);
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
  const handleDeleteIngredient = useCallback(
    (ingredient: ConstructorIngredient) => {
      dispatch(deleteIngredientFromConstructor(ingredient));
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
      onDeleteIngredient={handleDeleteIngredient}
    />
  );
};
