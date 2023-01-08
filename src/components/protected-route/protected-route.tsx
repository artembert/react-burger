import { ReactNode } from "react";
import { selectAuthIsAuthorized } from "../../services/auth/selectors";
import { useAppSelector } from "../../services/store";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Routes } from "../../app/routes/constants";

type Props = {
  path?: string | string[];
  exact?: boolean;
  children: ReactNode;
};

type LocationWithFrom = Location & {
  from: {
    pathname: string;
  };
};

export const ProtectedRoute = (props: Props) => {
  const { children, ...rest } = props;
  const isAuthorized = useAppSelector(selectAuthIsAuthorized);
  const location = useLocation<LocationWithFrom>();
  const to = {
    pathname: location.state?.from ? location.state?.from.pathname : Routes.Login,
    state: { from: location },
  };

  return <Route {...rest} render={() => (isAuthorized ? children : <Redirect to={to} />)} />;
};
