export default function UserInfo({ user }) {
  //   const user = { firstName: "Ken", lastName: "Liu", email: "efliu@addu.edu.ph" };
  const firstLetter = user.firstName.split(" ")[0][0].toUpperCase();
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl"
        style={{ backgroundColor: "white", color: "#2F3590" }}
      >
        {firstLetter}
      </div>

      <div className="text-white">
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-sm">{user.email}</div>
      </div>
    </div>
  );
}
