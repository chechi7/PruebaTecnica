import { Injectable } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/typeorm-user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: TypeOrmUserRepository) {}

  async create(name: string, email: string) {
    return await this.userRepository.create(name, email);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }
}