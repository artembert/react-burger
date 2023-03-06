import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPart, BurgerParts } from "../../../types/burger-parts";
import styles from "./burger-ingredients-navigation.module.css";

type Props = {
  current: BurgerPart;
  onChange: (group: string) => void;
};

export const BurgerIngredientsNavigation = (props: Props) => {
  const { current, onChange } = props;
  return (
    <div className={styles.root}>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.BUN} active={current === BurgerParts.BUN} onClick={onChange}>
          Buns
        </Tab>
      </div>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.SAUCE} active={current === BurgerParts.SAUCE} onClick={onChange}>
          Sauces
        </Tab>
      </div>
      <div className={styles.tagContainer}>
        <Tab value={BurgerParts.MAIN} active={current === BurgerParts.MAIN} onClick={onChange}>
          Fillings
        </Tab>
      </div>
    </div>
  );
};
