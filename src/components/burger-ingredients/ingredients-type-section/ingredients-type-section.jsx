import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-type-section.module.css";
import { ingredientType } from "../../../types/constants/ingredient";
import { Ingredient } from "../../ingredient/ingredient";

export const IngredientsTypeSection = (props) => {
  const { title, ingredients } = props;
  return (
    <section>
      <h3 className="text text_type_main-medium mt-10 mb-6">{title}</h3>
      <ul className={styles.list}>
        {ingredients.map((item) => (
          <li className={styles.item} key={item._id}>
            <Ingredient ingredient={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

IngredientsTypeSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};
