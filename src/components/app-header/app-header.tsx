import { Logo, ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationButton } from "./navigation-button/navigation-button";
import { AppNavigation } from "./app-navigation/app-navigation";
import styles from "./app-header.module.css";
import { Routes } from "../../app/routes/constants";

type Props = {
  userName: string | null;
};
export const AppHeader = (props: Props) => {
  const { userName } = props;

  return (
    <header className={`${styles.appHeader}`}>
      <div className={styles.container}>
        <div className={styles.startActions}>
          <AppNavigation>
            <NavigationButton href={Routes.Index} exact>
              <BurgerIcon type="primary" />
              Конструктор
            </NavigationButton>
            <NavigationButton href={Routes.ProfileOrders} exact>
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
            <NavigationButton href={Routes.Profile} exact>
              <ProfileIcon type="primary" />
              {userName ?? "Личный кабинет"}
            </NavigationButton>
          </AppNavigation>
        </div>
      </div>
    </header>
  );
};
