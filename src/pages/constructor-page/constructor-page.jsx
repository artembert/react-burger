import React from "react";
import { AppHeader } from "../../components/app-header/app-header";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { ConstructorPageLayout } from "../../components/constructor-page-layout/constructor-page-layout";
import ingredients from "../../mocks/ingredients.json";
import selectedIngredients from "../../mocks/selected-ingredients.json";

export const ConstructorPage = () => (
  <>
    <AppHeader />
    <ConstructorPageLayout
      leftColumn={<BurgerIngredients ingredients={ingredients} />}
      rightColumn={<BurgerConstructor ingredients={selectedIngredients} />}
    />
  </>
);
