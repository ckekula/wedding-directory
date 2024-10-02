import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateVisitorInputP1 {
  @Field({ nullable: true })
  visitor_fname?: string;

  @Field({ nullable: true })
  visitor_lname?: string;

  @Field({ nullable: true })
  partner_fname?: string;

  @Field({ nullable: true })
  partner_lname?: string;
}
