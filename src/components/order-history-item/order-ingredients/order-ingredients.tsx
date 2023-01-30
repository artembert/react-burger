import { useState } from "react";
import { useAppSelector } from "../../../services/store";
import styles from "./order-ingredients.module.css";
import { selectIngredients } from "../../../services/ingredients/selectors";

type Props = {
  ingredientsIds: string[];
};

const visibleIngredientsAmountDefault = 5;

export const OrderIngredients = (props: Props) => {
  const { ingredientsIds } = props;
  const ingredients = useAppSelector(selectIngredients);
  const [visibleIngredientsAmount, setVisibleIngredientsAmount] = useState(visibleIngredientsAmountDefault);
  const expanded = ingredientsIds.slice(0, visibleIngredientsAmount);
  const collapsed = ingredientsIds.slice(visibleIngredientsAmount);

  return (
    <ul className={styles.root}>
      {expanded.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        if (!ingredient) {
          return null;
        }
        return (
          <div className={styles.ingredient}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={ingredient.image_mobile} alt={ingredient.name} />
            </div>
          </div>
        );
      })}
    </ul>
  );
};
