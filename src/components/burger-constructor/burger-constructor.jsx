import React from "react";
import { OrderSummary } from "./order-summary/order-summary";
// import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  return (
    <div>
      burger-constructor
      <OrderSummary price={610} />
    </div>
  );
};
