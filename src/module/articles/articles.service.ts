import { Article } from './article.entity';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tags/tag.service';
import { getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/article.dto';
import { qiniuUpload } from '../../utils/upload';
import { getFileExtensions } from '../../utils/common';
import { md5Sign } from '../../utils/stringUtil';
import * as stream from 'stream';

export interface ILooseObject {
  [key: string]: any;
}
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService
  ) {}
  /**
   * @desc 获取文章列表
   * @param options query options
   */
  async find(options): Promise<any> {
    const pagesize = Number(options.pagesize) || 10;
    const page = Number(options.page) * pagesize || 0;
    let param = {};
    let term = '';
    if (options.search) {
      term =
        'articles.title Like :title OR articles.desc Like :desc OR articles.content Like :content';
      param = {
        title: `%${options.search}%`,
        desc: `%${options.search}%`,
        content: `%${options.search}%`
      };
    }
    const [list = [], count = 0] = await getRepository(Article)
      .createQueryBuilder('article')
      .leftJoin('article.user', 'u')
      .select([
        'article.id',
        'article.desc',
        'article.createAt',
        'article.title',
        'article.views',
        'u.id'
      ])
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .where(term, param)
      .orderBy({
        'article.createAt': 'DESC'
      })
      .offset(page)
      .limit(pagesize)
      .getManyAndCount();

    return { list, count };
  }
  /**
   * @desc add new articles
   * @param options add  articles
   */
  async add(options: CreateArticleDto): Promise<any> {
    const article = this.articleRepository.create();
    const cate = await this.categoryService.find(options.categoryId);
    const tag = await this.tagService.findIds(options.tagId);
    const option = {
      stripIgnoreTagBody: ['script'] // 过滤script标签
    };
    // article.content = xss(options.content, option);
    article.content = options.content;
    article.title = options.title;
    article.desc = options.desc;
    article.category = cate;
    article.tag = tag;
    try {
      await this.articleRepository.save(article);
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * @desc increment views
   * @param id
   */
  async increment(id: object): Promise<any> {
    await this.articleRepository.increment(id, 'views', 1);
  }
  /**
   * @desc 获取详情
   */
  async getDetail(id: number): Promise<any> {
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
