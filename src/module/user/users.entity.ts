import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 500 })
  username: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'varchar' })
  desc: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  gravatar: string;
}
