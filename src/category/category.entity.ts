import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Category {
  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  name: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  lowerCaseName: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  url: string;

  @ApiProperty({ required: true })
  @Prop({ required: true, default: null })
  thumbnailUrl: string;
}

export type CategoryDocument = Category & Document;
export class UpdateCategoryDto extends PartialType(Category) {}
export const CategorySchema = SchemaFactory.createForClass(Category);
