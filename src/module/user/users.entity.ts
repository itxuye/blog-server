import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
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
}
