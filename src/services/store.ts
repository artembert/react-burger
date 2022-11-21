import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ingredients } from "./ingredients";
import { burgerConstructor } from "./burger-constructor";
import { orderDetails } from "./order-details";

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  orderDetails,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
