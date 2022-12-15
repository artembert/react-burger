import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { Provider } from "react-redux";
import { store } from "../../services/store";
import { AppHeader } from "../app-header/app-header";
import { Layout } from "../layout/layout";
import { RegisterPage } from "../../pages/register-page/register-page";

export const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <AppHeader />
        <Router>
          <Switch>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/">
              <ConstructorPage />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </Provider>
  );
};
