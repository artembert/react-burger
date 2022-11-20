import { useCallback } from "react";
import { ConstructorItem } from "../components/burger-constructor/constructor-item/constructor-item";
import { DraggableConstructorIngredient } from "../types/constructor-ingredient";
import { useAppDispatch } from "../services/store";
import { reorderConstructorIngredients } from "../services/burger-constructor";

type Props = {
  item: DraggableConstructorIngredient;
};

export const ConstructorItemContainer = (props: Props) => {
  const { item } = props;
  const dispatch = useAppDispatch();

  const handleMoveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        reorderConstructorIngredients({
          dragIndex,
          hoverIndex,
        })
      );
    },
    [dispatch]
  );

  return <ConstructorItem index={item.orderIndex} item={item} onMoveItem={handleMoveItem} />;
};
