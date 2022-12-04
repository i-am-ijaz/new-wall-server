import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ]),
  ],
  controllers: [WallController],
  providers: [WallService],
})
export class WallModule {}
