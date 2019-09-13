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
import { Cat } from './cat.entity';
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
  ) {
    try {
      const cat = new Cat();
      // Disclaimer: Assign only the properties you are expecting!
      Object.assign(cat, catData);

      return await this.catService.create(cat);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
