import { Input } from "#components/ui/input";

export default function Inputs({
  fieldName,
  subFieldName,
  placeholder,
  className,
  isTextarea = false,
}) {
  return (
    <div className={className}>
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

      {/* Input or Textarea */}
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          rows={5}
          className="w-full min-w-0 rounded-lg border border-black bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-black focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 resize-none"
        />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </div>
  );
}
