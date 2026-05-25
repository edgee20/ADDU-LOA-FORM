import { Input } from "#components/ui/input";

export default function Inputs({
  fieldName,
  subFieldName,
  placeholder,
  className,
  name,
  value,
  onChange,
  error,
  isTextarea = false,
  readOnly = false,
}) {
  const readOnlyClass = readOnly
    ? "bg-gray-100 text-gray-500 border-gray-300 pointer-events-none"
    : "";
  return (
    <div className={className}>
      {/* Field Name */}
      <div className="pb-2">
        <h1 className={`text-sm ${error ? "text-red-600" : ""}`}>
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
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          rows={5}
          className={`w-full min-w-0 rounded-lg border px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 resize-none ${
            error
              ? "border-red-500 focus-visible:ring-red-500/30 bg-transparent"
              : readOnly
                ? readOnlyClass
                : "bg-transparent border-black focus-visible:border-black focus-visible:ring-ring/50"
          }`}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={
            error
              ? "border-red-500 focus-visible:ring-red-500/30"
              : readOnlyClass
          }
          aria-invalid={Boolean(error)}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
