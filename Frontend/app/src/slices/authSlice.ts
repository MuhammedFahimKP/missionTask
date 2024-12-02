import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { LoginResponse, User } from "@/types";

interface State {
  access: null | string;
  refresh: null | string;
  user: User | null;

  sessionTimeout: boolean;
}

const initialState: State = {
  access: null,
  refresh: null,
  user: null,
  sessionTimeout: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state: State, action: PayloadAction<LoginResponse>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;

      const user = {
        name: action.payload.name,
        dept: action.payload.dept,
        email: action.payload.name,
      };

      state.user = user;
    },

    setAccessToken: (state: State, action: PayloadAction<string>) => {
      state.access = action.payload;
    },

    setSessionTimeOut: (state: State) => {
      state.sessionTimeout = true;
    },

    loggedOut: (state: State) => {
      state = initialState;
    },
  },
});

export default authSlice.reducer;
export const { loggedIn, loggedOut, setSessionTimeOut, setAccessToken } =
  authSlice.actions;
