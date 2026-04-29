import { apiClient, USE_MOCK } from "./api";
import type { User, UpdateUserPayload } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_USER: User = {
  id: "u1",
  name: "Mohamed Omar",
  email: "demo@back2u.app",
  phone: "+20 100 000 0000",
  location: "Egypt, Giza",
  rating: 4.8,
  reportsCount: 12,
  matchesCount: 5,
};

// ─── Service ──────────────────────────────────────────────────────────────────
export const userService = {
  /**
   * Authenticated user's own profile.
   * GET /users/me  →  User
   */
  async getProfile(): Promise<User> {
    if (USE_MOCK) return Promise.resolve(MOCK_USER);
    return apiClient.get<User>("/users/me");
  },

  /**
   * Update the authenticated user's profile fields.
   * PUT /users/me  →  User (updated)
   */
  async updateProfile(payload: UpdateUserPayload): Promise<User> {
    if (USE_MOCK) return Promise.resolve({ ...MOCK_USER, ...payload });
    return apiClient.put<User>("/users/me", payload);
  },
};
