import { CheckCircleIcon, ClockIcon, ListIcon } from './icons.jsx';

/** Painel com o resumo das tarefas e a barra de progresso. */
export function StatsBar({ total, completed }) {
  const pending = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const items = [
    { label: 'Total', value: total, icon: ListIcon, tone: 'text-brand-600 dark:text-brand-300' },
    {
      label: 'Pendentes',
      value: pending,
      icon: ClockIcon,
      tone: 'text-amber-600 dark:text-amber-300',
    },
    {
      label: 'Concluídas',
      value: completed,
      icon: CheckCircleIcon,
      tone: 'text-emerald-600 dark:text-emerald-300',
    },
  ];

  return (
    <section className="surface p-5">
      <div className="grid grid-cols-3 gap-3">
        {items.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="text-center">
            <Icon className={`mx-auto h-5 w-5 ${tone}`} />
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {value}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Progresso</span>
          <span className="tabular-nums">{percentage}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso das tarefas concluídas"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-[width] duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
