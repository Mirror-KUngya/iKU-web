import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage, TestPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
