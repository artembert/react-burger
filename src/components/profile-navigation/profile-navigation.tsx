import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { LogoutIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Routes } from "../../app/routes/constants";
import styles from "./profile-navigation.module.css";
import { fetchLogout } from "../../services/auth";
import { useAppDispatch } from "../../services/store";
import { getRefreshToken } from "../../services/token";
import { useSelector } from "react-redux";
import { selectAuthLoadingState } from "../../services/auth/selectors";
import { LoadingState } from "../../types/loading-state";

export const ProfileNavigation = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoadingState) === LoadingState.LOADING;
  const logout = () => {
    dispatch(fetchLogout({ token: getRefreshToken() }));
  };

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
          <button
            type="button"
            onClick={logout}
            className={classNames(styles.link, "text_color_inactive", { [styles.linkLoading]: isLoading })}
          >
            <LogoutIcon type="secondary" />
            <p className={classNames(styles.text, "text", "text_type_main-medium", "ml-2")}>Выход</p>
          </button>
        </li>
      </ul>
    </nav>
  );
};
