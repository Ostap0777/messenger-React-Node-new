export interface LoginDto {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterDto {
  email?: string;
  username?: string;
  password?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  userTag?: string | null;
  avatar?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
