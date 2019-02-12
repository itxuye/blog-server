export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface UserPayload {
  username: string;
  password: string;
}
