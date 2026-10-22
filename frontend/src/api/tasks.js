const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

/**
 * Normaliza a tarefa vinda do banco.
 * O MySQL devolve BOOLEAN como 0/1 e as datas como string;
 * aqui convertemos para booleanos/strings consistentes na UI.
 */
function normalizeTask(task) {
  if (!task) return task;
  return {
    ...task,
    id: Number(task.id),
    completed: Boolean(task.completed),
    due_date: task.due_date || null,
  };
}

async function request(path, { method = 'GET', body, signal } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  }

  if (response.status === 204) return null;

  const text = await response.text();
  const payload = text ? safeParse(text) : null;

  if (!response.ok) {
    const message =
      payload?.message || `Erro ${response.status} ao chamar a API.`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Lista tarefas com busca e filtro opcionais. */
export async function listTasks({ search = '', status = 'all', signal } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status && status !== 'all') params.set('status', status);
  const qs = params.toString();

  const data = await request(`/tasks${qs ? `?${qs}` : ''}`, { signal });

  return {
    ...(data ?? {}),
    tasks: (data?.tasks ?? []).map(normalizeTask),
    total: Number(data?.total) || 0,
    completed: Number(data?.completed) || 0,
  };
}

/** Cria uma nova tarefa. */
export async function createTask({ title, dueDate }) {
  const task = await request('/tasks', {
    method: 'POST',
    body: { title, dueDate: dueDate || null },
  });
  return normalizeTask(task);
}

/** Atualiza parcialmente uma tarefa. */
export async function updateTask(id, changes) {
  const task = await request(`/tasks/${id}`, { method: 'PATCH', body: changes });
  return normalizeTask(task);
}

/** Remove uma tarefa. */
export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' });
}
