import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagService } from '../tags/tag.service';
import { ArticleDto } from './dto/article.dto';
import { Article as ArticleEntity } from './article.entity';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly tagService: TagService
  ) {}

  async findOneById(id: string): Promise<ArticleEntity | undefined> {
    return await this.articleRepository.findOne({ id });
  }

  async findOneBySlug(slug: string): Promise<ArticleEntity | undefined> {
    return await this.articleRepository.findOne({ slug });
  }

  async where(
    where: object,
    skip: number = 0,
    take: number = 59999
  ): Promise<ArticleEntity[]> {
    where = omitBy(where, isUndefined);
    return await this.articleRepository.find({
      where,
      take,
      skip,
      order: {
        id: 'DESC'
      }
    });
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({
      order: {
        id: 'DESC'
      }
    });
  }

  async create(articleDto: ArticleDto): Promise<ArticleEntity> {
    const newArticle = await this.articleRepository.create(articleDto);
    await this.tagService.countControl(articleDto.categoryId, true);
    return this.articleRepository.save(newArticle);
  }

  async update(id: number, articleDto: ArticleDto): Promise<any> {
    await this.articleRepository.update(id, articleDto);
  }

  async countControl(id: string, increment: boolean): Promise<any> {
    // 统计文章总量
    const currentArticle = await this.findOneById(id);
    if (increment) {
      currentArticle!.commentCount++;
      return await currentArticle!.save();
    }
    currentArticle!.commentCount--;
    return await currentArticle!.save();
  }

  async deleteById(id: string): Promise<any> {
    const articleDeleted = await this.findOneById(id);
    await this.tagService.countControl(articleDeleted!.tagId, false);
    await this.articleRepository.delete(id);
  }
}
