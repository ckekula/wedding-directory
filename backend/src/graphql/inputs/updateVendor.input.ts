import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateVendorInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  fname?: string;

  @Field({ nullable: true })
  lname?: string;

  @Field({ nullable: true })
  busname?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  about?: string;
}
