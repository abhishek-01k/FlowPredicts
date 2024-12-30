import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Provider from "./Provider.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { GlobalContextProvider } from "./context/GlobalContext.tsx";
import { ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="prediction-market-theme">
      <Provider>
        <GlobalContextProvider>
          <App />
          <ToastContainer />
        </GlobalContextProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
