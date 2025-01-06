import { ObjectType, Field } from '@nestjs/graphql';
import { OfferingModel } from './offering.model';
import { VisitorModel } from './visitor.model';

@ObjectType()
export class MyVendorsModel {
  @Field()
  id: string;

  @Field(() => VisitorModel)
  visitor: VisitorModel;

  @Field(() => OfferingModel)
  offering: OfferingModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}