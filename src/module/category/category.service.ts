import { Category } from './category.entity';
import { Repository, ObjectID } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}
  /**
   * @desc get all category of article
   * @param options request options
   */
  async findAll(options): Promise<any> {
    const pageSize = +options.pageSize || 10;
    const page = options.page * pageSize || 0;
    const [list = [], count = 0] = await this.categoryRepository.findAndCount({
      where: {
        ...options
      },
      skip: page,
      take: pageSize
    });
    return {
      list,
      count
    };
  }
  /**
   * @desc add new category
   */
  async addCate(options): Promise<any> {
    const cate = this.categoryRepository.create();
    // exactly you can create(options) that will create the injected instance
    /**
     * @example
     *  const user = await this.userService.findId(options);
     */
    cate.name = options.name;
    return await this.categoryRepository.save(cate);
  }
  /**
   * @description 删除分类
   */
  async deleteCate(options: ObjectID[]): Promise<any> {
    return await this.categoryRepository.delete(options);
  }
  /**
   * @desc select cate by id
   * @param id
   */
  async find(id: number): Promise<any> {
    return await this.categoryRepository.findOneOrFail({
      where: {
        id
      }
    });
  }
}
