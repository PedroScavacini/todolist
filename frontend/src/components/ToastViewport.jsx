import { useEffect } from 'react';

const TONES = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  error: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  info: 'border-brand-500/30 bg-brand-500/10 text-brand-700 dark:text-brand-300',
};

const ICONS = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 6l12 12M18 6L6 18',
  info: 'M12 8h.01M11 12h1v5h1',
};

/** Container das notificações temporárias. */
export function ToastViewport({ toasts, onDismiss }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') toasts.forEach((toast) => onDismiss(toast.id));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toasts, onDismiss]);

  if (!toasts.length) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => onDismiss(toast.id)}
          className={`animate-slide-in-right pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium shadow-lg backdrop-blur-md transition hover:brightness-105 ${TONES[toast.type] ?? TONES.info}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <path d={ICONS[toast.type] ?? ICONS.info} />
          </svg>
          <span className="flex-1">{toast.message}</span>
        </button>
      ))}
    </div>
  );
}
