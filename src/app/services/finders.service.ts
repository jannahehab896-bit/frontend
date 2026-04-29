import { apiClient, USE_MOCK } from "./api";
import type { FinderProfile } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_FINDERS: Record<string, FinderProfile> = {
  f1: {
    id: "f1",
    name: "Mohamed Omar",
    phone: "+20 100 000 0000",
    rating: 4,
    isTrusted: true,
    message:
      "I found this wallet near LC Waikiki. I'll keep it safe — please contact me at your earliest convenience.",
  },
  // Alias keyed by match ID for backward-compat with existing navigation
  "1": {
    id: "f1",
    name: "Mohamed Omar",
    phone: "+20 100 000 0000",
    rating: 4,
    isTrusted: true,
    message:
      "I found this wallet near LC Waikiki. I'll keep it safe — please contact me at your earliest convenience.",
  },
};

// ─── Service ──────────────────────────────────────────────────────────────────
export const finderService = {
  /**
   * Finder profile by finder ID (or match ID — the backend resolves both).
   * GET /finders/:id  →  FinderProfile
   */
  async getFinderById(id: string): Promise<FinderProfile> {
    if (USE_MOCK) {
      return Promise.resolve(MOCK_FINDERS[id] ?? MOCK_FINDERS["f1"]);
    }
    return apiClient.get<FinderProfile>(`/finders/${id}`);
  },
};
