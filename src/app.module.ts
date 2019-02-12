import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { authConfig } from './config';

// Entity
import { Token as TokenEntity } from '././module/auth/token.entity';
import { User as UserEntity } from '././module/user/users.entity';

import { UsersModule } from './module/user/users.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'itxuye123',
      database: 'test111',
      entities: [TokenEntity, UserEntity],
      synchronize: true,
    }),
    CacheModule.register({
      max: 5,
      ttl: 5,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
        path: '/api/v1',
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
    }),
  ],
  providers: [],
})
export class AppModule {}

function parseAuthToken(authorization) {
  if (!authorization) {
    return null;
  }
  console.log(authorization);
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
