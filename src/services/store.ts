import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ingredients } from "./ingredients";
import { burgerConstructor } from "./burger-constructor";
import { orderDetails } from "./order-details";
import { auth } from "./auth";
import { resetPassword } from "./reset-password";
import { webFeedSocketMiddleware } from "./ws/wsFeed.middleware";
import { feed } from "./feed";
import { profileOrders } from "./profile-orders";
import { wsProfileOrdersSocketMiddleware } from "./ws/wsProfileOrders.middleware";

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  orderDetails,
  auth,
  resetPassword,
  feed,
  profileOrders,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      webFeedSocketMiddleware(),
      wsProfileOrdersSocketMiddleware()
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
