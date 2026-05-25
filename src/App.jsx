import "./App.css";
import { Toaster } from "sonner";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import LoaForms from "./pages/LoaForms";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReview from "./pages/AdminReview";
import Submit from "./pages/Submit";
import Reject from "./pages/Reject";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* WITH NAVBAR + FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/:id" element={<AdminReview />} />
          <Route path="/" element={<LoaForms />} />
          {<Route path="/Submit" element={<Submit />} />}
          {<Route path="/Reject" element={<Reject />} />}
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
