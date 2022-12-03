import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfig } from './config';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [MongooseModule.forRoot(DBConfig.URL), StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
