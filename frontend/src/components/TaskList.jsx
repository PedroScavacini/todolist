import { SpinnerIcon } from './icons.jsx';
import { TaskItem } from './TaskItem.jsx';
import { TaskListState } from './TaskListState.jsx';

/** Lista de tarefas com estados de carregamento, erro e vazio. */
export function TaskList({
  tasks,
  loading,
  error,
  hasSearch,
  onToggle,
  onEdit,
  onDelete,
  onRetry,
}) {
  // Só substituímos a lista por telas de estado quando não há nada a exibir.
  if (tasks.length === 0) {
    const state = loading ? 'loading' : error ? 'error' : 'empty';
    return (
      <TaskListState state={state} error={error} hasSearch={hasSearch} onRetry={onRetry} />
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute -top-1 right-0 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <SpinnerIcon className="h-3.5 w-3.5" />
          Atualizando
        </div>
      )}
      <ul className={`flex flex-col gap-3 ${loading ? 'opacity-70 transition-opacity' : ''}`}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
