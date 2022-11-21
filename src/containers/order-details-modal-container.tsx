import { useSelector } from "react-redux";
import { Modal } from "../components/modal/modal";
import { OrderDetails } from "../components/order-details/order-details";
import {
  selectIsOrderDetailsPopupOpen,
  selectOrderDetailsDetails,
  selectOrderDetailsLoadingSate,
} from "../services/order-details/selectors";
import { useAppDispatch } from "../services/store";
import { closeOrderDetailsPopup } from "../services/order-details";
import { clearConstructor } from "../services/burger-constructor";

export const OrderDetailsModalContainer = () => {
  const dispatch = useAppDispatch();
  const isPopupOpen = useSelector(selectIsOrderDetailsPopupOpen);
  const loadingState = useSelector(selectOrderDetailsLoadingSate);
  const details = useSelector(selectOrderDetailsDetails);
  const closePopup = () => {
    dispatch(clearConstructor());
    dispatch(closeOrderDetailsPopup());
  };

  return isPopupOpen ? (
    <Modal onRequestClose={closePopup}>
      <OrderDetails loadingStatus={loadingState} details={details} />
    </Modal>
  ) : null;
};
