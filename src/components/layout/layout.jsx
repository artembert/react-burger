import React from "react";
import PropTypes from "prop-types";
import styles from "./layout.module.css";

export const Layout = (props) => {
  const { children } = props;
  return <div className={styles.layout}>{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
