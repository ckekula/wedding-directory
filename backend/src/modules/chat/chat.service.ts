import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../../database/entities/chat.entity';
import { Message } from '../../database/entities/message.entity';
import { CreateChatInput } from '../../graphql/inputs/createChat.input';
import { SendMessageInput } from '../../graphql/inputs/sendMessage.input';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { VendorEntity } from '../../database/entities/vendor.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(VisitorEntity)
        private visitorRepository: Repository<VisitorEntity>,
        @InjectRepository(VendorEntity)
        private vendorRepository: Repository<VendorEntity>,
    ) { }

    async createChat(createChatInput: CreateChatInput): Promise<Chat> {
        const { visitorId, vendorId } = createChatInput;
        const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
        const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });

        const chat = this.chatRepository.create({ visitor, vendor });
        return this.chatRepository.save(chat);
    }

    async sendMessage(sendMessageInput: SendMessageInput): Promise<Message> {
        const { chatId, visitorSenderId, vendorSenderId, content } = sendMessageInput;
        const chat = await this.chatRepository.findOne({ where: { id: chatId } });

        let sender: VisitorEntity | VendorEntity | null = null;
        if (visitorSenderId) {
            sender = await this.visitorRepository.findOne({ where: { id: visitorSenderId } });
        } else if (vendorSenderId) {
            sender = await this.vendorRepository.findOne({ where: { id: vendorSenderId } });
        }

        if (!sender) {
            throw new Error('Sender not found');
        }

        const message = this.messageRepository.create({
            chat,
            content,
            visitorSender: visitorSenderId ? (sender as VisitorEntity) : null,
            vendorSender: vendorSenderId ? (sender as VendorEntity) : null,
        });

        return this.messageRepository.save(message);
    }

    async getChats(userId: string): Promise<Chat[]> {
        return this.chatRepository.find({
            where: [{ visitor: { id: userId } }, { vendor: { id: userId } }],
            relations: ['messages'],
        });
    }

    async getChatHistory(chatId: string): Promise<Message[]> {
    const chat = await this.chatRepository.findOne({
        where: { id: chatId },
        relations: ['messages'],
    });
    return chat.messages;
}

async getChatRoom(visitorId: string, vendorId: string): Promise<Chat> {
    return this.chatRepository.findOne({
        where: {
            visitor: { id: visitorId },
            vendor: { id: vendorId }
        }
    });
}

}