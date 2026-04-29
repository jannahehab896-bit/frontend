import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types";
import { getToken, setToken, clearToken } from "../services/api";
import { userService } from "../services/users.service";

// ─── Context shape ────────────────────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  /** Store JWT and update context. */
  saveToken: (token: string) => void;
  /** Clear user + token (called on logout). */
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: () => {},
  saveToken: () => {},
  logout: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(() => getToken());

  // On mount: if a token is already in storage, hydrate the user profile.
  useEffect(() => {
    if (token && !user) {
      userService
        .getProfile()
        .then(setUser)
        .catch(() => {
          clearToken();
          setTokenState(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToken = (t: string) => {
    setToken(t);
    setTokenState(t);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        setUser,
        saveToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
