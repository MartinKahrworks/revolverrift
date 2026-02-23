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
      origin: (ctx) => {
        const origin = ctx.request.header.origin;
        if (!origin) return false;
        // Allow any localhost or 127.0.0.1 origin during development
        if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
          return origin;
        }
        return false;
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

