import { Tag as TagEntity } from './tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}
  /**
   * @desc get filter tag
   * @param options check options any
   */
  async findTag(): Promise<{
    list: TagEntity[];
    count: number;
  }> {
    const [list = [], count = 0] = await this.tagRepository.findAndCount();
    return { list, count };
  }

  /**
   * @desc add tag
   */
  async add(options: CreateTagDto): Promise<TagEntity> {
    const tag = await this.tagRepository.create(options);
    return await this.tagRepository.save(tag);
  }
  /**
   * @desc get ids query result
   * @param options
   */
  async findIds(options: number[]): Promise<TagEntity[]> {
    return await this.tagRepository.findByIds(options);
  }
  /**
   * @desc delete by ids
   */
  async deleteTag(id: number): Promise<any> {
    return await this.tagRepository.delete(id);
  }

  async where(condition: object): Promise<TagEntity[]> {
    return await this.tagRepository.find(condition);
  }
}
