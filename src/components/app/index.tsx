import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ConstructorPage } from "../../pages/constructor-page/constructor-page";
import { useAppDispatch } from "../../services/store";
import { HeaderContainer } from "../../containers/header-container";
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
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import { fetchIngredients } from "../../services/ingredients";
import { LocationStateBackground } from "../../types/location-state-background";
import { IngredientDetailsModalContainer } from "../../containers/ingredient-details-modal-container";
import { OrderPage } from "../../pages/order-page/order-page";
import { FeedPage } from "../../pages/feed-page/feed-page";
import { OrderModalContainer } from "../../containers/order-modal-container";

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationStateBackground>();
  const background = location.state?.background;

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
      <HeaderContainer />
      <Switch location={background || location}>
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
        <Route path={Routes.IngredientWithId}>
          <IngredientPage />
        </Route>
        <Route path={Routes.Feed} exact>
          <FeedPage />
        </Route>
        <Route path={Routes.FeedWithId}>
          <OrderPage />
        </Route>
        <Route path="/">
          <ConstructorPage />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path={Routes.IngredientWithId}>
            <IngredientDetailsModalContainer />
          </Route>
          <Route path={Routes.FeedWithId}>
            <OrderModalContainer />
          </Route>
        </Switch>
      )}
    </Layout>
  );
};
