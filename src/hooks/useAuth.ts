import { useContext } from "react";
import { AuthContext } from "context/auth-content";

// 在 Provider 下的各个组件需要使用 Context 中的数据时，可以直接使用 useAuth 钩子
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};

export default useAuth;
