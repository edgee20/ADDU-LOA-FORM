import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const user = {
    firstName: "Ej",
    lastName: "Liu",
    email: "efliu@addu.edu.ph",
  };

  return (
    <div>
      <Navbar user={user} />

      <main className="min-h-screen p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
