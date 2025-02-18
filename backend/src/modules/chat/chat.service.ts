import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";
import { IChat } from "../../database/schemas/chat.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { VisitorEntity } from "../../database/entities/visitor.entity";
import { VendorEntity } from "../../database/entities/vendor.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private chatModel: Model<IChat>,
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>
  ) {}

  async findOrCreateChat(vendorId: string, visitorId: string): Promise<IChat> {
    let chat = await this.chatModel.findOne({ vendorId, visitorId });

    if (!chat) {
      const visitor = await this.visitorRepository.findOne({
        where: { id: visitorId },
      });
      const vendor = await this.vendorRepository.findOne({
        where: { id: vendorId },
      });

      chat = new this.chatModel({
        chatId: uuid(),
        vendorId,
        visitorId,
        visitor: { id: visitor.id },
        vendor: { id: vendor.id },
        messages: [],
      });
      await chat.save();
    }
    return {
      ...chat.toObject(),
      visitor: { id: chat.visitorId },
      vendor: { id: chat.vendorId },
    };
  }

  async getVendorChats(vendorId: string): Promise<IChat[]> {
    return this.chatModel.find({ vendorId }).sort({ updatedAt: -1 });
  }

  async getVisitorChats(visitorId: string): Promise<IChat[]> {
    return this.chatModel.find({ visitorId }).sort({ updatedAt: -1 });
  }

  async addMessage(chatId: string, message: any): Promise<IChat> {
    return this.chatModel.findOneAndUpdate(
      { chatId },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
  }

  async getChatHistory(chatId: string): Promise<IChat> {
    return this.chatModel.findOne({ chatId });
  }

  async sendMessage(data: {
    chatId: string;
    content: string;
    visitorSenderId?: string;
    vendorSenderId?: string;
  }): Promise<IChat> {
    const message = {
      content: data.content,
      senderId: data.visitorSenderId || data.vendorSenderId,
      senderType: data.visitorSenderId ? "visitor" : "vendor",
      timestamp: new Date(),
    };

    return this.chatModel.findOneAndUpdate(
      { chatId: data.chatId },
      {
        $push: { messages: message },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
  }
}
