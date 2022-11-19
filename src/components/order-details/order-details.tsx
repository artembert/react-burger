import React from "react";
import markDoneImgSrc from "../../images/mark-done.svg";
import styles from "./order-details.module.css";
import { LoadingStatus } from "../../types/loading-status";
import { LoadingState } from "../../types/loading-state";
import { Spinner } from "../spinner/spinner";

type Props = {
  loadingStatus: LoadingStatus;
  details: null | {
    number: number;
    name: string;
  };
};

export const OrderDetails = (props: Props) => {
  const { details, loadingStatus } = props;
  if (!details || loadingStatus !== LoadingState.SUCCESSFUL) {
    return (
      <div className={`${styles.loader} pb-20 pt-4 pr-20 pl-20`}>
        <Spinner />
      </div>
    );
  }

  const { number, name } = details;
  return (
    <div className={`${styles.orderAccepted} pb-20 pt-4 pr-20 pl-20`}>
      <p className={`${styles.title} text text_type_main-large`}>{name}</p>
      <p className={`${styles.orderNumber} text text_type_digits-large mt-8`}>{number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className={`${styles.markDoneImg} mt-10`} src={markDoneImgSrc} alt="done" />
      <p className="text text_type_main-default mt-10">Ваш заказ начали готовить</p>
      <p className={`${styles.description} text text_type_main-default mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
