import { createContext, ReactNode, useState } from "react";
import * as Auth from "./auth-provider";
import useMount from "hooks/useMount";
import useRequest from "hooks/useRequest";
import { useQueryClient } from "react-query";
import { User } from "types/user";

interface AuthForm {
  username: string;
  password: string;
}

// 创建 Context
export const AuthContext = createContext<
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
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form).then(setUser);
  const logout = () =>
    Auth.logout().then(() => {
      queryClient.clear();
      setUser(null);
    });

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
