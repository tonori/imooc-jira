import { createContext, useContext, useState, ReactNode } from "react";
import * as Auth from "./auth-provider";
import useMount from "utils/use-mount";
import useRequest from "utils/use-request";
import { User } from "types";

interface AuthForm {
  username: string;
  password: string;
}

// 创建 Context
const AuthContext = createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

// AuthContext.Provider 的工厂函数
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { request } = useRequest();
  const token = Auth.getToken();

  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form);
  const logout = () => Auth.logout().then(() => setUser(null));

  // 页面初始化时如果 localStorage 中有 token，则尝试请求用户信息
  useMount(() => {
    token &&
      request({
        finalPoint: "/me",
      })
        .then((res) => {
          setUser(res.user);
        })
        .catch((error) => {
          error.status === 401 && Auth.logout();
        });
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 在 Provider 下的各个组件需要使用 Context 中的数据时，可以直接使用 useAuth 钩子
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
