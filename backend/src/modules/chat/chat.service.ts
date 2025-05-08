import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuid } from "uuid";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VisitorEntity } from "../../database/entities/visitor.entity";
import { VendorEntity } from "../../database/entities/vendor.entity";
import { OfferingEntity } from "../../database/entities/offering.entity";
import { IChat } from "../../database/schemas/chat.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private chatModel: Model<IChat>,
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
    @InjectRepository(VendorEntity)
    private vendorRepository: Repository<VendorEntity>,
    @InjectRepository(OfferingEntity)
    private offeringRepository: Repository<OfferingEntity>
  ) {}

  async findOrCreateChat(
    offeringId: string,
    visitorId: string
  ): Promise<IChat> {
    let chat = await this.chatModel.findOne({ offeringId, visitorId });

    if (!chat) {
      const visitor = await this.visitorRepository.findOne({
        where: { id: visitorId },
      });

      const offering = await this.offeringRepository.findOne({
        where: { id: offeringId },
        relations: ["vendor"],
      });

      const vendorId = offering.vendor.id;
      // const vendor = await this.vendorRepository.findOne({
      //   where: { id: vendorId },
      // });

      chat = new this.chatModel({
        chatId: uuid(),
        offeringId,
        vendorId,
        visitorId,
        visitor: { id: visitor.id },
        vendor: { id: vendorId },
        offering: { id: offering.id },
        messages: [],
      });
      await chat.save();
    }
    return {
      ...chat.toObject(),
      visitor: { id: chat.visitorId },
      vendor: { id: chat.vendorId },
      offering: { id: chat.offeringId },
    };
  }

  async getVendorChats(vendorId: string): Promise<IChat[]> {
    return this.chatModel
      .find({
        vendorId,
        $or: [{ offeringId: { $exists: true } }, { offeringId: { $ne: null } }],
      })
      .sort({ updatedAt: -1 });
  }

  async getVisitorChats(visitorId: string): Promise<IChat[]> {
    return this.chatModel
      .find({
        visitorId,
        $or: [{ offeringId: { $exists: true } }, { offeringId: { $ne: null } }],
      })
      .sort({ updatedAt: -1 });
  }

  async getOfferingChats(offeringId: string): Promise<IChat[]> {
    return this.chatModel.find({ offeringId }).sort({ updatedAt: -1 });
  }

  async addMessage(
    chatId: string,
    message: {
      content: string;
      senderId: string;
      senderType: string;
      timestamp?: Date;
    }
  ): Promise<IChat> {
    return this.chatModel.findOneAndUpdate(
      { chatId },
      {
        $push: { messages: { ...message, id: uuid() } },
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
      id: uuid(),
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
