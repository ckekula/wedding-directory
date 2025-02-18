import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {

    @Field({ nullable: true })
    comment?: string;

    @Field()
    rating: number;

    @Field()
    offering_id: string;
    
    @Field()
    visitor_id: string;
}