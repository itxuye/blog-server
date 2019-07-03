import {
  HttpException,
  HttpStatus,
  UseGuards,
  UploadedFile
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ArticleService } from './articles.service';
import { CreateArticleDto, FindArticles } from './dto/article.dto';
import { Article as ArticleEntity } from './article.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}
  /**
   * @desc get all articles
   * @param options
   */
  @Query()
  async getAllArticles(
    @Args('') options: FindArticles
  ): Promise<{
    list: ArticleEntity[];
    count: number;
  }> {
    try {
      return await this.articleService.find(options);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @desc add new articles
   * @param options
   */
  @Mutation()
  @UseGuards(AuthGuard)
  async addArticle(@Args('articleInfoInput') options: CreateArticleDto): Promise<ArticleEntity> {
    try {
      return await this.articleService.add(options);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @description 获取文章详情
   * @param id
   */
  @Query()
  async getArticleDetail(@Args('id') id: number): Promise<ArticleEntity> {
    try {
      await this.articleService.incrementViews(id);
      return this.articleService.getDetail(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation()
  async incrementViews(@Args('id') id: number): Promise<any> {
    try {
      return await this.articleService.incrementViews(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  // @Mutation()
  // @UseGuards(AuthGuard) // upload formData key: value中的key
  // async uploadFile(@UploadedFile() file) {
  //   try {
  //     return await this.articleService.upload(file);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteArticle(@Args('id') id: number): Promise<any> {
    try {
      await this.articleService.deleteArticle(id);
      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
