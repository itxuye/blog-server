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
import { Comment as CommentEntity } from '../comments/comment.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  tagId: string;

  @ManyToOne(type => Tag)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @OneToMany(type => CommentEntity, comment => comment.article)
  comments: CommentEntity[];

  @Column()
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
