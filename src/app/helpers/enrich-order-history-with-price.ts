import { BurgerIngredient } from "../../types/BurgerIngredient";

const findIngredientById = (id: string, ingredients: BurgerIngredient[]) =>
  ingredients.find((item) => item._id === id) ?? null;

// export const enrichOrderByPrice = (
//   order: OrderHistoryDetailsPriceless,
//   ingredients: BurgerIngredient[]
// ): OrderHistoryDetails => {
//   return {
//     ...order,
//     price: getOrderPrice(order.ingredientsIds, ingredients),
//   };
// };

export const getOrderPrice = (ingredientsIds: string[], ingredients: BurgerIngredient[]): number =>
  ingredientsIds.reduce((acc, current) => acc + (findIngredientById(current, ingredients)?.price ?? 0), 0);

// export const enrichOrderHistoryWithPrice = (
//   orders: OrderHistoryDetailsPriceless[],
//   ingredients: BurgerIngredient[]
// ): OrderHistoryDetails[] => orders.map((order) => enrichOrderByPrice(order, ingredients));
