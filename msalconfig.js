const msalConfig = {
  auth: {
    clientId: 'cf01424e-21e3-4b98-bb96-93d91e32cf7b',
    authority: 'https://login.microsoftonline.com/common', // Or your tenant ID
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
