import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../../../types/BurgerIngredient";
import { IngredientPreview } from "../../ingredient-preview/ingredient-preview";
import styles from "./order-ingredient.module.css";

type Props = {
  ingredient: BurgerIngredient;
  amount: number;
};

export const OrderIngredient = (props: Props) => {
  const { ingredient, amount } = props;
  const { price, name, image_mobile } = ingredient;

  return (
    <div className={styles.root}>
      <IngredientPreview imageSrc={image_mobile} name={name} />
      <p className={classNames("text", "text_type_main-default")}>{name}</p>
      <p className={classNames(styles.price, "text", "text_type_digits-default")}>
        {amount} x {price}
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};
