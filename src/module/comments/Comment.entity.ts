import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  name: string;

  @Column({
      default: 0,
  })
  userId: number;

  @Column({
      default: 0,
  })
  parentId: number;

  @Column()
  articleId: number;

  @ManyToOne(type => Article)
  @JoinColumn({ name: 'articleId' })
  article: Promise<Article>;

  @Column()
  email: string;

  @Column()
  website: string;

  @Column()
  content: string;

  @Column()
  ip: string;

  @Column({
      default: 0,
  })
  type: number; // -1: SPAM; 0: Waiting Moderation; 1: published

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
