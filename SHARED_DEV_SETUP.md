# 🚀 Shared Dev Environment Setup Guide
## Revolver Rift — Strapi v5 + Neon PostgreSQL + Cloudinary

> **Goal:** Two developers working live on the same repo — one on backend/CMS, one on frontend UI.
> Both connect to a shared cloud database (Neon) and shared media storage (Cloudinary).

---

## 📐 Architecture Overview

```
Developer 1 (Yash)                Developer 2 (Colleague)
  localhost:1337  (Strapi)          localhost:1337  (Strapi)
  localhost:5173  (Vite frontend)   localhost:5173  (Vite frontend)
        │                                   │
        └──────────────┬────────────────────┘
                       │
              ┌────────▼────────┐
              │  Neon (cloud)   │  ← Shared PostgreSQL DB
              │  PostgreSQL     │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │   Cloudinary    │  ← Shared media uploads
              └─────────────────┘
```

Both Strapi instances run locally but read/write to the **same** cloud database and the **same** media bucket. Schema changes (new fields, content types) made by either developer appear for both immediately after a `git pull`.

---

## ⚙️ Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Bundled with Node.js |
| Git | Any | [git-scm.com](https://git-scm.com) |
| PostgreSQL tools | Any | Only needed for the one-time DB migration (`pg_dump` / `pg_restore`) |

> ✅ **No local PostgreSQL server needed after initial migration** — the database runs on Neon.

---

## STEP 1 — Create a Neon Database

> 🙋 **Who does this:** Yash (once). Share the connection string with colleague via DM.

1. Go to **[neon.tech](https://neon.tech)** and sign up (free tier is sufficient for dev)
2. Click **"New Project"**
   - Name: `revolverrift`
   - Region: Pick the one closest to both developers
3. After creation, go to the project dashboard
4. Click **"Connection Details"** → select the **"Connection string"** tab
5. Copy the full URL — it looks like:
   ```
   postgresql://neondb_owner:AbCdEf123@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
6. Save this string — you'll use it in Step 3

---

## STEP 2 — Migrate Your Local Data to Neon

> 🙋 **Who does this:** Yash (once, before switching). This exports your existing blog posts, home page content, and admin account to Neon.

### 2a — Export local database

Open a terminal (anywhere) and run:

```bash
pg_dump -U postgres -d revolverriftcms -F c -f revolverrift_backup.dump
```

- `-U postgres` → your local Postgres username
- `-d revolverriftcms` → your local DB name
- `-F c` → custom binary format (best for pg_restore)
- `-f revolverrift_backup.dump` → output filename

### 2b — Import into Neon

```bash
pg_restore \
  -d "postgresql://neondb_owner:PASSWORD@ep-xxx.neon.tech/neondb?sslmode=require" \
  --no-owner \
  revolverrift_backup.dump
```

> ⚠️ The `--no-owner` flag is critical. Neon uses its own user system, and without this flag, `pg_restore` tries to assign object ownership to your local `postgres` user which doesn't exist on Neon — causing errors.

### 2c — Verify

1. Go to your Neon dashboard → **Tables** (or use the SQL editor)
2. You should see all Strapi tables: `blogs`, `home_pages`, `strapi_users`, etc.
3. If you see the tables, the migration was successful ✅

---

## STEP 3 — Configure Backend `.env`

> 🙋 **Who does this:** Both developers (each on their own machine).
> Yash fills in real values. Colleague gets them from Yash via DM.

Open `backend/.env` (copy from `backend/.env.example` if it doesn't exist):

```bash
# Windows
copy backend\.env.example backend\.env

# Mac/Linux
cp backend/.env.example backend/.env
```

Fill in the file:

```env
# ─────────────────────────────────────────
# Server
# ─────────────────────────────────────────
HOST=0.0.0.0
PORT=1337

# ─────────────────────────────────────────
# Strapi Secrets
# ⚠️  BOTH DEVELOPERS MUST USE IDENTICAL VALUES
# These are used to sign/verify tokens stored in the shared Neon DB.
# If they differ, API tokens and admin sessions won't work cross-machine.
# Get these from Yash directly.
# ─────────────────────────────────────────
APP_KEYS=<get_from_yash>
API_TOKEN_SALT=<get_from_yash>
ADMIN_JWT_SECRET=<get_from_yash>
TRANSFER_TOKEN_SALT=<get_from_yash>
ENCRYPTION_KEY=<get_from_yash>
JWT_SECRET=<get_from_yash>

# ─────────────────────────────────────────
# Neon PostgreSQL
# Get connection string from Yash or Neon dashboard.
# ─────────────────────────────────────────
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
DATABASE_SSL=true

# ─────────────────────────────────────────
# Cloudinary
# Both developers use THE SAME Cloudinary account.
# Get values from Yash or from cloudinary.com → Dashboard.
# ─────────────────────────────────────────
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

> ❌ **Never commit `.env` to Git.** It is gitignored. Share values privately over DM/WhatsApp only.

---

## STEP 4 — `config/database.js` — Already Configured ✅

Your `backend/config/database.js` has already been updated to handle Neon's SSL requirements correctly. No manual changes needed.

**What was changed:**
- When `DATABASE_URL` is set, SSL uses `{ rejectUnauthorized: false }` — required because Neon's certificate chain is rejected by Node.js strict SSL by default
- Falls back to individual `DATABASE_HOST/PORT/NAME/USER/PASSWORD` variables when `DATABASE_URL` is not set (keeping local dev possible)

---

## STEP 5 — Set Up Cloudinary

### 5a — Create a Cloudinary Account

> 🙋 **Who does this:** Yash (once). Share credentials with colleague via DM.

1. Go to **[cloudinary.com](https://cloudinary.com)** → Sign up free
   - Free tier: 25GB storage, 25GB bandwidth/month — plenty for dev
2. After login, go to the **Dashboard**
3. Note down:
   ```
   Cloud name:  revolverrift        ← you can rename this
   API Key:     123456789012345
   API Secret:  AbCdEfGhIjKlMnOpQrStUvWxYz012345
   ```
4. Add these to your `backend/.env` as shown in Step 3

### 5b — Install the Cloudinary Provider

> 🙋 **Who does this:** Both developers (once, after cloning or pulling).

```bash
cd backend
npm install @strapi/provider-upload-cloudinary
```

### 5c — `config/plugins.js` — Already Configured ✅

Your `backend/config/plugins.js` has already been updated. It reads credentials from `.env`:

```js
// backend/config/plugins.js (already in repo — do not edit)
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key:    env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },
});
```

---

## STEP 6 — `config/middlewares.js` — Already Configured ✅

Your `backend/config/middlewares.js` has already been updated with:

1. **Content Security Policy** — allows `res.cloudinary.com` so uploaded images render in the Strapi admin panel
2. **CORS** — explicitly allows both developers' local frontend URLs:
   - `http://localhost:5173` (Vite — primary)
   - `http://localhost:3000` (fallback)
   - `http://localhost:1337` (Strapi admin)

---

## STEP 7 — Install & Run Backend

> 🙋 **Who does this:** Both developers.

```bash
cd backend

# First time only
npm install

# Start Strapi in development mode
npm run develop
```

Strapi will:
1. Connect to your Neon database
2. Verify all tables exist (they do, from the migration)
3. Serve the admin panel at `http://localhost:1337/admin`

> 🔒 **First-time login:** Use the admin account credentials from Yash — they were migrated from the local DB to Neon in Step 2. Colleague uses the same login.

---

## STEP 8 — Set Up Frontend

> 🙋 **Who does this:** Both developers.

```bash
cd frontend

# Copy env template
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux
```

Fill in `frontend/.env`:

```env
# URL where your local Strapi is running
VITE_STRAPI_URL=http://localhost:1337

# API token — generate from: localhost:1337/admin → Settings → API Tokens
# Use the SAME token that already exists in Neon DB, or create a new one.
VITE_STRAPI_API_TOKEN=paste_your_api_token_here
```

**How to get/generate an API token:**

1. Go to `http://localhost:1337/admin`
2. **Settings → API Tokens → Create new API Token**
3. Name: `dev-token`, Type: **Full Access**, No expiry
4. Click **Save** → copy the token shown (it's only shown once)
5. Paste into `frontend/.env`

> 💡 Once a token is created in Neon, it works on **both** machines since the DB is shared. You don't need to create separate tokens.

Then run the frontend:

```bash
npm install   # first time only
npm run dev
```

Frontend at: **http://localhost:5173**

---

## STEP 9 — Test That Everything Works

### ✅ Test Neon Connection
1. Start Strapi (`npm run develop`)
2. Open `http://localhost:1337/admin` → you should see your existing content
3. If you see blog posts/home page data → Neon is connected ✅

### ✅ Test Cloudinary Uploads
1. In Strapi admin → **Media Library**
2. Click **"Add new assets"** → upload any image
3. Go to **[cloudinary.com](https://cloudinary.com)** → **Media Library**
4. You should see the uploaded image appear there ✅
5. Also verify the image loads correctly inside the Strapi admin panel (not blocked by CSP)

### ✅ Test Frontend → Strapi Connection
1. With both running, open `http://localhost:5173`
2. Navigate to the Blog section
3. Blog posts should load from Strapi/Neon ✅

---

## STEP 10 — Colleague Setup Checklist

> Everything the colleague needs to do after cloning the repo:

```bash
# 1. Clone repo
git clone <private-repo-url>
cd revolverrift

# 2. Backend
cd backend
npm install
copy .env.example .env      # Then fill in values received from Yash
npm run develop             # Strapi starts, connects to Neon

# 3. Frontend (new terminal)
cd ../frontend
npm install
copy .env.example .env      # Fill in VITE_STRAPI_URL + VITE_STRAPI_API_TOKEN
npm run dev
```

**Values to get from Yash (send via DM):**
- [ ] All 6 Strapi secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, `JWT_SECRET`)
- [ ] Neon `DATABASE_URL`
- [ ] Cloudinary `CLOUD_NAME`, `API_KEY`, `API_SECRET`
- [ ] Strapi admin login credentials (email + password)
- [ ] Strapi API token for frontend

---

## 📁 What's Committed vs. What Stays Local

| File | Committed to Git | Reason |
|------|-----------------|--------|
| `backend/config/database.js` | ✅ YES | Logic only, no secrets |
| `backend/config/plugins.js` | ✅ YES | Reads secrets from env |
| `backend/config/middlewares.js` | ✅ YES | CSP + CORS config, no secrets |
| `backend/.env.example` | ✅ YES | Template with placeholder values |
| `frontend/.env.example` | ✅ YES | Template with placeholder values |
| `backend/src/api/**/schema.json` | ✅ YES | Content type schemas |
| `backend/.env` | ❌ NO | Real secrets (gitignored) |
| `frontend/.env` | ❌ NO | Real API token (gitignored) |
| `backend/node_modules/` | ❌ NO | Regenerated by `npm install` |
| `frontend/node_modules/` | ❌ NO | Regenerated by `npm install` |
| `backend/public/uploads/` | ❌ NO | Now handled by Cloudinary |

---

## 👥 Two-Developer Workflow Best Practices

### Schema Changes (Strapi Content Types)

> Schema changes = editing content type fields in the Strapi admin panel. These auto-update files in `backend/src/api/**/schema.json`.

| Rule | Why |
|------|-----|
| **Communicate before changing schema** | Tell your colleague "I'm adding a field to blog" before doing it |
| **Always `git pull` before changing schema** | Make sure you have the latest schema before modifying it |
| **Commit schema changes immediately** | After adding/changing a field in admin, the `.json` files change on disk. Commit right away with a clear message like `feat: add author field to blog` |
| **Never both edit schema at the same time** | Parallel schema edits = merge conflicts in `.json` files |
| **Colleague focuses on frontend** | If he's only doing UI work, he should never touch the Strapi admin schema at all |

### Daily Workflow

```
Morning:
  git pull                  → get latest schema changes
  cd backend && npm run develop
  cd frontend && npm run dev

During work (if you change a content type schema):
  git add backend/src/
  git commit -m "feat: add cover_image field to blog"
  git push
  → Tell colleague to git pull

Evening:
  git add .
  git commit -m "your changes"
  git push
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|---------|
| `SSL SYSCALL EOF detected` | Make sure `DATABASE_URL` ends with `?sslmode=require` |
| `self-signed certificate` error | The `rejectUnauthorized: false` in `database.js` should handle this. Check you saved the file. |
| Images don't show in admin | Ensure `CLOUDINARY_NAME/KEY/SECRET` are correct in `.env` and Strapi was restarted after adding them |
| `CORS error` in browser | Check `config/middlewares.js` — your frontend URL must be in the `origin` array |
| Colleague can't log in to admin | Confirm you both have the same `ADMIN_JWT_SECRET` in your `.env` files |
| API token doesn't work | Confirm both machines have the same `API_TOKEN_SALT` — tokens are hashed with this salt |
| `Cannot find module '@strapi/provider-upload-cloudinary'` | Run `npm install` in the `backend/` folder |

---

## 📦 npm Scripts Reference

### Backend
```bash
npm run develop   # Dev mode with auto-reload (use this for daily development)
npm run build     # Builds the admin panel (run before npm start)
npm run start     # Production mode, no auto-reload
```

### Frontend
```bash
npm run dev       # Dev server with HMR at localhost:5173
npm run build     # Production build → outputs to dist/
npm run preview   # Preview production build locally
```

---

*Last updated: February 2026*
*Stack: Strapi v5.36.1 · Neon PostgreSQL · Cloudinary · React + Vite*
