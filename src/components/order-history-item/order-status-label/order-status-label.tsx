import classNames from "classnames";
import { OrderStatus } from "../../../types/order-status";

type Props = {
  status: OrderStatus;
};

export const OrderStatusLabel = (props: Props) => {
  const { status } = props;

  switch (status) {
    case "CREATED":
      return <span className={classNames("text", "text_type_main-default")}>Создан</span>;
    case "IN_PROGRESS":
      return <span className={classNames("text", "text_type_main-default")}>Готовится</span>;
    case "DONE":
      return <span className={classNames("text", "text_type_main-default", "text_color_success")}>Выполнен</span>;
    case "REJECTED":
      return <span className={classNames("text", "text_type_main-default", "text_color_error")}>Отменен</span>;
  }
};
