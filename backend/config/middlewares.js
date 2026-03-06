'use strict';

module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Allow Strapi admin to call Cloudinary API for uploads
          'connect-src': [
            "'self'",
            'https:',
            'api.cloudinary.com',         // Cloudinary upload API
            '*.cloudinary.com',           // All Cloudinary subdomains
          ],
          // Allow Cloudinary images to render in the Strapi admin panel
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',         // Cloudinary CDN (images)
            '*.cloudinary.com',
            'market-assets.strapi.io',
          ],
          // Allow Cloudinary video/audio previews
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
            '*.cloudinary.com',
            'market-assets.strapi.io',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      // Allow any localhost port — covers Vite's auto-incrementing ports (5173, 5174, 5175...)
      // Also allows the deployed Vercel frontend in production
      origin: [
        // Local development
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        // ngrok/local IP (add your current if needed, though they rotate)
        // Production Vercel apps
        'https://revolver2.vercel.app',
        'https://revolverrift.vercel.app',
        'https://revolverrift-development.vercel.app',
        // Railway backend itself
        'https://revolverriftyash-production.up.railway.app'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // modify form body limit
      jsonLimit: '256mb', // modify JSON body limit
      textLimit: '256mb', // modify text body limit
      formidable: {
        maxFileSize: 256 * 1024 * 1024, // modify uploaded file size limit (256MB)
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

