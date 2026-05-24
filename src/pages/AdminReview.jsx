import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "#components/ui/button.jsx";
import Inputs from "#components/Inputs.jsx";
import DropDown from "#components/DropDown.jsx";
import ConfirmationDialog from "#components/ConfirmationDialog.jsx";
import { getApprovalRoster } from "#lib/approvalWorkflow.js";

export default function AdminReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const data = useMemo(
    () => ({
      department: "School of Arts and Sciences (SAS)",
      email: "efliu@addu.edu.ph",
      currentCourse: "Bachelor of Science in Computer Science",
      program: "Computer Science",
      idNumber: "1234567890",
      firstName: "Ej",
      lastName: "Liu",
      middleName: "Fusnigan",
      lastSchoolYear: "2026",
      lastSemester: "2nd",
      reason:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      currentApprovalStep: 2,
    }),
    [id],
  );

  const activeStep = data.currentApprovalStep;
  const approvalChain = useMemo(
    () =>
      getApprovalRoster({
        department: data.department,
        course: data.program,
      }),
    [data.department, data.program],
  );

  return (
    <div className="min-h-screen">
      <div className="md:min-w-xl px-4 md:px-24 lg:px-40">
        <div className="py-6">
          <div className="relative mx-auto w-full max-w-5xl px-3 pt-2">
            <div className="absolute left-3 right-3 top-5 h-0.5 rounded-full bg-[#0b1260]" />
            <div className="absolute left-3 top-5 h-0.5 w-[12.5%] rounded-full bg-green-500" />

            <div className="relative grid grid-cols-4 items-start gap-0">
              {approvalChain.map((step, index) => {
                const isComplete = index < activeStep - 1;
                const isCurrent = index === activeStep - 1;

                return (
                  <div
                    className="flex flex-col items-center"
                    key={step.key}
                  >
                    <div
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                        isComplete
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "border-[3px] border-white bg-[#0b1260] text-white"
                            : "bg-[#0b1260] text-white"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="mt-3 text-center text-sm text-[#0b1260]">
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
          onConfirm={() => navigate("/Reject")}
          title="REJECT SUBMISSION"
          description="Are you sure you want to reject this form submission? This action cannot be undone."
          confirmText="Reject"
          confirmVariant="destructive"
        />

        <ConfirmationDialog
          isOpen={isApproveOpen}
          onClose={() => setIsApproveOpen(false)}
          onConfirm={() => navigate("/Submit")}
          title="APPROVE SUBMISSION"
          description="Are you sure you want to approve this form submission? This action cannot be undone."
          confirmText="Approve"
        />
      </div>
    </div>
  );
}
