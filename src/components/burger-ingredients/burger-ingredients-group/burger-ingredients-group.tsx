import { forwardRef } from "react";
import { Ingredient } from "../../ingredient/ingredient";
import { MenuIngredient } from "../../../types/menu-ingredient";
import { ValueOf } from "../../../types";
import { LoadingState } from "../../../types/loading-state";
import { Skeleton } from "../../skeleton";
import styles from "./burger-ingredients-group.module.css";

type Props = {
  ingredients: MenuIngredient[];
  title: string;
  loadingState: ValueOf<typeof LoadingState>;
};

export const BurgerIngredientsGroup = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { ingredients, title, loadingState } = props;

  return (
    <section ref={ref} className={`mt-5`} data-testid="burger-ingredients-group">
      <h3 className="text text_type_main-medium pt-5 pb-6 pl-2">{title}</h3>
      <ul className={styles.ingredientsList}>
        {loadingState === LoadingState.SUCCESSFUL
          ? ingredients.map((item) => (
              <li className={styles.ingredient} key={item._id}>
                <Ingredient ingredient={item} />
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
