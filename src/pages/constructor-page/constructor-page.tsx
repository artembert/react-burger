import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructorContainer } from "../../containers/burger-constructor-container";
import { BurgerIngredientsContainer } from "../../containers/burger-ingredients-container";
import { ConstructorPageLayout } from "../../components/constructor-page-layout/constructor-page-layout";

export const ConstructorPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ConstructorPageLayout leftColumn={<BurgerIngredientsContainer />} rightColumn={<BurgerConstructorContainer />} />
    </DndProvider>
  );
};
