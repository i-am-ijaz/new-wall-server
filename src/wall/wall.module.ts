import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { Wall, WallSchema } from './entities/wall.entity';
import { WallController } from './wall.controller';
import { WallService } from './wall.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wall.name,
        schema: WallSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      }
    ]),
  ],
  controllers: [WallController],
  providers: [WallService, CategoryService],
})
export class WallModule {}
