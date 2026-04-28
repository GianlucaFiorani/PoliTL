import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Jumpshot from "./components/Jumpshot";
import Classics from "./components/Classics";
import Achievement from "./components/Achievement";
import { AchievementProvider } from "./components/AchievementContex";

function App() {
  return (
    <AchievementProvider>
      <BrowserRouter>
        <Achievement />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jumpshot" element={<Jumpshot />} />
          <Route path="/classics" element={<Classics />} />
        </Routes>
      </BrowserRouter>
    </AchievementProvider>
  );
}

export default App;
