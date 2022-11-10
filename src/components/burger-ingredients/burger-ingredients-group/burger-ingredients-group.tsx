import React from "react";
import { Ingredient } from "../../ingredient/ingredient";
import { BurgerIngredient } from "../../../types/BurgerIngredient";
import styles from "./burger-ingredients-group.module.css";
import { ValueOf } from "../../../types";
import { LoadingState } from "../../../types/loading-state";
import { Skeleton } from "../../skeleton";

type Props = {
  ingredients: BurgerIngredient[];
  title: string;
  loadingState: ValueOf<typeof LoadingState>;
  onClickByIngredient: (ingredient: BurgerIngredient) => void;
};

export const BurgerIngredientsGroup = (props: Props) => {
  const { ingredients, title, loadingState, onClickByIngredient } = props;
  return (
    <section>
      <h3 className="text text_type_main-medium mt-10 mb-6">{title}</h3>
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
};
