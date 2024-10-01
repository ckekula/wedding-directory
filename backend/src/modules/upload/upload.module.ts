import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    // implement rate limiter
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
