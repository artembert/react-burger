import classNames from "classnames";
import styles from "./ingredient-preview.module.css";

type Props = { imageSrc: string; name: string; collapsedAmount?: number; stack?: boolean };

export const IngredientPreview = (props: Props) => {
  const { imageSrc, name, collapsedAmount, stack } = props;

  return (
    <div className={classNames(styles.ingredient, { [styles.stack]: stack })}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageSrc} alt={name} />
        {collapsedAmount ? (
          <span className={classNames(styles.collapsedCount, "text", "text_type_main-default")}>
            +{collapsedAmount}
          </span>
        ) : null}
      </div>
    </div>
  );
};
