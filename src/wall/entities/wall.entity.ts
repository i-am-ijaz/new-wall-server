import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Wall {
  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  url: string;

  @ApiProperty({ required: true })
  @Prop({ required: false, default: null })
  thumbnailUrl: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  tags: string[];
}

export type WallDocument = Wall & Document;
export class UpdateWallDto extends PartialType(Wall) {}
export const WallSchema = SchemaFactory.createForClass(Wall);
