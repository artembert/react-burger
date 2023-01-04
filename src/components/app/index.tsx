import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { useAppDispatch } from "../../services/store";
import { AppHeader } from "../app-header/app-header";
import { Layout } from "../layout/layout";
import { RegisterPage } from "../../pages/register-page/register-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { Routes } from "../../app/routes/constants";
import { ProtectedRoute } from "../protected-route/protected-route";
import { fetchUser } from "../../services/auth";
import { getAccessToken } from "../../services/token";
import { AuthRoute } from "../auth-router/auth-route";
import { ProfileOrdersPage } from "../../pages/profile-orders-page/profile-orders-page";
import { fetchIngredients } from "../../services/ingredients";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getAccessToken()) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Layout>
      <AppHeader />
      <Switch>
        <ProtectedRoute path={Routes.Profile} exact>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path={Routes.ProfileOrders} exact>
          <ProfileOrdersPage />
        </ProtectedRoute>
        <AuthRoute path={Routes.Register} exact>
          <RegisterPage />
        </AuthRoute>
        <AuthRoute path={Routes.Login} exact>
          <LoginPage />
        </AuthRoute>
        <AuthRoute path={Routes.ForgotPassword} exact>
          <ForgotPasswordPage />
        </AuthRoute>
        <AuthRoute path={Routes.ResetPassword} exact>
          <ResetPasswordPage />
        </AuthRoute>
        <Route path="/">
          <ConstructorPage />
        </Route>
      </Switch>
    </Layout>
  );
};
