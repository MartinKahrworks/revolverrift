'use strict';

module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'strapi-provider-upload-supabase',
            providerOptions: {
                apiUrl: env('SUPABASE_API_URL'),
                apiKey: env('SUPABASE_API_KEY'),
                bucket: env('SUPABASE_BUCKET', 'strapi-media'),
                directory: env('SUPABASE_DIRECTORY', ''),
                options: {},
            },
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
            breakpoints: {},
        },
    },
});
