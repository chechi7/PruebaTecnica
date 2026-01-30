import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/entities/user.orm-entity';
import { TaskOrmEntity } from './infrastructure/persistence/entities/task.orm-entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/repositories/typeorm-user.repository';
import { TypeOrmTaskRepository } from './infrastructure/persistence/repositories/typeorm-task.repository';
import { UserService } from './application/user/user.service';
import { TaskService } from './application/task/task.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { TaskController } from './infrastructure/controllers/task.controller';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: (process.env.DB_HOST as string) || 'db',
      port: parseInt(process.env.DB_PORT as string) || 5432,
      username: (process.env.DB_USERNAME as string) || 'user_admin',
      password: (process.env.DB_PASSWORD as string) || 'password123',
      database: (process.env.DB_NAME as string) || 'task_db',
      entities: [UserOrmEntity, TaskOrmEntity],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
      autoLoadEntities: true, 
    }),
    TypeOrmModule.forFeature([UserOrmEntity, TaskOrmEntity]),
    AuthModule,
  ],
  controllers: [UserController, TaskController],
  providers: [
    UserService, 
    TaskService, 
    TypeOrmUserRepository, 
    TypeOrmTaskRepository
  ],
})
export class AppModule {}