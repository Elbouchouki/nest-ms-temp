import { InjectRepository, PrismaRepository } from '@app/common';
import { FindManyuserArgs } from '@app/common/types/user/find-manyuser.args';
import { userCreateInput } from '@app/common/types/user/user-create.input';
import { userUpdateInput } from '@app/common/types/user/user-update.input';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private readonly include: Prisma.userInclude = {
    _count: true,
    post: true,
    auth: true,
  };

  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaRepository['user'],
  ) {}

  async create(createUserInput: userCreateInput) {
    return await this.userRepo.create({
      data: createUserInput,
      include: this.include,
    });
  }

  async findAll(args: FindManyuserArgs) {
    return await this.userRepo.findMany({
      include: this.include,
      ...args,
    });
  }

  async findOne(id: string) {
    return await this.userRepo.findUnique({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async update(updateUserInput: userUpdateInput) {
    return await this.userRepo.update({
      data: updateUserInput,
      where: {
        id: updateUserInput.id.set,
      },
      include: this.include,
    });
  }

  async remove(id: string) {
    return await this.userRepo.delete({
      where: {
        id,
      },
      include: this.include,
    });
  }
}
