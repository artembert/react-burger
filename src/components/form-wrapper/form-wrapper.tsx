import { ReactNode } from "react";
import styles from "./form-wrapper.module.css";

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  title?: string;
};

export const FormWrapper = (props: Props) => {
  const { title, children, footer } = props;
  return (
    <div className={styles.root}>
      {title ? <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
      {footer ? <div className={`${styles.footer} mt-20`}>{footer}</div> : null}
    </div>
  );
};
