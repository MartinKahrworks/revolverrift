# 🚀 Project Setup Guide

## Quick Setup for Team Members

### Prerequisites
- Node.js >= 20.0.0
- Git
- Code editor (VS Code recommended)

### 1️⃣ Clone & Install

```bash
# Clone the repo
git clone <your-repo-url>
cd revolverrift

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2️⃣ Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

**⚠️ IMPORTANT:** Ask Yash for the actual `.env` file contents and copy-paste them exactly!
- We share the same Neon database
- We share the same Cloudinary account
- All secrets must match between team members

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Default value: `VITE_STRAPI_URL=http://localhost:1337`

### 3️⃣ Run Development Servers

**Terminal 1 - Backend (Strapi):**
```bash
cd backend
npm run develop
```
Opens at: http://localhost:1337/admin

**Terminal 2 - Frontend (React):**
```bash
cd frontend
npm run dev
```
Opens at: http://localhost:5173

### 4️⃣ First Time Login

- **Strapi Admin:** Ask Yash for admin credentials or create your own at first launch
- Database is shared, so content changes are visible to all team members

---

## 📝 Common Commands

### Backend
```bash
npm run develop      # Development with auto-reload
npm run start        # Production mode
npm run build        # Build for production
npm run strapi       # Strapi CLI commands
```

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

---

## 🔧 Troubleshooting

### Port Already in Use
If you get "port already in use" errors:
- Backend (1337): Change `PORT` in `backend/.env`
- Frontend (5173): Vite will auto-increment to 5174, 5175, etc.

### Database Connection Issues
- Verify `DATABASE_URL` is correct in `backend/.env`
- Check your internet connection (Neon is cloud-hosted)
- Confirm Neon database is not paused

### Missing Modules
```bash
# Delete and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Deployment

- **Backend:** Configured for Railway/Render/AlphaHosting (see `railway.json`, `render.yaml`)
- **Frontend:** Configured for Vercel (see `vercel.json`)
- **Database:** Neon (PostgreSQL)
- **Media Storage:** Cloudinary

---

## 📦 Project Structure

```
revolverrift/
├── backend/          # Strapi CMS (Node.js)
│   ├── config/       # Server, database, plugins config
│   ├── src/          # API endpoints, content types
│   └── .env          # Backend environment variables
└── frontend/         # React + Vite
    ├── src/          # React components, pages
    └── .env          # Frontend environment variables
```

---

## 🤝 Need Help?

Contact Yash for:
- `.env` file contents
- Strapi admin access
- Database/Cloudinary credentials
- Deployment access
