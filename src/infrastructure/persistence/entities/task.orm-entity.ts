import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'IN_PROGRESS', 'DONE'],
    default: 'PENDING',
  })
  status: string;

  @CreateDateColumn()
  dueDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserOrmEntity, (user) => user.tasks)
  user: UserOrmEntity;
}