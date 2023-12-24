import {
  Body,
  Controller,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { UploadService } from './upload/upload.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private readonly uploadService: UploadService,
  ) {}

  // @Get()
  // @UseInterceptors(FileInterceptor('image'))
  // async getHello(@UploadedFile() file: Express.Multer.File, @Body() body) {
  //   console.log(file);
  //   console.log(body.name);
  //   const uploadedFilePath = await this.uploadService.uploadFile(file);
  //   return { message: 'Image uploaded successfully', path: uploadedFilePath };
  //   // return 'hello world';
  //   // return this.appService.getHello();
  // }
}
