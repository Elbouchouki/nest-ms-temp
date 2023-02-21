import { PrismaModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.register({ logQueries: true }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
