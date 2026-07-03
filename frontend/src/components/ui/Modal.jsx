import React, { useEffect, useRef, useState } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal - Reusable dialog for LeaveFlow.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} [props.title]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 * @param {"sm"|"md"|"lg"|"xl"} [props.size="md"]
 * @param {boolean} [props.showCloseButton=true]
 * @param {boolean} [props.closeOnBackdrop=true]
 * @param {string} [props.className]
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  className = "",
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const titleId = "modal-title";

  // Mount / unmount with animation.
  useEffect(() => {
    let visibilityFrame;
    let unmountTimeout;

    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement;
      setShouldRender(true);
      visibilityFrame = requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      unmountTimeout = setTimeout(() => setShouldRender(false), 200);
    }

    return () => {
      cancelAnimationFrame(visibilityFrame);
      clearTimeout(unmountTimeout);
    };
  }, [isOpen]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!shouldRender) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender]);

  // Initial focus + restore focus on close.
  useEffect(() => {
    if (!shouldRender) return;

    const frame = requestAnimationFrame(() => {
      const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      } else {
        dialogRef.current?.focus();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      if (!isOpen) {
        previouslyFocusedRef.current?.focus?.();
      }
    };
  }, [shouldRender, isOpen]);

  // ESC to close + focus trap.
  useEffect(() => {
    if (!shouldRender) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
        return;
      }

      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const hasHeader = Boolean(title || showCloseButton);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6`}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={[
          "relative w-full rounded-2xl bg-white shadow-2xl",
          "outline-none",
          "transition-all duration-200 ease-out",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2",
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {hasHeader && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
            {title ? (
              <h2 id={titleId} className="text-lg font-semibold text-slate-900">
                {title}
              </h2>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 text-sm text-slate-700">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}