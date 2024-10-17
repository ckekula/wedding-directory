import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OfferingFilterInput {
  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  city?: string;
}
