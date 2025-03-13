// API configuration
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

const config = {
  // Web3Forms configuration
  web3forms: {
    access_key: '72e59793-e27f-40d2-a308-1044b9e54596', // Replace with your actual access key from web3forms.com
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