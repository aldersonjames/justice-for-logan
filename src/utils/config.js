// Configuration management for environment variables

export const config = {
  // Analytics
  googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',

  // Email
  adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'stephen@justiceforlogan.com',

  // External Services
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || '',
  goFundMeUrl: import.meta.env.VITE_GOFUNDME_URL || 'https://www.gofundme.com/f/support-logan-federicos-family',
  petitionUrl: import.meta.env.VITE_PETITION_URL || '',

  // Social Media
  social: {
    facebook: import.meta.env.VITE_FACEBOOK_URL || '',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
    twitter: import.meta.env.VITE_TWITTER_URL || '',
  },

  // Site Info
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://justiceforlogan.com',
  siteName: 'Justice for Logan Federico',

  // Feature Flags
  features: {
    newsletter: true,
    memoryWall: true,
    blog: true,
    events: true,
    petition: true,
    pressKit: true,
  }
};

export default config;
