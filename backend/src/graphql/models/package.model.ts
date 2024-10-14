import { ObjectType, Field } from '@nestjs/graphql';
import { VendorModel } from './vendor.model';

@ObjectType()
export class PackageModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  bus_phone: string;

  @Field({ nullable: true })
  bus_email: string;

  @Field({ nullable: true })
  about: string;

  @Field({ nullable: true })
  banner: string;

  @Field(() => [String], { nullable: true })
  media: string[];

  @Field({ nullable: true })
  experience: string;

  @Field({ nullable: true })
  start_price: string;

  @Field({ nullable: true })
  website : string;

  @Field({ nullable: true })
  instagram: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  x: string;

  @Field({ nullable: true })
  tiktok: string;
  
  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => VendorModel)
  vendor: VendorModel;
}
