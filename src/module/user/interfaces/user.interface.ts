export interface IUser {
  id: string;
  username: string;
  passwordHash: string;
}

export interface IUserPayload {
  username: string;
  password: string;
}

export interface IUpdateUserPayload {
  username: string;
  desc: string;
  email: string;
  gravatar: string;
}

export interface IUpdateUser extends IUser {
  desc: string;
  email: string;
  gravatar: string;
}
