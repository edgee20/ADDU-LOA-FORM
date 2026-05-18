import { Button } from "#components/ui/button.jsx";
import "../App.css";
import Navbar from "#components/Navbar";
import Inputs from "#components/Inputs.jsx";
import Footer from "#components/Footer";
import DatePicker from "#components/DatePicker.jsx";

function ReinForm() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow px-5 py-15">
        <div className="min-w-xl pl-40 pr-40">
          <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "Trajan Pro" }}>REINSTATEMENT FORM</h1>

          {/* Grid Layout for Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            {/* Row 1 */}
            <div>
              <Inputs
                fieldName={"Email"}
                subFieldName={"Ex. example@addu.edu.ph"}
                placeholder={"Enter email here"}
              ></Inputs>
            </div>
            <div>
              <Inputs
                fieldName={"ID Number"}
                subFieldName={"Ex. 148456"}
                placeholder={"Enter ID number here"}
              ></Inputs>
            </div>

            {/* Row 2 */}
            <div>
              <Inputs
                fieldName={"Name"}
                placeholder={"Enter Name here"}
              ></Inputs>
            </div>
            <div>
              <Inputs
                fieldName={"Current Course"}
                subFieldName={"BS Tourism"}
                placeholder={"Select a course"}
                isSelect={true}
                options={[
                  "BS Tourism",
                  "BS Accountancy",
                  "BS Business Administration",
                  "BS Information Technology",
                  "BS Nursing",
                ]}
              ></Inputs>
            </div>

            {/* Row 3 */}
            <div>
              <Inputs
                fieldName={"Last Semester Attended"}
                subFieldName={"Ex. 1st & 2026"}
                placeholder={"Enter Last Semester Attended"}
              ></Inputs>
            </div>

            <div>
              <DatePicker 
                fieldName={"Date of LOA"}
                subFieldName={"Select date"}
              ></DatePicker>
            </div>

            {/* Row 4 - Reason for LOA (Full Width) */}
            <div className="col-span-2">
              <Inputs
                fieldName={"Reason for LOA"}
                placeholder={"Enter Reason for LOA here"}
                isTextarea={true}
              ></Inputs>
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

export default ReinForm;