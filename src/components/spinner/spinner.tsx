import React from "react";
import bunBlueImgSrc from "../../images/buns/bun-blue-normal.png";
import bunPinkImgSrc from "../../images/buns/bun-pink-normal.png";
import styles from "./spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img src={bunBlueImgSrc} alt="burger bun" className={styles.bun1} />
        <img src={bunPinkImgSrc} alt="burger bun" className={styles.bun2} />
      </div>
    </div>
  );
};
