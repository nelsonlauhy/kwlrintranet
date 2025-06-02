const msalInstance = new msal.PublicClientApplication(msalConfig);

// Try to handle redirect response (if coming back from login)
msalInstance.handleRedirectPromise()
  .then((response) => {
    if (response) {
      sessionStorage.setItem("user", JSON.stringify(response.account));
      window.location.href = "dashboard.html";
    } else {
      const currentAccounts = msalInstance.getAllAccounts();
      if (currentAccounts.length > 0) {
        sessionStorage.setItem("user", JSON.stringify(currentAccounts[0]));
        window.location.href = "dashboard.html";
      } else {
        // Try silent SSO first
        msalInstance.ssoSilent({
          scopes: ["user.read"],
          loginHint: "", // Optional: prefill known email
        }).then((ssoResponse) => {
          sessionStorage.setItem("user", JSON.stringify(ssoResponse.account));
          window.location.href = "dashboard.html";
        }).catch((error) => {
          // If silent SSO fails (e.g., no session), fallback to redirect login
          console.warn("Silent SSO failed, redirecting:", error);
          msalInstance.loginRedirect({
            scopes: ["user.read"]
          });
        });
      }
    }
  })
  .catch((error) => {
    console.error("Login error: ", error);
  });
