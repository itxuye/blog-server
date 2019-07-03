import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  name: string;

  @OneToMany(type => Article, article => article.category)
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
