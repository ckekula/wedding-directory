import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { VisitorModule } from '../visitor/visitor.module';
@Module({
  imports: [VisitorModule
    // implement rate limiter
  ],

  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
