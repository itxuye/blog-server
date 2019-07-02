import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TagService } from './tag.service';
import { CreateTagDto } from './dto/tag.dto';
import { Tag } from './tag.entity';
import { AuthGuard } from '../auth/auth.guard';

@Resolver('Tag')
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  /**
   * @desc get query tag list
   * @param options
   */
  @Query()
  async findAllTags(): Promise<Tag[]> {
    try {
      return await this.tagService.findTag();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @desc add new tag
   */
  @Mutation()
  @UseGuards(AuthGuard)
  async createTag(@Args() tagDto: CreateTagDto): Promise<Tag> {
    const tagExisted = await this.tagService.where({
      name: tagDto.name
    });
    if (tagExisted.length === 0) {
      return await this.tagService.add(tagDto);
    }

    throw new HttpException('已存在相同信息分类', HttpStatus.BAD_REQUEST);
  }
  /**
   * @desc delete tag
   * @param options Array
   */
  @Mutation()
  @UseGuards(AuthGuard)
  async deleteTag(@Args() id: number): Promise<any> {
    try {
      await this.tagService.deleteTag(id);
      return null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
