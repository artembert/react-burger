import React from "react";
import PropTypes from "prop-types";
import styles from "./app-navigation.module.css";

export const AppNavigation = (props) => {
  return <nav className={styles.appNavigation}>{props.children}</nav>;
};

AppNavigation.propTypes = {
  children: PropTypes.node.isRequired,
};
