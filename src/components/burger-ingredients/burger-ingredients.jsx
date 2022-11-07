import React, { useMemo } from "react";
import PropTypes, { oneOf } from "prop-types";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerParts } from "../../types/burger-parts";
import { ingredientType } from "../../types/constants/ingredient";
import { LoadingState } from "../../types/loading-state";
import { IngredientsTypeSection } from "./ingredients-type-section/ingredients-type-section";
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = (props) => {
  const { ingredients, loadingState } = props;
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const banIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={setCurrent} />
      {loadingState === LoadingState.LOADING ? <div>Загрузка...</div> : null}
      {loadingState === LoadingState.SUCCESSFUL ? (
        <div className={`${styles.list} custom-scroll`}>
          <IngredientsTypeSection title="Булки" ingredients={banIngredients} />
          <IngredientsTypeSection title="Соусы" ingredients={sauceIngredients} />
          <IngredientsTypeSection title="Начинки" ingredients={mainIngredients} />
        </div>
      ) : null}
      {loadingState === LoadingState.ERROR ? <div>Не удалось загрузить меню. Перезагрузите страницу</div> : null}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  loadingState: oneOf([LoadingState.IDLE, LoadingState.LOADING, LoadingState.SUCCESSFUL, LoadingState.ERROR])
    .isRequired,
};
