import { MouseEvent, ReactNode } from "react";
import styles from "./modal-overlay.module.css";

type Props = {
  onClick: VoidFunction;
  children: ReactNode;
};

export const ModalOverlay = (props: Props) => {
  const { onClick, children } = props;
  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div onClick={clickHandler} className={styles.modalOverlay}>
      {children}
    </div>
  );
};
