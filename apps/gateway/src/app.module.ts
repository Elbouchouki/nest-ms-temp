import { PrismaModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.register({ logQueries: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
