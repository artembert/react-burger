import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components/modal/modal";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { selectIngredients } from "../services/ingredients/selectors";
import { useAppSelector } from "../services/store";

export const IngredientDetailsModalContainer = () => {
  const history = useHistory();
  const { ingredientId } = useParams<any>();
  const ingredients = useAppSelector(selectIngredients);
  const ingredientPreview = ingredients.find((ingredient) => ingredient._id === ingredientId);

  const closePopup = () => {
    history.goBack();
  };

  return ingredientPreview ? (
    <Modal title="Ingredient" onRequestClose={closePopup}>
      <IngredientDetails ingredient={ingredientPreview} />
    </Modal>
  ) : null;
};
