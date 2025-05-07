import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentResolver } from 'src/graphql/resolvers/payment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService],
})
export class PaymentModule {}