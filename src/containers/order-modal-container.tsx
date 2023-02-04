import { Modal } from "../components/modal/modal";
import { useAppSelector } from "../services/store";
import { useHistory, useParams } from "react-router-dom";
import { selectFeedConnectionState, selectFeedOrders } from "../services/feed/selectors";
import { Order } from "../components/order/order";
import { TWsConnectionState, WsConnectionState } from "../types/ws-connection-state";
import { LoadingStatus } from "../types/loading-status";
import { LoadingState } from "../types/loading-state";
import { SpinnerBurger } from "../components/spinner-burger/spinner-burger";
import { OrderHistoryDetails } from "../types/order-history-details";
import { Optional } from "../types";

const mapWsConnectionStateToLoadingStatus = (ws: TWsConnectionState): LoadingStatus => {
  switch (ws) {
    case WsConnectionState.IDLE:
      return LoadingState.LOADING;
    case WsConnectionState.CONNECTED:
      return LoadingState.SUCCESSFUL;
    case WsConnectionState.ERROR:
      return LoadingState.ERROR;
  }
};

export const OrderModalContainer = () => {
  const history = useHistory();
  const { orderId } = useParams<any>();
  const connectionState = useAppSelector(selectFeedConnectionState);
  const orders = useAppSelector(selectFeedOrders);
  const feedLoadingState = mapWsConnectionStateToLoadingStatus(connectionState);
  const ingredientsLoadingState = mapWsConnectionStateToLoadingStatus(connectionState);
  const order = orders.find((item) => item.id === orderId) as OrderHistoryDetails;
  const isLoaded = ingredientsLoadingState === LoadingState.SUCCESSFUL && feedLoadingState === LoadingState.SUCCESSFUL;
  const item: Optional<OrderHistoryDetails, "number"> = { ...order };
  delete item.number;
  const closePopup = () => {
    history.goBack();
  };

  return (
    <Modal title={order?.number ? `#${order.number}` : undefined} onRequestClose={closePopup}>
      {isLoaded && order ? <Order item={item} /> : <SpinnerBurger />}
    </Modal>
  );
};
