import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaymentModel } from '../../graphql/models/payment.model';
import { PaymentService } from '../../modules/payment/payment.service';

@Resolver(() => PaymentModel)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(() => [PaymentModel])
  async visitorPayments(@Args('visitorId') visitorId: string) {
    return this.paymentService.findByVisitorId(visitorId);
  }

  @Query(() => [PaymentModel])
  async vendorPayments(@Args('vendorId') vendorId: string) {
    return this.paymentService.findByVendorId(vendorId);
  }

  @Query(() => [PaymentModel])
  async packagePayments(@Args('packageId') packageId: string) {
    return this.paymentService.findByPackageId(packageId);
  }
}