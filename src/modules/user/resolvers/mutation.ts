import { Users } from "../providers/users";
import { ModuleContext } from "@graphql-modules/core";
import { CreateUserMutationArgs, User } from "src/typings/generated-models";

export default {
  Mutation: {
    createUser: (
      root,
      args: { user: CreateUserMutationArgs },
      { injector }: ModuleContext
    ): User => {
      return injector.get(Users).createUser(args.user);
    }
  }
};
