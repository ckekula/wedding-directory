import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChecklistModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  due_date: string;

  @Field()
  category: string;

  @Field()
  completed: boolean;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
