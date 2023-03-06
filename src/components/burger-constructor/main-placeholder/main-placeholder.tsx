import React from "react";
import { NBSP } from "../../costants";
import styles from "./main-placeholder.module.css";

export const MainPlaceholder = () => {
  return (
    <p className={`${styles.root} ml-8 text text_type_main-default`}>
      To make a burger
      <br />
      drag ingredients
      <br /> from{NBSP}left column
    </p>
  );
};
