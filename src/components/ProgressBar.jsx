const STEPS = [
  { id: "deptChair", label: "Dept. Chair" },
  { id: "asstDean", label: "Asst. Dean" },
  { id: "dean", label: "Dean" },
  { id: "registrar", label: "Registrar" },
];

export default function ProgressBar({ state }) {
  // Determine current active step index
  const getCurrentStep = () => {
    if (!state.deptChair) return 0;
    if (!state.asstDean) return 1;
    if (!state.dean) return 2;
    if (!state.registrar) return 3;
    return -1;
  };

  const currentStep = getCurrentStep();

  // Get step status: 'approved', 'active', 'rejected', or 'pending'
  const getStepStatus = (stepIndex) => {
    if (state.isRejected && currentStep === stepIndex) {
      return "rejected";
    }
    if (currentStep === stepIndex) {
      return "active";
    }
    if (currentStep === -1 && !state.isRejected) {
      return "approved";
    }
    if (stepIndex < currentStep) {
      return "approved";
    }
    return "pending";
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center gap-4">
        {STEPS.map((step, index) => {
          const status = getStepStatus(index);
          const bgColor =
            status === "approved"
              ? "bg-green-500"
              : status === "active"
                ? "bg-blue-500"
                : status === "rejected"
                  ? "bg-red-500"
                  : "bg-gray-300";
          const textColor =
            status === "pending" ? "text-gray-700" : "text-white";

          return (
            <div className="flex items-center" key={step.id}>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${bgColor} ${textColor}`}
              >
                {index + 1}
              </div>
              <div className="ml-2 text-xs text-gray-600 whitespace-nowrap">
                {step.label}
              </div>
              {index !== STEPS.length - 1 && (
                <div
                  className={`mx-3 h-[2px] w-12 transition-all duration-300 ${
                    status === "approved"
                      ? "bg-green-500"
                      : status === "rejected"
                        ? "bg-red-500"
                        : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Test states for design validation
export const TEST_STATES = {
  pending: {
    deptChair: false,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step1Active: {
    deptChair: false,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step1Approved: {
    deptChair: true,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step2Active: {
    deptChair: true,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step2Approved: {
    deptChair: true,
    asstDean: true,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step3Active: {
    deptChair: true,
    asstDean: true,
    dean: false,
    registrar: false,
    isRejected: false,
  },
  step3Approved: {
    deptChair: true,
    asstDean: true,
    dean: true,
    registrar: false,
    isRejected: false,
  },
  step4Active: {
    deptChair: true,
    asstDean: true,
    dean: true,
    registrar: false,
    isRejected: false,
  },
  allApproved: {
    deptChair: true,
    asstDean: true,
    dean: true,
    registrar: true,
    isRejected: false,
  },
  rejectedAtStep1: {
    deptChair: false,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: true,
  },
  rejectedAtStep2: {
    deptChair: true,
    asstDean: false,
    dean: false,
    registrar: false,
    isRejected: true,
  },
  rejectedAtStep3: {
    deptChair: true,
    asstDean: true,
    dean: false,
    registrar: false,
    isRejected: true,
  },
  rejectedAtStep4: {
    deptChair: true,
    asstDean: true,
    dean: true,
    registrar: false,
    isRejected: true,
  },
};
