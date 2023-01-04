import React, { forwardRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Ingredient } from "../../ingredient/ingredient";
import { MenuIngredient } from "../../../types/menu-ingredient";
import { ValueOf } from "../../../types";
import { LoadingState } from "../../../types/loading-state";
import { Skeleton } from "../../skeleton";
import { Routes } from "../../../app/routes/constants";
import styles from "./burger-ingredients-group.module.css";

type Props = {
  ingredients: MenuIngredient[];
  title: string;
  loadingState: ValueOf<typeof LoadingState>;
  onClickByIngredient: (ingredient: MenuIngredient) => void;
};

export const BurgerIngredientsGroup = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { ingredients, title, loadingState, onClickByIngredient } = props;
  const history = useHistory();

  const location = useLocation();

  const handleClick = (ingredient: MenuIngredient) => {
    history.push(`${Routes.Ingredients}/${ingredient._id}`, { background: location });
  };

  return (
    <section ref={ref} className={`${styles.root} mt-5`}>
      <h3 className="text text_type_main-medium pt-5 pb-6">{title}</h3>
      <ul className={styles.ingredientsList}>
        {loadingState === LoadingState.SUCCESSFUL
          ? ingredients.map((item) => (
              <li className={styles.ingredient} key={item._id}>
                <Ingredient ingredient={item} onClick={handleClick} />
              </li>
            ))
          : null}
        {loadingState === LoadingState.LOADING ? (
          <>
            <Skeleton width={272} height={208} borderRadius={40} />
            <Skeleton width={272} height={208} borderRadius={40} />
          </>
        ) : null}
      </ul>
    </section>
  );
});
