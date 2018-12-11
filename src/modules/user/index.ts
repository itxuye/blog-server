import "graphql-import-node";
import { GraphQLModule } from "@graphql-modules/core";
import { Users } from "./providers/users";
import resolvers from "./resolvers";
import * as typeDefs from "./index.graphql";
export const UserModule = new GraphQLModule({
  providers: [Users],
  resolvers,
  typeDefs
});
