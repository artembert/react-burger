import React from "react";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { Provider } from "react-redux";
import { store } from "../../services/store";

export const App = () => {
  return (
    <Provider store={store}>
      <ConstructorPage />
    </Provider>
  );
};
