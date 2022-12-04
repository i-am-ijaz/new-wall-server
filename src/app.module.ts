import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './config';
import { StorageModule } from './storage/storage.module';
import { WallModule } from './wall/wall.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.DB_Config.URL),
    StorageModule,
    ServeStaticModule.forRoot({
      rootPath: Config.STORAGE_CONFIG.imagesPath,
      serveRoot: '/storage/download',
    }),
    WallModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
