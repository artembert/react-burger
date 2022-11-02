import React from "react";
import PropTypes from "prop-types";
import styles from "./constuctor-page-layout.module.css";

export const ConstructorPageLayout = (props) => {
  const { leftColumn, rightColumn } = props;
  return (
    <main className={styles.main}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
      <div className={styles.leftColumn}>{leftColumn}</div>
      <div className={styles.rightColumn}>{rightColumn}</div>
    </main>
  );
};

ConstructorPageLayout.propTypes = {
  leftColumn: PropTypes.node.isRequired,
  rightColumn: PropTypes.node.isRequired,
};
