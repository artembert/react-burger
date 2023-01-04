import classNames from "classnames";
import styles from "./spinner.module.css";

type Props = {
  size?: "s" | "m" | "l";
};

export const Spinner = (props: Props) => {
  const { size = "m" } = props;

  return (
    <span
      className={classNames(styles.content, {
        [styles.contentSizeS]: size === "s",
        [styles.contentSizeM]: size === "m",
        [styles.contentSizeL]: size === "l",
      })}
    >
      <span className={classNames(styles.element, styles.element1)}></span>
      <span className={classNames(styles.element, styles.element2)}></span>
      <span></span>
    </span>
  );
};
