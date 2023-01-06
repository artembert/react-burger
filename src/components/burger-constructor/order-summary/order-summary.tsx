import { ReactNode } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-summary.module.css";

type Props = {
  price: number;
  children: ReactNode;
};

export const OrderSummary = (props: Props) => {
  const { price, children } = props;
  return (
    <div className={`${styles.container} pr-4`}>
      <div className="text text_type_digits-medium">
        <span>{price}</span>
        <span className="ml-2">
          <CurrencyIcon type="primary" />
        </span>
      </div>
      <div className="ml-10">{children}</div>
    </div>
  );
};
