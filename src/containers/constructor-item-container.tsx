import { ConstructorItem } from "../components/burger-constructor/constructor-item/constructor-item";
import { DraggableConstructorIngredient } from "../types/constructor-ingredient";

type Props = {
  item: DraggableConstructorIngredient;
};

export const ConstructorItemContainer = (props: Props) => {
  const { item } = props;

  return <ConstructorItem item={item} />;
};
