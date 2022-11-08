import React from "react";
import markDoneImgSrc from "../../images/mark-done.svg";
import styles from "./order-details.module.css";

export const OrderDetails = () => {
  return (
    <div className={`${styles.orderAccepted} pb-30 pt-4`}>
      <p className={`${styles.orderNumber} text text_type_digits-large`}>64850</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className={`${styles.markDoneImg} mt-15`} src={markDoneImgSrc} alt="done" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className={`${styles.description} text text_type_main-default mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
