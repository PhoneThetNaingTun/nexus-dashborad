import { getClientCookie } from "./cookie/cookie-client";
import { getServerCookie } from "./cookie/cookie-server";
import { Pagination } from "./types/common";

interface ApiConfig {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
  status: number;
  headers: Headers;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
interface AuthConfig {
  tokenProvider?: () => Promise<string | null> | string | null;
  tokenHeader?: string;
  tokenPrefix?: string;
  refreshTOkenProvider?: () => Promise<string | null> | string | null;
  onRefreshField?: () => void;
}

class ApiClient {
  private config: Required<ApiConfig>;
  private authConfig: AuthConfig;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private pendingRequests = new Map<string, Promise<any>>();
  constructor(config: ApiConfig = {}, authConfig: AuthConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || "",
      defaultHeaders: {
        "Content-Type": "application/json",
        ...config.defaultHeaders,
      },
      timeout: config.timeout || 10000,
    };

    this.authConfig = {
      tokenHeader: "Authorization",
      tokenPrefix: "Bearer",
      ...authConfig,
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    refresh: boolean = true,
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);
    const requestOptions = await this.buildRequestOptions(options);

    try {
      if (typeof window === "undefined") {
        console.log("[SERVER API] Request:", {
          url,
          options: requestOptions,
        });
      }
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout,
      );

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (
        response.status === 401 &&
        refresh &&
        this.authConfig.refreshTOkenProvider
      ) {
        const newToken = await this.authConfig.refreshTOkenProvider();

        if (newToken) {
          return await this.makeRequest(endpoint, options, false);
        } else if (this.authConfig.onRefreshField) {
          this.authConfig.onRefreshField();
        }
      }
      // Here's the key: we check the status and throw for errors
      if (!response.ok) {
        // Try to parse backend JSON for error message
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const data = await response.json();
          if (data && data.message) {
            errorMessage = data.message;
          }
        } catch (e) {
          // ignore parsing errors, keep default errorMessage
        }

        throw new ApiError(errorMessage, response.status, response);
      }

      // Parse JSON safely
      const data = await this.parseResponse<T>(response);

      return data;
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new ApiError("Request timeout", 408);
      }
      throw error;
    }
  }

  private buildUrl(endpoint: string): string {
    // Handle both absolute and relative URLs
    if (endpoint.startsWith("http")) {
      return endpoint;
    }
    return `${this.config.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }

  private async buildRequestOptions(
    options: RequestInit,
  ): Promise<RequestInit> {
    const headers = { ...this.config.defaultHeaders };

    // Add authentication token if available
    if (this.authConfig.tokenProvider) {
      const token = await this.authConfig.tokenProvider();

      if (token) {
        headers[this.authConfig.tokenHeader!] =
          `${this.authConfig.tokenPrefix} ${token}`;
      }
    }

    return {
      ...options,
      credentials: "include",
      headers: {
        ...headers,
        ...options.headers,
      },
    };
  }

  private async parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      try {
        const json = await response.json();

        // Check for backend structure: { data, pagination?, status }
        const result: ApiResponse<T> = {
          data: json.data.data as T,
          status: json.status ?? response.status,
          headers: response.headers,
        };

        if (json.pagination) {
          result.pagination = {
            page: Number(json.pagination.page),
            pageSize: Number(json.pagination.pageSize),
            totalCount: Number(json.pagination.totalCount),
            totalPages: Number(json.pagination.totalPages),
          };
        }

        return result;
      } catch (error) {
        throw new ApiError("Invalid JSON response", response.status, response);
      }
    }

    // Handle text responses
    return {
      data: (await response.text()) as unknown as T,
      status: response.status,
      headers: response.headers,
    };
  }

  async get<T>(
    endpoint: string,
    options?: RequestInit & { cache?: boolean; cacheTTL?: number },
  ): Promise<ApiResponse<T>> {
    const cacheKey = `GET:${endpoint}`;
    const now = Date.now();

    // Check cache first
    if (options?.cache) {
      const cached = this.cache.get(cacheKey);
      const ttl = options.cacheTTL || 60000; // 1 minute default

      if (cached && now - cached.timestamp < ttl) {
        return { data: cached.data, status: 200, headers: new Headers() };
      }
    }

    // Deduplicate concurrent requests
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    const requestPromise = this.makeRequest<T>(endpoint, {
      ...options,
      method: "GET",
    });
    this.pendingRequests.set(cacheKey, requestPromise);

    try {
      const response = await requestPromise;

      // Cache successful responses
      if (options?.cache && response.status === 200) {
        this.cache.set(cacheKey, { data: response.data, timestamp: now });
      }

      return response;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: "DELETE" });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

const getClientToken = (): string | null => {
  const { access_token } = getClientCookie();

  return access_token || "";
};

// Server-side token provider (for SSR)
const getServerToken = async (): Promise<string | null> => {
  const { access_token } = await getServerCookie();

  return access_token || "";
};

// Call next js api end point
const refreshTokenProvider = async (): Promise<string | null> => {
  if (typeof window === undefined) return null;
  try {
    let url = "/api/auth/refresh";

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();

    return data.access_token;
  } catch {
    return null;
  }
};

// Create different instances for different contexts
export const clientApi = new ApiClient(
  {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  },
  {
    tokenProvider: getClientToken,
    refreshTOkenProvider: refreshTokenProvider,
  },
);

export const serverApi = new ApiClient(
  {
    baseUrl:
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api",
  },
  {
    tokenProvider: getServerToken,
    refreshTOkenProvider: refreshTokenProvider,
  },
);

export const baseAPi = typeof window === "undefined" ? serverApi : clientApi;
