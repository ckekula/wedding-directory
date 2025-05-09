import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotResolver } from '../../graphql/resolvers/chatbot.resolver';
import { VectorSearchModule } from './vector-search.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Conversation, ConversationSchema } from '../../database/schemas/chatbot.schema';

@Module({
  imports: [
    VectorSearchModule,
    ConfigModule,
    MongooseModule.forFeature([
        { name: Conversation.name, schema: ConversationSchema }   
    ])
  ],
  providers: [ChatbotService, ChatbotResolver],
  exports: [ChatbotService],
})
export class ChatbotModule {}