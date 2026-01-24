import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiProperty({ 
    example: 'DONE', 
    description: 'El nuevo estado de la tarea',
    enum: ['PENDING', 'IN_PROGRESS', 'DONE'] 
  })
  @IsNotEmpty()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'])
  status: string;
}