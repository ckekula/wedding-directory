import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any): Promise<{ fulfillmentText: string }> {
    const intent = body.queryResult.intent.displayName;
    const response = this.chatbotService.getResponse(intent);
    
    return { fulfillmentText: response };
  }
}
