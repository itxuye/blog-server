export type Maybe<T> = T | null;

export interface AdditionalEntityFields {
  path?: Maybe<string>;

  type?: Maybe<string>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  users?: Maybe<(Maybe<User>)[]>;

  userById?: Maybe<User>;

  userByUserName?: Maybe<User>;
}

export interface User {
  id?: Maybe<string>;

  userName?: Maybe<string>;
}

export interface Mutation {
  createUser: User;

  deleteUser: number;
}

// ====================================================
// Arguments
// ====================================================

export interface UserByIdQueryArgs {
  id: string;
}
export interface UserByUserNameQueryArgs {
  userName: string;
}
export interface CreateUserMutationArgs {
  id: string;

  userName: string;
}
export interface DeleteUserMutationArgs {
  id: string;
}

import { ObjectID } from "mongodb";
