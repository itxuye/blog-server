import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authConfig } from './config';

// Entity
import { Token as TokenEntity } from '././module/auth/token.entity';
import { User as UserEntity } from '././module/user/users.entity';

@Module({
  imports: [
    CacheModule.register({
      max: 5,
      ttl: 5,
    }),
    GraphQLModule.forRoot({
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
