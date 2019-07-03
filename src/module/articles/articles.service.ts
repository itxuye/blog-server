import { getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as stream from 'stream';

import { Article as ArticleEntity } from './article.entity';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tags/tag.service';

import { CreateArticleDto, FindArticles } from './dto/article.dto';
import { qiniuUpload } from '../../utils/upload';
import { getFileExtensions } from '../../utils/common';
import { md5Sign } from '../../utils/stringUtil';

export interface ILooseObject {
  [key: string]: any;
}
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) {}
  /**
   * @desc 获取文章列表
   * @param options query options
   */
  async find(
    options: FindArticles
  ): Promise<{ list: ArticleEntity[]; count: number }> {
    const pageSize = Number(options.pageSize) || 10;
    const page = Number(options.page) * pageSize || 0;
    let param = {};
    let term = '';
    // 搜索参数
    if (options.search) {
      term =
        'articles.title Like :title OR articles.desc Like :desc OR articles.content Like :content';
      param = {
        title: `%${options.search}%`,
        desc: `%${options.search}%`,
        content: `%${options.search}%`
      };
    }
    const [list = [], count = 0] = await getRepository(ArticleEntity)
      .createQueryBuilder('article')
      .select([
        'article.id',
        'article.desc',
        'article.createAt',
        'article.title',
        'article.views',
        'article.status',
        'article.content'
      ])
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tags')
      .where(term, param)
      .orderBy({
        'article.createAt': 'DESC'
      })
      .offset(page)
      .limit(pageSize)
      .getManyAndCount();

    return { list, count };
  }
  /**
   * @desc add new articles
   * @param options add  articles
   */
  async add(options: CreateArticleDto): Promise<ArticleEntity> {
    const article = this.articleRepository.create(options);
    const category = await this.categoryService.find(options.categoryId);
    const tags = await this.tagService.findIds(options.tagsId);
    const option = {
      stripIgnoreTagBody: ['script'] // 过滤script标签
    };
    // article.content = xss(options.content, option);
    // article.content = options.content;
    // article.title = options.title;
    // article.desc = options.desc;
    article.category = category;
    article.tags = tags;
    try {
      return await this.articleRepository.save(article);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteArticle(id: number): Promise<any> {
    return await this.articleRepository.delete(id);
  }
  /**
   * @desc increment views
   * @param id
   */
  async incrementViews(id: number): Promise<any> {
    await this.articleRepository.increment({ id }, 'views', 1);
  }
  /**
   * @desc 获取详情
   */
  async getDetail(id: number): Promise<ArticleEntity> {
    try {
      return await this.articleRepository.findOneOrFail(id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async upload(file: ILooseObject): Promise<any> {
    const extensions = getFileExtensions(file.originalname);
    const key = `img/${md5Sign(file.originalname)}.${extensions}`;
    try {
      await qiniuUpload('stream', this.bufferToStream(file.buffer), key);
      return `${process.env.QINNIU_DOMAIN}/${key}`;
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  }
  private bufferToStream(buffer) {
    const Duplex = stream.Duplex;
    const streamReader = new Duplex();
    streamReader.push(buffer);
    streamReader.push(null);
    return streamReader;
  }
}
