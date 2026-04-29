import { apiClient, USE_MOCK, setToken, clearToken } from "./api";
import type { LoginPayload, SignUpPayload, AuthResponse } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_AUTH: AuthResponse = {
  accessToken: "mock-jwt-token",
  user: {
    id: "u1",
    name: "Mohamed Omar",
    email: "demo@back2u.app",
    phone: "+20 100 000 0000",
    location: "Egypt, Giza",
    rating: 4.8,
    reportsCount: 12,
    matchesCount: 5,
  },
};

// ─── Service ──────────────────────────────────────────────────────────────────
export const authService = {
  /**
   * Authenticate an existing user.
   * POST /auth/login  →  { accessToken, user }
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (USE_MOCK) return Promise.resolve(MOCK_AUTH);
    const res = await apiClient.post<AuthResponse>("/auth/login", payload);
    setToken(res.accessToken);
    return res;
  },

  /**
   * Register a new account.
   * POST /auth/register  →  { accessToken, user }
   */
  async signUp(payload: SignUpPayload): Promise<AuthResponse> {
    if (USE_MOCK) return Promise.resolve(MOCK_AUTH);
    const res = await apiClient.post<AuthResponse>("/auth/register", payload);
    setToken(res.accessToken);
    return res;
  },

  /** Clear the stored JWT. */
  logout(): void {
    clearToken();
  },
};
