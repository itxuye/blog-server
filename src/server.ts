import { GraphQLModule } from "@graphql-modules/core";
import { ApolloServer } from "apollo-server-koa";
import { createConnection } from "typeorm";
import * as Koa from "koa";

import {tradeTokenForUser} from '@/common/helpers/AuthHelpers'
const HEADER_NAME = "authorization";

export async function bootstrap(AppModule: GraphQLModule) {
  await createConnection();
  const { schema, context } = AppModule;
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      let authToken = null;
      let currentUser = null;

      try {
        authToken = req.headers[HEADER_NAME];

        if (authToken) {
          currentUser = await tradeTokenForUser(authToken);
        }
      } catch (e) {
        console.warn(`Unable to authenticate using auth token: ${authToken}`);
      }

      return {
        authToken,
        currentUser
      };
    },
    introspection: true
  });
  const app = new Koa();
  server.applyMiddleware({ app, path: "/graphql/api/v1" });
  const port = 8089;
  const host = "localhost";
  app.listen(port, host, () =>
    console.log(
      `🚀 Server ready at http://${host}:${port}${server.graphqlPath}`
    )
  );
}
