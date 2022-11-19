import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "../../components/app-header/app-header";
import { BurgerConstructorContainer } from "../../containers/burger-constructor-container";
import { BurgerIngredientsContainer } from "../../containers/burger-ingredients-container";
import { ConstructorPageLayout } from "../../components/constructor-page-layout/constructor-page-layout";
import { Layout } from "../../components/layout/layout";
import { useAppDispatch } from "../../services/store";
import { fetchIngredients } from "../../services/ingredients";

export const ConstructorPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Layout>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <ConstructorPageLayout
          leftColumn={<BurgerIngredientsContainer />}
          rightColumn={<BurgerConstructorContainer />}
        />
      </DndProvider>
    </Layout>
  );
};
