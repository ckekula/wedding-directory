import { Field, ObjectType } from '@nestjs/graphql';
import { OfferingModel } from './offering.model';
import { VisitorModel } from './visitor.model';

@ObjectType()
export class ReviewModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  comment?: string;

  @Field()
  rating: string;

  @Field(() => OfferingModel)
  offering: OfferingModel;
  
  @Field(() => VisitorModel)
  visitor: VisitorModel;

  @Field()
  createdAt: Date;

}