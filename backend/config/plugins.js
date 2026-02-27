'use strict';

module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: '@strapi/provider-upload-cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            },
            // Controls how many responsive image sizes Strapi generates per upload.
            // By default Strapi creates 5 versions: thumbnail, small, medium, large, original.
            // These are useful for srcset / responsive images on the frontend.
            //
            // OPTION B — Disable ALL extra formats (only original stored):
            // Delete the breakpoints block above and uncomment this instead:
            breakpoints: {},
        },
    },
});
