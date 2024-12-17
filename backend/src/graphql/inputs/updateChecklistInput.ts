import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateChecklistInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  due_date?: string;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
