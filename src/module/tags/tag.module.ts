import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { Article as ArticleEntity } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, ArticleEntity])],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
