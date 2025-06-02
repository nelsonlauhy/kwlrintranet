const msalInstance = new msal.PublicClientApplication(msalConfig);

// Automatically check login state on page load
msalInstance.handleRedirectPromise()
  .then((response) => {
    if (response) {
      // Successful login with redirect
      sessionStorage.setItem("user", JSON.stringify(response.account));
      window.location.href = "dashboard.html";
    } else {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        // Already signed in
        sessionStorage.setItem("user", JSON.stringify(accounts[0]));
        window.location.href = "dashboard.html";
      } else {
        // ❗Not signed in → auto-trigger login
        msalInstance.loginRedirect({
          scopes: ["user.read"]
        });
      }
    }
  })
  .catch((error) => {
    console.error("Login error: ", error);
  });
