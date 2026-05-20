import { Field } from "#components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";
export default function DropDown({
  fieldName,
  subFieldName,
  options,
  placeholder,
  value,
  onValueChange,
  error,
}) {
  const defaultOptions = [
    {
      value: "Bachelor of Science in Computer Science",
      label: "Bachelor of Science in Computer Science",
    },
    {
      value: "Bachelor of Science in Information Technology",
      label: "Bachelor of Science in Information Technology",
    },
    {
      value: "Bachelor of Science in Information Systems",
      label: "Bachelor of Science in Information Systems",
    },
  ];

  const items = options || defaultOptions;

  return (
    <div className="dropdown">
      <Field data-invalid={Boolean(error)}>
        <div className="">
          <h1 className="text-sm ">
            {fieldName}
            {subFieldName && (
              <span className="text-[10px] ml-2">{subFieldName}</span>
            )}
            <span className="text-[#E9222E] ml-2">*</span>
          </h1>
        </div>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            id={`select-${fieldName.toLowerCase().replace(/\s+/g, "-")}`}
            aria-invalid={Boolean(error)}
            className={`!h-10 ${
              error
                ? "border-red-500 focus-visible:ring-3 focus-visible:ring-red-500/30"
                : "border-black"
            }`}
          >
            <SelectValue
              placeholder={placeholder || `Select a ${fieldName.toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            {items.map((item, index) => {
              return (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {error && <p className=" text-xs text-red-600">{error}</p>}
      </Field>
    </div>
  );
}
