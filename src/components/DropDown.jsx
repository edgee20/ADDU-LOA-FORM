import { Button } from "#components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field"
import { Input } from "#components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select"
export default function DropDown({ fieldName, subFieldName }) {
    const dummyData = [{course: "Bachelor of Science in Computer Science"}, {course: "Bachelor of Science in Information Technology"}, {course: "Bachelor of Science in Information Systems"}]
    
    return (
        <div className="dropdown">
            <Field>
            <div className="pb-2">
        <h1 className="text-sm ">
          {fieldName}
          {subFieldName && (
            <span className="text-[10px] ml-2">{subFieldName}</span>
          )}
          <span className="text-[#E9222E] ml-2">*</span>
        </h1>
      </div>
            <Select defaultValue="">
              <SelectTrigger id="form-country" className="border-black">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {dummyData.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.course}>
                      {item.course}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
</Field>
        </div>
    );
}
