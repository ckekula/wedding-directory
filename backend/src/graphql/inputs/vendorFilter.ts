import { InputType, Field  } from '@nestjs/graphql';

@InputType()
export class VendorFilterInput {
  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  category?: string;

}
