import { Body, Controller, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Category, CategoryDocument } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiAcceptedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  private async create(@Body() category: Category): Promise<CategoryDocument> {
    return await this.categoryService.create(category);
  }
}
