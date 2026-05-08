import adduLogo from "../assets/addu-white.png";

export default function Navbar() {
  const userName = "Korem Ipsum Dolor";
  const userEmail = "email@addu.edu.ph";
  const firstLetter = userName.split(" ")[0][0].toUpperCase();

  return (
    <header
      className="flex justify-between items-center px-20 py-6 shadow-md" style={{ backgroundColor: "#2F3590" }}
    >
      <div className="flex items-center gap-4">
        <img src={adduLogo} alt="ADDU Logo" className="h-22 w-22" />
        <div className="text-white" style={{ fontFamily: "'Trajan Pro'", fontWeight: 300 }}>
          <div className="text-4xl">ATENEO DE DAVAO UNIVERSITY</div>
          <div className="text-[15px]">STRONG IN FAITH THAT DOES JUSTICE </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl" style={{ backgroundColor: "white", color: "#2F3590" }}
        >
          {firstLetter}
        </div>

        <div className="text-white">
          <div className="text-lg font-semibold">{userName}</div>
          <div className="text-sm">{userEmail}</div>
        </div>
      </div>
    </header>
  );
}
