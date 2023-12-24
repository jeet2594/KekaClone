import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Multer } from 'multer'; // Corrected import

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const uploadPath = `uploads/${uniqueFileName}`;

    const writeStream = createWriteStream(uploadPath);
    writeStream.write(file.buffer);

    return uploadPath;
  }
}
