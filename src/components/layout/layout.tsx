import { ReactNode } from "react";
import styles from "./layout.module.css";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => {
  const { children } = props;
  return <div className={styles.layout}>{children}</div>;
};
