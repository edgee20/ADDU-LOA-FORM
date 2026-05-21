import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "#components/ui/button.jsx";
import Inputs from "#components/Inputs.jsx";
import DropDown from "#components/DropDown.jsx";
import ConfirmationDialog from "#components/ConfirmationDialog.jsx";

const steps = ["Dept. Chair", "Asst. Dean", "Dean", "Registrar"];

export default function AdminReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
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

  const activeStep = 1;

  return (
    <div className="min-h-screen">
      <div className="md:min-w-xl px-4 md:px-24 lg:px-40">
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const isActive = index === activeStep - 1;
              const isComplete = index < activeStep - 1;
              return (
                <div className="flex items-center" key={step}>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-green-500 text-white"
                        : isComplete
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-2 text-xs text-gray-600 whitespace-nowrap">
                    {step}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="mx-3 h-[2px] w-12 bg-gray-300" />
                  )}
                </div>
              );
            })}
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
