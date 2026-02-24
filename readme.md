# 🔐 OTP Auth API (Node + Express + Prisma + Postgres)

API em **Node.js/TypeScript** com autenticação via **OTP (One-Time Password)** e emissão de **JWT** para acesso a **rotas privadas**.

---

## ✨ Features

- ✅ Cadastro de usuário (sign up)
- ✅ Login via e-mail (sign in) com envio de **OTP**
- ✅ Verificação do OTP e geração de **JWT**
- ✅ Middleware de autenticação para **rotas privadas**
- ✅ Validação de payloads com **Zod**
- ✅ Persistência com **Prisma + PostgreSQL**
- ✅ Segurança básica com **Helmet** e **CORS**

---

## 🧰 Stack / Tecnologias

- **Node.js + TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL** (`pg` + `@prisma/adapter-pg`)
- **JWT** (`jsonwebtoken`)
- **Zod** (validação)
- **Mailtrap** (envio de e-mails)
- **uuid**
- **helmet / cors**
- **tsx / nodemon** (dev)

---

## 📁 Estrutura do Projeto (resumo)

```
src/
  controllers/
    auth/
      signInController.ts
      signUpController.ts
      verifyOTPController.ts
    privateRoute/
      privateRouterController.ts
  libs/
    jwt.ts
    mailtrap.ts
    prisma.ts
  routers/
    main.ts
  schemas/
    auth-otp.ts
    auth-signin.ts
    auth-signup.ts
  services/
    auth/
      generateOTPService.ts
      validateOTPService.ts
    user/
      userService.ts
  types/
    extended-request.ts
  server.ts
```

> Nomes podem variar conforme sua organização atual — o conceito é o mesmo.

---

## ✅ Requisitos

- Node.js (recomendado **18+**)
- PostgreSQL
- Conta no Mailtrap (ou outro provedor de e-mail)

---

## ⚙️ Configuração

### 1) Clone e instale as dependências

```bash
git clone <seu-repo>
cd otp-system-backend
npm install
```

### 2) Crie o arquivo `.env`

Você pode copiar o exemplo:

```bash
cp env.example .env
```

Exemplo de `.env` (ajuste para o seu ambiente):

```env
# Server
PORT=3000

# Database (Postgres)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/otp_db?schema=public"

# JWT
JWT_SECRET="sua_chave_super_secreta"
JWT_EXPIRES_IN="1d"

# Mailtrap (exemplo)
MAILTRAP_TOKEN="seu_token"
MAILTRAP_SENDER_EMAIL="no-reply@seudominio.com"
MAILTRAP_SENDER_NAME="OTP Auth"
```

> Se seus nomes de variáveis forem diferentes no projeto, mantenha os que seu código usa.

---

## 🧱 Prisma / Banco de Dados

### 1) Gerar client e rodar migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 2) (Opcional) Abrir Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Rodando o projeto

### Desenvolvimento (recomendado)

Se você usa **tsx**:

```bash
npx tsx src/server.ts
```

Se você usa **nodemon**, exemplo:

```bash
npx nodemon
```

> Depende do seu script no `package.json`. Se quiser, adicione scripts assim:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "node dist/server.js",
    "build": "tsc -p tsconfig.json",
    "prisma:studio": "prisma studio"
  }
}
```

---

## 🔁 Fluxo de autenticação (OTP → JWT)

1. **Sign In** (usuário informa e-mail)
2. API gera OTP e envia por e-mail
3. **Verify OTP** (usuário envia `id` do OTP + `code`)
4. API retorna `token` JWT
5. Token é usado no header `Authorization` para rotas privadas

---

## 📌 Endpoints (exemplo)

> Ajuste os paths conforme seus routers.

### Auth

#### `POST /auth/signup`
Cria um usuário.

**Body**
```json
{
  "name": "Igor",
  "email": "igor@email.com"
}
```

#### `POST /auth/signin`
Gera e envia OTP para o e-mail.

**Body**
```json
{
  "email": "igor@email.com"
}
```

**Response**
```json
{
  "id": 1
}
```

#### `POST /auth/verify`
Valida OTP e retorna JWT.

**Body**
```json
{
  "id": 1,
  "code": "123456"
}
```

**Response**
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

---

## 🔒 Rotas privadas

### `GET /private`
Exemplo de rota protegida.

**Headers**
```
Authorization: Bearer <TOKEN>
```

**Response**
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

## 🛡️ Segurança

- `helmet` adiciona headers de segurança
- `cors` controla acesso cross-origin
- OTP com expiração (ex.: 30 min)
- OTP marcado como `used` após validação
- JWT assinado com `JWT_SECRET`

---

## 🧪 Dicas de teste (cURL)

### Sign in
```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"igor@email.com"}'
```

### Verify OTP
```bash
curl -X POST http://localhost:3000/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"id":1,"code":"123456"}'
```

### Rota privada
```bash
curl -X GET http://localhost:3000/private \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📝 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se à vontade para usar, estudar e modificar.

---

## 👤 Autor

**Igor Medeiros**  
Se curtiu o projeto, deixa uma ⭐ no repositório!
