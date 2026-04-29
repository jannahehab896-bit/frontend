// ─── Domain Models ───────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  rating: number;
  reportsCount: number;
  matchesCount: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  imageUrl?: string;
  status: "lost" | "returned";
  rating: number;
  createdAt: string;
}

export interface FinderProfile {
  id: string;
  name: string;
  phone: string;
  rating: number;
  isTrusted: boolean;
  message: string;
}

export interface Match {
  id: string;
  reportId: string;
  itemName: string;
  itemImageUrl: string;
  finderNote: string;
  location: string;
  confidence: number;
  createdAt: string;
  finder: FinderProfile;
}

export interface Notification {
  id: string;
  message: string;
  count: number;
  path: string;
  read: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  reports: number;
  rating: number;
  status: "active" | "warned" | "suspended";
}

export interface AdminActivity {
  id: string;
  user: string;
  type: string;
  description: string;
  time: string;
  flagged: boolean;
}

// ─── Request / Response Payloads ─────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface SubmitReportPayload {
  description: string;
  location: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface SubmitRatingPayload {
  finderId: string;
  reportId?: string;
  rating: number;
  comment?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}
