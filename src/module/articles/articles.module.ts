import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { UsersModule } from '../user/users.module';
import { TagModule } from '../tags/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UsersModule, TagModule],
  providers: [ArticlesService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
