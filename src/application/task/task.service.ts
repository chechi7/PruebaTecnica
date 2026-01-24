import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmTaskRepository } from '../../infrastructure/persistence/repositories/typeorm-task.repository';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/typeorm-user.repository';
import { CreateTaskDto } from '../../infrastructure/dtos/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TypeOrmTaskRepository,
    private readonly userRepository: TypeOrmUserRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    // 1. Validar existencia de usuario
    const user = await this.userRepository.findById(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${createTaskDto.userId} no existe`);
    }

    // Usamos una lógica que ignore strings vacíos "" para que todo sea automático
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      // Si status no existe o es un string vacío, ponemos 'PENDING'
      status: (createTaskDto.status && createTaskDto.status.trim() !== '') 
        ? createTaskDto.status 
        : 'PENDING',
      // Si dueDate no existe o es un string vacío, generamos la fecha actual automáticamente
      dueDate: (createTaskDto.dueDate && createTaskDto.dueDate.trim() !== '') 
        ? new Date(createTaskDto.dueDate) 
        : new Date(),
      user: user,
    };

    return await this.taskRepository.create(taskData);
  }

  async getTasksByUser(userId: string, status?: string) {
    return await this.taskRepository.findByUserId(userId, status);
  }

  async getDeletedTasks(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${userId} no existe`);
    }

    return await this.taskRepository.findDeletedByUserId(userId);
  }
  
  async updateStatus(id: string, status: string) {
    const task = await this.taskRepository.update(id, { status } as any);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async remove(id: string) {
    await this.taskRepository.softDelete(id);
    return { 
      message: `Tarea con ID ${id} eliminada correctamente (Soft Delete)` 
    };
  }
}