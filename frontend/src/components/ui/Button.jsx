import React from "react";

/**
 * Button - Reusable, accessible button component for LeaveFlow.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button label/content.
 * @param {"primary"|"secondary"|"success"|"danger"|"outline"} [props.variant="primary"]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.loading=false] - Shows spinner, disables interaction, hides icons.
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {"button"|"submit"|"reset"} [props.type="button"]
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick]
 * @param {string} [props.className]
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  type = "button",
  onClick,
  className = "",
  ...rest
}) {
  const isDisabled = disabled || loading;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
    "transition-all duration-200 ease-out select-none " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "active:scale-[0.98] disabled:active:scale-100 " +
    "disabled:cursor-not-allowed disabled:opacity-60";

  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const iconSizeStyles = {
    sm: "[&_svg]:h-4 [&_svg]:w-4",
    md: "[&_svg]:h-4 [&_svg]:w-4",
    lg: "[&_svg]:h-5 [&_svg]:w-5",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 text-white shadow-sm " +
      "hover:bg-blue-700 hover:shadow-md " +
      "focus-visible:ring-blue-500 " +
      "disabled:hover:bg-blue-600 disabled:hover:shadow-sm",
    secondary:
      "bg-slate-100 text-slate-700 shadow-sm " +
      "hover:bg-slate-200 " +
      "focus-visible:ring-slate-400 " +
      "disabled:hover:bg-slate-100",
    success:
      "bg-emerald-600 text-white shadow-sm " +
      "hover:bg-emerald-700 hover:shadow-md " +
      "focus-visible:ring-emerald-500 " +
      "disabled:hover:bg-emerald-600 disabled:hover:shadow-sm",
    danger:
      "bg-red-600 text-white shadow-sm " +
      "hover:bg-red-700 hover:shadow-md " +
      "focus-visible:ring-red-500 " +
      "disabled:hover:bg-red-600 disabled:hover:shadow-sm",
    outline:
      "bg-transparent text-slate-700 border border-slate-300 shadow-sm " +
      "hover:bg-slate-50 hover:border-slate-400 " +
      "focus-visible:ring-slate-400 " +
      "disabled:hover:bg-transparent disabled:hover:border-slate-300",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const combinedClassName = [
    baseStyles,
    sizeStyles[size],
    iconSizeStyles[size],
    variantStyles[variant],
    widthStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner size={size} />}
      {!loading && leftIcon && (
        <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
      )}
      <span className={loading ? "opacity-90" : undefined}>{children}</span>
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
      )}
    </button>
  );
}

function Spinner({ size = "md" }) {
  const dimensions = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <svg
      className={`animate-spin ${dimensions[size]}`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}