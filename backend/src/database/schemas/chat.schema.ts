import { Schema } from 'mongoose';

export interface IChat {
  chatId: string;
  vendorId: string;
  visitorId: string;
  visitor: { id: string };
  vendor: { id: string };
  messages: Array<{
    content: string;
    senderId: string;
    senderType: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export const ChatSchema = new Schema({
  chatId: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  visitorId: { type: String, required: true },
  messages: [{
    content: String,
    senderId: String,
    senderType: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });
