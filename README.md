# Projeto EduSync

EduSync é um sistema de gestão de alunos e disciplinas construído com o stack MERN (MongoDB, Express, React, Node.js). O projeto inclui autenticação de usuário com JWT, operações CRUD para alunos e disciplinas, e a capacidade de gerenciar matrículas.

## Funcionalidades

-   **Autenticação JWT:** Cadastro e Login de usuários.
-   **CRUD de Alunos:** Crie, leia, atualize e exclua registros de alunos.
-   **CRUD de Disciplinas:** Crie, leia, atualize e exclua registros de disciplinas.
-   **Gerenciamento de Matrículas:** Associe e desassocie alunos de disciplinas.
-   **Interface Reativa:** Frontend construído com React, utilizando componentes modernos e uma interface responsiva.
-   **API Robusta:** Backend construído com Node.js/Express, com validação de dados e paginação.

## Setup e Instalação

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 14 ou superior)
-   [MongoDB](https://www.mongodb.com/try/download/community) (servidor rodando localmente)

### 1. Backend

Primeiro, configure e rode o servidor do backend.

```bash
# Navegue até a pasta do backend
cd back

# Instale as dependências
npm install

# Crie um arquivo .env na pasta 'back'
# Adicione as variáveis de ambiente conforme o .env.example
# Exemplo:
# MONGO_URI=mongodb://localhost:27017/edusync
# JWT_SECRET=your_secret_key

# Inicie o servidor de desenvolvimento
npm start
```

O servidor do backend estará rodando em `http://localhost:3000`.

### 2. Frontend

Em um novo terminal, configure e rode a aplicação React.

```bash
# Navegue até a pasta do frontend
cd front/my-app

# Instale as dependências
npm install

# Crie um arquivo .env na pasta 'front/my-app'
# Adicione a URL da API conforme o .env.example
# Exemplo:
# REACT_APP_API_URL=http://localhost:3000/api

# Inicie a aplicação React
npm start
```

A aplicação frontend estará acessível em `http://localhost:3001` (ou outra porta, se a 3000 estiver em uso pelo backend).

## Endpoints da API

A seguir, uma lista dos principais endpoints da API disponíveis. Todas as rotas (exceto `/auth/login` e `/auth/register`) são protegidas e exigem um token JWT no header `auth-token`.

### Autenticação (`/api/auth`)

-   `POST /register`: Registra um novo usuário.
-   `POST /login`: Autentica um usuário e retorna um token JWT.

### Alunos (`/api/alunos`)

-   `GET /`: Lista todos os alunos com paginação e filtro por curso.
    -   Query params: `page`, `limit`, `curso`.
-   `GET /:id`: Busca um aluno por ID.
-   `POST /`: Cria um novo aluno.
-   `PUT /:id`: Atualiza um aluno existente.
-   `DELETE /:id`: Exclui um aluno.

### Disciplinas (`/api/disciplinas`)

-   `GET /`: Lista todas as disciplinas com paginação.
    -   Query params: `page`, `limit`.
-   `GET /:id`: Busca uma disciplina por ID.
-   `POST /`: Cria uma nova disciplina.
-   `PUT /:id`: Atualiza uma disciplina existente.
-   `DELETE /:id`: Exclui uma disciplina.

### Matrículas

-   `GET /api/alunos/:alunoId/disciplinas/disponiveis`: Lista as disciplinas em que um aluno ainda não está matriculado.
-   `POST /api/alunos/:alunoId/disciplinas/:disciplinaId`: Matricula um aluno em uma disciplina.
-   `DELETE /api/alunos/:alunoId/disciplinas/:disciplinaId`: Remove a matrícula de um aluno em uma disciplina.
