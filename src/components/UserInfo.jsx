import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export default function UserInfo({ user }) {
  //   const user = { firstName: "Ken", lastName: "Liu", email: "efliu@addu.edu.ph" };
  const firstLetter = user.firstName.split(" ")[0][0].toUpperCase();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    // Example: localStorage.removeItem("authToken");
    // Example: navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl"
        style={{ backgroundColor: "white", color: "#2F3590" }}
      >
        {firstLetter}
      </div>

      <div className="text-white hidden md:block">
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-sm">{user.email}</div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-white hover:text-gray-200 transition-colors">
            <ChevronDown size={20} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
        
      </DropdownMenu>
    </div>
  );
}
