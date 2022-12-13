export interface JwtPayload {
  username: string;
}

export interface AuthResp {
  username: string;
  accessToken: string;
}
