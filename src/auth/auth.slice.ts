import { createSlice } from "@reduxjs/toolkit";
import { User } from "types";
import * as Auth from "./auth-provider";
import { AppDispatch, RootState } from "store";

interface State {
  user: User | null;
}

export interface AuthForm {
  username: string;
  password: string;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (from: AuthForm) => (dispatch: AppDispatch) =>
  Auth.login(from).then((user) => dispatch(setUser(user)));
export const register = (from: AuthForm) => (dispatch: AppDispatch) =>
  Auth.register(from);
export const logout = () => (dispatch: AppDispatch) =>
  Auth.logout().then(() => dispatch(setUser(null)));
export const initialUserInfo = () => (dispatch: AppDispatch) =>
  Auth.initialUserInfo().then((res) => dispatch(setUser(res.user)));
