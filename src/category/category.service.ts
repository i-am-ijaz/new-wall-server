import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: Category): Promise<CategoryDocument> {
    return await this.categoryModel.create(category);
  }

  async get(lowerCaseName: string): Promise<CategoryDocument> {
    return await this.categoryModel.findOne({ lowerCaseName: lowerCaseName });
  }
}
