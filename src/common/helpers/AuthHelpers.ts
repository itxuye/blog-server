export interface User {
  id: string;
  username: string;
}

export async function tradeTokenForUser(token: string): Promise<User> {
  // Here, use the `token` argument, check it's validity, and return
  // the user only if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and
  // trigger it's logic from here.

  return {
    id: "1",
    username: "string"
  };
}
