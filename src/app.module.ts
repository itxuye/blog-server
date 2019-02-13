import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import config from './envconfig';

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
      password: config.DB_PASS,
      database: config.DB_NAME,
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
  const authHeader = authorization.split(' ');

  if (authHeader[0].toLowerCase() !== 'bearer') {
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
    return jwt.verify(token, config.secretKey);
  } catch (err) {
    return null;
  }
}
