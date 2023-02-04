import { useAppSelector } from "../../../services/store";
import { IngredientPreview } from "../../ingredient-preview/ingredient-preview";
import { selectIngredients } from "../../../services/ingredients/selectors";
import styles from "./order-ingredients.module.css";

type Props = {
  ingredientsIds: string[];
};

const visibleIngredientsAmount = 5;

export const OrderIngredients = (props: Props) => {
  const { ingredientsIds } = props;
  const uniqueIngredientsIds = Array.from(new Set(ingredientsIds));
  const ingredients = useAppSelector(selectIngredients);
  const expanded = uniqueIngredientsIds.slice(0, visibleIngredientsAmount);
  const collapsed = uniqueIngredientsIds.slice(visibleIngredientsAmount);
  const collapsedIngredient = ingredients.find((item) => item._id === collapsed[0]) ?? null;

  return (
    <ul className={styles.root}>
      {expanded.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        return ingredient ? (
          <IngredientPreview key={ingredient._id} name={ingredient.name} imageSrc={ingredient.image_mobile} stack />
        ) : null;
      })}
      {collapsedIngredient ? (
        <IngredientPreview
          key={collapsedIngredient._id}
          name={collapsedIngredient.name}
          imageSrc={collapsedIngredient.image_mobile}
          collapsedAmount={collapsed.length}
          stack
        />
      ) : null}
    </ul>
  );
};
