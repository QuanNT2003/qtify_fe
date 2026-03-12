import { baseApi } from '../base';
import { AuthResponse, User, LoginCredentials, RegisterData } from '../auth-types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return baseApi.post<AuthResponse>("/auth/login", credentials);
  },

  async register(data: RegisterData): Promise<{ message: string; user: User }> {
    return baseApi.post("/auth/register", data);
  },

  async getProfile(): Promise<User> {
    return baseApi.get<User>("/users/profile");
  },

  async logout(): Promise<void> {
    await baseApi.post("/auth/logout");
  },
};
