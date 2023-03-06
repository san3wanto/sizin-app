import { configureStore } from "@reduxjs/toolkit"; //setting awal
import authSlice from "../features/authSlice"; //setting awal

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// setting awal
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
//setting awal

export const persistor = persistStore(store);
