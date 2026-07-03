import React, { useMemo, useState } from "react";

/**
 * Table - Reusable data table for LeaveFlow.
 *
 * @param {object} props
 * @param {Array<{
 *   key: string,
 *   header: React.ReactNode,
 *   render?: (row: object, rowIndex: number) => React.ReactNode,
 *   align?: "left"|"center"|"right",
 *   width?: string,
 *   className?: string,
 * }>} props.columns
 * @param {Array<object>} props.data
 * @param {boolean} [props.loading=false]
 * @param {string} [props.emptyMessage="No records found"]
 * @param {boolean} [props.searchable=false]
 * @param {boolean} [props.pagination=false]
 * @param {number} [props.pageSize=10]
 * @param {(row: object, rowIndex: number) => React.ReactNode} [props.actions]
 * @param {boolean} [props.striped=false]
 * @param {boolean} [props.hover=true]
 * @param {boolean} [props.responsive=true]
 * @param {boolean} [props.showIndex=false]
 * @param {string | ((row: object, rowIndex: number) => string | number)} [props.rowKey="id"]
 * @param {string} [props.className]
 */
export default function Table({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  searchable = false,
  pagination = false,
  pageSize = 10,
  actions,
  striped = false,
  hover = true,
  responsive = true,
  showIndex = false,
  rowKey = "id",
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm.trim()) return data;
    const term = searchTerm.trim().toLowerCase();

    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [data, columns, searchTerm, searchable]);

  const totalPages = pagination
    ? Math.max(1, Math.ceil(filteredData.length / pageSize))
    : 1;

  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    const start = (safePage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, pagination, safePage, pageSize]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getRowKey = (row, index) => {
    if (typeof rowKey === "function") return rowKey(row, index);
    return row?.[rowKey] ?? index;
  };

  const columnCount = columns.length + (showIndex ? 1 : 0) + (actions ? 1 : 0);

  const alignClass = (align) =>
    align === "right"
      ? "text-right"
      : align === "center"
      ? "text-center"
      : "text-left";

  const containerStyles =
    "w-full rounded-xl border border-slate-200 bg-white overflow-hidden";

  return (
    <div className={`${containerStyles} ${className}`}>
      {searchable && (
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="relative max-w-xs">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="h-9 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <div className={responsive ? "overflow-x-auto" : ""}>
        <table className="w-full min-w-full border-collapse text-sm">
          <thead>
            <tr className="sticky top-0 z-10 bg-slate-50">
              {showIndex && (
                <th className="whitespace-nowrap border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  #
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  className={`whitespace-nowrap border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${alignClass(
                    col.align
                  )} ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="whitespace-nowrap border-b border-slate-200 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <SkeletonRows columnCount={columnCount} rows={pageSize > 8 ? 8 : pageSize} />
            ) : paginatedData.length === 0 ? (
              <EmptyRow columnCount={columnCount} message={emptyMessage} />
            ) : (
              paginatedData.map((row, index) => {
                const absoluteIndex = pagination
                  ? (safePage - 1) * pageSize + index
                  : index;

                return (
                  <tr
                    key={getRowKey(row, absoluteIndex)}
                    className={[
                      striped && absoluteIndex % 2 === 1 ? "bg-slate-50/60" : "",
                      hover ? "transition-colors duration-150 hover:bg-slate-50" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {showIndex && (
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {absoluteIndex + 1}
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-slate-700 ${alignClass(col.align)} ${
                          col.className || ""
                        }`}
                      >
                        {col.render ? col.render(row, absoluteIndex) : row[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {actions(row, absoluteIndex)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && !loading && filteredData.length > 0 && (
        <PaginationControls
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

/* ------------------------------ Skeleton rows ------------------------------ */

function SkeletonRows({ columnCount, rows = 5 }) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={`skeleton-${rowIndex}`}>
          {[...Array(columnCount)].map((_, colIndex) => (
            <td key={`skeleton-cell-${rowIndex}-${colIndex}`} className="px-4 py-3">
              <div
                className="h-3 animate-pulse rounded bg-slate-200"
                style={{
                  width: colIndex === 0 ? "60%" : "80%",
                  animationDelay: `${(rowIndex + colIndex) * 60}ms`,
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* -------------------------------- Empty row -------------------------------- */

function EmptyRow({ columnCount, message }) {
  return (
    <tr>
      <td colSpan={columnCount} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchIcon />
          </span>
          <p className="text-sm font-medium text-slate-500">{message}</p>
        </div>
      </td>
    </tr>
  );
}

/* --------------------------- Pagination controls --------------------------- */

function PaginationControls({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{start}</span>–
        <span className="font-medium text-slate-700">{end}</span> of{" "}
        <span className="font-medium text-slate-700">{totalItems}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => canGoPrev && onPageChange(currentPage - 1)}
          disabled={!canGoPrev}
          className="inline-flex h-8 items-center rounded-lg border border-slate-300 px-3 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Previous
        </button>
        <span className="px-2 text-xs text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => canGoNext && onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="inline-flex h-8 items-center rounded-lg border border-slate-300 px-3 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}