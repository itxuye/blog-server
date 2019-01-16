import { Users } from "../providers/users";
import { ModuleContext } from "@graphql-modules/core";

export default {
  Query: {
    users: (root, args, { injector }: ModuleContext) =>
      injector.get(Users).allUsers()
    // userById: (root, { id }, { injector }: ModuleContext) =>
    //   injector.get(Users).getUser(id),
    // userByUserName: (root, { userName }, { injector }: ModuleContext) =>
    //   injector.get(Users).getUser(userName)
  }
};
