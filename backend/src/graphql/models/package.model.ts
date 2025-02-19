import { Field, ObjectType } from "node_modules/@nestjs/graphql/dist";
import { OfferingModel } from "./offering.model";

@ObjectType()
export class PackageModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  pricing: number;

  @Field(() => [String])
  features: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
  
  @Field(() => OfferingModel)
  offering: OfferingModel
  
}