# Hosting on Railway

This project is configured for deployment on Railway using a PostgreSQL database and a Node.js web service.

## Prerequisites
1. A [Railway](https://railway.app) account.
2. Your project pushed to a GitHub repository.

## Deployment Steps
1. In your Railway Dashboard, click **New Project** -> **Deploy from GitHub repo**.
2. Select your repository.
3. Railway will detect the project. You need to add a PostgreSQL database to the project:
   - Click **+ New** -> **Database** -> **Add PostgreSQL**.
4. **Environment Variables**:
   - Go to your Web Service **Variables** tab.
   - Click **New Variable** and add the following:
     - `RESEND_API_KEY`: Your Resend API key.
     - `SESSION_SECRET`: A random string for session security.
     - `NODE_ENV`: Set to `production`.
   - Railway automatically provides `DATABASE_URL` if the database is in the same project. If not, copy it from the PostgreSQL tab.

## Build & Start Commands
Railway should automatically detect these from `package.json`:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
