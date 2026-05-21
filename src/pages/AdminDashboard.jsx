import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endOfDay, format, isValid, parse, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import DropDown from "#components/DropDown.jsx";
import { Button } from "#components/ui/button.jsx";
import { Calendar } from "#components/ui/calendar.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#components/ui/popover.jsx";

const departments = [
  "School of Arts and Sciences (SAS)",
  "School of Business and Governance (SBG)",
  "School of Engineering and Architecture (SEA)",
  "School of Education (SOE)",
  "School of Nursing (SON)",
  "College of Law",
];

const courses = [
  "Computer Science",
  "Information Systems",
  "Information Technology",
  "Psychology",
  "Political Science",
  "Accountancy",
  "Business Management",
  "Civil Engineering",
  "Mechanical Engineering",
  "Nursing",
  "Juris Doctor",
];

const sampleData = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: "Lucas Brandon P. Santos",
  email: "kirbyrojan@gmail.com",
  course: courses[i % courses.length],
  department: departments[i % departments.length],
  date: "May 6, 2026",
  status: i % 2 === 0 ? "Pending" : "Approved",
}));

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [rangeFilter, setRangeFilter] = useState("Last 7 days");
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleData.filter((row) => {
      if (statusFilter && row.status !== statusFilter) return false;
      if (courseFilter && row.course !== courseFilter) return false;
      if (departmentFilter && row.department !== departmentFilter) return false;
      if (
        q &&
        !(
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q)
        )
      )
        return false;
      const rowDate = parse(row.date, "MMM d, yyyy", new Date());
      if (dateRange?.from && isValid(rowDate)) {
        const from = startOfDay(dateRange.from);
        const to = dateRange.to ? endOfDay(dateRange.to) : null;
        const rowDay = startOfDay(rowDate);
        if (rowDay < from) return false;
        if (to && rowDay > to) return false;
      }
      return true;
    });
  }, [query, statusFilter, courseFilter, departmentFilter, dateRange]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen">
      <div className="md:min-w-xl px-4 md:px-24 lg:px-40">
        <h1
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ fontFamily: "'Trajan'" }}
        >
          Leave of Absence Submissions
        </h1>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-4">
          <div className="relative w-full md:w-1/3">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="m21 21-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search submission"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-9 py-2 text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-2 ml-auto items-center">
            <DropDown
              fieldName="Range"
              hideLabel
              required={false}
              value={rangeFilter}
              onValueChange={setRangeFilter}
              options={[
                { value: "Last 7 days", label: "Last 7 days" },
                { value: "Last 30 days", label: "Last 30 days" },
                { value: "Last 90 days", label: "Last 90 days" },
                { value: "All time", label: "All time" },
              ]}
              triggerClassName="!h-8 text-sm font-medium bg-gray-100 border-gray-300 text-gray-700"
              wrapperClassName=""
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 justify-start gap-2 border-gray-300 bg-gray-100 px-3 text-sm text-gray-700"
                >
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  {dateRange?.from ? (
                    dateRange?.to ? (
                      <span>
                        {format(dateRange.from, "MMM d, yyyy")} -{" "}
                        {format(dateRange.to, "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span>{format(dateRange.from, "MMM d, yyyy")}</span>
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <DropDown
              fieldName="Course"
              hideLabel
              required={false}
              value={courseFilter}
              onValueChange={setCourseFilter}
              options={courses.map((c) => ({ value: c, label: c }))}
              placeholder="Course"
              triggerClassName="!h-8 text-sm font-medium bg-gray-100 border-gray-300 text-gray-700"
              wrapperClassName=""
            />

            <DropDown
              fieldName="Department"
              hideLabel
              required={false}
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
              options={departments.map((d) => ({ value: d, label: d }))}
              placeholder="Department"
              triggerClassName="!h-8 text-sm font-medium bg-gray-100 border-gray-300 text-gray-700"
              wrapperClassName=""
            />

            <DropDown
              fieldName="Status"
              hideLabel
              required={false}
              value={statusFilter}
              onValueChange={setStatusFilter}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Approved", label: "Approved" },
              ]}
              placeholder="Status"
              triggerClassName="!h-8 text-sm font-medium bg-gray-100 border-gray-300 text-gray-700"
              wrapperClassName=""
            />

            <Button
              variant="outline"
              className="h-8 border-gray-300 bg-gray-100 px-3 text-sm text-gray-700"
              onClick={() => {
                setQuery("");
                setStatusFilter("");
                setCourseFilter("");
                setDepartmentFilter("");
                setRangeFilter("Last 7 days");
                setDateRange({ from: undefined, to: undefined });
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-white">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Course</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/${row.id}`)}
                >
                  <td className="p-3">{row.name}</td>
                  <td className="p-3 text-sm text-gray-600">{row.email}</td>
                  <td className="p-3">{row.department}</td>
                  <td className="p-3">{row.course}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-600">
            Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} -{" "}
            {Math.min(page * perPage, filtered.length)} of {filtered.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded-md"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ←
            </button>
            <div className="px-3 py-1 border rounded-md bg-white">{page}</div>
            <button
              className="px-3 py-1 border rounded-md"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
