// ─── Base HTTP Client ─────────────────────────────────────────────────────────
// Set VITE_API_URL in your .env to point at the real backend.
// When the variable is absent the service layer falls back to local mock data.

export const BASE_URL = import.meta.env.VITE_API_URL ?? "";

/** Flip to `false` only when a real VITE_API_URL is configured. */
export const USE_MOCK = !import.meta.env.VITE_API_URL;

// ─── Token helpers (JWT stored in localStorage) ───────────────────────────────
const TOKEN_KEY = "back2u_token";

export const getToken   = ()           => localStorage.getItem(TOKEN_KEY);
export const setToken   = (t: string)  => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = ()           => localStorage.removeItem(TOKEN_KEY);

// ─── Generic fetch wrapper ────────────────────────────────────────────────────
async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: res.statusText })) as { message?: string };
    throw new Error(err.message ?? "Request failed");
  }

  return res.json() as Promise<T>;
}

// ─── Typed API client ─────────────────────────────────────────────────────────
export const apiClient = {
  get:    <T>(path: string)                => request<T>("GET",    path),
  post:   <T>(path: string, body: unknown) => request<T>("POST",   path, body),
  put:    <T>(path: string, body: unknown) => request<T>("PUT",    path, body),
  patch:  <T>(path: string, body: unknown) => request<T>("PATCH",  path, body),
  delete: <T>(path: string)               => request<T>("DELETE", path),
};
