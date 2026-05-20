import { useEffect, useMemo, useState } from "react";
import { Button } from "#components/ui/button.jsx";
import "../App.css";
import Inputs from "#components/Inputs.jsx";
import DropDown from "#components/DropDown";
import ConfirmationDialog from "#components/ConfirmationDialog.jsx";

const initialFormValues = {
  email: "",
  currentCourse: "",
  idNumber: "",
  firstName: "",
  lastName: "",
  middleName: "",
  lastSchoolYear: "",
  lastSemester: "",
  reason: "",
};
import DragFile from "#components/DragFile.jsx";

function LoaForm() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isClearOpen, setIsClearOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesError, setCoursesError] = useState("");
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleSelectChange = (field) => (value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setIsCoursesLoading(true);
      setCoursesError("");

      try {
        const response = await fetch(
          "https://account-uan.addu.edu.ph/api/==QN9lo918JcjDkrnhge93crDhyA2UuwVjGMOZcsnV==/addu-programs-offered",
        );

        if (!response.ok) {
          throw new Error("Failed to load courses.");
        }

        const data = await response.json();
        const nextCourses = Array.isArray(data)
          ? data.map((course) => ({
              value: course.CODE,
              label: course.DESCRIPTION,
            }))
          : [];

        if (isMounted) {
          setCourses(nextCourses);
        }
      } catch (error) {
        if (isMounted) {
          setCoursesError(
            error instanceof Error ? error.message : "Unable to load courses.",
          );
        }
      } finally {
        if (isMounted) {
          setIsCoursesLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!formValues.currentCourse) {
      nextErrors.currentCourse = "Current course is required.";
    }

    if (!/^\d{6}$/.test(formValues.idNumber)) {
      nextErrors.idNumber = "ID Number must be a 6-digit number.";
    }

    if (!formValues.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formValues.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formValues.middleName.trim()) {
      nextErrors.middleName = "Middle name is required.";
    }

    if (!/^\d{4}$/.test(formValues.lastSchoolYear)) {
      nextErrors.lastSchoolYear = "Enter a 4-digit year.";
    } else if (Number(formValues.lastSchoolYear) > currentYear) {
      nextErrors.lastSchoolYear = "Year must not exceed the current year.";
    }

    if (!formValues.lastSemester) {
      nextErrors.lastSemester = "Last semester is required.";
    }

    if (!formValues.reason.trim()) {
      nextErrors.reason = "Reason for LOA is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleClear = () => {
    setFormValues(initialFormValues);
    setErrors({});
  };

  const handleSubmit = () => {
    // Replace with real submit logic.
    console.log("Form submitted!", formValues);
  };

  const handleOpenSubmit = () => {
    if (validateForm()) {
      setIsSubmitOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow px-5 py-15">
        <div className="md:min-w-xl px-4 md:px-24 lg:px-40">
          <h1
            className="text-2xl md:text-3xl font-bold mb-6"
            style={{ fontFamily: "'Trajan'" }}
          >
            Leave of Absence Form
          </h1>

          {/* Grid Layout for Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ... form fields ... */}
            {/* Row 1: Email and Current Course */}
            <div className="md:col-span-1">
              <Inputs
                fieldName={"Email"}
                subFieldName={"Ex. efliu@addu.edu.ph"}
                name="email"
                value={formValues.email}
                onChange={handleInputChange("email")}
                error={errors.email}
              />
            </div>
            <div className="md:col-span-1">
              <DropDown
                fieldName={"Current Course"}
                value={formValues.currentCourse}
                onValueChange={handleSelectChange("currentCourse")}
                error={errors.currentCourse || coursesError}
                placeholder={
                  isCoursesLoading ? "Loading courses..." : "Select a course"
                }
                options={courses}
              />
            </div>

            {/* Row 2: ID, First, Last, Middle Name */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Inputs
                fieldName={"ID Number"}
                subFieldName={"Ex. 148456"}
                name="idNumber"
                value={formValues.idNumber}
                onChange={handleInputChange("idNumber")}
                error={errors.idNumber}
              />
              <Inputs
                fieldName={"First Name"}
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange("firstName")}
                error={errors.firstName}
              />
              <Inputs
                fieldName={"Last Name"}
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange("lastName")}
                error={errors.lastName}
              />
              <Inputs
                fieldName={"Middle Name"}
                name="middleName"
                value={formValues.middleName}
                onChange={handleInputChange("middleName")}
                error={errors.middleName}
              />
            </div>

            {/* Row 3: School Year and Semester */}
            <div className="md:col-span-1">
              <Inputs
                fieldName={"Last School Year Attended"}
                subFieldName={"Ex. 2026"}
                name="lastSchoolYear"
                value={formValues.lastSchoolYear}
                onChange={handleInputChange("lastSchoolYear")}
                error={errors.lastSchoolYear}
              />
            </div>
            <div className="md:col-span-1">
              <DropDown
                fieldName={"Last Semester Attended"}
                placeholder="Select a semester"
                value={formValues.lastSemester}
                onValueChange={handleSelectChange("lastSemester")}
                error={errors.lastSemester}
                options={[
                  { value: "First Semester", label: "First Semester" },
                  { value: "Second Semester", label: "Second Semester" },
                  { value: "Summer", label: "Summer" },
                ]}
              />
            </div>

            {/* Row 4: Reason for LOA */}
            <div className="md:col-span-2">
              <Inputs
                fieldName={"Reason for LOA"}
                name="reason"
                value={formValues.reason}
                onChange={handleInputChange("reason")}
                error={errors.reason}
                isTextarea={true}
              />
            </div>
          </div>

          {/* Row 5 - File Upload (Full Width) */}
          <div className="pt-6 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="pb-2">
              <h2 className="text-sm">Upload Supporting Documents</h2>
            </div>
            <DragFile maxFiles={5} maxSize={50 * 1024 * 1024} />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              className="w-26 h-9"
              onClick={() => setIsClearOpen(true)}
            >
              Clear
            </Button>
            <Button
              variant="default"
              style={{ backgroundColor: "#2F3590" }}
              className="text-white w-41 h-10"
              onClick={handleOpenSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </main>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={isClearOpen}
        onClose={() => setIsClearOpen(false)}
        onConfirm={handleClear}
        title="CLEAR FORM"
        description="Are you sure you want to clear all fields in this form? This action cannot be undone."
        confirmText="Clear"
        confirmVariant="destructive"
      />

      <ConfirmationDialog
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onConfirm={handleSubmit}
        title="SUBMIT FORM"
        description="Are you sure you want to submit this form? Make sure all entries are correct."
        confirmText="Submit"
      />
    </div>
  );
}

export default LoaForm;
