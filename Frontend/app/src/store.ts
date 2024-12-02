import { configureStore, combineReducers } from "@reduxjs/toolkit";

import formSlice from "@/slices/formSlice";
import authSlice from "@/slices/authSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage,
  },
  rootReducer
);

const store = configureStore({
  reducer: {
    formSlice,
    persistedReducer,
  },
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { getState, dispatch } = store;
