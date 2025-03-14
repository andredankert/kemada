// API configuration
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

const config = {
  // Web3Forms configuration
  web3forms: {
    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '', // Access key from environment variables
    from_name: 'Kemada Website',
    to_name: 'Kemada Team'
  },
  
  // Legacy API configuration (kept for reference)
  apiBaseUrl: isDevelopment 
    ? '/api' // Development URL (relative path)
    : 'https://kemada.de/api', // Production URL
  
  // Legacy endpoints (kept for reference)
  endpoints: {
    contact: '/contact',
    testimonial: '/testimonial',
    info: '/info.php'
  }
};

export default config;