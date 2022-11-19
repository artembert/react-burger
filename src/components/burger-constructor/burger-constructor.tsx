import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";
import { OrderSummary } from "./order-summary/order-summary";
import { Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { LoadingState } from "../../types/loading-state";
import { OrderDetailsModalContainer } from "../../containers/order-details-modal-container";
import { BurgerConstructorSkeleton } from "./burger-constructor-skeleton/burger-constructor-skeleton";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { LoadingStatus } from "../../types/loading-status";
import { MainPlaceholder } from "./main-placeholder/main-placeholder";
import { Bun } from "./bun/bun";
import { ConstructorIngredient } from "../../types/constructor-ingredient";
import { DndType } from "../../app/constants";
import styles from "./burger-constructor.module.css";

type Props = {
  loadingState: LoadingStatus;
  ingredients: ConstructorIngredient[];
  bun: null | BurgerIngredient;
  totalPrice: number;
  onMakeOrder: VoidFunction;
};

type DropTarget = { isHover: boolean; availableToDrop: boolean };

export const BurgerConstructor = (props: Props) => {
  const { loadingState, ingredients, bun, totalPrice, onMakeOrder } = props;
  const isOrderEnabled = bun && ingredients.length;
  const [{ isHover, availableToDrop }, dropTargetRef] = useDrop<{ id: number }, unknown, DropTarget>({
    accept: DndType.INGREDIENT,
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      availableToDrop: monitor.canDrop(),
      isHover: monitor.isOver(),
    }),
  });

  const onDropHandler = (droppedItem: { id: number }) => {
    console.log(droppedItem);
  };

  if (loadingState === LoadingState.LOADING) {
    return <BurgerConstructorSkeleton />;
  }
  if (loadingState === LoadingState.ERROR) {
    return <div>Не удалось загрузить меню. Перезагрузите страницу</div>;
  }
  return (
    <div className={`${styles.burgerConstructor} pl-4`}>
      <div
        ref={dropTargetRef}
        className={classnames({
          [styles.dropTarget]: availableToDrop,
          [styles.dropHover]: isHover,
        })}
      >
        <div className={`${styles.fixedElement} mb-4 pr-4 pl-4`}>
          <Bun bun={bun} placement="top" />
        </div>
        <div className={`${styles.list} pr-1 custom-scroll`}>
          {!ingredients.length ? <MainPlaceholder /> : null}
          {ingredients.map((item) => {
            return (
              <div className={styles.draggableItemContainer} key={item.pieceId}>
                <div className="mr-2">
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </div>
            );
          })}
        </div>
        <div className={`${styles.fixedElement} mt-4`}>
          <Bun bun={bun} placement="bottom" />
        </div>
      </div>
      <div className={styles.orderSummaryContainer}>
        <OrderSummary price={totalPrice}>
          <Button disabled={!isOrderEnabled} type="primary" size="large" htmlType="button" onClick={onMakeOrder}>
            Оформить заказ
          </Button>
        </OrderSummary>
      </div>
      <OrderDetailsModalContainer />
    </div>
  );
};
