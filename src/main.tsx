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
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["geometry"]}
      >
        <App />
      </LoadScript>
    </Provider>
  </StrictMode>
);
