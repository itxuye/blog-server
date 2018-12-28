import { Injectable } from "@graphql-modules/di";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../../typings/generated-models";
const users: User[] = [
  {
    id: "0",
    userName: "Sample User"
  },
  {
    id: "1",
    userName: "itxuye"
  },
  {
    id: "2",
    userName: "shawn"
  }
];

@Injectable()
export class Users {
  getUser(username: string) {
    return users.find(({ userName }) => userName === username);
  }

  allUsers() {
    return users;
  }

  createUser(user: User) {
    users.push(user);
    // console.log(user);
    return user;
  }
}
