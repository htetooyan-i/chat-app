import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {ApiResponse} from "@/types/ApiResponse";


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

const isDev = process.env.NODE_ENV !== "production";

const NO_REFRESH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-access-token",
  "/auth/request-password-reset",
  "/auth/reset-password",
  "/auth/verify-reset-token",
];

const shouldSkipRefresh = (url: string) => NO_REFRESH_PATHS.some(path => url.includes(path));

const markSessionExpired = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem("sessionExpired", "1");
  } catch {
    // ignore storage errors
  }

  const sessionEvent = new CustomEvent("sessionExpired");
  window.dispatchEvent(sessionEvent);
};

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${api.defaults.baseURL}/auth/refresh-access-token`,
        {},
        { withCredentials: true }
      )
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const requestUrl = config?.url ?? "";

    if (isDev) {
      console.log("Response error interceptor triggered:");
    }

    if (!error.response) {
      if (isDev) {
        console.error("[api response error] No response received", {
          code: error.code,
          message: error.message,
          url: config?.url,
        });
      }
      return Promise.reject(error);
    }

    if (!config) {
      if (isDev) {
        console.error("[api response error] Missing request config", {
          status: error.response.status,
          data: error.response.data,
        });
      }
      return Promise.reject(error);
    }

    if (error.response && config) {
      const code = error.response.data?.code ?? error.response.data?.error?.code;
      const isNoRefreshPath = shouldSkipRefresh(requestUrl);

      if (isDev) {
        console.error("[api response error]", {
          status: error.response.status,
          code,
          url: `${config.baseURL ?? ""}${config.url ?? ""}`,
          data: error.response.data,
        });
      }

      const shouldRefresh = ["TOKEN_MISSING", "TOKEN_EXPIRED", "TOKEN_INVALID", "AUTH_FAILED", "UNAUTHORIZED"].includes(code);
      const isUnauthorized = error.response.status === 401;

      if (isUnauthorized && shouldRefresh && !config._retry && !isNoRefreshPath) {
        config._retry = true;

        try {
          if (isDev) {
            console.log("Access token missing. Attempting to refresh...");
          }

          await refreshAccessToken();

          if (isDev) {
            console.log("Token refresh successful. Retrying original request...");
          }

          return api(config);
        } catch (err) {
          if (isDev) {
            console.error("Token refresh failed:", err);
          }

          if (typeof window !== "undefined" && !requestUrl.includes("/auth/me")) {
            markSessionExpired();
            window.location.href = "/auth";
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async config => {
    if (typeof window === "undefined") return config; // server safety

    const requestUrl = config.url ?? "";
    if (shouldSkipRefresh(requestUrl)) return config;

    const accessToken = getCookie("accessToken");
    if (accessToken) {
      const payload = parseJwt(accessToken);
      if (payload?.exp) {
        const expiryTime = payload.exp * 1000; // convert to ms
        const boundaryTime = Date.now() + 60 * 1000; // 1 minute from now

        if (expiryTime < boundaryTime) {
          try {
            await refreshAccessToken();
            if (isDev) console.log("Access token refreshed automatically");
          } catch (err) {
            if (isDev) console.error("Failed to refresh access token:", err);
            // redirect to login
            markSessionExpired();
            window.location.href = "/auth";
            return Promise.reject(err);
          }
        }
      }
    }

    return config;
  },
  error => {
    if (isDev) console.error("Request error:", error);
    return Promise.reject(error);
  }
);



export const cloudinaryApi = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}`,
  withCredentials: false
});

export const getErrorMessage = (
    err: unknown,
    defaultErrorMessage: string
): string => {
  if (err instanceof AxiosError) {
    // Axios wraps backend JSON in err.response.data
    const response = err.response?.data as ApiResponse<void> | undefined;
    return response?.error?.detail ?? defaultErrorMessage;
  }

  return defaultErrorMessage;
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null; // server-side safety
  const cookies = document.cookie.split("; ").reduce((acc: any, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return cookies[name];
}

const parseJwt = (token: string) => {
  try {
    const base64 = token.split(".")[1];
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (e) {
    return null;
  }
}
