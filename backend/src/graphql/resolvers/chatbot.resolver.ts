import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Conversation } from '../../database/schemas/chatbot.schema';
import { ChatbotService } from '../../modules/ai/chatbot.service';
import { ChatbotStatus } from '../models/chatbotStatus.model';
import { ChatbotResponse } from '../models/chatbotResponse.model';

@Resolver('Chatbot')
export class ChatbotResolver {
  constructor(
    private chatbotService: ChatbotService,
    @InjectModel(Conversation.name) private conversationModel: Model<Conversation>,
  ) {}

  @Query(() => ChatbotStatus)
  async chatbotStatus(): Promise<ChatbotStatus> {
    return { status: 'online' };
  }

  @Mutation(() => ChatbotResponse)
  async sendMessage(
    @Args('message') message: string,
    @Args('conversationId', { nullable: true }) conversationId?: string,
  ): Promise<{ response: string; conversationId: string }> {
    // Fetch conversation history if conversationId is provided
    // need to implement conversation storage
    const conversationHistory = conversationId 
      ? await this.getConversationHistory(conversationId)
      : [];
    
    // Process the message
    const response = await this.chatbotService.processMessage(message, conversationHistory);
    
    // Save the conversation (simplified)
    const newConversationId = conversationId || this.generateConversationId();
    await this.saveConversation(newConversationId, message, response);
    
    return {
      response,
      conversationId: newConversationId,
    };
  }

  private async getConversationHistory(conversationId: string): Promise<Array<{role: string, content: string}>> {
    const conversation = await this.conversationModel.findOne({ 
      conversationId 
    }).exec();
    
    if (!conversation) {
      return [];
    }

    return conversation.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  private async saveConversation(conversationId: string, message: string, response: string): Promise<void> {
    const now = new Date();
    const messages = [
      { role: 'user', content: message, timestamp: now },
      { role: 'assistant', content: response, timestamp: now }
    ];

    await this.conversationModel.findOneAndUpdate(
      { conversationId },
      { 
        $push: { messages: { $each: messages } },
        $setOnInsert: { createdAt: now },
        $set: { updatedAt: now }
      },
      { upsert: true, new: true }
    ).exec();
  }

  private generateConversationId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}