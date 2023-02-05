import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderHistoryDetails } from "../../types/order-history-details";
import { OrderStatusLabel } from "../order-status-label/order-status-label";
import { OrderIngredients } from "./order-ingredients/order-ingredients";
import { useAppSelector } from "../../services/store";
import { selectIngredients, selectIngredientsLoadingSate } from "../../services/ingredients/selectors";
import { getOrderPrice } from "../../app/helpers/enrich-order-history-with-price";
import { LoadingState } from "../../types/loading-state";
import { Skeleton } from "../skeleton";
import styles from "./order-history-item.module.css";

type Props = {
  item: OrderHistoryDetails;
};

export const OrderHistoryItem = (props: Props) => {
  const { item } = props;
  const { status, date, ingredientsIds, title, number, id } = item;
  const location = useLocation();
  const history = useHistory();
  const ingredients = useAppSelector(selectIngredients);
  const isLoaded = useAppSelector(selectIngredientsLoadingSate) === LoadingState.SUCCESSFUL;
  const price = useMemo(() => getOrderPrice(ingredientsIds, ingredients), [ingredientsIds, ingredients]);
  const navigateToOrder = () => {
    history.push(`${location.pathname}/${id}`, { background: location });
  };

  return (
    <article className={styles.root} onClick={navigateToOrder}>
      <div className={styles.header}>
        <div className={classNames("text", "text_type_digits-default")}>#{number}</div>
        <div className={classNames(styles.date, "text", "text_type_main-default", "text_color_inactive")}>
          {date.toLocaleString()}
        </div>
      </div>
      <h3 className={classNames("text", "text_type_main-medium", "mt-6")}>{title}</h3>
      {status ? (
        <div className="mt-2">
          <OrderStatusLabel status={status} />
        </div>
      ) : null}
      <div className={classNames(styles.footer, "mt-6")}>
        <div className={classNames()}>
          {isLoaded ? <OrderIngredients ingredientsIds={ingredientsIds} /> : <Skeleton height={64} borderRadius={32} />}
        </div>
        <div className={classNames(styles.price, "text", "text_type_digits-default")}>
          {isLoaded ? (
            <>
              {price}
              <CurrencyIcon type="primary" />
            </>
          ) : (
            <Skeleton height={24} width={93} />
          )}
        </div>
      </div>
    </article>
  );
};
