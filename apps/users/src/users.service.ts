import { PrismaRepository, InjectRepository } from '@app/common';
import {} from '@app/common/database/inject-repository.decorator';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaRepository['user'],
  ) {}

  async getUsers() {
    return await this.userRepo.findMany();
  }

  async addUser(userCreateInput: Prisma.userCreateInput) {
    this.logger.log(userCreateInput);
    return await this.userRepo.create({
      data: userCreateInput,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
