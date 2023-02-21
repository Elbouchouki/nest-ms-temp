import { FindManyuserArgs } from '@app/common/types/user/find-manyuser.args';
import { userCreateInput } from '@app/common/types/user/user-create.input';
import { userUpdateInput } from '@app/common/types/user/user-update.input';
import { user } from '@app/common/types/user/user.model';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver(() => user)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => user)
  async createUser(@Args('createUserInput') createUserInput: userCreateInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [user], { name: 'users' })
  async findAll(
    @Args()
    findManyuserArgs: FindManyuserArgs,
  ) {
    return await this.usersService.findAll(findManyuserArgs);
  }

  @Query(() => user, { name: 'user' })
  async findOne(@Args('id') id: string) {
    // , { type: () => String })
    return await this.usersService.findOne(id);
  }

  @Mutation(() => user)
  async updateUser(@Args('updateUserInput') updateUserInput: userUpdateInput) {
    return await this.usersService.update(updateUserInput);
  }

  @Mutation(() => user)
  async removeUser(@Args('id') id: string) {
    return await this.usersService.remove(id);
  }
}
