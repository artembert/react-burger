import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { Provider } from "react-redux";
import { store } from "../../services/store";
import { AppHeader } from "../app-header/app-header";
import { Layout } from "../layout/layout";
import { RegisterPage } from "../../pages/register-page/register-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";

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
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPasswordPage />
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
