import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVendorInput {
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
  location: string;

}
