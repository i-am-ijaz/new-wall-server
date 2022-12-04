import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CategoryDocument } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { Wall, WallDocument } from './entities/wall.entity';
import { WallService } from './wall.service';

@ApiTags('Wall')
@Controller('wall')
export class WallController {
  constructor(
    private readonly wallService: WallService,
    private readonly cateogryService: CategoryService,
  ) {}

  @Post()
  @ApiAcceptedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  async create(@Body() wall: Wall): Promise<WallDocument> {
    for (const i in wall.tags) {
      const category: CategoryDocument = await this.cateogryService.get(
        wall.tags[i],
      );

      if (!category)
        throw new BadRequestException(
          `Tag ${wall.tags[i]} does not belong to category`,
        );
    }

    return await this.wallService.create(wall);
  }

  @Get('/pages/:pageNumber')
  @ApiAcceptedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  async getPostPages(
    @Param('pageNumber') pageNumber: string,
    @Query('from') fromTime: Date,
  ) {
    return await this.wallService.getWallPage(parseInt(pageNumber), fromTime);
  }
}
