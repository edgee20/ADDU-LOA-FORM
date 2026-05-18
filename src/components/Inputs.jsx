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
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={5}
          className={`w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 resize-none ${
            error
              ? "border-red-500 focus-visible:ring-red-500/30"
              : "border-black focus-visible:border-black focus-visible:ring-ring/50"
          }`}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <Input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={
            error ? "border-red-500 focus-visible:ring-red-500/30" : ""
          }
          aria-invalid={Boolean(error)}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
