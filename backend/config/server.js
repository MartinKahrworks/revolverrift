module.exports = ({ env }) => {
  // Gracefully handle Railway's auto-provided domain or user's PUBLIC_URL
  let externalUrl = env('PUBLIC_URL', '');
  if (!externalUrl && env('RAILWAY_PUBLIC_DOMAIN')) {
    externalUrl = `https://${env('RAILWAY_PUBLIC_DOMAIN')}`;
  } else if (externalUrl && !externalUrl.startsWith('http')) {
    externalUrl = `https://${externalUrl}`;
  }

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: externalUrl,
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
