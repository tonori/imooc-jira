import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  modalOpen: boolean;
}

const initialState: State = {
  modalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

// 读取 projectList 中的 modalOpen 的快捷方法
export const selectModalOpen = (state: RootState) =>
  state.projectList.modalOpen;
