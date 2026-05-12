import { Button } from "#components/ui/button.jsx";
import "../App.css";
import Inputs from "#components/Inputs.jsx";
import DropDown from "#components/DropDown";

function LoaForm() {
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
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            {/* Row 1 */}
            <div>
              <Inputs
                fieldName={"Email"}
                subFieldName={"Ex. efliu@addu.edu.ph"}
              ></Inputs>
            </div>
            <div>
              <Inputs
                fieldName={"ID Number"}
                subFieldName={"Ex. 148456"}
              ></Inputs>
            </div>

            {/* Row 2 */}
            <div>
              <Inputs fieldName={"Name"}></Inputs>
            </div>
            <div>
              <Inputs
                fieldName={"Last Semester Attended"}
                subFieldName={"Ex. 1st & 2026"}
              ></Inputs>
            </div>

            {/* Row 3 - Current Course (spans left side or full) */}
            <div>
              <DropDown fieldName={"Current Course"} />
            </div>

            {/* Row 4 - Reason for LOA (Full Width) */}
            <div className="col-span-2">
              <Inputs fieldName={"Reason for LOA"} isTextarea={true}></Inputs>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" className="w-26 h-9">
              Clear
            </Button>
            <Button
              variant="default"
              style={{ backgroundColor: "#2F3590" }}
              className="text-white w-41 h-10"
            >
              Submit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoaForm;
