import { useSelector } from "react-redux";
import { Modal } from "../components/modal/modal";
import { useAppDispatch } from "../services/store";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { selectIngredientPreview } from "../services/ingredients/selectors";
import { closeIngredientDetailsPopup } from "../services/ingredients";

export const IngredientDetailsModalContainer = () => {
  const dispatch = useAppDispatch();
  const ingredientPreview = useSelector(selectIngredientPreview);
  const closePopup = () => {
    dispatch(closeIngredientDetailsPopup());
  };

  return ingredientPreview ? (
    <Modal title="Детали ингредиента" onRequestClose={closePopup}>
      <IngredientDetails ingredient={ingredientPreview} />
    </Modal>
  ) : null;
};
