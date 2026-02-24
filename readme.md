# OTP Auth API

API em Node.js/TypeScript para autenticação por **OTP** (código via e-mail) e emissão de **JWT** para acesso a rotas privadas.

![Node](https://img.shields.io/badge/node-%3E%3D18-3C873A)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6)
![Express](https://img.shields.io/badge/express-5.x-000000)
![Prisma](https://img.shields.io/badge/prisma-7.x-2D3748)
![Postgres](https://img.shields.io/badge/postgresql-14%2B-336791)

---

## O que esse projeto faz

- Cadastro de usuário
- Login com OTP enviado por e-mail
- Validação do OTP e geração de token JWT
- Middleware de autenticação para rotas privadas
- Validação de payload com Zod
- Persistência com Prisma + PostgreSQL

---

## Stack

- Node.js + TypeScript
- Express
- Prisma + PostgreSQL
- Zod
- jsonwebtoken
- Mailtrap (envio de e-mail)
- helmet + cors

---

## Estrutura (resumo)

```
src/
  controllers/
    auth/
    privateRoute/
  services/
    auth/
    user/
  schemas/
  libs/
  routers/
  types/
  server.ts
```

---

## Requisitos

- Node.js >= 18
- PostgreSQL
- Conta no Mailtrap (ou outro provedor SMTP)

---

## Configuração

### 1) Instalar dependências

```bash
npm install
```

### 2) Variáveis de ambiente

Crie um `.env` baseado no `env.example`:

```bash
cp env.example .env
```

Exemplo (ajuste conforme seu ambiente):

```env
PORT=3000

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/otp_db?schema=public"

JWT_SECRET="sua_chave_super_secreta"
JWT_EXPIRES_IN="1d"

MAILTRAP_TOKEN="seu_token"
MAILTRAP_SENDER_EMAIL="no-reply@seudominio.com"
MAILTRAP_SENDER_NAME="OTP Auth"
```

---

## Prisma / Banco

```bash
npx prisma generate
npx prisma migrate dev
```

Opcional:

```bash
npx prisma studio
```

---

## Rodando em desenvolvimento

Se você usa `tsx`:

```bash
npx tsx src/server.ts
```

Ou, se tiver script `dev`:

```bash
npm run dev
```

---

## Fluxo de autenticação

1. `POST /auth/signin` com e-mail  
2. A API gera um OTP e envia por e-mail  
3. `POST /auth/verify` com `id` do OTP e `code`  
4. A API retorna `{ token, user }`  
5. Use o token nas rotas privadas via `Authorization: Bearer <token>`

---

## Endpoints (exemplo)

> Ajuste os paths conforme seus routers.

### Criar usuário

`POST /auth/signup`

```json
{
  "name": "Igor",
  "email": "igor@email.com"
}
```

### Solicitar OTP

`POST /auth/signin`

```json
{
  "email": "igor@email.com"
}
```

Resposta:

```json
{
  "id": 1
}
```

### Validar OTP e obter JWT

`POST /auth/verify`

```json
{
  "id": 1,
  "code": "123456"
}
```

Resposta:

```json
{
  "token": "seu.jwt.aqui",
  "user": {
    "id": 1,
    "name": "Igor",
    "email": "igor@email.com"
  }
}
```

### Rota privada (exemplo)

`GET /private`

Header:

```
Authorization: Bearer <TOKEN>
```

Resposta:

```json
{
  "user": {
    "id": 1,
    "name": "Igor",
    "email": "igor@email.com"
  }
}
```

---

## Testes rápidos (cURL)

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"igor@email.com"}'
```

```bash
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"id":1,"code":"123456"}'
```

```bash
curl -X GET http://localhost:3000/private \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## Licença

MIT.

## Autor

Igor Medeiros
