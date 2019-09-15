import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
  Patch,
} from '@nestjs/common';
import { CatDto } from './cat.dto';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  // TODO add optional orderBy parameter
  @Get('api/cats')
  async getAllContacts() {
    return await this.catService.findAll();
  }

  @Post('api/cats/:id')
  async rateCat(
    @Body()
    catData: CatDto,
    @Param() params,
  ) {
    try {
      return await this.catService.incrementRating(params.id, 8);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
