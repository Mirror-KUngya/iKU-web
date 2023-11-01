import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./pages";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
