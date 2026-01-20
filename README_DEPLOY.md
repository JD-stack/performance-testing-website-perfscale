Deployment steps and next actions

- Server: Move backend code into `server/` (already added). Install dependencies inside `server/` and set env vars from `server/.env.example`.
  - Example commands:
```
cd server
npm install
```

- Frontend: Move your existing frontend `src/`, `styles/`, components, and other frontend assets into `client/` (preserve same relative imports). Then inside `client/` run:
```
cd client
npm install
npm run build
```

- Deploy backend (Render example):
  - Push repo to GitHub.
  - On Render, create a Web Service pointing to repo root with `Root directory` = `server/`.
  - Build command: `npm install`
  - Start command: `node index.js` or `npm start`
  - Add environment variables: `MONGODB_URI`, `JWT_SECRET`, etc.

- Deploy frontend (Netlify example):
  - Create site from Git → choose repo.
  - Base directory: `client/`
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Add env var `VITE_API_BASE_URL` = `https://your-app.onrender.com`
  - (Optional) The `_redirects` file in `client/public` can proxy `/api/*` to your backend.

Notes:
- I updated `src/pages/Login.tsx` and `src/pages/SignUp.tsx` to use `import.meta.env.VITE_API_BASE_URL`.
- I added the `server/` folder and server code that reads `MONGODB_URI` and listens on `process.env.PORT`.
