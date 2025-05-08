import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';


export interface IChat {
  chatId: string;
  offeringId: string;
  vendorId: string;
  visitorId: string;
  visitor: { id: string };
  vendor: { id: string };
  offering: { id: string };
  messages: Array<{
    id : string;
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
  offeringId: { type: String, required: true },
  vendorId: { type: String, required: true },
  visitorId: { type: String, required: true },
  messages: [{
    id: { type: String, default: uuid },
    content: String,
    senderId: String,
    senderType: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });
