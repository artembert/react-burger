import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./navigation-button.module.css";
import { NavLink } from "react-router-dom";

type Props = {
  href: string;
  exact?: boolean;
  children: ReactNode;
};

export const NavigationButton = (props: Props) => {
  const { href, exact, children } = props;
  return (
    <NavLink
      to={href}
      className={classNames(styles.navigationButton, "text", "text_type_main-default")}
      activeClassName={styles.active}
      exact={exact}
    >
      {children}
    </NavLink>
  );
};
