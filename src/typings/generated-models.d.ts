export interface AdditionalEntityFields {
  path?: string | null;

  type?: string | null;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  users?: (User | null)[] | null;

  user?: User | null;

  posts?: (Post | null)[] | null;
}

export interface User {
  id?: string | null;

  username?: string | null;

  posts?: (Post | null)[] | null;
}

export interface Post {
  id?: string | null;

  title?: string | null;

  author?: User | null;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: number;
}

import { ObjectID } from "mongodb";
