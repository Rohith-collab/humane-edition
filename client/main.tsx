import { createRoot } from "react-dom/client";
import App from "./App";

// Enhanced HMR support
const container = document.getElementById("root")!;

// Use a global variable to track the root to prevent multiple root creation
declare global {
  interface Window {
    __root?: ReturnType<typeof createRoot>;
  }
}

function renderApp() {
  if (!window.__root) {
    window.__root = createRoot(container);
  }
  
  window.__root.render(<App />);
}

renderApp();

// HMR handling
if (import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    renderApp();
  });
}
