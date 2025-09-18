// API 工具类
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface User {
  id: number;
  username: string;
  email: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // 用户管理相关 API
  async getUsers(
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
    } = {}
  ): Promise<ApiResponse<UsersListResponse>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page.toString());
    if (params.pageSize)
      searchParams.append("pageSize", params.pageSize.toString());
    if (params.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    const endpoint = `/api/users${queryString ? `?${queryString}` : ""}`;

    return this.request<UsersListResponse>(endpoint);
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`);
  }

  async createUser(userData: {
    username: string;
    email: string;
    status?: "active" | "inactive";
  }): Promise<ApiResponse<User>> {
    return this.request<User>("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async updateUser(
    id: number,
    userData: {
      username?: string;
      email?: string;
      status?: "active" | "inactive";
    }
  ): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`, {
      method: "DELETE",
    });
  }

  async deleteUsers(ids: number[]): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    });
  }

  async updateUserStatus(
    id: number,
    status: "active" | "inactive"
  ): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }
}

// 创建并导出 API 客户端实例
export const apiClient = new ApiClient();

// 用户管理相关的 API 方法
export const userApi = {
  getUsers: (params?: { page?: number; pageSize?: number; search?: string }) =>
    apiClient.getUsers(params),

  getUser: (id: number) => apiClient.getUser(id),

  createUser: (userData: {
    username: string;
    email: string;
    status?: "active" | "inactive";
  }) => apiClient.createUser(userData),

  updateUser: (
    id: number,
    userData: {
      username?: string;
      email?: string;
      status?: "active" | "inactive";
    }
  ) => apiClient.updateUser(id, userData),

  deleteUser: (id: number) => apiClient.deleteUser(id),

  deleteUsers: (ids: number[]) => apiClient.deleteUsers(ids),

  updateUserStatus: (id: number, status: "active" | "inactive") =>
    apiClient.updateUserStatus(id, status),
};
