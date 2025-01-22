import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
    @Field()
    visitorId: string;

    @Field()
    vendorId: string;
}