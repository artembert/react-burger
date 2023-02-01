import classNames from "classnames";
import { useAppSelector } from "../../../services/store";
import { selectIngredients } from "../../../services/ingredients/selectors";
import styles from "./order-ingredients.module.css";

type Props = {
  ingredientsIds: string[];
};

const visibleIngredientsAmount = 5;

export const OrderIngredients = (props: Props) => {
  const { ingredientsIds } = props;
  const uniqueIngredientsIds = Array.from(new Set(ingredientsIds));
  const ingredients = useAppSelector(selectIngredients);
  const expanded = uniqueIngredientsIds.slice(0, visibleIngredientsAmount);
  const collapsed = uniqueIngredientsIds.slice(visibleIngredientsAmount);
  const collapsedIngredient = ingredients.find((item) => item._id === collapsed[0]) ?? null;

  return (
    <ul className={styles.root}>
      {expanded.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        if (!ingredient) {
          return null;
        }
        return (
          <div key={ingredient._id} className={styles.ingredient}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
            </div>
          </div>
        );
      })}
      {collapsedIngredient ? (
        <div className={classNames(styles.ingredient)}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={collapsedIngredient.image_mobile} alt={collapsedIngredient.name} />
            {collapsed.length > 1 ? (
              <span className={classNames(styles.collapsedCount, "text", "text_type_main-default")}>
                +{collapsed.length}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </ul>
  );
};
