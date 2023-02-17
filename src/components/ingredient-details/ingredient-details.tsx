import React from "react";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import styles from "./ingredient-details.module.css";

type Props = {
  ingredient: BurgerIngredient;
};

export const IngredientDetails = (props: Props) => {
  const { ingredient } = props;
  const { name, image_large, proteins, fat, carbohydrates, calories } = ingredient;

  return (
    <div className={styles.container} data-testid="ingredient-details">
      <img src={image_large} alt={name} className={styles.image} />
      <p className="text text_type_main-medium mt-4" data-testid="name">
        {name}
      </p>
      <div className={`${styles.specs} mt-8 mb-15`}>
        <div className={styles.specItem}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">{calories}</p>
        </div>
        <div className={styles.specItem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">{proteins}</p>
        </div>
        <div className={styles.specItem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">{fat}</p>
        </div>
        <div className={styles.specItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="mt-2 text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};
