import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

export const ModalOverlay = (props) => {
  const { onClick, children } = props;
  const clickHandler = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div onClick={clickHandler} className={styles.modalOverlay}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
