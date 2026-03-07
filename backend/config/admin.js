module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: false, // Disable telemetry
    promoteEE: false,
  },
  // Add URL configuration for Railway
  url: env('PUBLIC_URL') || env('RAILWAY_PUBLIC_DOMAIN') 
    ? `https://${env('RAILWAY_PUBLIC_DOMAIN')}` 
    : '/admin',
  // Disable auto-open browser in production
  autoOpen: false,
});
