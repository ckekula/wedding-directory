import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentResolver } from 'src/graphql/resolvers/payment.resolver';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { PackageEntity } from 'src/database/entities/package.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, VisitorEntity, VendorEntity, PackageEntity])
  ],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}