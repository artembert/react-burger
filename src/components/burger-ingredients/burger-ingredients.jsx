import React, { useCallback, useMemo } from "react";
import PropTypes, { oneOf } from "prop-types";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerParts } from "../../types/burger-parts";
import { ingredientType } from "../../types/constants/ingredient";
import { LoadingState } from "../../types/loading-state";
import { Ingredient } from "../ingredient/ingredient";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = (props) => {
  const { ingredients, loadingState } = props;
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);
  const banIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);

  const openIngredientsDetail = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const closeIngredientsDetail = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={setCurrent} />
      {loadingState === LoadingState.LOADING ? <div>Загрузка...</div> : null}
      {loadingState === LoadingState.ERROR ? <div>Не удалось загрузить меню. Перезагрузите страницу</div> : null}
      {loadingState === LoadingState.SUCCESSFUL ? (
        <div className={`${styles.list} custom-scroll`}>
          <section>
            <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
            <ul className={styles.ingredientsList}>
              {banIngredients.map((item) => (
                <li className={styles.ingredient} key={item._id}>
                  <Ingredient ingredient={item} onClick={openIngredientsDetail} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
            <ul className={styles.ingredientsList}>
              {sauceIngredients.map((item) => (
                <li className={styles.ingredient} key={item._id}>
                  <Ingredient ingredient={item} onClick={openIngredientsDetail} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
            <ul className={styles.ingredientsList}>
              {mainIngredients.map((item) => (
                <li className={styles.ingredient} key={item._id}>
                  <Ingredient ingredient={item} onClick={openIngredientsDetail} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
      {selectedIngredient ? (
        <Modal title="Детали ингредиента" onRequestClose={closeIngredientsDetail}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      ) : null}
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  loadingState: oneOf([LoadingState.IDLE, LoadingState.LOADING, LoadingState.SUCCESSFUL, LoadingState.ERROR])
    .isRequired,
};
