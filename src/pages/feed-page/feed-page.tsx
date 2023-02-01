import classNames from "classnames";
import { ordersHistoryMock, ordersIds } from "../../mocks/orders-history.mock";
import { OrderHistoryItem } from "../../components/order-history-item/order-history-item";
import styles from "./feed-page.module.css";

export const FeedPage = () => {
  return (
    <div className={styles.root}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <section className={classNames("pb-10", "pr-2", "custom-scroll", styles.orderList)}>
        {ordersHistoryMock.map((item) => (
          <OrderHistoryItem item={item} key={item.id} />
        ))}
      </section>
      <section className={classNames("custom-scroll", styles.stats)}>
        <div className={styles.orderNumbersSection}>
          <p className="text text_type_main-medium">Готовы:</p>
          <p className="text text_type_main-medium">В работе:</p>
          <div className="text">
            {ordersIds.slice(0, 5).map((item) => (
              <p key={item} className="text text_type_digits-default text_color_success mt-2">
                {item.toString(10)}
              </p>
            ))}
          </div>
          <div className="text">
            {ordersIds.slice(-3).map((item) => (
              <p key={item} className="text text_type_digits-default mt-2">
                {item.toString(10)}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-15">
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">28 752</p>
        </div>
        <div className="mt-15">
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">138</p>
        </div>
      </section>
    </div>
  );
};
