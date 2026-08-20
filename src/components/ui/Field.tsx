import type { ReactNode } from "react";

const control =
  "w-full border border-gold-400/18 bg-navy-950/60 px-4 py-3.5 text-sm text-ivory " +
  "placeholder:text-slate-muted/70 transition-colors duration-300 " +
  "focus:border-gold-400/60 focus:outline-none";

export function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2.5 block text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
        {label}
        {required && <span className="ml-1 text-gold-400">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={control}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  rows = 4,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2.5 block text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
        {label}
      </span>
      <textarea name={name} rows={rows} placeholder={placeholder} className={control} />
    </label>
  );
}

export function Select({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2.5 block text-[0.62rem] tracking-[0.24em] text-slate-muted uppercase">
        {label}
      </span>
      <select name={name} className={control} defaultValue={options[0]}>
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-900">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
}
