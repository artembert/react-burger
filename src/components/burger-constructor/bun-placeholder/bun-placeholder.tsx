import React from "react";
import classnames from "classnames";
import styles from "./bun-placeholder.module.css";

type Props = {
  placement: "top" | "bottom";
};
export const BunPlaceholder = (props: Props) => {
  const { placement } = props;
  return (
    <div
      className={classnames(styles.bun, {
        [styles.bun_top]: placement === "top",
        [styles.bun_bottom]: placement === "bottom",
      })}
    ></div>
  );
};
