# NestJS

Estudos com NestJS e TypeScript (agosto e setembro de 2024).

| Projeto | Conteúdo |
|---|---|
| [`prisma-mysql`](prisma-mysql) | API com autenticação JWT (cadastro, login, recuperação e troca de senha), senhas com `bcrypt`, perfis de acesso (usuário e administrador) com guards, envio de e-mail, limite de requisições (`throttler`), validação com `class-validator` e envio de arquivos. Usa Prisma com MySQL. |
| [`typeorm-mysql`](typeorm-mysql) | A mesma API com TypeORM em vez de Prisma, com entidade de usuário e migrations. |
| [`courses-api`](courses-api) | API simples de cursos, com dados de exemplo (mocks) e documentação Swagger em `/api`. |

## Como executar

Em cada projeto, dentro da pasta:

```bash
npm install
cp .env.example .env     # apenas prisma-mysql e typeorm-mysql
npm run start:dev        # sobe em http://localhost:3000
```

- **`prisma-mysql`**: defina `DATABASE_URL` e `JWT_SECRET` no `.env` e aplique as migrations do Prisma (`npx prisma migrate deploy`).
- **`typeorm-mysql`**: defina `DB_*`, `JWT_SECRET` e `ENV` no `.env`. As migrations rodam com `npm run migrate:up`.
- **`courses-api`**: não precisa de variáveis de ambiente.

O envio de e-mail dos projetos de autenticação usa a configuração SMTP definida em `src/app.module.ts`.
