import { CloseIcon, SearchIcon } from './icons.jsx';

const FILTERS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluídas' },
];

/** Barra de busca + filtros de status. */
export function Toolbar({ search, onSearchChange, status, onStatusChange, counts }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <label htmlFor="task-search" className="sr-only">
          Buscar tarefas
        </label>
        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar tarefas..."
          className="field pl-10! pr-10!"
        />
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <SearchIcon className="h-4 w-4" />
        </span>
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-200"
            aria-label="Limpar busca"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/5"
        role="tablist"
        aria-label="Filtrar tarefas por status"
      >
        {FILTERS.map((filter) => {
          const active = status === filter.value;
          const count = counts?.[filter.value];
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onStatusChange(filter.value)}
              className={`flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition sm:flex-none ${
                active
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-200'
              }`}
            >
              {filter.label}
              {typeof count === 'number' && (
                <span className="ml-1.5 tabular-nums opacity-70">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
