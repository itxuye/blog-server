export interface IUser {
  id: string;
  username: string;
  passwordHash: string;
}

export interface IUserPayload {
  username: string;
  password: string;
}
