/**
 * Ordena as tarefas da mesma forma que o backend:
 *   1. tarefas COM data limite primeiro
 *   2. data limite mais antiga primeiro
 *   3. em caso de empate, mais recente primeiro (created_at DESC)
 */
export function compareTasks(a, b) {
  const aHasDueDate = Boolean(a.due_date);
  const bHasDueDate = Boolean(b.due_date);

  if (aHasDueDate !== bHasDueDate) return aHasDueDate ? -1 : 1;
  if (aHasDueDate && a.due_date !== b.due_date) {
    return a.due_date < b.due_date ? -1 : 1;
  }

  return String(b.created_at ?? '').localeCompare(String(a.created_at ?? ''));
}

/** Retorna uma nova lista ordenada (não muta o array original). */
export function sortTasks(tasks) {
  return [...tasks].sort(compareTasks);
}
