import { useCallback, useMemo } from 'react';
import { Header } from './components/Header.jsx';
import { StatsBar } from './components/StatsBar.jsx';
import { TaskForm } from './components/TaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import { ToastViewport } from './components/ToastViewport.jsx';
import { Toolbar } from './components/Toolbar.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useTasks } from './hooks/useTasks.js';
import { useToasts } from './hooks/useToasts.js';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, success, error, remove } = useToasts();

  const handleError = useCallback((message) => error(message), [error]);
  const handleSuccess = useCallback((message) => success(message), [success]);

  const {
    tasks,
    stats,
    status,
    setStatus,
    search,
    setSearch,
    loading,
    error: loadError,
    reload,
    addTask,
    toggleTask,
    editTask,
    removeTask,
  } = useTasks({ onError: handleError, onSuccess: handleSuccess });

  const counts = useMemo(
    () => ({
      all: stats.total,
      pending: Math.max(0, stats.total - stats.completed),
      completed: stats.completed,
    }),
    [stats.total, stats.completed],
  );

  const hasSearch = search.trim().length > 0;

  async function handleCreate(payload) {
    try {
      await addTask(payload);
    } catch (err) {
      handleError(err.message || 'Não foi possível criar a tarefa.');
    }
  }

  return (
    <div className="relative min-h-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.35),transparent)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <Header theme={theme} onToggleTheme={toggleTheme} total={stats.total} />

        <StatsBar total={stats.total} completed={stats.completed} />

        <TaskForm onCreate={handleCreate} />

        <Toolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          counts={counts}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={loadError}
          hasSearch={hasSearch}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={removeTask}
          onRetry={reload}
        />

        <footer className="mt-auto pt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Feito com React + Vite · API Fastify + MySQL
        </footer>
      </div>

      <ToastViewport toasts={toasts} onDismiss={remove} />
    </div>
  );
}
