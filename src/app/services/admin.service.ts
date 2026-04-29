import { apiClient, USE_MOCK } from "./api";
import type { AdminUser, AdminActivity } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_USERS: AdminUser[] = [
  { id: "u1", name: "Mohamed Omar",  email: "m.omar@mail.com",   reports: 12, rating: 5, status: "active"    },
  { id: "u2", name: "Sara Ahmed",    email: "sara.a@mail.com",   reports: 7,  rating: 4, status: "active"    },
  { id: "u3", name: "Karim Hassan",  email: "k.hassan@mail.com", reports: 2,  rating: 2, status: "warned"    },
  { id: "u4", name: "Nour Ali",      email: "nour.ali@mail.com", reports: 9,  rating: 4, status: "active"    },
  { id: "u5", name: "Youssef Samir", email: "y.samir@mail.com",  reports: 1,  rating: 1, status: "suspended" },
];

const MOCK_ACTIVITIES: AdminActivity[] = [
  { id: "a1", user: "Mohamed Omar",  type: "Report",  description: "Posted found item: Black backpack near Mall of Arabia",   time: "2 min ago",  flagged: false },
  { id: "a2", user: "Sara Ahmed",    type: "Match",   description: "Matched with report #1042 (95% confidence)",              time: "15 min ago", flagged: false },
  { id: "a3", user: "Karim Hassan",  type: "Contact", description: "Sent 5 contact requests in 10 minutes",                   time: "1 hr ago",   flagged: true  },
  { id: "a4", user: "Youssef Samir", type: "Profile", description: "Updated profile info multiple times with unusual data",   time: "2 hr ago",   flagged: true  },
  { id: "a5", user: "Nour Ali",      type: "Report",  description: "Submitted lost item report: Car keys in New Cairo",       time: "3 hr ago",   flagged: false },
];

// ─── Service ──────────────────────────────────────────────────────────────────
export const adminService = {
  // ── Users ────────────────────────────────────────────────────────────────

  /**
   * All registered users (admin view).
   * GET /admin/users  →  AdminUser[]
   */
  async getUsers(): Promise<AdminUser[]> {
    if (USE_MOCK) return Promise.resolve(MOCK_USERS);
    return apiClient.get<AdminUser[]>("/admin/users");
  },

  /**
   * Update a user's moderation status.
   * PATCH /admin/users/:id/status  →  204
   */
  async updateUserStatus(
    id: string,
    status: AdminUser["status"]
  ): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.patch<void>(`/admin/users/${id}/status`, { status });
  },

  // ── Activities ───────────────────────────────────────────────────────────

  /**
   * All recent platform activities (admin feed).
   * GET /admin/activities  →  AdminActivity[]
   */
  async getActivities(): Promise<AdminActivity[]> {
    if (USE_MOCK) return Promise.resolve(MOCK_ACTIVITIES);
    return apiClient.get<AdminActivity[]>("/admin/activities");
  },

  /**
   * Permanently remove an activity log entry.
   * DELETE /admin/activities/:id  →  204
   */
  async deleteActivity(id: string): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.delete<void>(`/admin/activities/${id}`);
  },

  /**
   * Un-flag / postpone review of an activity.
   * PATCH /admin/activities/:id/postpone  →  204
   */
  async postponeActivity(id: string): Promise<void> {
    if (USE_MOCK) return Promise.resolve();
    return apiClient.patch<void>(`/admin/activities/${id}/postpone`, {});
  },
};
