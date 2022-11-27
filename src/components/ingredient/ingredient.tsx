import { memo } from "react";
import classnames from "classnames";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MenuIngredient } from "../../types/menu-ingredient";
import { DndType } from "../../app/constants";
import styles from "./ingredient.module.css";

type Props = {
  ingredient: MenuIngredient;
  onClick: (ingredient: MenuIngredient) => void;
  amount?: number;
};

const Component = (props: Props) => {
  const { ingredient, onClick } = props;
  const { name, price, image, amount } = ingredient;

  const [{ isDrag }, dragRef] = useDrag({
    type: DndType.INGREDIENT,
    item: { id: ingredient._id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleClick = () => onClick(ingredient);

  return (
    <div
      ref={dragRef}
      className={classnames(styles.ingredient, {
        [styles.draggable]: isDrag,
      })}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={name} />
        {amount ? (
          <div className={styles.counterContainer}>
            <Counter count={amount} size="default" />
          </div>
        ) : null}
      </div>
      <div className={`${styles.priceContainer}`}>
        <div className={`${styles.price} text text_type_digits-default mr-2`}>{price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} text text_type_main-default`}>{name}</div>
    </div>
  );
};

export const Ingredient = memo(Component);
