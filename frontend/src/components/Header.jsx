import { ListIcon, MoonIcon, SunIcon } from './icons.jsx';

export function Header({ theme, onToggleTheme, total }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-600/30">
          <ListIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Todo List
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            {total === 0
              ? 'Organize suas tarefas'
              : `${total} ${total === 1 ? 'tarefa cadastrada' : 'tarefas cadastradas'}`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleTheme}
        className="btn btn-ghost btn-icon"
        aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </header>
  );
}
