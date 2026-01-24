import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TypeOrmTaskRepository } from '../../infrastructure/persistence/repositories/typeorm-task.repository';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/typeorm-user.repository';
import { NotFoundException } from '@nestjs/common';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepo: TypeOrmTaskRepository;
  let userRepo: TypeOrmUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TypeOrmTaskRepository,
          useValue: { create: jest.fn() },
        },
        {
          provide: TypeOrmUserRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepo = module.get<TypeOrmTaskRepository>(TypeOrmTaskRepository);
    userRepo = module.get<TypeOrmUserRepository>(TypeOrmUserRepository);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe lanzar NotFoundException si el usuario no existe al crear tarea', async () => {
    jest.spyOn(userRepo, 'findById').mockResolvedValue(null);

    await expect(
      service.create({ userId: '1', title: 'Test', description: '', dueDate: '2026-01-01' }),
    ).rejects.toThrow(NotFoundException);
  });
});