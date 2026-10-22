import { useEffect, useRef, useState } from 'react';
import { dueDateInfo } from '../lib/date.js';
import { CalendarIcon, CheckIcon, CloseIcon, PencilIcon, TrashIcon } from './icons.jsx';

const TONE_CLASSES = {
  danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  info: 'bg-slate-500/10 text-slate-500 dark:text-slate-300',
  neutral: 'bg-slate-500/10 text-slate-500 dark:text-slate-300',
};

/** Item da lista de tarefas, com edição inline. */
export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDueDate, setDraftDueDate] = useState(task.due_date ?? '');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const due = dueDateInfo(task.due_date);

  function startEditing() {
    setDraftTitle(task.title);
    setDraftDueDate(task.due_date ?? '');
    setEditing(true);
  }

  async function save(event) {
    event.preventDefault();
    const cleanTitle = draftTitle.trim();
    if (!cleanTitle || saving) return;

    setSaving(true);
    try {
      await onEdit(task.id, {
        title: cleanTitle,
        dueDate: draftDueDate || null,
      });
      setEditing(false);
    } catch {
      /* o erro já é tratado no hook e exibido como notificação */
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <li className="surface animate-fade-in p-4">
        <form onSubmit={save} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            type="text"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            maxLength={255}
            className="field"
            aria-label="Nome da tarefa"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="date"
              value={draftDueDate}
              onChange={(event) => setDraftDueDate(event.target.value)}
              className="field dark:[color-scheme:dark] sm:max-w-48"
              aria-label="Data limite"
            />
            <div className="flex gap-2 sm:ml-auto">
              <button type="submit" disabled={!draftTitle.trim() || saving} className="btn btn-primary">
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-ghost"
                aria-label="Cancelar edição"
              >
                <CloseIcon className="h-4 w-4" />
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      className={`surface group flex items-start gap-3 p-4 transition hover:border-brand-300 hover:shadow-md dark:hover:border-brand-500/40 ${
        task.completed ? 'opacity-70' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task)}
        role="checkbox"
        aria-checked={task.completed}
        aria-label={`Marcar "${task.title}" como ${task.completed ? 'pendente' : 'concluída'}`}
        className={`mt-0.5 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 transition ${
          task.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-brand-500 dark:border-slate-600 dark:hover:border-brand-400'
        }`}
      >
        {task.completed && <CheckIcon className="h-3.5 w-3.5" />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium break-words sm:text-base ${
            task.completed
              ? 'text-slate-400 line-through dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }`}
        >
          {task.title}
        </p>

        {due && (
          <span
            className={`mt-1.5 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
              TONE_CLASSES[due.tone] ?? TONE_CLASSES.neutral
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {due.label}
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          onClick={startEditing}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-200"
          aria-label={`Editar "${task.title}"`}
          title="Editar"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
          aria-label={`Excluir "${task.title}"`}
          title="Excluir"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
