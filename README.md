# WhatsAppQueue API

This project is a Node.js backend application built using TypeScript, designed to integrate with WhatsApp Web running locally. It exposes a structured RESTful API, handles authentication via QR code, and sends messages programmatically. The application emphasizes clean architecture, modularity, error handling, logging, rate limiting, and concurrency management, making it production-ready and scalable.

---

## 🏗 Architecture Overview

The system is organized into modular layers:

- **Controllers**: Handle incoming HTTP requests and send responses (`src/app/controllers`).
- **Services**: Business logic for WhatsApp integration and messaging (`src/app/services`).
- **Routes**: Define REST endpoints (`src/app/routes`).
- **Queue**: Manages message enqueueing and processing (`src/app/queue`).
- **Middlewares**: Validation, rate limiting, error handling and not-found handling (`src/app/middlewares`).
- **Utils & Helpers**: Shared utilities like logging and error classes (`src/app/utils`, `src/app/helpers`).
- **Redis**: Connection and persistence layer for queues and sessions (`src/app/redis`).
- **Sockets**: Real-time events via Socket.IO (`src/app/sockets`).

> The architecture promotes separation of concerns and supports easy testing and scaling.


## 📦 Features

- QR code authentication for WhatsApp Web
- Real-time QR transmission over Socket.IO
- Session persistence to avoid repeated logins
- Automatic reconnection handling
- REST API for sending messages to phone numbers
- Request validation, rate limiting, and error handling
- Concurrent requests support with queue management
- Centralized logging and modular structure

---

## ⚙️ Setup Instructions

1. **Clone repository**
   ```bash
   git clone https://github.com/developersajadur/whatsapp-queue-api.git
   cd whatsapp-queue-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root with the following entries (example based on your environment):
   ```env
   NODE_ENV=development

   PORT=5000

   REDIS_HOST=localhost
   REDIS_PORT=6379

   RATE_LIMIT_WINDOW_MS=60000
   RATE_LIMIT_MAX_REQUESTS=50
   ```
   Adjust values as needed.

4. **Run Redis**
   Ensure a Redis instance is running (local or docker). Example using Docker:
   ```bash
   docker run -d --name whatsapp-redis -p 6379:6379 redis
   ```

5. **Start the server**
   ```bash
   npm run start:dev
   ```
   The API will listen on the configured `PORT`.

---

## 🔑 Environment Variables

| Variable                 | Description                                   | Example                     |
|--------------------------|-----------------------------------------------|-----------------------------|
| `NODE_ENV`              | Application environment                         | `development`               |
| `PORT`                  | HTTP server port                                | `5000`                      |
| `REDIS_HOST`            | Redis hostname                                  | `localhost`                 |
| `REDIS_PORT`            | Redis port                                      | `6379`                      |
| `RATE_LIMIT_WINDOW_MS`  | Time window for rate limiting in milliseconds   | `60000`                     |
| `RATE_LIMIT_MAX_REQUESTS`| Max requests per window for rate limiting      | `50`                       |

---

## 🚀 Demo Steps

1. **Open the client**
   - Use Socket.IO client (e.g., browser) to connect to `http://localhost:5000`.

2. **Authenticate via QR**
   - On startup, the server generates a QR code for WhatsApp login.
   - The QR is emitted via Socket.IO event (`qr`) to connected clients.
   - Scan the QR using the WhatsApp mobile app.

3. **Session Persistence**
   - Once authenticated, the session is stored on disk.
   - Restarting the server reuses the session to avoid re-scanning.

4. **Send a Message via API**
   - POST to `/api/v1/messages/send` with JSON payload:
     ```json
     {
       "to": "1234567890",
       "message": "Hello from WhatsAppQueue!"
     }
     ```
   - The controller validates input, queues the job, and responds with success or error.
   - Queue worker processes the job and sends the message via the active WhatsApp session.

5. **Observe Real-Time Feedback**
   - Socket events (`message:sent`, `message:error`) can be emitted for updates.

---


## Logging

- The app uses `winston` configured with:
  - Timestamps (YYYY-MM-DD HH:mm:ss)
  - Colored console output in development
  - File transports: `logs/error.log` (errors) and `logs/combined.log` (all levels)
  - `errors({ stack: true })` to include stack traces in logs
- HTTP request logging is done with `morgan` piped into the Winston stream; logs include method, url, status, response-time, and request body.

If you change file paths, update `src/app/utils/logger.ts` accordingly.

---


## 🧩 API Example

### **Send Message**

**Endpoint**: `POST /api/v1/messages/send`

**Request Body**:
```json
{
  "to": "<phone_number_without_plus>",
  "message": "Your message text"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Message queued successfully"
}
```

**Error Response (4xx/5xx)**:
```json
{
  "success": false,
  "message": "Validation error: 'to' is required",
  "errors": [
    {
      "field": "to",
      "issue": "required"
    }
  ]
}
```

---

## Tests

- Tests are written with Vitest and Supertest. A global setup file `src/__tests__/testSetup.ts` mocks `bullmq` and stubs the rate limiter so tests run without Redis or external services.
- `vitest.config.ts` is configured to load that setup file automatically.

Run tests:
```bash
npm test
```

Run a single test file or watch mode:
```bash
npx vitest src/__tests__/api.test.ts --watch
```

If tests fail due to environment differences, ensure `testSetup.ts` is present or run Vitest with the project config.

---

## Scripts

- `npm run start:dev` — start server in development with ts-node-dev
- `npm run build` — compile TypeScript (tsc)
- `npm test` — run Vitest
- `npm run lint` / `npm run format` — linting/formatting

---

## 📁 Project Structure
```
src/
  app.ts                # Entry point
  server.ts             # HTTP/Socket server initialization
  __tests__/            # vitest test cases
  app/
    config/
    controllers/
    errors/
    globalTypes/
    helpers/
    middlewares/
    queue/
    redis/
    routes/
    services/
    sockets/
    utils/
    validators/
```

---

## ✅ Production Readiness

- Organized codebase for maintainability
- Environment-based configurations
- Rate limiting and validation to prevent abuse
- Queue system for managing concurrency
- Session persistence and reconnection for reliability
- Structured logging for observability

---