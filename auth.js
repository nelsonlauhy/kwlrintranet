const msalInstance = new msal.PublicClientApplication(msalConfig);

// Try silent login first
msalInstance.handleRedirectPromise().then((response) => {
  if (response) {
    // Successful login
    sessionStorage.setItem("user", JSON.stringify(response.account));
    window.location.href = "dashboard.html";
  } else {
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts.length > 0) {
      sessionStorage.setItem("user", JSON.stringify(currentAccounts[0]));
      window.location.href = "dashboard.html";
    }
  }
}).catch((error) => {
  console.error(error);
});

function signIn() {
  msalInstance.loginRedirect({
    scopes: ["user.read"]
  });
}
