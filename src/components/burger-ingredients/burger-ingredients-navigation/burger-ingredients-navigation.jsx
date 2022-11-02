import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerParts } from "../constants/burger-parts";

export const BurgerIngredientsNavigation = (props) => {
  const { current, onChange } = props;
  return (
    <div style={{ display: "flex" }}>
      <Tab value={BurgerParts.BAN} active={current === BurgerParts.BAN} onClick={onChange}>
        Булки
      </Tab>
      <Tab value={BurgerParts.SAUCE} active={current === BurgerParts.SAUCE} onClick={onChange}>
        Соусы
      </Tab>
      <Tab value={BurgerParts.FILLING} active={current === BurgerParts.FILLING} onClick={onChange}>
        Начинки
      </Tab>
    </div>
  );
};

BurgerIngredientsNavigation.propTypes = {
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
