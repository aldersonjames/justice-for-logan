// Google Analytics 4 Integration
import ReactGA from 'react-ga4';

let initialized = false;

export const initializeAnalytics = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId && !initialized) {
    ReactGA.initialize(measurementId);
    initialized = true;
    console.log('Google Analytics initialized');
  }
};

export const trackPageView = (path) => {
  if (initialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category, action, label = null, value = null) => {
  if (initialized) {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  }
};

// Track specific events
export const trackFormSubmission = (formName) => {
  trackEvent('Form', 'Submit', formName);
};

export const trackMediaClick = (articleTitle, articleLink) => {
  trackEvent('Media', 'Click', articleTitle);
};

export const trackDonationClick = () => {
  trackEvent('Engagement', 'Donation Click');
};

export const trackPetitionClick = () => {
  trackEvent('Engagement', 'Petition Click');
};

export const trackSocialShare = (platform) => {
  trackEvent('Social', 'Share', platform);
};

export const trackDownload = (fileName) => {
  trackEvent('Download', 'Press Kit', fileName);
};
