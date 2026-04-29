import { apiClient, USE_MOCK } from "./api";
import type { Match } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_MATCHES: Record<string, Match> = {
  "1": {
    id: "1",
    reportId: "r2",
    itemName: "Black wallet",
    itemImageUrl:
      "https://images.unsplash.com/photo-1551081717-5574f25d3a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    finderNote:
      "I found this wallet near LC Waikiki. If it's yours, please DM me — I'll keep it safe until we connect.",
    location: "Mall of Arabia, Giza",
    confidence: 95,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    finder: {
      id: "f1",
      name: "Mohamed Omar",
      phone: "+20 100 000 0000",
      rating: 4,
      isTrusted: true,
      message:
        "I found this wallet near LC Waikiki. I'll keep it safe — please contact me at your earliest convenience.",
    },
  },
};

// ─── Service ───────────────────────────────────────────────────────────��──────
export const matchService = {
  /**
   * Match details (includes finder snapshot).
   * GET /matches/:id  →  Match
   */
  async getMatchById(id: string): Promise<Match> {
    if (USE_MOCK) {
      return Promise.resolve(MOCK_MATCHES[id] ?? MOCK_MATCHES["1"]);
    }
    return apiClient.get<Match>(`/matches/${id}`);
  },

  /**
   * Dismiss a match ("Not mine" action).
   * DELETE /matches/:id
   */
  async dismissMatch(id: string): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.delete<void>(`/matches/${id}`);
  },
};

// ─── Utility ──────────────────────────────────────────────────────────────────
/** Human-readable relative time from an ISO date string. */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) !== 1 ? "s" : ""} ago`;
}
