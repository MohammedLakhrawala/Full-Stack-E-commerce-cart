import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-center"
      containerClassName="!z-[999999]"
      toastOptions={{
        style: { background: "#111827", color: "#fff", border: "1px solid #27272a" },
      }}
    />
  </BrowserRouter>
);
