import { Users } from "../providers/users";
import { ModuleContext } from "@graphql-modules/core";
import { CreateUserMutationArgs } from "src/typings/generated-models";

export default {
  Mutation: {
    createUser: async (
      root,
      args: { user: CreateUserMutationArgs },
      { injector }: ModuleContext
    ) => injector.get(Users).createUser(args.user)
  }
};
