import { GraphQLModule } from "@graphql-modules/core";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";

export async function bootstrap(AppModule: GraphQLModule) {
  await createConnection();
  const { schema, context } = AppModule;
  const server = new ApolloServer({
    schema,
    context,
    introspection: true
  });
  const { url } = await server.listen();

  console.log(`Server ready at ${url}`);
}
