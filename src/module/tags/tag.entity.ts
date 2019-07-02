import { Article } from '../articles/article.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  name: string;

  @ManyToMany(type => Article, article => article.tag)
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
