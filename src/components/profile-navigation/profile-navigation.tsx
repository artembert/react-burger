import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { Routes } from "../../app/routes/constants";
import styles from "./profile-navigation.module.css";

export const ProfileNavigation = () => {
  const logout = () => {};

  return (
    <nav className={classNames(styles.root)}>
      <ul className={classNames(styles.list)}>
        <li className={classNames(styles.listItem)}>
          <NavLink
            exact
            to={Routes.Profile}
            className={classNames(styles.link, "text_color_inactive")}
            activeClassName={styles.linkActive}
          >
            <p className={classNames(styles.text, "text", "text_type_main-medium")}>Профиль</p>
          </NavLink>
        </li>
        <li className={classNames(styles.listItem)}>
          <NavLink
            exact
            to={Routes.ProfileOrders}
            className={classNames(styles.link, "text_color_inactive")}
            activeClassName={styles.linkActive}
          >
            <p className={classNames(styles.text, "text", "text_type_main-medium")}>История заказов</p>
          </NavLink>
        </li>
        <li className={classNames(styles.listItem)}>
          <button type="button" onClick={logout} className={classNames(styles.link, "text_color_inactive")}>
            <p className={classNames(styles.text, "text", "text_type_main-medium")}>Выход</p>
          </button>
        </li>
      </ul>
      <p className={classNames(styles.description, "text", "text_type_main-default", "text_color_inactive")}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};
