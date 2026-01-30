import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from '../../application/task/task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly authService: AuthService,
  ) {}

  // --- ENDPOINT TEMPORAL PARA PRUEBAS ---
  @Get('auth/seed-token')
  @ApiOperation({ summary: 'GENERAR TOKEN DE PRUEBA (Temporal)' })
  getToken() {
    return this.authService.generateTokenForTesting();
  }
  // ---------------------------------------

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear una nueva tarea (REQUIERE TOKEN)' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener tareas por ID de usuario' })
  getByByUser(@Param('userId') userId: string, @Query('status') status?: string) {
    return this.taskService.getTasksByUser(userId, status);
  }

  @Get('user/:userId/deleted')
  @ApiOperation({ summary: 'Obtener historial de tareas eliminadas (Soft Delete)' })
  getDeleted(@Param('userId') userId: string) {
    return this.taskService.getDeletedTasks(userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tarea' })
  async updateStatus(
    @Param('id') id: string, 
    @Body() updateStatusDto: UpdateTaskStatusDto
  ) {
    return this.taskService.updateStatus(id, updateStatusDto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete de una tarea' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}