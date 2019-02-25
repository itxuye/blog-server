import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comment.service';
import { Comment } from './comment.entity';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticlesModule],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
