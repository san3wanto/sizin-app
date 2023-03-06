import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { persistor, store } from "redux-persist/integration/react";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;
// agar setiap request ke server selalu menyertakan kredensialnya, berlaku secara global

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
