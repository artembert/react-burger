import React, { useCallback, useEffect, useState } from "react";
import { AppHeader } from "../../components/app-header/app-header";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { ConstructorPageLayout } from "../../components/constructor-page-layout/constructor-page-layout";
import { Layout } from "../../components/layout/layout";
import { LoadingState } from "../../types/loading-state";
import { IngredientsContext } from "../../services/ingredients.context";
import { BurgerIngredient } from "../../types/BurgerIngredient";

const ingredientsEndpoint = "https://norma.nomoreparties.space/api/ingredients";

export const ConstructorPage = () => {
  const ingredientsState = useState<BurgerIngredient[]>([]);
  const [, setIngredients] = ingredientsState;
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
  }, [fetchIngredients, setIngredients]);

  return (
    <Layout>
      <AppHeader />
      <IngredientsContext.Provider value={ingredientsState}>
        <ConstructorPageLayout
          leftColumn={<BurgerIngredients loadingState={ingredientsLoadingState} />}
          rightColumn={<BurgerConstructor loadingState={ingredientsLoadingState} />}
        />
      </IngredientsContext.Provider>
    </Layout>
  );
};
