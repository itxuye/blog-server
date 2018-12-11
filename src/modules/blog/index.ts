import "graphql-import-node";
import { GraphQLModule } from "@graphql-modules/core";
import { Blog } from "./providers/blog";
import resolvers from "./resolvers";
import { UserModule } from "../user";
import * as typeDefs from "./index.graphql";
export const BlogModule = new GraphQLModule({
  imports: [UserModule],
  providers: [Blog],
  resolvers,
  typeDefs
});
