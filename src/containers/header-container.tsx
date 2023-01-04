import { useSelector } from "react-redux";
import { selectAuthUserName } from "../services/auth/selectors";
import { AppHeader } from "../components/app-header/app-header";

export const HeaderContainer = () => {
  const userName = useSelector(selectAuthUserName);

  return <AppHeader userName={userName} />;
};
