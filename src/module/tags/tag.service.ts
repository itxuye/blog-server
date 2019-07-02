import { Tag } from './tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}
  /**
   * @desc get filter tag
   * @param options check options any
   */
  async findTag(): Promise<any> {
    const [list = [], count = 0] = await this.tagRepository.findAndCount();
    return { list, count };
  }

  /**
   * @desc add tag
   */
  async add(options: CreateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.create(options);
    return await this.tagRepository.save(tag);
  }
  /**
   * @desc get ids query result
   * @param options
   */
  async findIds(options: number[]): Promise<Tag[]> {
    return await this.tagRepository.findByIds(options);
  }
  /**
   * @desc delete by ids
   */
  async deleteTag(id: number): Promise<any> {
    return await this.tagRepository.delete(id);
  }

  async where(condition: object): Promise<Tag[]> {
    return await this.tagRepository.find(condition);
  }
}
