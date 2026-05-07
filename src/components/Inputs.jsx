import { Input } from "#components/ui/input";

export default function Inputs({ fieldName, subFieldName, placeholder }) {
  return (
    <div>
      {/* Field Name */}
      <div className="pb-2">
        <h1 className="text-sm ">
          {fieldName}
          {subFieldName && (
            <span className="text-[10px] ml-2">{subFieldName}</span>
          )}
          <span className="text-[#E9222E] ml-2">*</span>
        </h1>
      </div>

      {/* Input */}
      <Input placeholder={placeholder} />
    </div>
  );
}
