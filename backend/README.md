# Backend (Node + Express + MongoDB)

Env vars: copy `.env.example` to `.env` and adjust as needed.

Run MongoDB via Docker:

```
docker compose up -d
```

Install deps and start dev server:

```
npm install
npm run dev
```

API base: `http://localhost:4000/api`

Routes:
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- Alunos: CRUD in `/api/alunos`
- Disciplinas: CRUD in `/api/disciplinas`
- Aluno-Disciplinas: `POST /api/aluno-disciplinas/alocar`, `POST /api/aluno-disciplinas/desalocar`, `GET /api/aluno-disciplinas/por-matricula?matricula=...`