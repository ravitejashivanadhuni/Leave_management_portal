import React from "react";

/**
 * Card - Reusable content container for LeaveFlow's HR dashboard.
 *
 * @param {object} props
 * @param {string} [props.title] - Header title.
 * @param {string} [props.subtitle] - Header subtitle/description.
 * @param {React.ReactNode} [props.actions] - Header-right actions (buttons, menus).
 * @param {React.ReactNode} props.children - Card body content.
 * @param {"none"|"sm"|"md"|"lg"} [props.padding="md"] - Body padding size.
 * @param {boolean} [props.hoverable=true] - Enables hover lift/shadow animation.
 * @param {string} [props.className]
 */
export default function Card({
  title,
  subtitle,
  actions,
  children,
  padding = "md",
  hoverable = true,
  className = "",
  ...rest
}) {
  const hasHeader = Boolean(title || subtitle || actions);

  const baseStyles =
    "bg-white rounded-xl border border-slate-200 shadow-sm " +
    "transition-all duration-200 ease-out";

  const hoverStyles = hoverable
    ? "hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300"
    : "";

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const headerPaddingStyles = {
    none: "",
    sm: "px-4 pt-4",
    md: "px-6 pt-6",
    lg: "px-8 pt-8",
  };

  const combinedClassName = [baseStyles, hoverStyles, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName} {...rest}>
      {hasHeader && (
        <div
          className={`flex items-start justify-between gap-4 ${headerPaddingStyles[padding]}`}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-base font-semibold text-slate-900">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </div>
      )}

      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
}