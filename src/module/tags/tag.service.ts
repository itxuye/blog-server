import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { Tag as TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async findOneById(id: string): Promise<TagEntity | undefined> {
    return await this.tagRepository.findOne({ id });
  }

  async findOneBySlug(slug: string): Promise<TagEntity | undefined> {
    return await this.tagRepository.findOne({ slug });
  }

  async where(condition: object): Promise<TagEntity[]> {
    return await this.tagRepository.find(condition);
  }

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tagDto: TagDto): Promise<TagEntity> {
    const newtag = await this.tagRepository.create(tagDto);
    return this.tagRepository.save(newtag);
  }

  async update(id: string, tagDto: TagDto): Promise<any> {
    await this.tagRepository.update(id, tagDto);
  }

  async countControl(id: string, increment: boolean): Promise<any> {
    // 统计文章总量
    const currentTag = await this.findOneById(id);
    if (increment) {
      currentTag!.count++;
      return await currentTag!.save();
    }
    currentTag!.count--;
    return await currentTag!.save();
  }

  async destroy(id: number): Promise<any> {
    await this.tagRepository.delete(id);
  }
}
