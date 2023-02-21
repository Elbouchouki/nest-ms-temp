import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      playground: false,
      autoSchemaFile: join(process.cwd(), 'libs/common/src/graphql.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.register({ logQueries: true }),
    UsersModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
