# DEPLOY ENV CHECKLIST (Vercel + Railway)

## 1) Frontend (Vercel)

Set these env vars in Vercel Project Settings → Environment Variables:

- REACT_APP_API_BASE_URL=https://<your-backend>.up.railway.app/api
- REACT_APP_API_URL=https://<your-backend>.up.railway.app
- REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID=<sheet_id>
- REACT_APP_GOOGLE_DRIVE_FOLDER_ID=<folder_id> (optional)
- REACT_APP_AI_SERVICE_URL=<ai_service_url> (optional)

## 2) Backend (Railway)

Set these env vars in Railway service Variables:

Required:

- NODE_ENV=production
- PORT=3001
- JWT_SECRET=<strong_random_secret>
- GOOGLE_SHEETS_SPREADSHEET_ID=<sheet_id>

Google credentials (choose ONE mode):

### Mode A - Inline (recommended for Railway)

- GOOGLE_SERVICE_ACCOUNT_EMAIL=<service_account_email>
- GOOGLE_PRIVATE_KEY=<private_key_with_escaped_newlines>
- GOOGLE_PROJECT_ID=<project_id> (optional)

### Mode B - File path

- GOOGLE_CREDENTIALS_PATH=/app/config/service_account.json
  (only if your deployment mounts this file)

Optional:

- GOOGLE_DRIVE_FOLDER_ID=<folder_id>
- AI_SERVICE_URL=<ai_service_url>

## 3) Link services once

Run in project root:

- vercel link --project mia-vn-google-integration
- railway login
- railway link

## 4) Deploy

- ./quick-deploy.sh "Deploy message"

## 5) Verify

- Frontend URL from deploy output
- Backend health: https://<your-backend>.up.railway.app/health
- Google proxy health: https://<your-backend>.up.railway.app/api/google/health
