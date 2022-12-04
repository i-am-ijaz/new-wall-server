import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wall, WallDocument } from './entities/wall.entity';

@Injectable()
export class WallService {
  constructor(
    @InjectModel(Wall.name)
    private readonly wallModel: Model<WallDocument>,
  ) {}

  async create(wall: Wall): Promise<WallDocument> {
    return await this.wallModel.create(wall);
  }
}
