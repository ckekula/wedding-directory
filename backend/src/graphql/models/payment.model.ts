import { ObjectType, Field, Float } from '@nestjs/graphql';
import { VisitorModel } from './visitor.model';
import { VendorModel } from './vendor.model';
import { PackageModel } from './package.model';

@ObjectType()
export class PaymentModel {
  @Field()
  id: string;

  @Field(() => VisitorModel)
  visitor: VisitorModel;

  @Field(() => VendorModel)
  vendor: VendorModel;

  @Field(() => PackageModel)
  package: PackageModel;

  @Field(() => Float)
  amount: number;

  @Field()
  stripeSessionId: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}