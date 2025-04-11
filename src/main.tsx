import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LoadScript
        googleMapsApiKey="AIzaSyBWG5FGS6jWI8gBdspFJ4qNaLoq0RMjDsk"
        libraries={["geometry"]}
      >
        <App />
      </LoadScript>
    </Provider>
  </StrictMode>
);
