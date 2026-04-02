# 🚀 Complete Manual Migration Guide (Railway & Vercel)

This document outlines the step-by-step process of manually migrating the **Revolver Rift** backend (Railway) and frontend (Vercel) to a client's own accounts *without* using the platform "Transfer Ownership" features. Instead, we perform a clean extraction and deployment.

## 📋 Phase 1: Source Code & Account Preparation

Before moving any deployments, the code needs to live in the client's GitHub account so their hosting platforms can connect to it securely.

### 1. Account Setup
Have the client create or provide credentials for accounts on the following platforms:
- **GitHub** (for code hosting)
- **Railway** (for backend hosting)
- **Vercel** (for frontend hosting)
- **Supabase / Cloudinary** (for database & media storage, if applicable)

### 2. Code Transfer to Client's GitHub
1.  **Export Code:** Clone or zip your local repository for both the frontend and backend. Ensure no `.env` files or sensitive credential files are included in the transfer.
2.  **Client Repo Creation:** Have the client create a new private repository on their GitHub account.
3.  **Push Code:** 
    - Initialize a new git repository in the source folder if starting fresh.
    - Set the client's repository as the `origin` remote.
    - Push the code to the client's `main` branch.
    *(Alternatively, invite the client to your current GitHub repo and have them create a duplicate/fork into their own workspace).*

---

## 🗄️ Phase 2: Database Credentials & Storage (Pre-requisite)

Since the database is already hosted on the client's Supabase account, the heavy lifting of exporting/importing data is bypassed. We just need to gather connection details.

1.  **Retrieve Database Credentials:** Log in to the client's Supabase dashboard. Go to **Project Settings** -> **Database** -> **Connection string** and copy the `URI`.
2.  **Retrieve Storage Credentials:** Go to **Project Settings** -> **API** and copy your `Project URL` and `anon`/`service_role` keys.
3.  **Media Files:** If you haven't already migrated images/media, download them from your personal storage account and upload them to the client's Supabase Storage bucket.

---

## 🚂 Phase 3: Backend Migration (Railway)

We will recreate the backend environment from scratch on the client's Railway account.

### 1. Create a New Railway Project
1.  Log in to the client's **Railway** dashboard.
2.  Click **New Project** -> **Deploy from GitHub repo**.
3.  Select the newly created repository that contains the Backend code.
4.  Wait for the initial deployment (it will likely fail initially, which is expected since it lacks Environment Variables).

### 2. Configure Environment Variables
1.  Go to the specific Backend service in the Railway project interface.
2.  Navigate to the **Variables** tab.
3.  **To bulk import variables:** Click on the **"RAW Editor"** button in Railway (usually near the top right of the Variables section). 
    - You can copy the entire contents of your personal project's `.env` file (or from the Raw Editor of your original Railway project) and paste it directly in here. Railway will automatically parse and bulk-load all the variables at once!
4.  **Crucial Variables to Manually Update** (after importing):
    - `DATABASE_URL`: Must point to the **client's** new database.
    - `SUPABASE_URL` / `SUPABASE_KEY` (or Cloudinary equivalents): Must point to the **client's** new storage buckets.
    - `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`: You can generate new secrets using a crypto generator, or keep the exact old ones to preserve existing tokens.
    - `PORT`: Usually kept at `1337` or whatever standard port your Strapi uses.

### 3. Re-Deploy the Backend
1.  Once the variables are saved, Railway should auto-trigger a new deployment. If not, go to the **Deployments** tab and click **Redeploy**.
2.  Monitor the build logs to ensure it compiles and starts successfully.
3.  Go to the **Settings** tab -> **Networking** -> **Public Networking**, and click **Generate Domain** (or attach the client's custom domain).
4.  **Save this new Backend URL**—you will need it for the frontend.

---

## ▲ Phase 4: Frontend Migration (Vercel)

With the backend successfully running on the client's Railway, we can deploy the frontend on Vercel.

### 1. Create a New Vercel Project
1.  Log in to the client's **Vercel** dashboard.
2.  Click **Add New...** -> **Project**.
3.  Import the frontend repository from their GitHub.
4.  Vercel will usually auto-detect the framework (e.g., Vite/React/Next). Ensure the Framework Preset and Build Commands are correct.

### 2. Configure Environment Variables
1.  Before clicking "Deploy", open the **Environment Variables** dropdown.
2.  Add all necessary variables from your original Vercel project.
    **Crucial Variable to Update:**
    - `VITE_BACKEND_URL` / `NEXT_PUBLIC_API_URL` (or your specific API variable): This **must** be updated to the new Railway generated domain from Phase 3.

### 3. Deploy and Set Custom Domain
1.  Click **Deploy**.
2.  Wait for Vercel to build and publish the frontend.
3.  Once completed, navigate to the project's **Settings** -> **Domains**.
4.  Add the client's actual custom domain (e.g., `www.clientwebsite.com`) and follow Vercel's DNS instructions (setting A or CNAME records) on their domain registrar.

---

## ✅ Phase 5: Testing & Handover Verification

1.  **Frontend Access**: Visit the new frontend domain. Verify the layout and assets load properly.
2.  **API Connection**: Attempt to fetch dynamic content. This ensures the Frontend is talking to the new Railway Backend.
3.  **Strapi Admin Panel (Backend)**: Log in to the new Railway backend URL (`/admin`). Verify the content was successfully migrated.
4.  **Upload Test**: Upload a new image via the Strapi Admin panel to confirm the new Supabase/Cloudinary storage bucket is properly linked.
5.  **Shutdown Old Instances**: Once the client confirms everything is fully functional, safely delete or pause the services on your personal Railway and Vercel accounts to stop incurring costs to yourself.
