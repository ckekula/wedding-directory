import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { Logger } from "node_modules/@nestjs/common";
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
  port: 4000
  
})

export class ChatGateway {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) {}

  afterInit() {
    this.logger.log("WebSocket server initialized");
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(
    @MessageBody()
    data: {
      chatId: string;
      visitorSenderId?: string;
      vendorSenderId?: string;
      content: string;
    }
  ): Promise<void> {
    const message = await this.chatService.sendMessage({
      chatId: data.chatId,
      visitorSenderId: data.visitorSenderId,
      vendorSenderId: data.vendorSenderId,
      content: data.content,
    });

    this.server.to(data.chatId).emit("newMessage", message);
  }

  @SubscribeMessage("typing")
  handleTyping(
    client: Socket,
    data: { chatId: string; username: string }
  ): void {
    client.broadcast.to(data.chatId).emit("userTyping", data.username);
  }
}
