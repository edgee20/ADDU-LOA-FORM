export const approvalStages = [
  { key: "deptChair", label: "Dept. Chair" },
  { key: "asstDean", label: "Asst. Dean" },
  { key: "dean", label: "Dean" },
  { key: "registrar", label: "Registrar" },
];

const approvalRoster = {
  "School of Arts and Sciences (SAS)": {
    default: {
      deptChair: "Dr. Maria Lourdes D. Reyes",
      asstDean: "Dr. Jonathan P. Almeda",
      dean: "Dr. Angelica V. Lim",
      registrar: "Ms. Patricia C. Bautista",
    },
    courses: {
      "Computer Science": {
        deptChair: "Dr. Maria Lourdes D. Reyes",
        asstDean: "Dr. Jonathan P. Almeda",
        dean: "Dr. Angelica V. Lim",
        registrar: "Ms. Patricia C. Bautista",
      },
      "Information Systems": {
        deptChair: "Dr. Maria Lourdes D. Reyes",
        asstDean: "Dr. Jonathan P. Almeda",
        dean: "Dr. Angelica V. Lim",
        registrar: "Ms. Patricia C. Bautista",
      },
    },
  },
  "School of Business and Governance (SBG)": {
    default: {
      deptChair: "Mr. Roberto M. Tan",
      asstDean: "Dr. Cecilia P. Navarro",
      dean: "Dr. Ricardo S. Mendoza",
      registrar: "Ms. Joana A. Cortez",
    },
    courses: {
      Accountancy: {
        deptChair: "Mr. Roberto M. Tan",
        asstDean: "Dr. Cecilia P. Navarro",
        dean: "Dr. Ricardo S. Mendoza",
        registrar: "Ms. Joana A. Cortez",
      },
      "Business Management": {
        deptChair: "Mr. Roberto M. Tan",
        asstDean: "Dr. Cecilia P. Navarro",
        dean: "Dr. Ricardo S. Mendoza",
        registrar: "Ms. Joana A. Cortez",
      },
    },
  },
  "School of Engineering and Architecture (SEA)": {
    default: {
      deptChair: "Engr. Samuel B. Cruz",
      asstDean: "Engr. Theresa M. Diaz",
      dean: "Dr. Ramon C. Villanueva",
      registrar: "Ms. Liza G. Fernandez",
    },
    courses: {
      "Civil Engineering": {
        deptChair: "Engr. Samuel B. Cruz",
        asstDean: "Engr. Theresa M. Diaz",
        dean: "Dr. Ramon C. Villanueva",
        registrar: "Ms. Liza G. Fernandez",
      },
      "Mechanical Engineering": {
        deptChair: "Engr. Samuel B. Cruz",
        asstDean: "Engr. Theresa M. Diaz",
        dean: "Dr. Ramon C. Villanueva",
        registrar: "Ms. Liza G. Fernandez",
      },
    },
  },
  "School of Education (SOE)": {
    default: {
      deptChair: "Dr. Evelyn T. Garcia",
      asstDean: "Dr. Marissa Q. Lopez",
      dean: "Dr. Ernesto J. Ramos",
      registrar: "Ms. Karen P. Dizon",
    },
    courses: {
      Psychology: {
        deptChair: "Dr. Evelyn T. Garcia",
        asstDean: "Dr. Marissa Q. Lopez",
        dean: "Dr. Ernesto J. Ramos",
        registrar: "Ms. Karen P. Dizon",
      },
    },
  },
  "School of Nursing (SON)": {
    default: {
      deptChair: "Dr. Felisa N. Mercado",
      asstDean: "Dr. Michael T. Ortiz",
      dean: "Dr. Teresa A. Singson",
      registrar: "Ms. Monica L. Perez",
    },
    courses: {
      Nursing: {
        deptChair: "Dr. Felisa N. Mercado",
        asstDean: "Dr. Michael T. Ortiz",
        dean: "Dr. Teresa A. Singson",
        registrar: "Ms. Monica L. Perez",
      },
    },
  },
  "College of Law": {
    default: {
      deptChair: "Atty. Eduardo R. Santos",
      asstDean: "Atty. Pauline D. Lopez",
      dean: "Atty. Victor S. Cruz",
      registrar: "Ms. Hazel M. Flores",
    },
    courses: {
      "Juris Doctor": {
        deptChair: "Atty. Eduardo R. Santos",
        asstDean: "Atty. Pauline D. Lopez",
        dean: "Atty. Victor S. Cruz",
        registrar: "Ms. Hazel M. Flores",
      },
    },
  },
};

export function getApprovalRoster({ department, course }) {
  const departmentRoster = approvalRoster[department] ?? {
    default: {
      deptChair: "Dept. Chair",
      asstDean: "Asst. Dean",
      dean: "Dean",
      registrar: "Registrar",
    },
    courses: {},
  };

  const courseRoster = departmentRoster.courses?.[course] ?? {};

  return approvalStages.map((stage) => ({
    ...stage,
    name:
      courseRoster[stage.key] ?? departmentRoster.default?.[stage.key] ?? stage.label,
  }));
}
