import React from "react";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerParts } from "./constants/burger-parts";
// import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState(BurgerParts.BAN);
  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={setCurrent} />
    </section>
  );
};
