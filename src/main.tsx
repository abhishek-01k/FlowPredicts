import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Provider from "./Provider.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="prediction-market-theme">
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
