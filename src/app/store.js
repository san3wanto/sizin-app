import { configureStore } from "@reduxjs/toolkit"; //setting awal
import authSlice from "../features/authSlice.js"; //setting awal

// import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

// setting awal
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
//setting awal

export default () => {
  let store = configureStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
