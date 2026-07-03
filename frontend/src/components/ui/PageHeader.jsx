import React from "react";

/**
 * PageHeader - Reusable page-level header for LeaveFlow.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.actionButton] - Primary action(s), right-aligned.
 * @param {Array<{ label: string, href?: string, onClick?: () => void }>} [props.breadcrumbs]
 * @param {string} [props.className]
 */
export default function PageHeader({
  title,
  subtitle,
  actionButton,
  breadcrumbs = [],
  className = "",
}) {
  const hasBreadcrumbs = breadcrumbs.length > 0;

  const combinedClassName = [
    "w-full rounded-xl border border-slate-200 bg-white",
    "px-4 py-5 sm:px-6 sm:py-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName}>
      {hasBreadcrumbs && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                  )}
                  {isLast ? (
                    <span
                      className="font-medium text-slate-700"
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : crumb.href ? (
                    <a
                      href={crumb.href}
                      className="transition-colors duration-150 hover:text-blue-600"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className="transition-colors duration-150 hover:text-blue-600"
                    >
                      {crumb.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-slate-900 sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {actionButton && (
          <div className="flex shrink-0 items-center gap-2">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}