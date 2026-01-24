import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { TaskOrmEntity } from '../entities/task.orm-entity';

@Injectable()
export class TypeOrmTaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repository: Repository<TaskOrmEntity>,
  ) {}

  async create(data: Partial<TaskOrmEntity>) {
    const task = this.repository.create(data);
    return await this.repository.save(task);
  }

  async findByUserId(userId: string, status?: string) {
    const where: any = { user: { id: userId } };
    if (status) {
      where.status = status;
    }
    return await this.repository.find({ where });
  }

  async findDeletedByUserId(userId: string) {
    return await this.repository.find({
      where: { 
        user: { id: userId },
        deletedAt: Not(IsNull())
      },
      withDeleted: true,
    });
  }
 
  async update(id: string, data: Partial<TaskOrmEntity>) {
    await this.repository.update(id, data);
    return this.repository.findOne({ where: { id } });
  }

  async softDelete(id: string) {
    return await this.repository.softDelete(id);
  }
}