import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import config from './envconfig';
import tokenUtil from './util/token';
// Entity
import { Token as TokenEntity } from '././module/auth/token.entity';
import { User as UserEntity } from '././module/user/users.entity';
import { Article as ArticleEntity } from '././module/articles/article.entity';
import { Comment as CommentEntity } from './module/comments/comment.entity';
import { Tag as TagEntity } from './module/tags/tag.entity';

// module
import { UsersModule } from './module/user/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ArticlesModule } from './module/articles/articles.module';
import { CommentsModule } from './module/comments/comments.module';
import { BlogLoggerModule } from './module/logger/logger.module';
import { TagModule } from './module/tags/tag.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ArticlesModule,
    CommentsModule,
    BlogLoggerModule,
    TagModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: config.DB_PASS,
      database: config.DB_NAME,
      entities: [
        TokenEntity,
        UserEntity,
        ArticleEntity,
        CommentEntity,
        TagEntity
      ],
      synchronize: true
    }),
    CacheModule.register({
      max: 5,
      ttl: 5
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
            userData: req
              ? tokenUtil.parseAuthToken(req.headers.authorization)
              : null
          };
        }
      })
    })
  ],
  providers: []
})
export class AppModule {}
