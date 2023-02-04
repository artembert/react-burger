import { useMemo } from "react";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderHistoryDetails } from "../../types/order-history-details";
import { useAppSelector } from "../../services/store";
import { selectIngredients } from "../../services/ingredients/selectors";
import { getOrderPrice } from "../../app/helpers/enrich-order-history-with-price";
import styles from "./order.module.css";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { OrderIngredient } from "./order-ingredient/order-ingredient";
import { OrderStatusLabel } from "../order-status-label/order-status-label";
import { Optional } from "../../types";

type Props = {
  item: Optional<OrderHistoryDetails, "number">;
};

export const Order = (props: Props) => {
  const { item } = props;
  const { status, date, ingredientsIds, title, number } = item;
  const ingredients = useAppSelector(selectIngredients);
  const price = useMemo(() => getOrderPrice(ingredientsIds, ingredients), [ingredientsIds, ingredients]);
  const enrichedIngredient = ingredientsIds.map((ingredientId) =>
    ingredients.find((item) => item._id === ingredientId)
  ) as BurgerIngredient[];
  const res = enrichedIngredient.reduce((accum, item) => {
    const currentElement = accum.get(item._id);
    if (currentElement) {
      accum.set(item._id, { ...currentElement, amount: currentElement.amount + 1 });
    } else {
      accum.set(item._id, { ingredient: item, amount: 1 });
    }
    return accum;
  }, new Map<string, { amount: number; ingredient: BurgerIngredient }>());
  const values = Array.from(res.values());

  return (
    <article className={styles.root}>
      {number ? <p className={classNames(styles.number, "text", "text_type_digits-default")}>#{number}</p> : null}
      <h3 className={classNames("text", "text_type_main-medium", "mt-10")}>{title}</h3>
      {status ? (
        <div className="mt-3">
          <OrderStatusLabel status={status} />
        </div>
      ) : null}
      <h3 className={classNames("text", "text_type_main-medium", "mt-10")}>Состав:</h3>
      <div className={classNames("mt-6", "pr-6", "custom-scroll", styles.ingredientsList)}>
        {values.map(({ amount, ingredient }, index) => (
          <div className={classNames({ "mt-4": index })} key={ingredient._id}>
            <OrderIngredient key={ingredient._id} ingredient={ingredient} amount={amount} />
          </div>
        ))}
      </div>
      <div className={classNames(styles.footer, "mt-10")}>
        <div className={classNames("text", "text_type_main-default", "text_color_inactive")}>
          {date.toLocaleString()}
        </div>
        <div className={classNames(styles.price, "text", "text_type_digits-default")}>
          <>
            {price}
            <CurrencyIcon type="primary" />
          </>
        </div>
      </div>
    </article>
  );
};
