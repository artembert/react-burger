import React, { useCallback, useMemo } from "react";
import { useIngredientsContext } from "../../services/ingredients.context";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerParts } from "../../types/burger-parts";
import { ValueOf } from "../../types";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { LoadingState } from "../../types/loading-state";
import { BurgerIngredientsGroup } from "./burger-ingredients-group/burger-ingredients-group";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredients.module.css";

type Props = {
  loadingState: ValueOf<typeof LoadingState>;
};

export const BurgerIngredients = (props: Props) => {
  const { loadingState } = props;
  const [ingredients] = useIngredientsContext();
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const [selectedIngredient, setSelectedIngredient] = React.useState<BurgerIngredient | null>(null);
  const banIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);

  const openIngredientsDetail = useCallback((ingredient: BurgerIngredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const closeIngredientsDetail = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={setCurrent} />
      {loadingState === LoadingState.ERROR ? <div>Не удалось загрузить меню. Перезагрузите страницу</div> : null}
      <div className={`${styles.list} custom-scroll`}>
        <BurgerIngredientsGroup
          title="Булки"
          ingredients={banIngredients}
          loadingState={loadingState}
          onClickByIngredient={openIngredientsDetail}
        />
        <BurgerIngredientsGroup
          title="Соусы"
          ingredients={sauceIngredients}
          loadingState={loadingState}
          onClickByIngredient={openIngredientsDetail}
        />
        <BurgerIngredientsGroup
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
