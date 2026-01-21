import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA capabilities
// Change to unregister() if you want to opt-out
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log("✅ Service Worker registered successfully. App is ready for offline use.");
  },
  onUpdate: (registration) => {
    console.log("🔄 New version available! Please refresh the page.");
    // Optional: Show update notification to user
    if (window.confirm("New version available! Reload to update?")) {
      registration.waiting?.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});
