import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerParts } from "../../../types/burger-parts";
import styles from "./burger-ingredients-navigation.module.css";

export const BurgerIngredientsNavigation = (props) => {
  const { current, onChange } = props;
  return (
    <div className={styles.root}>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.BUN} active={current === BurgerParts.BUN} onClick={onChange}>
          Булки
        </Tab>
      </div>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.SAUCE} active={current === BurgerParts.SAUCE} onClick={onChange}>
          Соусы
        </Tab>
      </div>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.MAIN} active={current === BurgerParts.MAIN} onClick={onChange}>
          Начинки
        </Tab>
      </div>
    </div>
  );
};

BurgerIngredientsNavigation.propTypes = {
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
