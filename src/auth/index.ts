import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Auth from "./auth.slice";
import { User } from "types";

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(Auth.selectUser);
  const initialUserInfo = useCallback(
    () => dispatch(Auth.initialUserInfo()),
    [dispatch]
  );
  const login = useCallback(
    (form: Auth.AuthForm) => dispatch(Auth.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: Auth.AuthForm) => dispatch(Auth.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(Auth.logout()), [dispatch]);

  return {
    initialUserInfo,
    user,
    login,
    register,
    logout,
  };
};
