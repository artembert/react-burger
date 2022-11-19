import React, { useCallback, useState } from "react";
import { OrderSummary } from "./order-summary/order-summary";
import { Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoadingState } from "../../types/loading-state";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerConstructorSkeleton } from "./burger-constructor-skeleton/burger-constructor-skeleton";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { LoadingStatus } from "../../types/loading-status";
import { MainPlaceholder } from "./main-placeholder/main-placeholder";
import { BunPlaceholder } from "./bun-placeholder/bun-placeholder";
import styles from "./burger-constructor.module.css";

type Props = {
  loadingState: LoadingStatus;
  ingredients: BurgerIngredient[];
  bun: null | BurgerIngredient;
};

export const BurgerConstructor = (props: Props) => {
  const { loadingState, ingredients, bun } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = useCallback(() => setIsPopupOpen(true), []);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  if (loadingState === LoadingState.LOADING) {
    return <BurgerConstructorSkeleton />;
  }
  if (loadingState === LoadingState.ERROR) {
    return <div>Не удалось загрузить меню. Перезагрузите страницу</div>;
  }
  return (
    <div className={`${styles.burgerConstructor} pl-4`}>
      <div className={`${styles.fixedElement} mb-4 pr-4 pl-4`}>
        {bun ? (
          <ConstructorElement
            key={bun._id}
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <BunPlaceholder placement="top" />
        )}
      </div>
      <div className={`${styles.list} pr-1 custom-scroll`}>
        {!ingredients.length ? <MainPlaceholder /> : null}
        {ingredients.map((item) => {
          return (
            <div className={styles.draggableItemContainer} key={item._id}>
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
            </div>
          );
        })}
      </div>
      <div className={`${styles.fixedElement} mt-4`}>
        {bun ? (
          <ConstructorElement
            key={bun._id}
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <BunPlaceholder placement="bottom" />
        )}
      </div>
      <div className={styles.orderSummaryContainer}>
        <OrderSummary price={610}>
          <Button type="primary" size="large" htmlType="button" onClick={openPopup}>
            Оформить заказ
          </Button>
        </OrderSummary>
      </div>
      {isPopupOpen ? (
        <Modal onRequestClose={closePopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};
