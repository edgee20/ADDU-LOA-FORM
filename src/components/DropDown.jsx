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
  disabled = false,
  hideLabel = false,
  required = true,
  triggerClassName = "",
  wrapperClassName = "dropdown",
}) {
  const disabledClass = disabled
    ? "bg-gray-100 text-gray-900 border-gray-300 pointer-events-none disabled:opacity-100"
    : "";
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
    <div className={wrapperClassName}>
      <Field data-invalid={Boolean(error)}>
        {!hideLabel && (
          <div>
            <h1 className="text-sm">
              {fieldName}
              {subFieldName && (
                <span className="text-[10px] ml-2">{subFieldName}</span>
              )}
              {required && <span className="text-[#E9222E] ml-2">*</span>}
            </h1>
          </div>
        )}
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            id={`select-${fieldName.toLowerCase().replace(/\s+/g, "-")}`}
            aria-invalid={Boolean(error)}
            className={`!h-10 ${
              error
                ? "border-red-500 focus-visible:ring-3 focus-visible:ring-red-500/30"
                : "border-black"
            } ${disabledClass} ${triggerClassName}`}
          >
            <SelectValue
              placeholder={placeholder || `Select a ${fieldName.toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            {items.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </Field>
    </div>
  );
}
