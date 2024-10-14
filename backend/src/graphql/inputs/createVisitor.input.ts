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
  engaged_date?: string;

  @Field({ nullable: true })
  wed_date?: string;

  @Field({ nullable: true })
  wed_venue?: string;
  
  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  city?: string;

}
