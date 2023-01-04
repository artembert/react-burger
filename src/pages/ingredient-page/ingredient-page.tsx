import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { selectIngredients } from "../../services/ingredients/selectors";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { SpinnerBurger } from "../../components/spinner-burger/spinner-burger";
import styles from "./ingredient-page.module.css";

export const IngredientPage = () => {
  const { ingredientId } = useParams<any>();
  const ingredients = useSelector(selectIngredients);
  const ingredientPreview = ingredients.find((ingredient) => ingredient._id === ingredientId);

  return (
    <section className={styles.root}>
      <h1 className={classNames("text", "text_type_main-large", "mt-30")}>Детали ингредиента</h1>
      {ingredientPreview ? (
        <IngredientDetails ingredient={ingredientPreview} />
      ) : (
        <div className={styles.spinnerContainer}>
          <SpinnerBurger />
        </div>
      )}
    </section>
  );
};
