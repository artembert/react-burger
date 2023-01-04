import { memo } from "react";
import classnames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MenuIngredient } from "../../types/menu-ingredient";
import { DndType } from "../../app/constants";
import { Routes } from "../../app/routes/constants";
import styles from "./ingredient.module.css";

type Props = {
  ingredient: MenuIngredient;
  amount?: number;
};

const Component = (props: Props) => {
  const history = useHistory();
  const location = useLocation();

  const { ingredient } = props;
  const { name, price, image, amount } = ingredient;

  const [{ isDrag }, dragRef] = useDrag({
    type: DndType.INGREDIENT,
    item: { id: ingredient._id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    history.push(`${Routes.Ingredients}/${ingredient._id}`, { background: location });
  };

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
