import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { VectorSearchService } from './vector-search.service';

@Injectable()
export class ChatbotService {
  private openai: OpenAI;
  
  constructor(
    private configService: ConfigService,
    private vectorSearchService: VectorSearchService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async processMessage(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    // Search for relevant data using vector similarity
    const searchResults = await this.vectorSearchService.search(message, 5);
    
    // Format the search results as context
    const context = searchResults.map(result => result.content).join('\n\n');
    
    // Build the system message with instructions and context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful assistant for a wedding planning platform called "Say I Do". 
      Answer user questions about vendors, services, and packages based on the following context.
      If you don't know the answer, say so politely and don't make up information.
      
      CONTEXT:
      ${context}

      If you find relevant vendors or services in the context, include their names and details in your response.
      If you cannot find specific vendors in the context, let the user know they can search the marketplace on the website.`
    };
    
    // Prepare the conversation messages
    const messages = [
      systemMessage,
      ...conversationHistory,
      { role: 'user', content: message }
    ];
    
    // Generate a response using OpenAI
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messages as any,
      temperature: 0.7,
    });
    
    return response.choices[0].message.content || 'I apologize, but I couldn\'t generate a response at this time.';
  }
}