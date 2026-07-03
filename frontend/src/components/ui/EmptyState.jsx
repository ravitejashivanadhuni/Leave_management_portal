import React from "react";

/**
 * EmptyState - Friendly placeholder for empty lists, tables, or search results.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {React.ReactNode} [props.icon]
 * @param {React.ReactNode} [props.button] - Typically a Button component instance.
 * @param {string} [props.className]
 */
export default function EmptyState({
  title,
  description,
  icon,
  button,
  className = "",
}) {
  const combinedClassName = [
    "flex w-full flex-col items-center justify-center gap-4",
    "rounded-xl border border-dashed border-slate-200 bg-slate-50/60",
    "px-6 py-16 text-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 [&_svg]:h-6 [&_svg]:w-6">
        {icon || <DefaultIcon />}
      </div>

      <div className="max-w-sm">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>

      {button && <div className="mt-1">{button}</div>}
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7h18M3 7l1.5 12a1.5 1.5 0 001.5 1.35h12a1.5 1.5 0 001.5-1.35L21 7M3 7l1.5-3h15L21 7" />
      <path d="M9 11v5M15 11v5" />
    </svg>
  );
}