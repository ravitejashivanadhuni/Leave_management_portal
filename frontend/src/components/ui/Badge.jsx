import React from "react";

/**
 * Badge - Reusable pill badge for statuses, tags, and labels in LeaveFlow.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {"primary"|"secondary"|"success"|"warning"|"danger"|"info"|"gray"} [props.variant="gray"]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.rounded=true] - Full pill shape when true, rounded-lg when false.
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export default function Badge({
  children,
  variant = "gray",
  size = "md",
  rounded = true,
  icon = null,
  className = "",
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-medium border " +
    "transition-colors duration-150 ease-out";

  const shapeStyles = rounded ? "rounded-full" : "rounded-lg";

  const sizeStyles = {
    sm: "h-5 px-2 text-xs [&_svg]:h-3 [&_svg]:w-3",
    md: "h-6 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
    lg: "h-7 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  };

  const variantStyles = {
    primary:
      "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
    secondary:
      "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
    warning:
      "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
    danger:
      "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    info:
      "bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100",
    gray:
      "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100",
  };

  const combinedClassName = [
    baseStyles,
    shapeStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={combinedClassName} {...rest}>
      {icon && (
        <span className="inline-flex shrink-0 items-center">{icon}</span>
      )}
      {children}
    </span>
  );
}