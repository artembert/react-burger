import React from "react";
import markDoneImgSrc from "../../images/mark-done.svg";
import { LoadingStatus } from "../../types/loading-status";
import { LoadingState } from "../../types/loading-state";
import { Spinner } from "../spinner/spinner";
import styles from "./order-details.module.css";

type Props = {
  loadingStatus: LoadingStatus;
  details: null | {
    number: number;
    name: string;
  };
};

export const OrderDetails = (props: Props) => {
  const { details, loadingStatus } = props;
  if (loadingStatus === LoadingState.LOADING) {
    return (
      <div className={`${styles.loader} pb-20 pt-4 pr-20 pl-20`}>
        <Spinner size="l" />
      </div>
    );
  }

  if (loadingStatus === LoadingState.ERROR || !details) {
    return (
      <div className={`${styles.error} pb-20 pt-4 pr-20 pl-20 text text_type_main-default`}>
        ⚠️ Failed to make an order.
        <br />
        Please, refresh the page and try again
      </div>
    );
  }

  const { number, name } = details;
  return (
    <div className={`${styles.orderAccepted} pb-20 pt-4 pr-20 pl-20`} data-testid="order-details">
      <p className={`${styles.title} text text_type_main-large`}>{name}</p>
      <p className={`${styles.orderNumber} text text_type_digits-large mt-8`} data-testid="order-id">
        {number}
      </p>
      <p className="text text_type_main-medium mt-8">order id</p>
      <img className={`${styles.markDoneImg} mt-10`} src={markDoneImgSrc} alt="done" />
      <p className="text text_type_main-default mt-10">We started cooking your order</p>
      <p className={`${styles.description} text text_type_main-default mt-2`}>
        Wait for readiness at the orbital station
      </p>
    </div>
  );
};
