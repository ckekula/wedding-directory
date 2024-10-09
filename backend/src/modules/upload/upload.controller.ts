import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB size limit
          new FileTypeValidator({ fileType: 'image/jpeg|image/png' }),
          // new MaxFileSizeValidator({ maxSize: 1000}),
          // new FileTypeValidator({ fileType: 'image/jpeg'})
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileName = `${Date.now()}-${file.originalname}`;
    // Upload the file to S3
    await this.uploadService.upload(file.originalname, file.buffer);
    // Return the file URL
    const fileUrl = `https://multi-vendor-wedding-directory.s3.amazonaws.com/${fileName}`;
    return { fileUrl };
  }
}
