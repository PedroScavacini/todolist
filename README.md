# Todo List

Aplicação de lista de tarefas com **backend Fastify + MySQL** e **frontend React + Vite**.

```
todolist_PedroScavacini/
├── backend/     # API REST (Fastify + MySQL)
└── frontend/    # Interface (React + Vite + Tailwind CSS)
```

## Funcionalidades

- Criar tarefas com data limite opcional
- Marcar/desmarcar como concluída (atualização otimista na interface)
- Editar título e data limite inline
- Excluir tarefas
- Busca por título (com *debounce*) e filtro por status (todas / pendentes / concluídas)
- Painel com total, pendentes, concluídas e barra de progresso
- Selo de prazo: "Vence hoje", "Vence amanhã", "Atrasada há N dias", etc.
- Tema claro/escuro persistido em `localStorage`
- Layout responsivo e notificações (toasts)

## Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- [MySQL](https://dev.mysql.com/downloads/) 8+

## Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env` (veja `backend/.env.example`) e ajuste as credenciais do banco:

```env
PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=''
DB_NAME=todolist
CORS_ORIGIN=http://localhost:5173
```

Crie o banco e a tabela executando [`backend/schema.sql`](backend/schema.sql):

```bash
mysql -u root -p < backend/schema.sql
```

Depois, inicie a API:

```bash
cd backend
npm run dev   # http://localhost:3333
```

## Frontend

```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

O Vite faz proxy de `/api` para `http://localhost:3333`, então não é necessário configurar
nenhuma URL da API em desenvolvimento. Para apontar para outro host, copie
`frontend/.env.example` para `frontend/.env` e altere `VITE_API_URL`.

## API

| Método   | Rota              | Body                              | Descrição                       |
| -------- | ----------------- | --------------------------------- | ------------------------------- |
| `GET`    | `/api/tasks`      | —                                 | Lista tarefas (`search`, `status`) |
| `POST`   | `/api/tasks`      | `{ title, dueDate? }`             | Cria uma tarefa                 |
| `PATCH`  | `/api/tasks/:id`  | `{ completed?, title?, dueDate? }` | Atualiza uma tarefa             |
| `DELETE` | `/api/tasks/:id`  | —                                 | Remove uma tarefa               |

Exemplos de requisição estão em [`backend/rotas.http`](backend/rotas.http).

## Scripts

| Comando             | Descrição                          |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Sobe o servidor com hot reload     |
| `npm run build`     | Gera o build de produção (`dist/`) |
| `npm run preview`   | Serve localmente o build           |

## Stack

**Frontend:** React 19, Vite 7, Tailwind CSS 4
**Backend:** Fastify 5, MySQL 2
