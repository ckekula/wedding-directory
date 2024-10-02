import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VisitorModel {
  @Field()
  id: string;

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
