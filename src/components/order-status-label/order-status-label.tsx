import classNames from "classnames";
import { OrderStatus } from "../../types/order-status";
import { OrderStatusState } from "../../types/constants/order-status-state";

type Props = {
  status: OrderStatus;
};

export const OrderStatusLabel = (props: Props) => {
  const { status } = props;

  switch (status) {
    case OrderStatusState.CREATED:
      return <span className={classNames("text", "text_type_main-default")}>Created</span>;
    case OrderStatusState.PENDING:
      return <span className={classNames("text", "text_type_main-default")}>Cooking</span>;
    case OrderStatusState.DONE:
      return <span className={classNames("text", "text_type_main-default", "text_color_success")}>Completed</span>;
  }
};
