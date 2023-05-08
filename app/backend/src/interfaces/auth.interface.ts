export interface IJwtPayload {
  id: number;
  email: string;
  username: string;
  role: string,
}

export interface IUser extends IJwtPayload {
  password: string
}

export interface IAuthToken extends IJwtPayload {
  iat: number;
  exp: number;
}

export interface IToken {
  generateToken(obj: IJwtPayload): string;
  authToken(token: string):IAuthToken
}

export interface ILogin {
  email: string;
  password: string
}
