import { ReactNode } from "react";
import classNames from "classnames";
import { Spinner } from "../spinner/spinner";
import styles from "./button-spinner-insert.module.css";
import { NBSP } from "../costants";

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const ButtonSpinnerInsert = (props: Props) => {
  const { isLoading, children } = props;

  return (
    <span className={classNames(styles.root, { [styles.rootLoading]: isLoading })}>
      {isLoading ? <Spinner size="s" /> : null}
      {NBSP}
      {children}
      {NBSP}
    </span>
  );
};
