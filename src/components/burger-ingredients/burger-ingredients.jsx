import React, { useMemo } from "react";
import { BurgerIngredientsNavigation } from "./burger-ingredients-navigation/burger-ingredients-navigation";
import { BurgerParts } from "../../types/burger-parts";
import { ingredientType } from "../../types/constants/ingredient";
import PropTypes from "prop-types";
import { IngredientsTypeSection } from "./ingredients-type-section/ingredients-type-section";

export const BurgerIngredients = (props) => {
  const { ingredients } = props;
  const [current, setCurrent] = React.useState(BurgerParts.BUN);
  const banIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.BUN), [ingredients]);
  const sauceIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.SAUCE), [ingredients]);
  const mainIngredients = useMemo(() => ingredients.filter((item) => item.type === BurgerParts.MAIN), [ingredients]);

  return (
    <section>
      <BurgerIngredientsNavigation current={current} onChange={setCurrent} />
      <IngredientsTypeSection title="Булки" ingredients={banIngredients} />
      <IngredientsTypeSection title="Соусы" ingredients={sauceIngredients} />
      <IngredientsTypeSection title="Начинки" ingredients={mainIngredients} />
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};
