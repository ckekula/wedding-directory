import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly chatService: ChatService) { }

    @SubscribeMessage('sendMessage')
    async handleMessage(@MessageBody() data: any): Promise<void> {
        const message = await this.chatService.sendMessage(data);
        this.server.emit('receiveMessage', message);
    }
}