import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LocationModel {
  @Field()
  id: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;
}
