import { Field, ObjectType } from '@nestjs/graphql';
import { LocationModel } from './location.model';

@ObjectType()
export class VendorModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  fname: string;

  @Field()
  lname: string;
  
  @Field()
  busname: string;

  @Field()
  phone: string;

  @Field()
  city: string;

  @Field()
  category: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => LocationModel, { nullable: true })
  location?: LocationModel;
}