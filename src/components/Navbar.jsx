import adduLogo from "../assets/addu-white.png";
import UserInfo from "./UserInfo";
import UserProfile from "./UserProfile";

export default function Navbar({ user }) {
  return (
    <header
      className="flex justify-between items-center px-12 md:px-16 lg:px-20 py-6 shadow-md"
      style={{ backgroundColor: "#2F3590" }}
    >
      <div className="flex items-center gap-4">
        <img
          src={adduLogo}
          alt="ADDU Logo"
          className="w-18 h-18 md:h-20 md:w-20 lg:h-22 lg:w-22"
        />
        <div
          className="text-white none hidden lg:block"
          style={{ fontFamily: "'Trajan'" }}
        >
          <div className="text-3xl">ATENEO DE DAVAO UNIVERSITY</div>
          <div className="text-[15px]">STRONG IN FAITH THAT DOES JUSTICE </div>
        </div>
      </div>

      <UserProfile user={user} />
    </header>
  );
}
