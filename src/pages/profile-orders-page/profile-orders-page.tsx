import { useEffect } from "react";
import classNames from "classnames";
import { ProfilePageWrapper } from "../../components/profile-page-wrapper/profile-page-wrapper";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { OrderHistoryItem } from "../../components/order-history-item/order-history-item";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { selectProfileOrdersConnectionState, selectProfileOrdersOrders } from "../../services/profile-orders/selectors";
import { WsConnectionState } from "../../types/ws-connection-state";
import { closeConnection, openConnection } from "../../services/profile-orders";
import { WS_PROFILE_ORDERS_ENDPOINT } from "../../app/constants";
import { getAccessToken } from "../../services/token";
import styles from "./profile-orders-page.module.css";

export const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(selectProfileOrdersConnectionState) === WsConnectionState.CONNECTED;
  const orders = useAppSelector(selectProfileOrdersOrders);

  useEffect(() => {
    dispatch(openConnection({ url: WS_PROFILE_ORDERS_ENDPOINT, token: getAccessToken() }));

    return () => {
      dispatch(closeConnection());
    };
  }, [dispatch]);

  return (
    <ProfilePageWrapper
      isContentFillWidth
      pageDescription={"В этом разделе вы можете просмотреть свою историю заказов"}
      navigation={<ProfileNavigation />}
      content={
        <article className={classNames("pt-10", "pb-10", "pr-2", "custom-scroll", styles.root)}>
          {isConnected && orders !== null ? (
            <>
              {orders.map((item) => (
                <OrderHistoryItem item={item} key={item.id} />
              ))}
            </>
          ) : null}
        </article>
      }
    />
  );
};
