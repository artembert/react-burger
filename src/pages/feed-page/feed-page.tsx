import { useEffect } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { closeConnection, openConnection } from "../../services/feed";
import { WS_FEED_ENDPOINT } from "../../app/constants";
import {
  selectFeedConnectionState,
  selectFeedOrders,
  selectFeedOrdersInDone,
  selectFeedOrdersInProgress,
  selectFeedTotal,
  selectFeedTotalToday,
} from "../../services/feed/selectors";
import { WsConnectionState } from "../../types/ws-connection-state";
import { OrderHistoryItem } from "../../components/order-history-item/order-history-item";
import styles from "./feed-page.module.css";

const numberFormat = Intl.NumberFormat("ru-ru", { useGrouping: true });

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(selectFeedConnectionState) === WsConnectionState.CONNECTED;
  const orders = useAppSelector(selectFeedOrders);
  const total = useAppSelector(selectFeedTotal);
  const totalToday = useAppSelector(selectFeedTotalToday);
  const ordersInDone = useAppSelector(selectFeedOrdersInDone).slice(0, 22);
  const ordersInProgress = useAppSelector(selectFeedOrdersInProgress);

  useEffect(() => {
    dispatch(openConnection(WS_FEED_ENDPOINT));

    return () => {
      dispatch(closeConnection());
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <section className={classNames("pb-10", "pr-2", "custom-scroll", styles.orderList)}>
        {isConnected && orders !== null ? (
          <>
            {orders.map((item) => (
              <OrderHistoryItem item={item} key={item.id} />
            ))}
          </>
        ) : null}
      </section>
      <section className={classNames("custom-scroll", styles.stats)}>
        <div className={styles.orderNumbersSection}>
          <p className="text text_type_main-medium">Готовы:</p>
          <p className="text text_type_main-medium">В работе:</p>
          <div className="text" style={{ columnCount: Math.ceil(ordersInDone.length / 10) }}>
            {ordersInDone.map((item, index) => (
              <p
                key={item}
                className={classNames("text", "text_type_digits-default", "text_color_success", {
                  "mt-2": index,
                })}
              >
                {item.toString(10)}
              </p>
            ))}
          </div>
          <div className="text" style={{ columnCount: Math.ceil(ordersInDone.length / 10) }}>
            {ordersInProgress.slice(-3).map((item, index) => (
              <p
                key={item}
                className={classNames("text", "text_type_digits-default", {
                  "mt-2": index,
                })}
              >
                {item.toString(10)}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-15">
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total ? numberFormat.format(total) : 0}</p>
        </div>
        <div className="mt-15">
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday ? numberFormat.format(totalToday) : 0}</p>
        </div>
      </section>
    </div>
  );
};
