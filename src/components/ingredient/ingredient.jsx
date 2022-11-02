import React from "react";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientType } from "../../types/constants/ingredient";

export const Ingredient = (props) => {
  const { ingredient, amount } = props;
  const { name, price, image } = ingredient;
  return (
    <div className={styles.ingredient}>
      {amount ? (
        <div className={styles.counterContainer}>
          <Counter count={amount} size="default" />
        </div>
      ) : null}
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <div className={`${styles.priceContainer} mt-2`}>
        <div className="text text_type_digits-default mr-2">{price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} mt-2 text text_type_main-default`}>{name}</div>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  amount: PropTypes.number,
};
