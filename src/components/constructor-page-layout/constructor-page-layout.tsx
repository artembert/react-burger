import { ReactNode } from "react";
import styles from "./constuctor-page-layout.module.css";

type Props = {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
};

export const ConstructorPageLayout = (props: Props) => {
  const { leftColumn, rightColumn } = props;
  return (
    <main className={styles.main}>
      <h1 data-testid="page-heading" className={`${styles.title} text text_type_main-large`}>
        Make your burger
      </h1>
      <div className={styles.leftColumn}>{leftColumn}</div>
      <div className={styles.rightColumn}>{rightColumn}</div>
    </main>
  );
};
