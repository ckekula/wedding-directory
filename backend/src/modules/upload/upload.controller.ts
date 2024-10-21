import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  Body,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { VisitorService } from '../visitor/visitor.service';
import { OfferingService} from '../offering/offering.service';


@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly visitorService: VisitorService,
    private readonly offeringService: OfferingService
  ) {}

  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/jpeg|image/png|image/webp' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('visitorId') visitorId: string, // Expecting the visitorId in the body
  ) {
    // Check if file and visitorId exist
    if (!file || !visitorId) {
      throw new BadRequestException('File or Visitor ID is missing.');
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    // Try to upload the file
    try {
      const fileUrl = await this.uploadService.uploadImage(fileName, file.buffer);
      await this.visitorService.updateProfilePicture(visitorId, fileUrl);
      return { fileUrl };
    } catch (error) {
      console.error('Upload failed:', error); // Log the error for debugging
      throw new BadRequestException('Error uploading the file.');
    }
  }

  @Post('offering-banner')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOfferingBanner(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/jpeg|image/png|image/webp' }),
        ],
      }),
    )
      file: Express.Multer.File,
    @Body('offeringId') offeringID: string, // Expecting the visitorId in the body
  ) {
    // Check if file and visitorId exist
    if (!file || !offeringID) {
      throw new BadRequestException('File or Offering ID is missing.');
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    // Try to upload the file
    try {
      const fileUrl = await this.uploadService.uploadImage(fileName, file.buffer);
      await this.offeringService.updateOfferingBanner(offeringID, fileUrl);
      return { fileUrl };
    } catch (error) {
      console.error('Upload failed:', error); // Log the error for debugging
      throw new BadRequestException('Error uploading the file.');
    }
  }
}
