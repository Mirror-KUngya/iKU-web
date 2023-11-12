import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChangePasswordPage,
  FindIdPage,
  LoginPage,
  MainPage,
  MissionClapPage,
  MissionSidePage,
  MissionSmilePage,
  WordChainPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mission/clap" element={<MissionClapPage />} />
        <Route path="/mission/side" element={<MissionSidePage />} />
        <Route path="/mission/smile" element={<MissionSmilePage />} />
        <Route path="/mission/wordChain" element={<WordChainPage />} />
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/changePW" element={<ChangePasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
