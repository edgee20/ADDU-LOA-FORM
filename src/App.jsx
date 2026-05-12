import { Button } from "#components/ui/button.jsx";
import "./App.css";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import Test from "./pages/Test";
import LoaForms from "./pages/LoaForms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* WITH NAVBAR + FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Test />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>

        {/* WITHOUT NAVBAR + FOOTER */}
        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<Auth />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
