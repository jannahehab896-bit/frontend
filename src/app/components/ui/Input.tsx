import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// ── FormField ──────────────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-[#555] tracking-wide">{label}</label>
      {children}
      {error && (
        <p className="text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

// ── Input ──────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";

  const inputEl = (
    <div className="relative">
      <input
        {...props}
        type={isPassword && showPassword ? "text" : props.type}
        className={[
          "w-full h-12 px-4 rounded-xl border border-[#E0E0E0] bg-white",
          "placeholder:text-[#AAAAAA] text-[#111]",
          "focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111]/10",
          "transition-colors duration-150",
          error ? "border-red-400" : "",
          isPassword ? "pr-11" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {isPassword && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowPassword((v) => !v);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] p-1"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );

  if (!label) return inputEl;

  return <FormField label={label} error={error}>{inputEl}</FormField>;
}

// ── TextArea ───────────────────────────────────────────────────────────────
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className = "", ...props }: TextAreaProps) {
  const el = (
    <textarea
      {...props}
      className={[
        "w-full px-4 py-3 rounded-xl border border-[#E0E0E0] bg-[#F8F8F8]",
        "placeholder:text-[#AAAAAA] text-[#111] resize-none",
        "focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111]/10",
        "transition-colors duration-150",
        error ? "border-red-400" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (!label) return el;
  return <FormField label={label} error={error}>{el}</FormField>;
}

// ── SelectField ────────────────────────────────────────────────────────────
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function SelectField({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectFieldProps) {
  const el = (
    <div className="relative">
      <select
        {...props}
        className={[
          "w-full h-12 px-4 pr-10 rounded-xl border border-[#E0E0E0] bg-white",
          "text-[#111] appearance-none",
          "focus:outline-none focus:border-[#111] focus:ring-1 focus:ring-[#111]/10",
          "transition-colors duration-150",
          error ? "border-red-400" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#555]">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );

  if (!label) return el;
  return <FormField label={label} error={error}>{el}</FormField>;
}
