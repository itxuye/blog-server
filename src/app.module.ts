import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      max: 5,
      ttl: 5,
    }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
      context: ({ req, connection }) => {
        if (connection) {
          return connection.context;
        }

        return {
          userData: req ? parseAuthToken(req.headers.authorization) : null,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

function parseAuthToken(authorization) {
  if (!authorization) {
    return null;
  }

  const authHeader = authorization.split(' ');

  if (authHeader[0].toLowerCase() != 'bearer') {
    return null;
  }

  const jwtToken = authHeader[1];

  if (!jwtToken) {
    return null;
  }

  return jwtValidation(jwtToken);
}

function jwtValidation(token) {
  try {
    return jwt.verify(token, authConfig.secretKey);
  } catch (err) {
    return null;
  }
}
