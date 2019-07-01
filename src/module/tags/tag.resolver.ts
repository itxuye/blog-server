import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Article as ArticleEntity } from '../articles/article.entity';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';
import { AuthGuard } from '../auth/auth.guard';

@Resolver('Tag')
export class TagResolver {
  constructor(
    private readonly categoriesService: TagService,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  @Query()
  async findAll(): Promise<Tag[]> {
    return await this.categoriesService.findAll();
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async create(@Args() categoryDto: TagDto) {
    const categoryExisted = await this.categoriesService.where({
      slug: categoryDto.slug
    });
    if (categoryExisted.length === 0) {
      return await this.categoriesService.create(categoryDto);
    }

    throw new HttpException('已存在相同信息分类',400);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async update(
    @Args() id: string,
    @Args() categoryDto: TagDto
  ): Promise<Tag> {
    return await this.categoriesService.update(id, categoryDto);
  }

  @Query()
  async findOne(@Args('id') id: string) {
    return await this.categoriesService.findOneById(id);
  }

  @Mutation()
  async destory(@Args('id') id: string) {
    const articles = await this.articleRepository.find({ categoryId: id });
    if (articles.length === 0) {
      return await this.categoriesService.destroy(id);
    }
    throw new HttpException(
      '分类目录内仍有文章，请删除后再试',
     400
    );
  }
}
