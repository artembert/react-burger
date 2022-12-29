import { Route, Switch } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { AppHeader } from "../app-header/app-header";
import { Layout } from "../layout/layout";
import { RegisterPage } from "../../pages/register-page/register-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { Routes } from "../../app/routes/constants";
import { ProtectedRoute } from "../protected-route/protected-route";

export const App = () => {
  return (
    <Layout>
      <AppHeader />
      <Switch>
        <ProtectedRoute path={Routes.Profile} exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path={Routes.Register} exact>
          <RegisterPage />
        </Route>
        <Route path={Routes.Login} exact>
          <LoginPage />
        </Route>
        <Route path={Routes.ForgotPassword} exact>
          <ForgotPasswordPage />
        </Route>
        <Route path={Routes.ResetPassword} exact>
          <ResetPasswordPage />
        </Route>
        <Route path="/">
          <ConstructorPage />
        </Route>
      </Switch>
    </Layout>
  );
};
