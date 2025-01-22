import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatService } from '../../modules/chat/chat.service';
import { CreateChatInput } from '../inputs/createChat.input';
import { SendMessageInput } from '../inputs/sendMessage.input';
import { Chat } from '../../database/entities/chat.entity';
import { Message } from '../../database/entities/message.entity';

@Resolver(()=> Chat)
export class ChatResolver {
    constructor(private readonly chatService: ChatService) { }

    @Mutation(() => Chat)
    async createChat(@Args('createChatInput') createChatInput: CreateChatInput): Promise<Chat> {
        return this.chatService.createChat(createChatInput);
    }

    @Mutation(() => Message)
    async sendMessage(@Args('sendMessageInput') sendMessageInput: SendMessageInput): Promise<Message> {
        return this.chatService.sendMessage(sendMessageInput);
    }

    @Query(() => [Chat])
    async getChats(@Args('userId') userId: string): Promise<Chat[]> {
        return this.chatService.getChats(userId);
    }
}