import { selectAuthUserName } from "../services/auth/selectors";
import { useAppSelector } from "../services/store";
import { AppHeader } from "../components/app-header/app-header";

export const HeaderContainer = () => {
  const userName = useAppSelector(selectAuthUserName);

  return <AppHeader userName={userName} />;
};
