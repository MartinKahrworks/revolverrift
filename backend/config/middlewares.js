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
            permissionsPolicy: {
                'attribution-reporting': [],
                'private-aggregation': [],
                'private-state-token-issuance': [],
                'private-state-token-redemption': [],
                'join-ad-interest-group': [],
                'run-ad-auction': [],
                'browsing-topics': [],
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            origin: [
                'http://localhost:5173',
                'http://localhost:5174',
                'http://127.0.0.1:5173',
                'https://revolverrift.vercel.app',
                'https://revolverrift-development.vercel.app',
                'https://revolver2.vercel.app',
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
