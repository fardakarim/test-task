import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "$types/user.type";

const initialState = {
  user: {} as Partial<User>,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = {} as Partial<User>;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
