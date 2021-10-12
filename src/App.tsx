// Components
import FullPageLoading from "components/full-page-loading";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";

// Hooks
import { useAuth } from "auth";

// utils
import { getToken } from "auth/auth-provider";

const App = () => {
  const { initialUserInfo, user } = useAuth();

  if (!user && getToken()) {
    initialUserInfo();
    return <FullPageLoading />;
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};
export default App;
