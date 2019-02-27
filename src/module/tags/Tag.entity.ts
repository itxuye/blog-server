import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Article as ArticleEntity } from '../articles/article.entity';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  slug: string;

  @Column({
    default: 0
  })
  count: number;

  @Column({
    nullable: true
  })
  description: string;

  @OneToMany(type => ArticleEntity, article => article.tag)
  articles: Promise<ArticleEntity[]>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
