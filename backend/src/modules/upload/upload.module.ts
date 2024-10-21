import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { VisitorModule } from '../visitor/visitor.module';
import { VendorModule } from '../vendor/vendor.module';
import { OfferingModule } from '../offering/offering.module';
@Module({
  imports: [VisitorModule, VendorModule, OfferingModule
    // implement rate limiter
  ],

  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
