import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimatePresence } from "framer-motion";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <App />
      </AnimatePresence>
    </BrowserRouter>
  </StrictMode>
);
