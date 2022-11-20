import React, { forwardRef } from "react";
import { Ingredient } from "../../ingredient/ingredient";
import { MenuIngredient } from "../../../types/menu-ingredient";
import styles from "./burger-ingredients-group.module.css";
import { ValueOf } from "../../../types";
import { LoadingState } from "../../../types/loading-state";
import { Skeleton } from "../../skeleton";

type Props = {
  ingredients: MenuIngredient[];
  title: string;
  loadingState: ValueOf<typeof LoadingState>;
  onClickByIngredient: (ingredient: MenuIngredient) => void;
};

export const BurgerIngredientsGroup = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { ingredients, title, loadingState, onClickByIngredient } = props;
  return (
    <section ref={ref}>
      <h3 className="text text_type_main-medium pt-10 pb-6">{title}</h3>
      <ul className={styles.ingredientsList}>
        {loadingState === LoadingState.SUCCESSFUL
          ? ingredients.map((item) => (
              <li className={styles.ingredient} key={item._id}>
                <Ingredient ingredient={item} onClick={onClickByIngredient} />
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
