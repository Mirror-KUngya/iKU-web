import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage, SocketPage, SpeechPage, TestPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/speech" element={<SpeechPage />} />
        <Route path="/socket" element={<SocketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
