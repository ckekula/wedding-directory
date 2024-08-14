import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVisitorInput {

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  visitor_fname?: string;

  @Field({ nullable: true })
  visitor_lname?: string;

  @Field({ nullable: true })
  partner_fname?: string;

  @Field({ nullable: true })
  partner_lname?: string;

  @Field({ nullable: true })
  engaged_date?: Date;

  @Field({ nullable: true })
  wed_date?: Date;

  @Field({ nullable: true })
  wed_venue?: string;
}
