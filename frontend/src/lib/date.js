/** Converte 'YYYY-MM-DD' em Date local (meio-dia, para evitar fuso horário). */
export function parseDateOnly(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

/** Data de hoje no formato 'YYYY-MM-DD' (hora local). */
export function todayISO() {
  const now = new Date();
  return toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12));
}

/** Formata um Date no formato 'YYYY-MM-DD' (hora local). */
export function toISO(date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Diferença em dias inteiros entre hoje e a data informada (positivo = futuro). */
export function daysFromToday(value) {
  const date = parseDateOnly(value);
  if (!date) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  return Math.round((date.getTime() - today.getTime()) / 86400000);
}

/**
 * Retorna as informações de prazo de uma tarefa:
 * { label, tone } onde tone in ['danger' | 'warning' | 'info' | 'neutral'].
 */
export function dueDateInfo(value) {
  const diff = daysFromToday(value);
  if (diff === null) return null;

  if (diff < 0) {
    const overdue = Math.abs(diff);
    return {
      label: overdue === 1 ? 'Atrasada há 1 dia' : `Atrasada há ${overdue} dias`,
      tone: 'danger',
    };
  }
  if (diff === 0) return { label: 'Vence hoje', tone: 'danger' };
  if (diff === 1) return { label: 'Vence amanhã', tone: 'warning' };
  if (diff <= 7) return { label: `Em ${diff} dias`, tone: 'warning' };
  return { label: formatDate(value), tone: 'info' };
}

/** Formata 'YYYY-MM-DD' como 'dd/mm/yyyy'. */
export function formatDate(value) {
  const date = parseDateOnly(value);
  if (!date) return '';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
