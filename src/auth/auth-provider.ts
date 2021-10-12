// 此文件包含了请求 登录 / 注册接口 及 读取 / 写入 / 删除 存储在 localStorage 中的 token 的方法
import { http } from "utils/http";
import { User } from "types";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const setToken = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
};

export const login = (data: { username: string; password: string }) => {
  return http("/login", {
    method: "POST",
    token: undefined,
    data,
  }).then((response) => {
    setToken(response);
    return response.user;
  });
};

export const register = (data: { username: string; password: string }) => {
  return http("/register", {
    method: "POST",
    token: undefined,
    data,
  }).then((response) => {
    setToken(response);
    return response.user;
  });
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

export const initialUserInfo = async () => {
  const token = getToken();
  return http("/me", { token });
};
