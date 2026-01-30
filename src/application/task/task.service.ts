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

  // MÉTODO: CREAR TAREA
  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findById(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${createTaskDto.userId} no existe`);
    }

    // PREPARACIÓN DE LA TAREA
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: (createTaskDto.status && createTaskDto.status.trim() !== '') 
        ? createTaskDto.status 
        : 'PENDING',
      dueDate: (createTaskDto.dueDate && createTaskDto.dueDate.trim() !== '') 
        ? new Date(createTaskDto.dueDate) 
        : new Date(),
      user: user,
    };

    return await this.taskRepository.create(taskData);
  }

  // MÉTODO: OBTENER TAREAS ACTIVAS
  async getTasksByUser(userId: string, status?: string) {
    return await this.taskRepository.findByUserId(userId, status);
  }

  // MÉTODO: OBTENER TAREAS ELIMINADAS
  async getDeletedTasks(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`El usuario con ID ${userId} no existe`);
    }
    return await this.taskRepository.findDeletedByUserId(userId);
  }
  
  // MÉTODO: ACTUALIZAR ESTADO
  async updateStatus(id: string, status: string) {
    const task = await this.taskRepository.update(id, { status } as any);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  // MÉTODO: ELIMINAR TAREA
  async remove(id: string) {
    await this.taskRepository.softDelete(id);
    return { 
      message: `Tarea con ID ${id} eliminada correctamente (Soft Delete)` 
    };
  }
}