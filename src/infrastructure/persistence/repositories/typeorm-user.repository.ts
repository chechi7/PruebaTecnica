import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(name: string, email: string): Promise<UserOrmEntity> {
    const user = this.repository.create({ name, email });
    return await this.repository.save(user);
  }

  async findAll(): Promise<UserOrmEntity[]> {
    return await this.repository.find();
  }

  // ESTA ES LA PIEZA QUE FALTA:
  async findById(id: string): Promise<UserOrmEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }
}