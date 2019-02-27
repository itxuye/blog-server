import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comment.service';
import { Comment as CommentEntity } from './comment.entity';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), ArticlesModule],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
