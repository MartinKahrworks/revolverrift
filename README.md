# Revolver Rift — Developer Setup Guide

Hey! Follow this guide to get the full project running on your machine.
You'll have access to the same Strapi CMS dashboard, database, and media storage as Yash.

---

## What's Running Where

| Service | What it is | Where |
|---------|-----------|-------|
| **Strapi** | CMS + API server | Your machine (`localhost:1337`) |
| **Vite frontend** | React website | Your machine (`localhost:5173`) |
| **Neon** | PostgreSQL database | Cloud — shared with Yash |
| **Cloudinary** | Image/media storage | Cloud — shared with Yash |

> You run Strapi and the frontend locally. The database and media are already in the cloud.

---

## Prerequisites

Install these before starting:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org) |
| npm | v9+ | Comes with Node.js |
| Git | Any | [git-scm.com](https://git-scm.com) |

Check your versions:
```bash
node -v    # should show v20.x.x or higher
npm -v     # should show v9.x.x or higher
```

---

## Step 1 — Clone the Repo

```bash
git clone <repo-url>
cd revolverrift
```

---

## Step 2 — Backend Setup (Strapi CMS)

### 2a — Install dependencies
```bash
cd backend
npm install
```

### 2b — Create your `.env` file
Create a new file called `.env` inside the `backend/` folder.
Paste the exact values Yash sent you into it. The file should look like this:

```env
HOST=0.0.0.0
PORT=1337

APP_KEYS=<from Yash>
API_TOKEN_SALT=<from Yash>
ADMIN_JWT_SECRET=<from Yash>
TRANSFER_TOKEN_SALT=<from Yash>
ENCRYPTION_KEY=<from Yash>
JWT_SECRET=<from Yash>

DATABASE_CLIENT=postgres
DATABASE_URL=<from Yash>
DATABASE_SSL=true

CLOUDINARY_NAME=<from Yash>
CLOUDINARY_KEY=<from Yash>
CLOUDINARY_SECRET=<from Yash>
```

> ⚠️ **Do not change any of these values.** They must match exactly for you to connect to the shared database.

### 2c — Start Strapi
```bash
npm run develop
```

First boot takes **2–4 minutes** — Strapi is connecting to the cloud database. You'll see migration logs scrolling. Wait for:

```
✔ Loading Strapi
Strapi started successfully
http://localhost:1337/admin
```

### 2d — Log in to the Strapi admin panel
Open: **http://localhost:1337/admin**

- Use the login credentials Yash gave you (his admin email + password)
- Or if Yash sent you an invite email, click the link to set your own password

You should see all the existing content — blog posts, pages, media — everything Yash has already set up. ✅

---

## Step 3 — Frontend Setup (React + Vite)

Open a **new terminal** (keep Strapi running in the first one).

### 3a — Install dependencies
```bash
cd frontend
npm install
```

### 3b — Create your `.env` file
Create a file called `.env` inside the `frontend/` folder:

```env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=<from Yash>
```

> Get the API token from Yash — or generate one yourself:
> Strapi admin → **Settings** → **API Tokens** → **Create new token** → Type: Full Access → Save → copy the token.

### 3c — Start the frontend
```bash
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Running Both Together

You need **two terminals** open at the same time:

| Terminal | Folder | Command |
|----------|--------|---------|
| Terminal 1 | `backend/` | `npm run develop` |
| Terminal 2 | `frontend/` | `npm run dev` |

---

## Daily Workflow

```bash
# Every morning before starting work:
git pull                  # get Yash's latest code changes

# Backend terminal:
cd backend
npm run develop

# Frontend terminal (separate window):
cd frontend
npm run dev
```

If Yash added new fields to the CMS (schema changes), you'll need to restart Strapi after `git pull` for them to take effect.

---

## Useful URLs

| URL | What it is |
|-----|-----------|
| `http://localhost:5173` | React frontend (your work) |
| `http://localhost:1337/admin` | Strapi CMS dashboard |
| `http://localhost:1337/api/blogs?populate=*` | Blog API endpoint (raw JSON) |

---

## Project Structure

```
revolverrift/
├── backend/          → Strapi CMS
│   ├── config/       → Database, plugins, CORS settings
│   ├── src/api/      → Content type schemas (blog, home-page, etc.)
│   ├── src/components/ → Reusable Strapi component schemas
│   └── .env          → Your local secrets (never committed to git)
│
└── frontend/         → React + Vite
    ├── src/
    │   ├── Components/ → All React components
    │   └── App.jsx     → Routes
    ├── api/            → Strapi API fetch functions
    └── .env            → Your local secrets (never committed to git)
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm run develop` crashes immediately | Make sure `backend/.env` exists with all values filled in |
| `Cannot find module '@strapi/provider-upload-cloudinary'` | Run `npm install` inside `backend/` |
| Blog posts not loading on frontend | Check `frontend/.env` has the correct `VITE_STRAPI_API_TOKEN` |
| CORS error in browser console | Make sure Strapi is running on port `1337` |
| Strapi takes very long to start | Normal — it's connecting to the cloud DB. Wait for "started successfully" |
| Can't log in to Strapi admin | Ask Yash for the admin credentials or check your invite email |

---

## Rules for Working Together

- **Don't both edit CMS schema at the same time** — schema changes live in `.json` files that can conflict
- **Always `git pull` before adding new content types** in the Strapi admin
- **Commit schema changes immediately** after making them and message Yash to pull
- **Media uploads go to Cloudinary automatically** — no extra steps needed
- **Content changes (blog posts, etc.) are live instantly** — no git push required

---

*Stack: Strapi v5.36.1 · Neon PostgreSQL · Cloudinary · React + Vite*
