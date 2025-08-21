# Project: git_auth&jwt (Frontend + Backend)
FREE => FORK => FUN => LEARN
This single README provides a short overview and quick start instructions for both the frontend (React + Vite) and backend (Express + MongoDB + JWT) parts of the project.

## Project structure

- `backend/` — Node/Express API, JWT authentication, MongoDB models
- `frontend/` — React app built with Vite, routing and JWT handling

## Dependencies (summary from package.json)

Backend dependencies
- bcryptjs ^3.0.2
- cors ^2.8.5
- dot ^1.1.3
- dotenv ^17.2.1
- express ^5.1.0
- jsonwebtoken ^9.0.2
- mongoose ^8.17.2
- nodemon ^3.1.10

Frontend dependencies
- axios ^1.11.0
- jwt-decode ^4.0.0
- react ^19.1.1
- react-dom ^19.1.1
- react-router-dom ^7.8.1

Frontend devDependencies (high level)
- vite ^7.1.2
- @vitejs/plugin-react ^5.0.0
- eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals
- @types/react, @types/react-dom

Note: versions are taken from each folder's `package.json`.

## Environment (backend)

Create a `.env` file inside the `backend/` directory (not included in repo). Typical variables:

- MONGO_URI — MongoDB connection string
- JWT_SECRET — secret used to sign JWTs
- PORT — server port (example: 5000)

Ensure these values are set before starting the backend server.

## Install & run (PowerShell on Windows)

Backend (install & dev):

```powershell
cd backend
npm install
npm run dev
```

Frontend (install & dev server):

```powershell
cd frontend
npm install
npm run dev
```

Build frontend for production:

```powershell
cd frontend
npm run build
# preview the build
npm run preview
```

## Important scripts

- Backend: `dev` => `nodemon index.js` (auto-restarts)
- Frontend: `dev` => `vite`, plus `build`, `preview`, `lint`

## Expected ports

- Backend: 5000 (or the value set in `.env`)
- Frontend (Vite): 5173 (Vite default)

## Quick smoke test

1. Configure `backend/.env` and start the backend. Confirm the server connects to MongoDB and listens on the expected port.
2. Start the frontend and open `http://localhost:5173` (or the port Vite shows).
3. Use the UI to register/login and verify protected routes and JWT behavior.

## Troubleshooting

- Unable to connect to MongoDB: check `MONGO_URI`, network access, and that MongoDB is running.
- JWT issues: ensure `JWT_SECRET` is set and consistent between token issuance and verification.
- Frontend cannot reach API: check backend CORS settings and frontend base URL.

## Next steps / suggestions

- Add `backend/.env.example` to show required environment variables.
- Add separate, more detailed READMEs inside `frontend/` and `backend/` with API endpoint examples and environment setup.

---

This README is a brief overview and quick start guide for the project.
