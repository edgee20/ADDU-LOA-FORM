import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
