import styles from "./form-page-wrapper.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FormPageWrapper = (props: Props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <div className={styles.formWrapper}>{children}</div>
    </div>
  );
};
