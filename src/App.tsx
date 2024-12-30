import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CreatePredictionPage } from "./pages/createPredictionPage";
import { HomePage } from "./pages/HomePage";
import { MyPredictionsPage } from "./pages/MyPredictionPage";
import { APP_ROUTES } from "./constants/appRoute";
import AllPredictionsPage from "./pages/AllPredictionsPage";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path={APP_ROUTES.HOME} element={<HomePage />} />
            <Route
              path={APP_ROUTES.CREATE_PREDICTION}
              element={<CreatePredictionPage />}
            />
            <Route
              path={APP_ROUTES.PREDICTIONS}
              element={<AllPredictionsPage />}
            />
            <Route path={APP_ROUTES.PROFILE} element={<MyPredictionsPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
