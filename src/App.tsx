// Components
import FullPageLoading from "components/full-page-loading";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";

// utils
import { getToken } from "context/auth-provider";

// Hooks
import useAuth from "hooks/useAuth";

const App = () => {
  const { user } = useAuth();
  if (!user && getToken()) return <FullPageLoading />;
  return (
    // 如果 Context user 存在（不存在的话整个 Context 都是 undefined） 则渲染 Authenticated 组件 否则渲染 Unauthenticted 组件
    user ? <AuthenticatedApp /> : <UnauthenticatedApp />
  );
};
export default App;
