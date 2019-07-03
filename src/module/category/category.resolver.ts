import {
  HttpException,
  HttpStatus,
  UseGuards,
  UploadedFile
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { CreateCategory, FindCategory } from './dto/category.dto';
import { Category as CategoryEntity } from './category.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query()
  async getAllCategory(
    @Args() options: FindCategory
  ): Promise<{
    list: CategoryEntity[];
    count: number;
  }> {
    try {
      return await this.categoryService.findAll(options);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @desc 添加分类
   */
  @Mutation()
  @UseGuards(AuthGuard)
  async addCategory(
    @Args('categoryInfoInput') options: CreateCategory
  ): Promise<CategoryEntity> {
    const categoryExisted = await this.categoryService.where({
      name: options.name
    });
    if (categoryExisted.length === 0) {
      return await this.categoryService.addCate(options);
    }
    throw new HttpException('已存在相同信息分类', HttpStatus.BAD_REQUEST);
  }
  /**
   * @desc 删除分类
   */
  @Mutation()
  @UseGuards(AuthGuard)
  async deleteCategory(@Args('id') id: number): Promise<any> {
    try {
      await this.categoryService.deleteCate(id);
      return null;
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
