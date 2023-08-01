import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllData from "./allData.jsx";
import UsingAxios from "./usingAxios.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<AllData />} />
        <Route path="/axios" element={<UsingAxios />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
