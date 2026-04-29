import { apiClient, USE_MOCK } from "./api";
import type { SubmitRatingPayload } from "../types";

// ─── Service ──────────────────────────────────────────────────────────────────
export const ratingService = {
  /**
   * Submit a star rating (and optional comment) for a finder.
   * POST /ratings  →  204 No Content
   */
  async submitRating(payload: SubmitRatingPayload): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.post<void>("/ratings", payload);
  },
};
