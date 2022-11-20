import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DraggableConstructorIngredient } from "../../../types/constructor-ingredient";
import styles from "./constructor-item.module.css";

type Props = {
  item: DraggableConstructorIngredient;
};

export const ConstructorItem = (props: Props) => {
  const { item } = props;

  return (
    <div className={styles.root} data-handler-id={item.pieceId}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
    </div>
  );
};
