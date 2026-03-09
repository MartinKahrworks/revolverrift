export default {
  config: {
    // Disable telemetry to prevent analytics errors
    telemetry: false,
    
    // Configure locales
    locales: ['en'],
    
    // Disable notifications
    notifications: {
      releases: false,
    },
    
    // Configure tutorials
    tutorials: false,
    
    // Theme configuration
    theme: {
      light: {},
      dark: {},
    },
    
    // Disable external scripts that might cause issues
    head: {
      script: [],
    },
  },
  
  bootstrap() {},
};
