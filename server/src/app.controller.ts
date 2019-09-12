import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  UnprocessableEntityException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AzureStorageFileInterceptor,
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import { CatService } from './cat/cat.service';
import { Cat } from './cat/cat.entity';

@Controller()
export class AppController {
  constructor(
    private readonly azureStorage: AzureStorageService,
    private readonly catService: CatService
    ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFilesUsingService(
    @UploadedFile()
    file: UploadedFileMetadata,
  ) {
    file = {
      ...file,
      originalname: 'foo-bar.txt',
    };

    const storageUrl = await this.azureStorage.upload(file, {
      containerName: 'nitro-cats-service',
    });

    const cat = new Cat({
      url: storageUrl,
      rating: 0
    });

    try {
      await this.catService.create(cat);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }

    Logger.log(
      `File "${file.originalname}" was uploaded using Azure Service`,
      'AppController',
    );
    Logger.log(`Storage URL: ${storageUrl}`, 'AppController');
  }

  @Post('upload/interceptor')
  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'nitro-cats-interceptor',
    }),
  )
  UploadedFilesUsingInterceptor(
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
}
