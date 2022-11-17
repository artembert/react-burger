import React from "react";
import styles from "./constructor-placeholder.module.css";
import { NBSP } from "../../costants";

export const ConstructorPlaceholder = () => {
  return (
    <div className={styles.root}>
      <div className={`${styles.bun} ${styles.bun_top}`}></div>
      <p className={`${styles.content} text text_type_main-default`}>
        Чтобы собрать бургер,
        <br />
        перетащите ингредиенты
        <br /> из{NBSP}левой колонки
      </p>
      <div className={`${styles.bun} ${styles.bun_bottom}`}></div>
    </div>
  );
};
