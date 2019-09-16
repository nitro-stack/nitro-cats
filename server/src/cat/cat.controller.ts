import {
  UseInterceptors,
  UploadedFile,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnprocessableEntityException,
  Patch,
  Logger,
  BadGatewayException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  UploadedFileMetadata,
  AzureStorageService,
} from '@nestjs/azure-storage';

import { CatDto } from './cat.dto';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService, private azureStorage: AzureStorageService) {}

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    console.log(file);
    file = {
      ...file,
      originalname: 'foo-bar.txt',
    };

    const storageUrl = await this.azureStorage.upload(file, {
      containerName: 'nitrocats',
    });
    
    if (storageUrl !== false) {
      try {
        await this.catService.addCat(storageUrl);
        Logger.log(
          `File "${file.originalname}" was uploaded using Azure Service`,
          'AppController',
        );
        Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
      } catch (error) {
        throw new UnprocessableEntityException(error);
      }
    } else {
      throw new BadGatewayException();
    }

    Logger.log(
      `File "${file.originalname}" was uploaded using Azure Service`,
      'AppController',
    );
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
  }

  @Post('upload2')
  @UseInterceptors(AzureStorageFileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    Logger.log(
      `File "${
        file.originalname
      }" was uploaded using Azure Storage Interceptor`,
      'AppController',
    );
    Logger.log(`Storage URL: ${file.storageUrl}`, 'AppController');
  }

  // TODO add optional orderBy parameter
  @Get()
  async getAllCats() {
    return await this.catService.findAll();
  }

  @Post(':id')
  async addCat(
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
