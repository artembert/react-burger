import { Logo, ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { NavigationButton } from "./navigation-button/navigation-button";
import { Routes } from "../../app/routes/constants";
import styles from "./app-header.module.css";

type Props = {
  userName: string | null;
};
export const AppHeader = (props: Props) => {
  const { userName } = props;

  return (
    <header className={styles.appHeader}>
      <nav className={styles.container}>
        <div className={styles.startActions}>
          <NavigationButton href={Routes.Index} exact>
            <BurgerIcon type="primary" />
            Constructor
          </NavigationButton>
          <NavigationButton href={Routes.Feed} exact>
            <ListIcon type="primary" />
            Orders history
          </NavigationButton>
        </div>
        <div className="m-24">
          <Link to={Routes.Index}>
            <div className={styles.logoContainer}>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={styles.endActions}>
          <NavigationButton href={Routes.Profile} exact>
            <ProfileIcon type="primary" />
            {userName ?? "Account"}
          </NavigationButton>
        </div>
      </nav>
    </header>
  );
};
