import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../application/user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto.name, createUserDto.email);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}