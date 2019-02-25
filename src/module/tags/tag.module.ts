import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { Article } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Article])],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
