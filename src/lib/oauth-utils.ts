// Force HTTPS redirect in production
export const enforceHTTPS = () => {
  if (typeof window !== 'undefined' && 
      window.location.protocol === 'http:' && 
      window.location.hostname !== 'localhost' &&
      !window.location.hostname.includes('127.0.0.1')) {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
};

// Get the correct redirect URI for OAuth
export const getOAuthRedirectURI = () => {
  if (typeof window === 'undefined') return '';
  
  const { protocol, hostname, port } = window.location;
  
  // Always use HTTPS in production
  const useProtocol = hostname === 'localhost' || hostname.includes('127.0.0.1') 
    ? protocol 
    : 'https:';
    
  const portSuffix = port && port !== '80' && port !== '443' ? `:${port}` : '';
  
  return `${useProtocol}//${hostname}${portSuffix}`;
};

// Validate that we're using HTTPS in production
export const validateHTTPS = () => {
  if (typeof window === 'undefined') return true;
  
  const isProduction = window.location.hostname !== 'localhost' && 
                      !window.location.hostname.includes('127.0.0.1');
  
  if (isProduction && window.location.protocol !== 'https:') {
    console.error('Production OAuth requires HTTPS!');
    return false;
  }
  
  return true;
};
