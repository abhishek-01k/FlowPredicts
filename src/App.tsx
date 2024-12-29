import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CreatePredictionPage } from "./pages/createPredictionPage";
import { HomePage } from "./pages/HomePage";
import { MyPredictionsPage } from "./pages/MyPredictionPage";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePredictionPage />} />
            <Route path="/my-predictions" element={<MyPredictionsPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
