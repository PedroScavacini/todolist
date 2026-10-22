import { useState } from 'react';
import { CalendarIcon, PlusIcon } from './icons.jsx';

/** Formulário de criação de tarefas. */
export function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle || submitting) return;

    setSubmitting(true);
    try {
      await onCreate({ title: cleanTitle, dueDate: dueDate || null });
      setTitle('');
      setDueDate('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="task-title" className="sr-only">
            Nome da tarefa
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="O que precisa ser feito?"
            maxLength={255}
            autoComplete="off"
            className="field pl-11!"
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <PlusIcon className="h-4 w-4" />
          </span>
        </div>

        <div className="relative sm:w-48">
          <label htmlFor="task-due" className="sr-only">
            Data limite
          </label>
          <input
            id="task-due"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="field pl-10! dark:[color-scheme:dark]"
          />
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <CalendarIcon className="h-4 w-4" />
          </span>
        </div>

        <button type="submit" disabled={!title.trim() || submitting} className="btn btn-primary">
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Salvando
            </>
          ) : (
            <>
              <PlusIcon className="h-4 w-4" />
              Adicionar
            </>
          )}
        </button>
      </div>
    </form>
  );
}
