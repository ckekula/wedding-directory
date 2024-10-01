import { Field, ObjectType } from '@nestjs/graphql';
import { PortfolioModel } from './portfolio.model';

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
  category: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => PortfolioModel, { nullable: true })
  portfolio?: PortfolioModel;
}