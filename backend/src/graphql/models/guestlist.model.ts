import { ObjectType, Field } from '@nestjs/graphql';
import { VisitorModel } from './visitor.model';

@ObjectType()
export class GuestListModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  number: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  contact: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => VisitorModel)
  visitor: VisitorModel;
}
