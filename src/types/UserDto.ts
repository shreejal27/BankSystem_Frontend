export interface IGetUserProfileResponse {
  name: string;
  email: string;
}

export interface IGetUserProfileAdminResponse {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: number;
  createdAt: string;
}

export interface IGetAllUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: number;
  createdAt: string;
  isActive: boolean;
}

