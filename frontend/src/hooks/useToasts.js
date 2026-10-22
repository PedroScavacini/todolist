import { useCallback, useRef, useState } from 'react';

let nextId = 0;

/** Fila de notificações temporárias (toasts). */
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (message, type = 'info') => {
      const id = ++nextId;
      setToasts((current) => [...current, { id, message, type }]);
      const timer = setTimeout(() => remove(id), 4000);
      timers.current.set(id, timer);
      return id;
    },
    [remove],
  );

  const success = useCallback((message) => push(message, 'success'), [push]);
  const error = useCallback((message) => push(message, 'error'), [push]);
  const info = useCallback((message) => push(message, 'info'), [push]);

  return { toasts, push, success, error, info, remove };
}
