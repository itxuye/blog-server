import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findOneById(id: number): Promise<Tag | undefined> {
    return await this.tagRepository.findOne({ id });
  }

  async findOneBySlug(slug: string): Promise<Tag | undefined> {
    return await this.tagRepository.findOne({ slug });
  }

  async where(condition: object): Promise<Tag[]> {
    return await this.tagRepository.find(condition);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async create(tagDto: TagDto): Promise<Tag> {
    const newtag = await this.tagRepository.create(tagDto);
    return this.tagRepository.save(newtag);
  }

  async update(id: number, tagDto: TagDto): Promise<any> {
    await this.tagRepository.update(id, tagDto);
  }

  async countControl(id: number, increment: boolean): Promise<any> {
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
