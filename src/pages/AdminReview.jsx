import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "#components/ui/button.jsx";
import Inputs from "#components/Inputs.jsx";
import DropDown from "#components/DropDown.jsx";
import ConfirmationDialog from "#components/ConfirmationDialog.jsx";
import ProgressBar, { TEST_STATES } from "#components/ProgressBar.jsx";

export default function AdminReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const testStateKeys = Object.keys(TEST_STATES);
  const [currentTestStateIndex, setCurrentTestStateIndex] = useState(0);

  // Workflow state
  const [deptChair, setDeptChair] = useState(false);
  const [asstDean, setAsstDean] = useState(false);
  const [dean, setDean] = useState(false);
  const [registrar, setRegistrar] = useState(false);
  const [isRejected, setIsRejected] = useState(true);

  const stateMap = {
    deptChair: { value: deptChair, setter: setDeptChair },
    asstDean: { value: asstDean, setter: setAsstDean },
    dean: { value: dean, setter: setDean },
    registrar: { value: registrar, setter: setRegistrar },
  };

  const steps = [
    { id: "deptChair" },
    { id: "asstDean" },
    { id: "dean" },
    { id: "registrar" },
  ];

  // Determine current active step index
  const getCurrentStep = () => {
    if (isRejected) return -1;
    if (!deptChair) return 0;
    if (!asstDean) return 1;
    if (!dean) return 2;
    if (!registrar) return 3;
    return -1;
  };

  const currentStep = getCurrentStep();

  // Get workflow status message
  const getWorkflowStatus = () => {
    const stepLabels = ["Dept. Chair", "Asst. Dean", "Dean", "Registrar"];

    if (isRejected) {
      return "Request rejected. Workflow halted.";
    }

    if (currentStep === -1) {
      return "All approvals complete.";
    }

    const approvedSteps = [];
    if (deptChair) approvedSteps.push("Dept. Chair");
    if (asstDean) approvedSteps.push("Asst. Dean");
    if (dean) approvedSteps.push("Dean");
    if (registrar) approvedSteps.push("Registrar");

    const approvedText =
      approvedSteps.length > 0
        ? `Approved by: ${approvedSteps.join(", ")}. `
        : "";
    const nextStep = stepLabels[currentStep];

    return `${approvedText}Currently reviewing: ${nextStep}`;
  };

  // Handle approve action - ONLY called after user confirms on Submit page
  const handleApproveStep = () => {
    if (currentStep === -1 || isRejected) return;
    const stepId = steps[currentStep].id;
    stateMap[stepId].setter(true);
  };

  // Handle reject action - ONLY called after user confirms on Reject page
  const handleRejectStep = () => {
    if (currentStep === -1) return;
    setIsRejected(true);
  };

  // Handle approve action when confirmed
  const handleApproveConfirmed = () => {
    handleApproveStep();
    navigate("/admin");
  };

  // Handle reject action when confirmed
  const handleRejectConfirmed = () => {
    handleRejectStep();
    navigate("/admin");
  };

  const data = useMemo(
    () => ({
      email: "efliu@addu.edu.ph",
      currentCourse: "Bachelor of Science in Computer Science",
      idNumber: "1234567890",
      firstName: "Ej",
      lastName: "Liu",
      middleName: "Fusnigan",
      lastSchoolYear: "2026",
      lastSemester: "2nd",
      reason:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }),
    [id],
  );

  return (
    <div className="min-h-screen">
      <div className="md:min-w-xl px-4 md:px-24 lg:px-40">
        <ProgressBar
          state={
            testMode
              ? TEST_STATES[testStateKeys[currentTestStateIndex]]
              : {
                  deptChair,
                  asstDean,
                  dean,
                  registrar,
                  isRejected,
                }
          }
        />

        {testMode && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
            <div className="text-sm font-semibold text-blue-900">
              TEST MODE: {testStateKeys[currentTestStateIndex]}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentTestStateIndex(
                    (currentTestStateIndex - 1 + testStateKeys.length) %
                      testStateKeys.length,
                  )
                }
              >
                ← Prev
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentTestStateIndex(
                    (currentTestStateIndex + 1) % testStateKeys.length,
                  )
                }
              >
                Next →
              </Button>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={() => setTestMode(false)}
              >
                Exit Test Mode
              </Button>
            </div>
          </div>
        )}

        {!testMode && (
          <Button
            variant="outline"
            className="mt-4 text-xs"
            onClick={() => setTestMode(true)}
          >
            Enter Test Mode
          </Button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputs fieldName="Email" name="email" value={data.email} readOnly />
          <DropDown
            fieldName="Current Course"
            value={data.currentCourse}
            onValueChange={() => {}}
            disabled
            options={[{ value: data.currentCourse, label: data.currentCourse }]}
          />

          <Inputs
            fieldName="ID Number"
            name="idNumber"
            value={data.idNumber}
            readOnly
          />
          <Inputs
            fieldName="First Name"
            name="firstName"
            value={data.firstName}
            readOnly
          />
          <Inputs
            fieldName="Last Name"
            name="lastName"
            value={data.lastName}
            readOnly
          />
          <Inputs
            fieldName="Middle Name"
            name="middleName"
            value={data.middleName}
            readOnly
          />

          <Inputs
            fieldName="Last School Year Attended"
            name="lastSchoolYear"
            value={data.lastSchoolYear}
            readOnly
          />
          <DropDown
            fieldName="Last Semester Attended"
            value={data.lastSemester}
            onValueChange={() => {}}
            disabled
            options={[{ value: data.lastSemester, label: data.lastSemester }]}
          />
        </div>

        <div className="mt-4">
          <Inputs
            fieldName="Reason for LOA"
            name="reason"
            value={data.reason}
            isTextarea
            readOnly
          />
        </div>

        <div className="mt-6">
          <div className="pb-2 text-xs text-gray-600">
            Upload Supporting Files
          </div>
          <div className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-white px-4 py-10 text-sm text-gray-500">
            No file attached
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
            onClick={() => setIsRejectOpen(true)}
          >
            Reject
          </Button>
          <Button
            className="bg-[#0b1260] text-white hover:bg-[#0a104e]"
            onClick={() => setIsApproveOpen(true)}
          >
            Approve
          </Button>
        </div>

        <ConfirmationDialog
          isOpen={isRejectOpen}
          onClose={() => setIsRejectOpen(false)}
          onConfirm={handleRejectConfirmed}
          title="REJECT SUBMISSION"
          description="Are you sure you want to reject this form submission? This action cannot be undone."
          confirmText="Reject"
          confirmVariant="destructive"
          workflowStatus={getWorkflowStatus()}
        />

        <ConfirmationDialog
          isOpen={isApproveOpen}
          onClose={() => setIsApproveOpen(false)}
          onConfirm={handleApproveConfirmed}
          title="APPROVE SUBMISSION"
          description="Are you sure you want to approve this form submission? This action cannot be undone."
          confirmText="Approve"
          workflowStatus={getWorkflowStatus()}
        />
      </div>
    </div>
  );
}
