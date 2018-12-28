import { GraphQLModule } from "@graphql-modules/core";
import { Users } from "./providers/users";
import { loadResolversFiles, loadSchemaFiles } from "@graphql-modules/sonar";
import { mergeGraphQLSchemas, mergeResolvers } from "@graphql-modules/epoxy";

export const UserModule = new GraphQLModule({
  providers: [Users],
  typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/schema/")),
  resolvers: mergeResolvers(loadResolversFiles(__dirname + "/resolvers/"))
});
