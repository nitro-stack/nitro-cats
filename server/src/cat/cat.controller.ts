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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
  AzureStorageService,
} from '@nestjs/azure-storage';
import { AzureTableContinuationToken } from '@nestjs/azure-database';
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
  uploadCat(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(
      `File "${file.originalname}" was uploaded using Azure Storage Interceptor`,
      'CatController',
    );

    return this.addCat(file.storageUrl);
  }

  @Get()
  getAllCats(
    @Query('orderBy')
    orderBy: string,
    @Query('continuationToken')
    continuationToken: string
  ) {
    const azureContinuationToken: AzureTableContinuationToken = continuationToken ? JSON.parse(continuationToken) : undefined;
    if (orderBy === 'rating') {
      return this.catService.findAllByRating(azureContinuationToken);
    }
    return this.catService.findAll(azureContinuationToken);
  }

  @Post(':id/paw')
  async incrementRating(
    @Body()
    data: { rating: number },
    @Param('id') id,
  ) {
    const { rating } = data;
    if (rating && (rating < 1 || rating > 10)) {
      throw new BadRequestException('rating must be a number between 1 and 10');
    }
    try {
      return await this.catService.incrementRating(id, rating || 1);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete(':id')
  async deleteCat(@Param('id') id) {
    try {
      return await this.catService.delete(id);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  private async addCat(storageUrl: string | boolean) {
    if (storageUrl !== false) {
      const url = storageUrl as string;
      try {
        Logger.log(`Created new cat with storage URL: ${url}`, 'CatController');
        return await this.catService.create(url);
      } catch (error) {
        throw new UnprocessableEntityException(error);
      }
    } else {
      throw new BadGatewayException();
    }
  }
}
