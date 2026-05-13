import { User } from "lucide-react";
import adduLogo from "../assets/addu-white.png";
import UserInfo from "./UserInfo";

export default function Navbar({ user }) {
  return (
    <header
      className="flex justify-between items-center px-20 py-6 shadow-md"
      style={{ backgroundColor: "#2F3590" }}
    >
      <div className="flex items-center gap-4">
        <img src={adduLogo} alt="ADDU Logo" className="h-22 w-22" />
        <div
          className="text-white"
          style={{ fontFamily: "'Trajan'", fontWeight: 300 }}
        >
          <div className="text-4xl">ATENEO DE DAVAO UNIVERSITY</div>
          <div className="text-[15px]">STRONG IN FAITH THAT DOES JUSTICE </div>
        </div>
      </div>

      <UserInfo user={user} />
    </header>
  );
}
