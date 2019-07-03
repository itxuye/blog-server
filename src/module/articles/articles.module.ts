import { Article } from './article.entity';
import { ArticleService } from './articles.service';
import { ArticleResolver } from './articles.resolver';
import { TagModule } from '../tags/tag.module';
import { CategoryModule } from '../category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TagModule, CategoryModule, TypeOrmModule.forFeature([Article])],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService]
})
export class ArticlesModule {}
