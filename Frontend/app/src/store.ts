import { configureStore } from "@reduxjs/toolkit";

import formSlice from "@/slices/formSlice";

const store = configureStore({
  reducer: {
    formSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { getState, dispatch } = store;
