import { useState, useEffect } from "react";
import { msalInstance, loginRequest } from "../auth/msalConfig";

export function useAuth() {
  const [account, setAccount] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    msalInstance.initialize().then(() => {
      // Handle redirect response first
      msalInstance
        .handleRedirectPromise()
        .then((response) => {
          if (response) {
            setAccount(response.account);
            setToken(response.accessToken);
          } else {
            // Check if already signed in
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              // Silently acquire token
              msalInstance
                .acquireTokenSilent({
                  ...loginRequest,
                  account: accounts[0],
                })
                .then((result) => {
                  setToken(result.accessToken);
                })
                .catch(() => {
                  // Silent failed — will need interactive login
                });
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("MSAL redirect error:", err);
          setLoading(false);
        });
    });
  }, []);

  const login = () => {
    msalInstance.loginRedirect(loginRequest);
  };

  const logout = () => {
    msalInstance.logoutRedirect();
    setAccount(null);
    setToken(null);
  };

  return { account, token, loading, login, logout };
}
