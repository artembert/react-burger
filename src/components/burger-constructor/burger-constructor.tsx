import React from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";
import { OrderSummary } from "./order-summary/order-summary";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorItemContainer } from "../../containers/constructor-item-container";
import { LoadingState } from "../../types/loading-state";
import { OrderDetailsModalContainer } from "../../containers/order-details-modal-container";
import { BurgerConstructorSkeleton } from "./burger-constructor-skeleton/burger-constructor-skeleton";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { LoadingStatus } from "../../types/loading-status";
import { MainPlaceholder } from "./main-placeholder/main-placeholder";
import { Bun } from "./bun/bun";
import { DraggableConstructorIngredient } from "../../types/constructor-ingredient";
import { DndType } from "../../app/constants";
import styles from "./burger-constructor.module.css";

type Props = {
  loadingState: LoadingStatus;
  ingredients: DraggableConstructorIngredient[];
  bun: null | BurgerIngredient;
  totalPrice: number;
  onMakeOrder: VoidFunction;
  onAddIngredient: (id: string) => void;
};

type DropTarget = { isHover: boolean; availableToDrop: boolean };
type DropItem = { id: string };

export const BurgerConstructor = (props: Props) => {
  const { loadingState, ingredients, bun, totalPrice, onMakeOrder, onAddIngredient } = props;
  const isOrderEnabled = bun && ingredients.length;
  const [{ isHover, availableToDrop }, dropTargetRef] = useDrop<DropItem, unknown, DropTarget>({
    accept: DndType.INGREDIENT,
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      availableToDrop: monitor.canDrop(),
      isHover: monitor.isOver(),
    }),
  });

  const onDropHandler = (droppedItem: { id: string }) => {
    onAddIngredient(droppedItem.id);
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
          {ingredients.map((item) => (
            <ConstructorItemContainer key={item.pieceId} item={item} />
          ))}
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
