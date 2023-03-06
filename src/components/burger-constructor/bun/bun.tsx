import React, { memo } from "react";
import classnames from "classnames";
import styles from "./bun.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredient } from "../../../types/BurgerIngredient";

type Props = {
  bun: null | BurgerIngredient;
  placement: "top" | "bottom";
};

export const Component = (props: Props) => {
  const { placement, bun } = props;

  if (!bun) {
    return (
      <div
        className={classnames(styles.bun, {
          [styles.bun_top]: placement === "top",
          [styles.bun_bottom]: placement === "bottom",
        })}
      ></div>
    );
  }

  const label = placement === "top" ? " (top)" : " (bottom)";
  return (
    <ConstructorElement
      key={bun._id}
      type={placement}
      isLocked={true}
      text={bun.name + label}
      price={bun.price}
      thumbnail={bun.image}
    />
  );
};

export const Bun = memo(Component);
