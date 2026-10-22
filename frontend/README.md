# Frontend — Todo List

Interface do Todo List em **React 19 + Vite + Tailwind CSS 4**.

## Como rodar

```bash
npm install
npm run dev
```

A aplicação fica disponível em <http://localhost:5173> e o Vite faz proxy de `/api`
para `http://localhost:3333` (backend). Certifique-se de que a API esteja rodando.

## Variáveis de ambiente

Copie `.env.example` para `.env`:

| Variável            | Padrão                 | Descrição                                             |
| ------------------- | ---------------------- | ----------------------------------------------------- |
| `VITE_API_URL`      | `/api`                 | URL base da API (use o proxy do Vite em dev)          |
| `VITE_PROXY_TARGET` | `http://localhost:3333` | Endereço do backend usado pelo proxy do Vite          |

## Scripts

| Comando           | Descrição                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (HMR)  |
| `npm run build`   | Build de produção em `dist/`       |
| `npm run preview` | Serve localmente o build           |

## Estrutura

```
src/
├── api/tasks.js         # chamadas HTTP da API
├── components/          # Header, StatsBar, TaskForm, Toolbar, TaskItem, TaskList...
├── hooks/               # useTasks, useTheme, useToasts, useDebouncedValue
├── lib/                 # utilitários de data e ordenação
├── App.jsx
├── index.css            # tema base (Tailwind v4 + tokens)
└── main.jsx
```
