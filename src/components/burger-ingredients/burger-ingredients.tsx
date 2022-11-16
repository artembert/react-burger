import React, { useCallback, useMemo, useRef } from "react";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerPart, BurgerParts } from "../../types/burger-parts";
import { LoadingStatus } from "../../types/loading-status";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { LoadingState } from "../../types/loading-state";
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredients.module.css";

type Props = {
  loadingState: LoadingStatus;
  ingredients: BurgerIngredient[];
};

export const BurgerIngredients = (props: Props) => {
  const { loadingState, ingredients } = props;
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const [selectedIngredient, setSelectedIngredient] = React.useState<BurgerIngredient | null>(null);
  const banIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);
  const bunsSectionRef = useRef<HTMLDivElement>(null);
  const saucesSectionRef = useRef<HTMLDivElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  const openIngredientsDetail = useCallback((ingredient: BurgerIngredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const closeIngredientsDetail = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  const scrollToGroup = useCallback(
    (group: BurgerPart) => {
      setCurrent(group);
      switch (group) {
        case BurgerParts.BUN:
          bunsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case BurgerParts.SAUCE:
          saucesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
        case BurgerParts.MAIN:
          mainSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          break;
      }
    },
    [bunsSectionRef, saucesSectionRef, mainSectionRef]
  );

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={scrollToGroup} />
      {loadingState === LoadingState.ERROR ? <div>Не удалось загрузить меню. Перезагрузите страницу</div> : null}
      <div className={`${styles.list} custom-scroll`}>
        <BurgerIngredientsGroup
          ref={bunsSectionRef}
          title="Булки"
          ingredients={banIngredients}
          loadingState={loadingState}
          onClickByIngredient={openIngredientsDetail}
        />
        <BurgerIngredientsGroup
          ref={saucesSectionRef}
          title="Соусы"
          ingredients={sauceIngredients}
          loadingState={loadingState}
          onClickByIngredient={openIngredientsDetail}
        />
        <BurgerIngredientsGroup
          ref={mainSectionRef}
          title="Начинки"
          ingredients={mainIngredients}
          loadingState={loadingState}
          onClickByIngredient={openIngredientsDetail}
        />
      </div>
      {selectedIngredient ? (
        <Modal title="Детали ингредиента" onRequestClose={closeIngredientsDetail}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      ) : null}
    </section>
  );
};
