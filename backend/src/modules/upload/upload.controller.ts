import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  Body, // Import Body to receive visitorId
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { VisitorService } from '../visitor/visitor.service'; // Import VisitorService

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly visitorService: VisitorService, // Inject VisitorService
  ) {}

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB size limit
          new FileTypeValidator({ fileType: 'image/jpeg|image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('visitorId') visitorId: string, // Get the visitorId from the request body
  ) {
    const fileName = `${Date.now()}-${file.originalname}`;
    
    // Upload the file to S3
    const fileUrl = await this.uploadService.upload(fileName, file.buffer);
    
    // Update the visitor profile picture URL in the database
    await this.visitorService.updateProfilePicture(visitorId, fileUrl);

    // Return the file URL in the response
    return { fileUrl };
  }
}
