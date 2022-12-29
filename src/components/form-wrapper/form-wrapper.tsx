import { FormEventHandler, ReactNode } from "react";
import styles from "./form-wrapper.module.css";

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  title?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const FormWrapper = (props: Props) => {
  const { title, children, footer, onSubmit } = props;
  return (
    <div className={styles.root}>
      {title ? <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div> : null}
      <form onSubmit={onSubmit} className={styles.content}>
        {children}
      </form>
      {footer ? <div className={`${styles.footer} mt-20`}>{footer}</div> : null}
    </div>
  );
};
