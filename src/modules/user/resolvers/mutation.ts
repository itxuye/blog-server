import { Users } from "../providers/users";
import { ModuleContext } from "@graphql-modules/core";
import { CreateUserMutationArgs } from "@/typings/generated-models";

export default {
  Mutation: {
    createUser: async (
      root,
      args: { user: CreateUserMutationArgs },
      context: ModuleContext
    ) => {
      return context.injector.get(Users).createUser(args.user);
    }
  }
};

