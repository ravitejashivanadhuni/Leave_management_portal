import React, { useId, useState } from "react";

/**
 * Input - Reusable, accessible text input component for LeaveFlow.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} props.name
 * @param {string} [props.type="text"]
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange]
 * @param {string} [props.error]
 * @param {boolean} [props.required=false]
 * @param {React.ReactNode} [props.icon] - Leading icon.
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className]
 */
export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon = null,
  disabled = false,
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const inputId = name || generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const hasError = Boolean(error);

  const wrapperStyles = "flex flex-col gap-1.5 w-full";

  const labelStyles = "text-sm font-medium text-slate-700";

  const inputBaseStyles =
    "w-full h-10 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 " +
    "bg-white border transition-all duration-200 ease-out " +
    "focus:outline-none focus:ring-2 focus:ring-offset-1 " +
    "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

  const inputStateStyles = hasError
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500";

  const paddingStyles = `${icon ? "pl-10" : "pl-3.5"} ${
    isPassword ? "pr-10" : "pr-3.5"
  }`;

  const combinedInputClassName = [
    inputBaseStyles,
    inputStateStyles,
    paddingStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperStyles}>
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={combinedInputClassName}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={0}
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors duration-150 hover:text-slate-600 focus:outline-none focus-visible:text-blue-600 disabled:cursor-not-allowed disabled:hover:text-slate-400"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {hasError && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10.9 10.9 0 0112 5c6.5 0 10.5 7.5 10.5 7.5a17.5 17.5 0 01-3.6 4.5M6.6 6.6C3.4 8.5 1.5 12 1.5 12s4 7.5 10.5 7.5a10.4 10.4 0 005.4-1.5" />
      <path d="M9.9 9.9a3 3 0 004.2 4.2" />
    </svg>
  );
}