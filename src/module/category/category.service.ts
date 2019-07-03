import { Category as CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCategory, CreateCategory } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}
  /**
   * @desc get all category of article
   * @param options request options
   */
  async findAll(
    options: FindCategory
  ): Promise<{
    list: CategoryEntity[];
    count: number;
  }> {
    const pageSize = Number(options.pageSize) || 10;
    const page = Number(options.page) * pageSize || 0;
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
  async addCate(options: CreateCategory): Promise<CategoryEntity> {
    const cate = this.categoryRepository.create(options);
    // exactly you can create(options) that will create the injected instance
    // cate.name = options.name;
    return await this.categoryRepository.save(cate);
  }
  /**
   * @description 删除分类
   */
  async deleteCate(id: number): Promise<any> {
    return await this.categoryRepository.delete(id);
  }
  /**
   * @desc select cate by id
   * @param id
   */
  async find(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async where(condition: object): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find(condition);
  }
}
