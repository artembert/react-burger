import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactNode } from "react";
import styles from "./text-link.module.css";

type Props = {
  children: ReactNode;
};

export const TextLink = (props: Props) => {
  const { children } = props;
  return (
    <Button extraClass={styles.root} htmlType="button" type="secondary" size="medium">
      {children}
    </Button>
  );
};
