import { shape, number, string, oneOf } from "prop-types";
import { BurgerParts } from "../burger-parts";

export const ingredientType = shape({
  _id: string.isRequired,
  name: string.isRequired,
  type: oneOf([BurgerParts.MAIN, BurgerParts.SAUCE, BurgerParts.BAN]),
  proteins: number.isRequired,
  fat: number.isRequired,
  carbohydrates: number.isRequired,
  calories: number.isRequired,
  price: number.isRequired,
  image: string.isRequired,
  image_mobile: string.isRequired,
  image_large: string.isRequired,
  __v: number.isRequired,
});
