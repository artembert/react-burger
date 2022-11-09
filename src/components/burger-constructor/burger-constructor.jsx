import React, { useCallback, useState } from "react";
import PropTypes, { oneOf } from "prop-types";
import { OrderSummary } from "./order-summary/order-summary";
import { Button, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../types/constants/ingredient";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { LoadingState } from "../../types/loading-state";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerParts } from "../../types/burger-parts";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor = (props) => {
  const { ingredients, loadingState } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = useCallback(() => setIsPopupOpen(true), []);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  if (!ingredients.length) {
    return null;
  }
  const buns = ingredients.filter((item) => item.type === BurgerParts.BUN);
  const topElement = buns[0];
  const bottomElement = buns[0];
  const notFixedIngredients = ingredients
    .filter((item) => item.type !== BurgerParts.BUN)
    .slice(1, ingredients.length - 1);

  if (loadingState === LoadingState.LOADING) {
    return <div>Загрузка...</div>;
  }
  if (loadingState === LoadingState.ERROR) {
    return <div>Не удалось загрузить меню. Перезагрузите страницу</div>;
  }
  return (
    <div className={`${styles.burgerConstructor} pl-4`}>
      <div className={`${styles.fixedElement} mb-4 pr-4 pl-4`}>
        <ConstructorElement
          key={topElement._id}
          type="top"
          isLocked={true}
          text={topElement.name + " (верх)"}
          price={topElement.price}
          thumbnail={topElement.image}
        />
      </div>
      <div className={`${styles.list} pr-1 custom-scroll`}>
        {notFixedIngredients.map((item) => {
          return (
            <div className={styles.draggableItemContainer} key={item._id}>
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
            </div>
          );
        })}
      </div>
      <div className={`${styles.fixedElement} mt-4`}>
        <ConstructorElement
          key={bottomElement._id}
          type="bottom"
          isLocked={true}
          text={bottomElement.name + " (низ)"}
          price={bottomElement.price}
          thumbnail={bottomElement.image}
        />
      </div>
      <div className={styles.orderSummaryContainer}>
        <OrderSummary price={610}>
          <Button type="primary" size="large" htmlType="button" onClick={openPopup}>
            Оформить заказ
          </Button>
        </OrderSummary>
      </div>
      {isPopupOpen ? (
        <Modal onRequestClose={closePopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  loadingState: oneOf([LoadingState.IDLE, LoadingState.LOADING, LoadingState.SUCCESSFUL, LoadingState.ERROR])
    .isRequired,
};
