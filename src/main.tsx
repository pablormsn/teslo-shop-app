import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TesloShopApp } from "./TesloAppShop";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TesloShopApp />
  </StrictMode>
);
