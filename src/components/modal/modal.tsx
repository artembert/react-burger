import { ReactNode, useCallback, useEffect, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";

type Props = {
  title?: string;
  onRequestClose: VoidFunction;
  children: ReactNode;
};

const KEY_DOWN = "keydown";

export const Modal = (props: Props) => {
  const { title, children, onRequestClose } = props;
  const modalElement = document.getElementById("modal");
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onRequestClose();
      }
    },
    [onRequestClose]
  );
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const element = document.body;
    element.addEventListener(KEY_DOWN, onKeyDown);
    return () => {
      element.removeEventListener(KEY_DOWN, onKeyDown);
    };
  }, [onKeyDown]);

  if (!modalElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onRequestClose}>
      <div className={styles.window} onClick={handleModalClick}>
        <div>
          <div className={`${styles.header} pt-10 pr-9 pl-10`}>
            <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
            <button className={styles.closeButton} type="button" onClick={onRequestClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalElement
  );
};
