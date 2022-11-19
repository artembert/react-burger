import { memo } from "react";
import classnames from "classnames";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../../types/BurgerIngredient";
import { DndType } from "../../app/constants";
import styles from "./ingredient.module.css";

type Props = {
  ingredient: BurgerIngredient;
  onClick: (ingredient: BurgerIngredient) => void;
  amount?: number;
};

const Component = (props: Props) => {
  const { ingredient, amount, onClick } = props;
  const { name, price, image } = ingredient;

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
      {amount ? (
        <div className={styles.counterContainer}>
          <Counter count={amount} size="default" />
        </div>
      ) : null}
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <div className={`${styles.priceContainer} mt-2`}>
        <div className="text text_type_digits-default mr-2">{price}</div>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.name} mt-2 text text_type_main-default`}>{name}</div>
    </div>
  );
};

export const Ingredient = memo(Component);
