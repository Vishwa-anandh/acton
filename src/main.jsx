import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "./app/bootstrap-icons-subset.css";
// Must be the last CSS import: see src/app/tailwind-utilities.scss
import "./app/tailwind-utilities.scss";
// Handle stale build chunk errors after new deployments automatically
const handleChunkError = (message) => {
  if (
    message &&
    (message.includes("Failed to fetch dynamically imported module") ||
      message.includes("Importing a module script failed"))
  ) {
    const hasReloaded = sessionStorage.getItem("chunk_reload");
    if (!hasReloaded) {
      sessionStorage.setItem("chunk_reload", "true");
      window.location.reload();
    }
  }
};

window.addEventListener("error", (event) => handleChunkError(event.message));
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message) {
    handleChunkError(event.reason.message);
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
