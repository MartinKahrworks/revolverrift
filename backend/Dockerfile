# ==========================================
# ⚡ OPTIMIZED STRAPI DOCKERFILE FOR RAILWAY
# ==========================================
FROM node:20-alpine

# Install native compilation tools for 'sharp' (used by Strapi for image processing)
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

WORKDIR /opt/app

# ==========================================
# 1. DEPENDENCY CACHE LAYER
# ==========================================
# Docker will cache this layer! It will only run 'npm install' again if your package.json changes.
# If you only change code/schemas, Docker skips this 60-second step instantly.
COPY package.json package-lock.json* ./
RUN npm install

# ==========================================
# 2. CODE & COMPILE LAYER
# ==========================================
# Copy your actual project files to the container (ignores node_modules via .dockerignore)
COPY . .

# Build the Strapi Admin UI
# This will run if any source files change, but since dependencies are cached, it skips npm install
RUN npm run build

# ==========================================
# 3. RUNTIME
# ==========================================
ENV NODE_ENV=production

EXPOSE 1337

CMD ["npm", "run", "start"]
