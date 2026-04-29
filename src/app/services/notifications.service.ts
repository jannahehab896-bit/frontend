import { apiClient, USE_MOCK } from "./api";
import type { Notification } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    message: "we found a match",
    count: 1,
    path: "/match/1",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

// ─── Service ──────────────────────────────────────────────────────────────────
export const notificationService = {
  /**
   * Fetch all notifications for the authenticated user.
   * GET /notifications  →  Notification[]
   */
  async getNotifications(): Promise<Notification[]> {
    if (USE_MOCK) return Promise.resolve(MOCK_NOTIFICATIONS);
    return apiClient.get<Notification[]>("/notifications");
  },

  /**
   * Mark all notifications as read.
   * PATCH /notifications/read-all
   */
  async markAllRead(): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.patch<void>("/notifications/read-all", {});
  },

  /**
   * Mark a single notification as read.
   * PATCH /notifications/:id/read
   */
  async markRead(id: string): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.patch<void>(`/notifications/${id}/read`, {});
  },
};
