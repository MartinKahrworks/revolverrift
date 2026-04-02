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
                    'connect-src': [
                        "'self'",
                        'https:',
                        '*.supabase.co', // Allow Supabase endpoints
                    ],
                    'img-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        '*.supabase.co', // Allow Supabase CDN images
                        'market-assets.strapi.io',
                    ],
                    'media-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        '*.supabase.co', // Allow Supabase CDN video and audio
                        'market-assets.strapi.io',
                    ],
                    'script-src': [
                        "'self'",
                        "'unsafe-inline'",
                        "'unsafe-eval'",
                        'cdn.jsdelivr.net',
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            origin: [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://localhost:4173',
                'http://localhost:4174',
                'http://127.0.0.1:5173',
                'http://127.0.0.1:4173',
                'http://127.0.0.1:4174',
                'https://revolverrift.vercel.app',
                'https://revolverrift-development.vercel.app',
                'https://revolver2.vercel.app',
                'https://revolverrift-eta.vercel.app',
                /^https:\/\/.*\.vercel\.app$/,
                'https://revolver-rift.com',
                'https://www.revolver-rift.com',
                /^https:\/\/.*\.revolver-rift\.com$/,
                'https://revolverriftyash-production.up.railway.app',
                'https://revolverrift-production.up.railway.app'
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
            formLimit: '256mb',
            jsonLimit: '256mb',
            textLimit: '256mb',
            formidable: {
                maxFileSize: 256 * 1024 * 1024,
            },
        },
    },
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];