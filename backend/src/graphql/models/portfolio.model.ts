import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PortfolioModel {
  @Field()
  id: string;

  @Field()
  bus_phone: string;

  @Field()
  bus_email: string;

  @Field()
  about: string;

  @Field()
  pfp: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  experience: string;

  @Field()
  website : string;

  @Field()
  instagram: string;

  @Field()
  facebook: string;

  @Field()
  x: string;

  @Field()
  tiktok: string;
  
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
