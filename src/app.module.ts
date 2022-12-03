import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfig } from './config';

@Module({
  imports: [MongooseModule.forRoot(DBConfig.URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
