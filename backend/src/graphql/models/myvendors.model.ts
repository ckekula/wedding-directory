import { ObjectType, Field } from '@nestjs/graphql';
import { OfferingModel } from './offering.model';

@ObjectType()
export class MyVendorsModel {
  @Field()
  id: string;

  @Field(() => OfferingModel)
  offering: OfferingModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}