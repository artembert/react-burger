import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components/modal/modal";
import { useAppSelector } from "../services/store";
import { Order } from "../components/order/order";
import { mapWsToToLoadingStatus } from "../app/helpers/map-ws-to-loading-status";
import { LoadingState } from "../types/loading-state";
import { SpinnerBurger } from "../components/spinner-burger/spinner-burger";
import { OrderHistoryDetails } from "../types/order-history-details";
import { selectProfileOrdersConnectionState, selectProfileOrdersOrders } from "../services/profile-orders/selectors";

export const ProfileOrderModalContainer = () => {
  const history = useHistory();
  const { orderId } = useParams<any>();
  const connectionState = useAppSelector(selectProfileOrdersConnectionState);
  const orders = useAppSelector(selectProfileOrdersOrders);
  const feedLoadingState = mapWsToToLoadingStatus(connectionState);
  const ingredientsLoadingState = mapWsToToLoadingStatus(connectionState);
  const order = orders.find((item) => item.id === orderId) as OrderHistoryDetails;
  const isLoaded = ingredientsLoadingState === LoadingState.SUCCESSFUL && feedLoadingState === LoadingState.SUCCESSFUL;
  const { number, ...item } = order;
  const closePopup = () => {
    history.goBack();
  };

  return (
    <Modal title={order?.number ? `#${order.number}` : undefined} onRequestClose={closePopup}>
      {isLoaded && order ? <Order item={item} /> : <SpinnerBurger />}
    </Modal>
  );
};
