import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileOrderDetails } from "../../types/profile-order-details";
import { OrderStatusLabel } from "./order-status-label/order-status-label";
import styles from "./order-history-item.module.css";

type Props = {
  item: ProfileOrderDetails;
};

export const OrderHistoryItem = (props: Props) => {
  const { item } = props;
  const { status, id, price, date, ingredientsIds, title } = item;

  return (
    <article className={styles.root}>
      <div className={classNames(styles.header, "mt-6")}>
        <div className={classNames("text", "text_type_digits-default")}>#{id}</div>
        <div className={classNames(styles.date, "text", "text_type_main-default", "text_color_inactive")}>
          {date.toLocaleString()}
        </div>
      </div>
      <h3 className={classNames("text", "text_type_main-medium", "mt-6")}>{title}</h3>
      <div className="mt-2">
        <OrderStatusLabel status={status} />
      </div>
      <div className={classNames(styles.footer, "mt-6")}>
        <div className={classNames()}></div>
        <div className={classNames(styles.price, "text", "text_type_digits-default")}>
          {price}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
};
