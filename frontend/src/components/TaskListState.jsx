import { InboxIcon, RefreshIcon, SearchIcon, SpinnerIcon } from './icons.jsx';

/** Estados vazios, de carregamento e de erro da lista. */
export function TaskListState({ state, error, hasSearch, onRetry }) {
  if (state === 'loading') {
    return (
      <div className="surface flex flex-col items-center justify-center gap-3 p-12 text-center">
        <SpinnerIcon className="h-6 w-6 text-brand-500" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Carregando tarefas...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="surface flex flex-col items-center justify-center gap-3 p-12 text-center">
        <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
          {error || 'Não foi possível carregar as tarefas.'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Verifique se o backend está rodando em http://localhost:3333
        </p>
        <button type="button" onClick={onRetry} className="btn btn-ghost mt-1">
          <RefreshIcon className="h-4 w-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  if (hasSearch) {
    return (
      <div className="surface flex flex-col items-center justify-center gap-3 p-12 text-center">
        <SearchIcon className="h-6 w-6 text-slate-400" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Nenhuma tarefa encontrada
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tente outro termo de busca.
        </p>
      </div>
    );
  }

  return (
    <div className="surface flex flex-col items-center justify-center gap-3 p-12 text-center">
      <InboxIcon className="h-6 w-6 text-slate-400" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        Nenhuma tarefa por aqui
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Adicione sua primeira tarefa no campo acima.
      </p>
    </div>
  );
}
