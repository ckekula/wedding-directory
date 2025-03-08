import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
    @Field()
    chatId: string;

    @Field({ nullable: true })
    visitorSenderId?: string;

    @Field({ nullable: true })
    vendorSenderId?: string;

    @Field()
    content: string;
}