import { ApiResponse } from "./types";
import { cookies, AUTH_KEYS } from "../cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshAuthTokens(): Promise<string | null> {
  const refreshToken = cookies.get(AUTH_KEYS.REFRESH_TOKEN);
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("Refresh failed");

    const result = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = result.data;

    cookies.set(AUTH_KEYS.ACCESS_TOKEN, accessToken);
    cookies.set(AUTH_KEYS.REFRESH_TOKEN, newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    cookies.remove(AUTH_KEYS.ACCESS_TOKEN);
    cookies.remove(AUTH_KEYS.REFRESH_TOKEN);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers = new Headers(options.headers);

  // Add Auth token
  const token = cookies.get(AUTH_KEYS.ACCESS_TOKEN);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && !url.includes("/auth/refresh")) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAuthTokens();
      isRefreshing = false;
      onRefreshed(newToken);
    }

    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          resolve(apiFetch(endpoint, { ...options, headers }));
        } else {
          reject(new Error("Session expired"));
        }
      });
    });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API request failed with status ${response.status}`,
    );
  }

  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export const baseApi = {
  get: <T>(url: string, options?: RequestInit) =>
    apiFetch<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(url, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: <T>(url: string, options?: RequestInit) =>
    apiFetch<T>(url, { ...options, method: "DELETE" }),
};
