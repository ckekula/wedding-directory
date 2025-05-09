import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { ChatService } from "../../modules/chat/chat.service";
import { ChatType } from "../../database/types/chatTypes";
import { CreateChatInput } from "../inputs/createChat.input";

@Resolver()
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  // Keep your existing queries
  @Query(() => [ChatType])
  async getVendorChats(@Args("vendorId") vendorId: string) {
    return this.chatService.getVendorChats(vendorId);
  }

  @Query(() => [ChatType])
  async getOfferingChats(@Args("offeringId") offeringId: string) {
    return this.chatService.getOfferingChats(offeringId);
  }

  @Query(() => [ChatType])
  async getVisitorChats(@Args("visitorId") visitorId: string) {
    return this.chatService.getVisitorChats(visitorId);
  }

  @Query(() => ChatType)
  async getChatHistory(@Args("chatId") chatId: string) {
    return this.chatService.getChatHistory(chatId);
  }
  @Query(() => ChatType)
  async getChat(
    @Args("visitorId") visitorId: string,
    @Args("offeringId") offeringId: string
  ) {
    return this.chatService.findOrCreateChat(offeringId, visitorId);
  }

  
  @Mutation(() => ChatType)
  async createChat(@Args('createChatInput') createChatInput: CreateChatInput) {
    return this.chatService.findOrCreateChat(
      createChatInput.offeringId,
      createChatInput.visitorId
    );
  }

  @Mutation(() => ChatType)
  async sendQuoteMessage(
    @Args("chatId") chatId: string,
    @Args("content") content: string,
    @Args("visitorSenderId", { nullable: true }) visitorSenderId?: string,
    @Args("vendorSenderId", { nullable: true }) vendorSenderId?: string
  ) {
    return this.chatService.sendMessage({
      chatId,
      content,
      visitorSenderId,
      vendorSenderId,
    });
  }
}
