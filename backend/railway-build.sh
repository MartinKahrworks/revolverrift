# Railway build script for Strapi
# This ensures a clean build every time

echo "🧹 Cleaning old build artifacts..."
rm -rf .cache dist build .strapi node_modules/.cache

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building Strapi admin panel..."
npm run build

echo "✅ Build complete!"
