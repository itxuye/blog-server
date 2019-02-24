import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity
} from 'typeorm';
import { Tag } from '../tags/tag.entity';
import { User } from '../user/users.entity';
import { Comment } from '../comments/Comment.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column()
  slug: string;

  @Column('text') content: string;

  // -1：已删除 0: 草稿; 1: 待审核 2: 已发布
  @Column({ type: 'tinyint' }) status: number;

  @Column({
    default: 0
  })
  commentCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  categoryId: number;

  @ManyToOne(type => Tag)
  @JoinColumn({ name: 'TagId' })
  category: Promise<Tag>;

  @OneToMany(type => Comment, comment => comment.article)
  comments: Promise<Comment[]>;

  @Column()
  userId: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
}
