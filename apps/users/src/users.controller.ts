import { Controller, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomInt, randomUUID } from 'crypto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }

  @Get('/getAll')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/add')
  async addUser() {
    const user: Prisma.userCreateInput = {
      id: randomInt(50),
      password: randomUUID(),
      username: randomUUID(),
    };
    return await this.usersService.addUser(user);
  }
}
