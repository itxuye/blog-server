export interface User {
  id: string;
  username: string;
}

export async function tradeTokenForUser(token: string): Promise<User> {

  return {
    id: "1",
    username: "string"
  };
}
