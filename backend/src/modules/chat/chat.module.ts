import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Message } from '../../database/entities/message.entity';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { VendorEntity } from '../../database/entities/vendor.entity';
import { ChatService } from './chat.service';
import { ChatResolver } from '../../graphql/resolvers/chat.resolver';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, Message, VisitorEntity, VendorEntity])],
    providers: [ChatService, ChatResolver, ChatGateway],
})
export class ChatModule { }