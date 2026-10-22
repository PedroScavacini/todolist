import { useCallback, useEffect, useRef, useState } from 'react';
import { createTask, deleteTask, listTasks, updateTask } from '../api/tasks.js';
import { sortTasks } from '../lib/tasks.js';
import { useDebouncedValue } from './useDebouncedValue.js';

const EMPTY_STATS = { total: 0, completed: 0 };

/**
 * Centraliza o estado das tarefas: carregamento, filtros, busca e CRUD.
 */
export function useTasks({ onError, onSuccess }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebouncedValue(search, 350);
  const requestId = useRef(0);

  const load = useCallback(
    async ({ search: term = '', status: filter = 'all' } = {}) => {
      const current = ++requestId.current;
      setLoading(true);
      try {
        const data = await listTasks({ search: term, status: filter });
        if (current !== requestId.current) return; // resposta obsoleta
        setTasks(sortTasks(data?.tasks ?? []));
        setStats({
          total: Number(data?.total) || 0,
          completed: Number(data?.completed) || 0,
        });
        setError(null);
      } catch (err) {
        if (current !== requestId.current) return;
        setError(err.message || 'Não foi possível carregar as tarefas.');
        onError?.(err.message || 'Não foi possível carregar as tarefas.');
      } finally {
        if (current === requestId.current) setLoading(false);
      }
    },
    [onError],
  );

  useEffect(() => {
    load({ search: debouncedSearch, status });
  }, [debouncedSearch, status, load]);

  const addTask = useCallback(
    async ({ title, dueDate }) => {
      const created = await createTask({ title, dueDate });
      setTasks((current) => sortTasks([created, ...current]));
      setStats((current) => ({
        total: current.total + 1,
        completed: current.completed,
      }));
      onSuccess?.('Tarefa criada com sucesso.');
      return created;
    },
    [onSuccess],
  );

  const toggleTask = useCallback(
    async (task) => {
      const nextCompleted = !task.completed;
      const previous = task;

      // Atualização otimista: a UI responde na hora e reverte em caso de erro.
      setTasks((current) =>
        current.map((item) =>
          item.id === task.id ? { ...item, completed: nextCompleted } : item,
        ),
      );
      setStats((current) => ({
        ...current,
        completed: Math.max(0, current.completed + (nextCompleted ? 1 : -1)),
      }));

      try {
        const updated = await updateTask(task.id, { completed: nextCompleted });
        setTasks((current) =>
          current.map((item) => (item.id === task.id ? { ...item, ...updated } : item)),
        );
      } catch (err) {
        setTasks((current) =>
          current.map((item) => (item.id === task.id ? previous : item)),
        );
        setStats((current) => ({
          ...current,
          completed: Math.max(0, current.completed + (nextCompleted ? -1 : 1)),
        }));
        onError?.(err.message || 'Não foi possível atualizar a tarefa.');
      }
    },
    [onError],
  );

  const editTask = useCallback(
    async (id, changes) => {
      try {
        const updated = await updateTask(id, changes);
        setTasks((current) =>
          current.map((item) => (item.id === id ? { ...item, ...updated } : item)),
        );
        onSuccess?.('Tarefa atualizada.');
        return updated;
      } catch (err) {
        onError?.(err.message || 'Não foi possível atualizar a tarefa.');
        throw err;
      }
    },
    [onError, onSuccess],
  );

  const removeTask = useCallback(
    async (task) => {
      const snapshot = tasks;
      setTasks((current) => current.filter((item) => item.id !== task.id));
      setStats((current) => ({
        total: Math.max(0, current.total - 1),
        completed: Math.max(0, current.completed - (task.completed ? 1 : 0)),
      }));

      try {
        await deleteTask(task.id);
        onSuccess?.('Tarefa excluída.');
      } catch (err) {
        setTasks(snapshot);
        setStats((current) => ({
          total: current.total + 1,
          completed: current.completed + (task.completed ? 1 : 0),
        }));
        onError?.(err.message || 'Não foi possível excluir a tarefa.');
      }
    },
    [tasks, onError, onSuccess],
  );

  return {
    tasks,
    stats,
    status,
    setStatus,
    search,
    setSearch,
    loading,
    error,
    reload: () => load({ search: debouncedSearch, status }),
    addTask,
    toggleTask,
    editTask,
    removeTask,
  };
}
