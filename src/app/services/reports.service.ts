import { apiClient, USE_MOCK } from "./api";
import type { Report, SubmitReportPayload } from "../types";

// ─── Mock ─────────────────────────────────────────────────────────────────────
const MOCK_REPORTS: Report[] = [
  {
    id: "r1",
    name: "Bag",
    description: "Black canvas backpack with laptop compartment",
    category: "bag",
    location: "Mall of Arabia, Giza",
    date: "2024-04-20",
    status: "lost",
    rating: 0,
    createdAt: "2024-04-20T10:00:00Z",
  },
  {
    id: "r2",
    name: "Wallet",
    description: "Brown leather wallet with ID cards",
    category: "wallet",
    location: "LC Waikiki, Cairo Festival City",
    date: "2024-04-18",
    status: "lost",
    rating: 0,
    createdAt: "2024-04-18T14:00:00Z",
  },
  {
    id: "r3",
    name: "Wallet",
    description: "Black slim leather wallet",
    category: "wallet",
    location: "Mall of Arabia, Giza",
    date: "2024-04-10",
    status: "returned",
    rating: 5,
    createdAt: "2024-04-10T09:00:00Z",
  },
  {
    id: "r4",
    name: "Keys",
    description: "Car keys with blue rubber keychain",
    category: "keys",
    location: "New Cairo, 5th Settlement",
    date: "2024-04-05",
    status: "returned",
    rating: 3,
    createdAt: "2024-04-05T12:00:00Z",
  },
];

const CATEGORY_EMOJI: Record<string, string> = {
  bag:         "🎒",
  wallet:      "👛",
  keys:        "🔑",
  electronics: "📱",
  other:       "📦",
};

// ─── Service ──────────────────────────────────────────────────────────────────
export const reportService = {
  /**
   * All reports belonging to the authenticated user.
   * GET /reports/mine  →  Report[]
   */
  async getMyReports(): Promise<Report[]> {
    if (USE_MOCK) return Promise.resolve(MOCK_REPORTS);
    return apiClient.get<Report[]>("/reports/mine");
  },

  /**
   * Single report by ID.
   * GET /reports/:id  →  Report
   */
  async getReportById(id: string): Promise<Report> {
    if (USE_MOCK) {
      return Promise.resolve(
        MOCK_REPORTS.find((r) => r.id === id) ?? MOCK_REPORTS[0]
      );
    }
    return apiClient.get<Report>(`/reports/${id}`);
  },

  /**
   * Submit a new lost-item report.
   * POST /reports  →  Report
   *
   * Note: image upload is a separate step:
   *   POST /uploads/image  →  { url: string }
   * Pass the returned URL as `payload.imageUrl`.
   */
  async submitReport(payload: SubmitReportPayload): Promise<Report> {
    if (USE_MOCK) {
      return Promise.resolve({
        id: `r-${Date.now()}`,
        name: payload.category,
        description: payload.description,
        category: payload.category,
        location: payload.location,
        date: payload.date,
        imageUrl: payload.imageUrl,
        status: "lost",
        rating: 0,
        createdAt: new Date().toISOString(),
      });
    }
    return apiClient.post<Report>("/reports", payload);
  },

  /** Helper: emoji representation of a report category. */
  getCategoryEmoji(category: string): string {
    return CATEGORY_EMOJI[category] ?? "📦";
  },
};
