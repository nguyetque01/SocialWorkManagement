export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  id: string;
  email: string;
  token: string;
  role: string;
}
