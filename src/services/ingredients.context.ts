import { Dispatch, SetStateAction } from "react";
import { BurgerIngredient } from "../types/BurgerIngredient";
import { createCtx } from "../app/helpers/create-ctx";

export const [useIngredientsContext, IngredientsContext] =
  createCtx<[BurgerIngredient[], Dispatch<SetStateAction<BurgerIngredient[]>>]>();
