import { BurgerParts } from "./burger-parts";
import { ValueOf } from "../types";

export type BurgerIngredient = {
  _id: string;
  name: string;
  type: ValueOf<typeof BurgerParts>;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
