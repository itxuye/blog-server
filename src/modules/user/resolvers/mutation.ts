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
      console.log(args)
      const userRes = await injector.get(Users).createUser(args.user);
      return userRes;
    }
  }
};
