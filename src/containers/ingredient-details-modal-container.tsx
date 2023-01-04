import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components/modal/modal";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { selectIngredients } from "../services/ingredients/selectors";

export const IngredientDetailsModalContainer = () => {
  const history = useHistory();
  const { ingredientId } = useParams<any>();
  const ingredients = useSelector(selectIngredients);
  const ingredientPreview = ingredients.find((ingredient) => ingredient._id === ingredientId);

  const closePopup = () => {
    history.goBack();
  };

  return ingredientPreview ? (
    <Modal title="Детали ингредиента" onRequestClose={closePopup}>
      <IngredientDetails ingredient={ingredientPreview} />
    </Modal>
  ) : null;
};
