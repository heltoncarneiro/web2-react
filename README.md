# Gestão de Alunos e Disciplinas (MERN)

Aplicação web com autenticação do professor, CRUD de Aluno e Disciplina, relação M:N (Aluno_Disciplina), e telas para gerenciar e consultar disciplinas por matrícula.

## Requisitos
- Node.js 18+ (recomendado 20+)
- Opcional: Docker (para MongoDB) — se não tiver, o backend usa MongoDB em memória para desenvolvimento

## Estrutura
- `backend`: API Node.js/Express + MongoDB (JWT via cookie)
- `front`: SPA React (Vite) responsiva

## Backend
1) Configurar variáveis de ambiente (opcional para dev):

```bash
cd backend
cp .env.example .env
# Ajuste se desejar usar seu Mongo local:
# MONGO_URI=mongodb://localhost:27017/escola
# JWT_SECRET=uma_senha_segura
```

2) Instalar e iniciar em modo desenvolvimento:

```bash
npm install
npm run dev
```

- API disponível em `http://localhost:4000/api`
- Sem Docker/Mongo local: o backend sobe automaticamente um MongoDB em memória (somente para desenvolvimento).
- Com Docker instalado: você pode subir um Mongo real com `docker compose up -d` dentro de `backend/`.

## Frontend
1) Configurar (opcional):

```bash
cd ../front
cp .env.example .env
# VITE_API_URL já aponta para http://localhost:4000/api por padrão
```

2) Instalar e iniciar:

```bash
npm install
npm run dev
```

- App disponível em `http://localhost:5173`

## Fluxo de uso
1) Acesse `http://localhost:5173/register` e crie um usuário (professor)
2) Faça login em `http://localhost:5173/login`
3) Navegue:
   - Alunos: CRUD completo
   - Disciplinas: CRUD completo
   - Gerenciar: alocar/desalocar disciplinas para aluno
   - Consultar: informar matrícula e ver disciplinas alocadas

## Endpoints principais
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- Alunos: CRUD em `/api/alunos`
- Disciplinas: CRUD em `/api/disciplinas`
- Relação Aluno-Disciplina:
  - `POST /api/aluno-disciplinas/alocar`
  - `POST /api/aluno-disciplinas/desalocar`
  - `GET /api/aluno-disciplinas/por-matricula?matricula=...`

## Notas
- Autenticação via cookie HTTP Only (JWT). O frontend envia `withCredentials`.
- Em produção, use um MongoDB real e configure `JWT_SECRET` seguro e `COOKIE_SECURE=true`.
