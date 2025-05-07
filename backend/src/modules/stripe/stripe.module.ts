import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    ConfigModule,
    PaymentModule
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}