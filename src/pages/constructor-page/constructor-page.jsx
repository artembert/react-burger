import React, { useCallback, useEffect, useState } from "react";
import { AppHeader } from "../../components/app-header/app-header";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { ConstructorPageLayout } from "../../components/constructor-page-layout/constructor-page-layout";
import { Layout } from "../../components/layout/layout";
import selectedIngredients from "../../mocks/selected-ingredients.json";
import { LoadingState } from "../../types/loading-state";

const ingredientsEndpoint = "https://norma.nomoreparties.space/api/ingredients";

export const ConstructorPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsLoadingState, setIngredientsLoadingState] = useState(LoadingState.IDLE);

  const fetchIngredients = useCallback(() => {
    return fetch(ingredientsEndpoint)
      .then((res) => res.json())
      .then((res) => res.data);
  }, []);

  useEffect(() => {
    setIngredientsLoadingState(LoadingState.LOADING);
    fetchIngredients()
      .then((data) => {
        setIngredients(data);
        setIngredientsLoadingState(LoadingState.SUCCESSFUL);
      })
      .catch(() => {
        setIngredientsLoadingState(LoadingState.ERROR);
      });
  }, [fetchIngredients]);

  return (
    <Layout>
      <AppHeader />
      <ConstructorPageLayout
        leftColumn={<BurgerIngredients ingredients={ingredients} loadingState={ingredientsLoadingState} />}
        rightColumn={<BurgerConstructor ingredients={selectedIngredients} />}
      />
    </Layout>
  );
};
