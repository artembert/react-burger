import React from "react";
import PropTypes from "prop-types";
import styles from "./navigation-button.module.css";

export const NavigationButton = (props) => {
  return (
    <button
      type="button"
      className={`${styles.navigationButton} text text_type_main-default ${
        props.active ? `${styles.active}` : ""
      }`}
    >
      {props.children}
    </button>
  );
};

NavigationButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};
