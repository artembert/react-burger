import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorIngredient } from "../../../types/constructor-ingredient";
import { DndType } from "../../../app/constants";
import styles from "./constructor-item.module.css";

type Props = {
  item: ConstructorIngredient;
  index: number;
  onMoveItem: (dragIndex: number, hoverIndex: number) => void;
};

type DropTarget = { isHover: boolean; availableToDrop: boolean };
type DragTarget = { isDragging: boolean };
type DropItem = { id: string; index: number };

export const ConstructorItem = (props: Props) => {
  const { item, index, onMoveItem } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DropItem, unknown, DropTarget>({
    accept: DndType.CONSTRUCTOR_ITEM,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMoveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<DropItem, unknown, DragTarget>({
    type: DndType.CONSTRUCTOR_ITEM,
    item: () => {
      return { id: item.pieceId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={ref} style={{ opacity }} className={styles.root} data-handler-id={item.pieceId}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
    </div>
  );
};
