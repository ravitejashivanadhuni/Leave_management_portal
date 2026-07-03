import React from "react";

/**
 * Loader - Reusable loading indicator for LeaveFlow.
 *
 * @param {object} props
 * @param {"page"|"button"|"table"|"card"} [props.variant="page"]
 * @param {number} [props.rows=5] - Row count for the "table" variant.
 * @param {number} [props.count=1] - Card count for the "card" variant.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Spinner size for "page"/"button" variants.
 * @param {string} [props.label="Loading"] - Accessible label.
 * @param {string} [props.className]
 */
export default function Loader({
  variant = "page",
  rows = 5,
  count = 1,
  size = "md",
  label = "Loading",
  className = "",
}) {
  switch (variant) {
    case "button":
      return <ButtonLoader size={size} label={label} className={className} />;
    case "table":
      return <TableLoader rows={rows} label={label} className={className} />;
    case "card":
      return <CardLoader count={count} label={label} className={className} />;
    case "page":
    default:
      return <PageLoader size={size} label={label} className={className} />;
  }
}

/* ---------------------------------- Spinner ---------------------------------- */

function Spinner({ size = "md", className = "" }) {
  const dimensions = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <svg
      className={`animate-spin text-blue-600 ${dimensions[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-20"
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

/* ------------------------------- Page loader ------------------------------- */

function PageLoader({ size, label, className }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`flex w-full flex-col items-center justify-center gap-3 py-16 ${className}`}
    >
      <Spinner size={size === "sm" ? "md" : "lg"} />
      <p className="text-sm font-medium text-slate-500">{label}...</p>
    </div>
  );
}

/* ------------------------------ Button loader ------------------------------ */

function ButtonLoader({ size, label, className }) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex items-center ${className}`}
    >
      <Spinner size="sm" />
    </span>
  );
}

/* ------------------------------- Table loader ------------------------------- */

function TableLoader({ rows, label, className }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`w-full overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}
    >
      <div className="flex gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={`head-${i}`}
            className="h-3 flex-1 animate-pulse rounded bg-slate-200"
          />
        ))}
      </div>

      <div className="divide-y divide-slate-100">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-4 px-6 py-4">
            {[...Array(4)].map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-3 flex-1 animate-pulse rounded bg-slate-100"
                style={{ animationDelay: `${(rowIndex + colIndex) * 60}ms` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Card loader -------------------------------- */

function CardLoader({ count, label, className }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={`card-${i}`}
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-slate-100" />
          <div className="mt-6 h-8 w-full animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}