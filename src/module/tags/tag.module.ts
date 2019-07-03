import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { Tag as TagEntity } from './tag.entity';
import { Article as ArticleEntity } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, ArticleEntity])],
  providers: [TagService, TagResolver],
  exports: [TagService]
})
export class TagModule {}
