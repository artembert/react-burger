import classNames from "classnames";
import { ordersHistoryMock } from "../../mocks/orders-history.mock";
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
      <section>col2</section>
    </div>
  );
};
