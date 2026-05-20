import { useState } from "react";

const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const initials = user.firstName.split(" ")[0][0].toUpperCase();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const userName = `${user.firstName} ${user.lastName}`;
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    handleClose();
  };

  return (
    <div className="relative ml-auto">
      <button
        type="button"
        className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs tracking-wide text-white transition hover:bg-white/20"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[14px] font-semibold text-[#1b1b54] shrink-0">
          {initials}
        </span>
        {/* Show user info on all screens when not in dropdown - visible on md+ */}
        <div className="hidden md:flex md:flex-col text-left min-w-0">
          <span className="text-sm font-semibold text-white truncate">
            {userName}
          </span>
          <span className="text-[11px] text-white/70 truncate">
            {user.email}
          </span>
        </div>
        {/* Dropdown arrow - show on all screens */}
        <svg
          className={`h-4 w-4 text-white/70 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.7a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu - Only show user info on small screens */}
      <div
        className={`absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-white/10 bg-white p-4 text-[#1b1b54] shadow-xl transition ${
          isOpen
            ? "opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-95"
        }`}
        role="menu"
        aria-label="User menu"
      >
        {/* User Info Section - Only visible on small screens (md and below) */}
        <div className="lg:hidden flex items-center gap-4 rounded-xl bg-[#f1f2ff] px-4 py-3">
          <div className="flex flex-col min-w-0">
            <span className="text-base font-semibold truncate">{userName}</span>
            <span className="text-[13px] text-[#1b1b54]/70 truncate">
              {user.email}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          className="mt-4 lg:mt-0 flex w-full items-center justify-between rounded-xl border border-[#1b1b54]/10 px-4 py-3 text-base font-semibold transition hover:bg-[#1b1b54]/10"
          onClick={handleLogout}
        >
          Logout
          <svg
            className="h-5 w-5 text-[#1b1b54]/70 hidden md:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
