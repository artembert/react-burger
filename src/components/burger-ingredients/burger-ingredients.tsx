import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerPart, BurgerParts } from "../../types/burger-parts";
import { LoadingStatus } from "../../types/loading-status";
import { MenuIngredient } from "../../types/menu-ingredient";
import { LoadingState } from "../../types/loading-state";
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group";
import { IngredientDetailsModalContainer } from "../../containers/ingredient-details-modal-container";
import styles from "./burger-ingredients.module.css";

type Props = {
  loadingState: LoadingStatus;
  ingredients: MenuIngredient[];
  onClickIngredient: (ingredient: MenuIngredient) => void;
};

export const BurgerIngredients = (props: Props) => {
  const { loadingState, ingredients, onClickIngredient } = props;
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const bunIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);
  const bunsSectionRef = useRef<HTMLDivElement>();
  const saucesSectionRef = useRef<HTMLDivElement>();
  const mainSectionRef = useRef<HTMLDivElement>();

  const [bunsInViewRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [saucesInViewRef, inViewSauces] = useInView({
    threshold: 0,
  });
  const [mainInViewRef, inViewMain] = useInView({
    threshold: 0,
  });

  const setBunsRefs = useCallback(
    (node: HTMLDivElement) => {
      bunsSectionRef.current = node;
      bunsInViewRef(node);
    },
    [bunsInViewRef]
  );
  const setSaucesRefs = useCallback(
    (node: HTMLDivElement) => {
      saucesSectionRef.current = node;
      saucesInViewRef(node);
    },
    [saucesInViewRef]
  );
  const setMainRefs = useCallback(
    (node: HTMLDivElement) => {
      mainSectionRef.current = node;
      mainInViewRef(node);
    },
    [mainInViewRef]
  );

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

  useEffect(() => {
    if (inViewBuns) {
      setCurrent(BurgerParts.BUN);
    } else if (inViewSauces) {
      setCurrent(BurgerParts.SAUCE);
    } else if (inViewMain) {
      setCurrent(BurgerParts.MAIN);
    }
  }, [inViewBuns, inViewSauces, inViewMain]);

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={scrollToGroup} />
      {loadingState === LoadingState.ERROR ? <div>Не удалось загрузить меню. Перезагрузите страницу</div> : null}
      <div className={`${styles.list} custom-scroll pb-10`}>
        <BurgerIngredientsGroup
          ref={setBunsRefs}
          title="Булки"
          ingredients={bunIngredients}
          loadingState={loadingState}
          onClickByIngredient={onClickIngredient}
        />
        <BurgerIngredientsGroup
          ref={setSaucesRefs}
          title="Соусы"
          ingredients={sauceIngredients}
          loadingState={loadingState}
          onClickByIngredient={onClickIngredient}
        />
        <BurgerIngredientsGroup
          ref={setMainRefs}
          title="Начинки"
          ingredients={mainIngredients}
          loadingState={loadingState}
          onClickByIngredient={onClickIngredient}
        />
      </div>
      <IngredientDetailsModalContainer />
    </section>
  );
};
