import { Users } from "../providers/users";
import { ModuleContext } from "@graphql-modules/core";
import { CreateUserMutationArgs, User } from "src/typings/generated-models";

export default {
  Mutation: {
    createUser: async (
      root,
      args: { user: CreateUserMutationArgs },
      { injector }: ModuleContext
    ): Promise<User> => {
      const user = await injector.get(Users).createUser(args.user);
      return user;
    }
  }
};
