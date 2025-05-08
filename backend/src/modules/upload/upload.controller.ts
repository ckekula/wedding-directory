import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  Body,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  //Upload the offering banner image
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

  // Upload the offering showcase images
  @Post('offering-showcase')
  @UseInterceptors(FilesInterceptor('files', 5)) // Allows up to 5 images
  async uploadOfferingShowcase(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('offeringId') offeringID: string,
  ) {
    if (!files || files.length === 0 || !offeringID) {
      throw new BadRequestException('Files or Offering ID is missing.');
    }

    if (files.length > 5) {
      throw new BadRequestException('You can upload a maximum of 5 images.');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    const uploadedUrls = [];

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxFileSize) {
        throw new BadRequestException(`File too large: ${file.originalname}`);
      }

      const fileName = `${Date.now()}-${file.originalname}`;

      try {
        const fileUrl = await this.uploadService.uploadImage(fileName, file.buffer);
        uploadedUrls.push(fileUrl);
      } catch (error) {
        console.error('Upload failed:', error);
        throw new BadRequestException(`Error uploading file: ${file.originalname}`);
      }
    }

    await this.offeringService.updateOfferingShowcaseImages(offeringID, uploadedUrls);
    return { uploadedUrls };
  }


  // Upload multiple offering videos
  @Post('offering-videos')
  @UseInterceptors(FilesInterceptor('files', 5)) // Allows up to 5 videos to be uploaded at once
  async uploadOfferingVideos(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50MB per video
          new FileTypeValidator({ fileType: 'video/mp4|video/webm' }),
        ],
      }),
    ) files: Array<Express.Multer.File>,
    @Body('offeringId') offeringID: string
  ) {
    // Check if files and offeringId exist
    if (!files || files.length === 0 || !offeringID) {
      throw new BadRequestException('Files or Offering ID is missing.');
    }

    const uploadedUrls = [];
    const allowedMimeTypes = ['video/mp4', 'video/webm'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    for (const file of files) {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxFileSize) {
        throw new BadRequestException(`File too large: ${file.originalname}`);
      }

      const fileName = `${Date.now()}-${file.originalname}`;

      try {
        const fileUrl = await this.uploadService.uploadVideo(fileName, file.buffer); // Assuming uploadVideo method in uploadService
        uploadedUrls.push(fileUrl);
      } catch (error) {
        console.error('Upload failed:', error);
        throw new BadRequestException(`Error uploading video: ${file.originalname}`);
      }
    }

    // Update the offering with the uploaded video URLs
    await this.offeringService.updateOfferingVideos(offeringID, uploadedUrls);
    return { uploadedUrls };
  }


}
