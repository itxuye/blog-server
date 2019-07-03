import { Article } from '../articles/article.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'int' }) id: number;

  @Column()
  name: string;

  @ManyToMany(type => Article, article => article.tags)
  articles: Article[];

  @CreateDateColumn({
    nullable: false,
    name: 'createAt',
    comment: '创建时间'
  })
  createAt: Date | string;

  @UpdateDateColumn({
    nullable: false,
    name: 'updateAt',
    comment: '更新时间'
  })
  updateAt: Date | string;
}
