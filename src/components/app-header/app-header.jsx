import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationButton } from "./navigation-button/navigation-button";
import { AppNavigation } from "./app-navigation/app-navigation";
import styles from "./app-header.module.css";

export const AppHeader = () => {
  return (
    <header className={`${styles.appHeader}`}>
      <div className={styles.container}>
        <div className={styles.startActions}>
          <AppNavigation>
            <NavigationButton active>
              <BurgerIcon type="primary" />
              Конструктор
            </NavigationButton>
            <NavigationButton disabled>
              <ListIcon type="primary" />
              Лента заказов
            </NavigationButton>
          </AppNavigation>
        </div>
        <div className={`${styles.logoContainer} m-24`}>
          <Logo />
        </div>
        <div className={styles.endActions}>
          <AppNavigation>
            <NavigationButton>
              <ProfileIcon type="primary" />
              Личный кабинет
            </NavigationButton>
          </AppNavigation>
        </div>
      </div>
    </header>
  );
};
