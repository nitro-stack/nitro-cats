import {
  UseInterceptors,
  UploadedFile,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  Logger,
  UnprocessableEntityException,
  BadGatewayException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
  AzureStorageService,
} from '@nestjs/azure-storage';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private azureStorage: AzureStorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedCatUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(
      `File "${file.originalname}" was uploaded using Azure Service`,
      'CatController',
    );

    try {
      const storageUrl = await this.azureStorage.upload(file);
      return this.addCat(storageUrl);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post('upload/interceptor')
  @UseInterceptors(AzureStorageFileInterceptor('file'))
  async uploadCat(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(
      `File "${
        file.originalname
      }" was uploaded using Azure Storage Interceptor`,
      'CatController',
    );

    return this.addCat(file.storageUrl);
  }

  // TODO add optional orderBy parameter
  // TODO support continuation token
  @Get()
  async getAllCats() {
    return await this.catService.findAll();
  }

  @Post(':id/paw')
  async incrementRating(
    @Body()
    data: { rating: number },
    @Param() params,
  ) {
    const { rating } = data;
    if (rating && (rating < 1 || rating > 10)) {
      throw new BadRequestException('rating must be a number between 1 and 10');
    }
    try {
      return await this.catService.incrementRating(params.id, rating || 1);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete(':id')
  async deleteCat(@Param() params) {
    try {
      return await this.catService.delete(params.id);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  private async addCat(storageUrl: string | boolean) {
    if (storageUrl !== false) {
      const url = storageUrl as string;
      try {
        await this.catService.create(url);
        Logger.log(`Created new cat with storage URL: ${url}`, 'CatController');
      } catch (error) {
        throw new UnprocessableEntityException(error);
      }
    } else {
      throw new BadGatewayException();
    }
  }
}
