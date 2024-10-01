import { ObjectType, Field } from '@nestjs/graphql';
import { VendorModel } from './vendor.model';

@ObjectType()
export class PackageModel {
  @Field()
  id: string;

  @Field()
  vendor_id: string;

  @Field()
  category: string;

  @Field()
  bus_phone: string;

  @Field()
  bus_email: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  pfp: string;

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
