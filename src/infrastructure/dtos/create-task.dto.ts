import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea', example: '' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Descripción (Opcional)', example: '', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID del usuario', example: '' })
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Fecha (ISO8601) - Opcional', example: '', required: false })
  @IsOptional()
  @ValidateIf((o) => o.dueDate !== '' && o.dueDate !== null)
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ 
    description: 'Estado - Opcional', 
    enum: ['PENDING', 'IN_PROGRESS', 'DONE'], 
    example: '', 
    required: false 
  })
  @IsOptional()
  @ValidateIf((o) => o.status !== '' && o.status !== null)
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'])
  status?: string;
}