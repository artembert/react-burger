import { useParams } from "react-router-dom";
import classNames from "classnames";
import { SpinnerBurger } from "../../components/spinner-burger/spinner-burger";
import styles from "./order-page.module.css";
import { Order } from "../../components/order/order";
import { OrderHistoryDetails } from "../../types/order-history-details";
import { useEffect, useState } from "react";
import { fetchOrder } from "../../services/order/requests/fetch-order";

export const OrderPage = () => {
  const [order, setOrder] = useState<OrderHistoryDetails | null>(null);

  const { orderId } = useParams<any>();

  useEffect(() => {
    const getOrder = async () => {
      const data = await fetchOrder(orderId);
      setOrder(data);
    };
    getOrder();
  }, [orderId]);

  return (
    <section className={classNames(styles.root, "pt-15", "custom-scroll")}>
      {order ? (
        <div className={styles.orderContainer}>
          <Order item={order} />
        </div>
      ) : (
        <div className={styles.spinnerContainer}>
          <SpinnerBurger />
        </div>
      )}
    </section>
  );
};
