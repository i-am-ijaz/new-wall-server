import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Wall, WallDocument, WallSchema } from './entities/wall.entity';
import { WallService } from './wall.service';

@ApiTags('Wall')
@Controller('wall')
export class WallController {
  constructor(private readonly wallService: WallService) {}

  @Post()
  @ApiAcceptedResponse({ description: 'Success' })
  @ApiUnauthorizedResponse({ description: 'UnAuthorized' })
  async create(@Body() wall: Wall): Promise<WallDocument> {
    return await this.wallService.create(wall);
  }
}
