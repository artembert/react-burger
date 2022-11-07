import React from "react";
import { ingredientType } from "../../types/constants/ingredient";
import styles from "./ingredient-details.module.css";

export const IngredientDetails = (props) => {
  const { ingredient } = props;
  const { name, image_large, proteins, fat, carbohydrates, calories } = ingredient;

  return (
    <div className={styles.container}>
      <img src={image_large} alt={name} className={styles.image} />
      <p className="text text_type_main-medium mt-4">{name}</p>
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

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
};
